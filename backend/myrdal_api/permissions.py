"""
This module provides custom permission classes.
"""

from rest_framework import permissions

from myrdal_api.models import Account, Transaction


class IsOwner(permissions.BasePermission):
    """
    A custom permission class that checks if the current user is the owner of the object.

    Inherits:
        permissions.BasePermission: Abstract base class for all permission classes.
    """

    def has_object_permission(self, request, view, obj):
        """
        Overridden method from BasePermission to check if the request user is the owner
        of the object.

        Args:
            request (rest_framework.request.Request): The current request instance.
            view (rest_framework.views.APIView): The view that the request was made to.
            obj (django.db.models.Model): The object that the user wants to access.

        Returns:
            bool: True if the request user is the owner of the object, False otherwise.
        """
        if isinstance(obj, Account):
            return obj.user == request.user
        if isinstance(obj, Transaction):
            return obj.account.user == request.user
        return False
