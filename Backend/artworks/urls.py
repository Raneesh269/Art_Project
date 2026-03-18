from django.urls import path
from .views import ArtworkListCreateView, ArtworkDetailView

urlpatterns = [
    path('artworks/', ArtworkListCreateView.as_view()),
    path('artworks/<int:pk>/', ArtworkDetailView.as_view()),
]