from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Order
from artworks.models import Artwork

@api_view(['POST'])
def create_order(request):

    print("REQUEST DATA:", request.data)  

    user = request.user
    items = request.data.get("items", [])

    for item in items:

        print("ITEM:", item)

        art = Artwork.objects.get(id=item["id"])

        qty = int(item["quantity"])

        print("Artwork price:", art.price)
        print("Quantity:", qty)
        print("Calculated total:", float(art.price) * qty)

        Order.objects.create(
            user=user,
            artwork=art,
            quantity=qty,
            total_price=float(art.price) * qty,
            payment_method="UPI",
            status="paid",
        )

    return Response({
    "message": "Order created",
    "items": items
})

@api_view(['GET'])
def seller_orders(request):
    user = request.user

    orders = Order.objects.filter(
        artwork__artist=request.user
)

    data = []
    for order in orders:
        data.append({
            "artwork": order.artwork.title,
            "price": float(order.artwork.price),
            "quantity": order.quantity,
            "total_amount": float(order.total_price),
            "buyer": order.user.username,
            "status": order.status,
            "payment_method": order.payment_method,
        })

    return Response(data)

@api_view(['GET'])
def all_orders(request):

    orders = Order.objects.all()

    data = []

    for order in orders:
        data.append({
            "artwork": order.artwork.title,
            "price": order.total_price,
            "quantity": order.quantity,
            "buyer": order.user.username,
            "seller": order.artwork.artist.username,
            "status": order.status,
            "payment_method": order.payment_method,
        })

    return Response(data)

@api_view(['DELETE'])
def clear_orders(request):

    Order.objects.all().delete()

    return Response({
        "message": "All orders deleted"
    })    
