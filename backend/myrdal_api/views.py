from django.shortcuts import get_object_or_404

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from myrdal_api.models import Account
from myrdal_api.permissions import IsOwner
from myrdal_api.serializers import AccountSerializer


class AccountApiView(APIView):
    """
    API View for the Account model. It handles GET and POST requests.

    Inherits:
        APIView: Django REST framework's APIView class.

    Note:
        Requires user authentication.
    """

    # Check if user is authenticated
    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get(self, request):
        """
        Handles GET requests. Returns a list of all accounts associated with the authenticated user.

        Args:
            request (Request): The GET request sent by the client.

        Returns:
            Response: A HTTP response containing the serialized data of the accounts or an error message.
        """
        accounts = Account.objects.filter(user=request.user.id)
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    def put(self, request, account_id):
        """
        Handles PUT requests. Updates an existing account associated with the authenticated user.

        Args:
            request (Request): The PUT request sent by the client containing the data for the account update.
            account_id (int): The primary key id of the account.

        Returns:
            Response: A HTTP response containing the serialized data of the updated account or an error message.
        """
        data = {
            "account_name": request.data.get("account_name"),
        }
        account = get_object_or_404(Account, pk=account_id, user=request.user.id)
        serializer = AccountSerializer(account, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        """
        Handles POST requests. Creates a new account associated with the authenticated user.

        Args:
            request (Request): The POST request sent by the client containing the data for the new account.

        Returns:
            Response: A HTTP response containing the serialized data of the new account or an error message.
        """
        data = {
            "user": request.user.id,
            "account_name": request.data.get("account_name"),
        }
        serializer = AccountSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
    
    def delete(self, request, account_id):
        """
        Handles DELETE requests. Deletes an existing account associated with the authenticated user.

        Args:
            request (Request): The DELETE request sent by the client.
            account_id (int): The primary key id of the account.

        Returns:
            Response: A HTTP response with a success message or an error message.
        """
        account = get_object_or_404(Account, pk=account_id, user=request.user.id)
        account.delete()
        return Response({"detail": "Account deleted"}, status=status.HTTP_204_NO_CONTENT)
