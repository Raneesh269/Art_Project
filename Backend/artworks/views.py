from rest_framework import generics
from .models import Artwork
from .serializers import ArtworkSerializer
from rest_framework.permissions import IsAuthenticated
from .permissions import IsOwner

class ArtworkListCreateView(generics.ListCreateAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    permission_classes = []   # ✅ REMOVE authentication for now

    def perform_create(self, serializer):
        serializer.save()


class ArtworkDetailView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Artwork.objects.all()
    serializer_class = ArtworkSerializer
    permission_classes = []   # ✅ TEMP FIX