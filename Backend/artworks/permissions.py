from rest_framework.permissions import BasePermission

class IsOwner(BasePermission):

    def has_object_permission(self, request, view, obj):

        # 👑 ADMIN CAN DELETE ANYTHING
        if request.user.is_superuser:
            return True

        # Seller can edit own artwork
        return obj.artist == request.user