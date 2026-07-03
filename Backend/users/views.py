from rest_framework.decorators import api_view, renderer_classes
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from django.contrib.auth import get_user_model

User = get_user_model()

@api_view(['POST'])
@renderer_classes([JSONRenderer])   # 🔥 ADD THIS LINE
def register_user(request):
    try:
        username = request.data.get("username")
        password = request.data.get("password")
        role = request.data.get("role")
        phone_number = request.data.get("phone_number")
        shop_name = request.data.get("shop_name")

        if not username or not password or not role:
            return Response({"error": "All fields required"}, status=400)

        if User.objects.filter(username=username).exists():
            return Response({"error": "Username already exists"}, status=400)

        user = User.objects.create_user(
            username=username,
            password=password,
            role=role,
            phone_number=phone_number,
            shop_name=shop_name 
        )

        return Response({"message": "User created successfully"})

    except Exception as e:
        return Response({"error": str(e)}, status=500)
    
@api_view(["GET"])
def get_all_users(request):
    users = User.objects.all()

    data = [
        {
            "id": user.id,
            "username": user.username,
            "role": user.role,
            "phone_number": user.phone_number,
            "shop_name": user.shop_name,
        }
        for user in users
    ]

    return Response(data)    