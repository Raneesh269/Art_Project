from django.urls import path
from .views import (
    ArtworkListCreateView,
    ArtworkDetailView,
    create_order,
    admin_users,
    admin_orders,
)
from .views import get_user

urlpatterns = [
    # 🎨 Artwork APIs
    path('artworks/', ArtworkListCreateView.as_view()),
    path('artworks/<int:pk>/', ArtworkDetailView.as_view()),

    # Admin
    path('admin/users/', admin_users),
    path('admin/orders/', admin_orders),

    # 💳 Razorpay Payment API
    path('create-order/', create_order),

    path('user/', get_user),
]