from django.urls import path
from .views import (
    create_order,
    seller_orders,
    all_orders,
    clear_orders,
)

urlpatterns = [
    path('api/create-order/', create_order),
    path('api/seller-orders/', seller_orders),
    path(
        'api/all-orders/',
        all_orders
    ),
    path(
    'api/clear-orders/',
    clear_orders
    ),
]