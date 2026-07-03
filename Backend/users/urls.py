from django.urls import path
from .views import register_user, get_all_users

urlpatterns = [
    path("api/users/register/", register_user),
    path("api/users/", get_all_users),
]