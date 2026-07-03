from django.db import models
from django.contrib.auth.models import AbstractUser
from django.conf import settings
from django.contrib.auth.models import User


class User(AbstractUser):
    ROLE_CHOICES = (
        ('user', 'User'),
        ('seller', 'Seller'),
    )

    role = models.CharField(max_length=10, choices=ROLE_CHOICES, default='user')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    shop_name = models.CharField(max_length=255, blank=True, null=True)

class Artwork(models.Model):
    artist = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    artist_name = models.CharField(max_length=200)
    title = models.CharField(max_length=200)
    description = models.TextField()
    image = models.ImageField(upload_to='artworks/')
    price = models.DecimalField(max_digits=10, decimal_places=2)
    created_at = models.DateTimeField(auto_now_add=True)
    is_sold = models.BooleanField(default=False)

    def __str__(self):
        return self.title 

