from django.db import models
from django.conf import settings
from artworks.models import Artwork

class Order(models.Model):
    STATUS_CHOICES = (
        ('paid', 'Paid'),
        ('shipped', 'Shipped'),
        ('delivered', 'Delivered'),
    )

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    artwork = models.ForeignKey(Artwork, on_delete=models.CASCADE)

    quantity = models.IntegerField(default=1)
    total_price = models.FloatField()

    payment_method = models.CharField(max_length=20)

    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='pending')

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.artwork.title}"