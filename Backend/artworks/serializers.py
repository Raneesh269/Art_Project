from rest_framework import serializers
from .models import Artwork,User

class ArtworkSerializer(serializers.ModelSerializer):
    class Meta:
        model = Artwork
        fields = "__all__"
        read_only_fields = ['artist']


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['username', 'password', 'role', 'is_superuser']


class ArtworkSerializer(serializers.ModelSerializer):

    artist_username = serializers.CharField(
    source="artist.username",
    read_only=True
)

    class Meta:
        model = Artwork
        fields = "__all__"
        extra_kwargs = {
            'artist': {'required': False}
        }

