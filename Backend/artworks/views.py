from rest_framework import generics
from .models import Artwork
from orders.models import Order
from .serializers import ArtworkSerializer

from rest_framework.permissions import (
    IsAuthenticated,
    AllowAny
)

from rest_framework_simplejwt.authentication import JWTAuthentication
from .permissions import IsOwner

from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes

from django.contrib.auth import get_user_model
from django.conf import settings

import razorpay

User = get_user_model()


# 🔥 RAZORPAY CLIENT
client = razorpay.Client(
    auth=(settings.RAZORPAY_KEY_ID, settings.RAZORPAY_KEY_SECRET)
)


# 🔐 REGISTER USER
@api_view(['POST'])
def register_user(request):

    username = request.data.get('username')
    password = request.data.get('password')
    role = request.data.get('role', 'user')
    phone_number = request.data.get('phone_number')
    shop_name = request.data.get('shop_name')

    if not username or not password:
        return Response({'error': 'Missing fields'}, status=400)

    if User.objects.filter(username=username).exists():
        return Response({'error': 'Username already exists'}, status=400)

    user = User.objects.create_user(
        username=username,
        password=password,
        role=role,
        phone_number=phone_number,
        shop_name=shop_name if role == "seller" else ""
    )

    return Response({
        'message': 'User created successfully'
    })


# 👤 GET LOGGED-IN USER
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_user(request):

    return Response({
        "username": request.user.username,
        "role": request.user.role,
        "is_superuser": request.user.is_superuser,
    })


# 🎨 ARTWORK LIST + CREATE
class ArtworkListCreateView(generics.ListCreateAPIView):

    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

    authentication_classes = [JWTAuthentication]

    def get_permissions(self):

        if self.request.method == "POST":
            return [IsAuthenticated()]

        return [AllowAny()]

    def perform_create(self, serializer):
        serializer.save(artist=self.request.user)


# 🎨 SINGLE ARTWORK VIEW
class ArtworkDetailView(generics.RetrieveUpdateDestroyAPIView):

    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsOwner]

    def get_permissions(self):

        if self.request.method in ["PUT", "PATCH", "DELETE"]:
            return [IsAuthenticated()]

        return [AllowAny()]


# 💳 CREATE ORDER
@api_view(["POST"])
@permission_classes([IsAuthenticated])
def create_order(request):

    items = request.data.get("items", [])
    payment_method = request.data.get("payment_method", "UPI")

    for item in items:

        artwork = Artwork.objects.get(id=item["id"])

        qty = int(item["quantity"])
        total = float(artwork.price) * qty

        existing_order = Order.objects.filter(
            user=request.user,
            artwork=artwork,
            status="pending"
        ).first()

        if existing_order:

            existing_order.quantity += qty
            existing_order.total_price += total
            existing_order.save()

        else:

            Order.objects.create(
                user=request.user,
                artwork=artwork,
                quantity=qty,
                total_price=total,
                payment_method=payment_method,
                status="paid"
            )

    return Response({
        "message": "Order created successfully"
    })

# 👑 ADMIN USERS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_users(request):

    if not request.user.is_superuser:
        return Response({
            "error": "Unauthorized"
        }, status=403)

    users = User.objects.all()

    data = []

    for user in users:
       data.append({
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "phone_number": user.phone_number,
            "shop_name": user.shop_name,
        })

    return Response(data)


# 👑 ADMIN ORDERS
@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_orders(request):

    if not request.user.is_superuser:
        return Response({
            "error": "Unauthorized"
        }, status=403)

    orders = Order.objects.all()

    data = []

    for order in orders:
        data.append({
            "id": order.id,
            "buyer": order.user.username,
            "artwork": order.artwork.title,
            "quantity": order.quantity,
            "price": order.total_price,
            "status": order.status,
        })

    return Response(data)