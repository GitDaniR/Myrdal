"""
This module provides API views for theMyrdal API.
"""

from django.shortcuts import get_object_or_404
from django.db import transaction

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from rest_framework_simplejwt.authentication import JWTAuthentication

from myrdal_api.models import Account, Transaction
from myrdal_api.permissions import IsOwner
from myrdal_api.serializers import AccountSerializer, TransactionSerializer


class AccountApiView(APIView):
    """
    API View for the Account model. It handles GET, PUT, POST, and DELETE requests.

    Inherits:
        APIView: Django REST framework's APIView class.

    Note:
        Requires user authentication.
    """

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def get(self, request):
        """
        Handles GET requests. Returns a list of all accounts associated with the authenticated user.

        Args:
            request (Request): The GET request sent by the client.

        Returns:
            Response: A HTTP response containing the serialized data of the accounts or
            an error message.
        """
        accounts = Account.objects.filter(user=request.user.id)
        serializer = AccountSerializer(accounts, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    def put(self, request, account_id):
        """
        Handles PUT requests. Updates an existing account associated with the authenticated user.

        Args:
            request (Request): The PUT request sent by the client containing the data for
            the account update.
            account_id (int): The primary key id of the account.

        Returns:
            Response: A HTTP response containing the serialized data of the updated account or
            an error message.
        """
        data = {
            "account_name": request.data.get("account_name"),
        }
        account = get_object_or_404(Account, pk=account_id)
        self.check_object_permissions(request, account)
        serializer = AccountSerializer(account, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def post(self, request):
        """
        Handles POST requests. Creates a new account associated with the authenticated user.

        Args:
            request (Request): The POST request sent by the client containing the data for
            the new account.

        Returns:
            Response: A HTTP response containing the serialized data of the new account or
            an error message.
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
        account = get_object_or_404(Account, pk=account_id)
        self.check_object_permissions(request, account)
        account.delete()
        return Response(
            {"detail": "Account deleted"}, status=status.HTTP_204_NO_CONTENT
        )


class TransactionApiView(APIView):
    """
    API view for handling transactions and updating account balances.

    Inherits:
        APIView: Django REST framework's APIView class.

    Note:
        Requires user authentication.
    """

    authentication_classes = [JWTAuthentication]
    permission_classes = [permissions.IsAuthenticated, IsOwner]

    def update_account_balance(self, request, account, amount):
        """
        Handles DELETE requests. Deletes an existing transaction.

        Args:
            request (Request): The DELETE request sent by the client.
            transaction_id (int): The primary key ID of the transaction to delete.

        Returns:
            Response: A HTTP response indicating successful deletion or an error message.
        """
        self.check_object_permissions(request, account)
        account.refresh_from_db()
        data = {"current_balance": account.current_balance + amount}
        serializer = AccountSerializer(account, data=data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save(force_update=True)
        return account.current_balance

    def get(self, request):
        """
        Handles GET requests. Returns a list of transactions associated with the authenticated
        user's accounts.

        Args:
            request (Request): The GET request sent by the client.

        Returns:
            Response: A HTTP response containing the serialized data of the transactions or
            an error message.
        """
        accounts = Account.objects.filter(user=request.user)
        transactions = Transaction.objects.filter(account__in=accounts)
        serializer = TransactionSerializer(transactions, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @transaction.atomic
    def put(self, request, transaction_id):
        """
        Handles PUT requests. Updates an existing transaction associated with
        the authenticated user.

        Args:
            request (Request): The PUT request sent by the client containing the data for
            the transaction update.
            transaction_id (int): The primary key id of the transaction.

        Returns:
            Response: A HTTP response containing the serialized data of the updated transaction
            or an error message.
        """
        old_transaction = get_object_or_404(Transaction, pk=transaction_id)
        self.check_object_permissions(request, old_transaction)
        serializer = TransactionSerializer(
            old_transaction, data=request.data, partial=True
        )
        if serializer.is_valid():
            new_transaction = serializer.validated_data
            self.update_account_balance(
                request, old_transaction.account, -old_transaction.amount
            )
            self.update_account_balance(
                request, new_transaction["account"], new_transaction["amount"]
            )
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def post(self, request):
        """
        Handles POST requests. Creates a new transaction associated with the authenticated user.

        Args:
            request (Request): The POST request sent by the client containing the data for
            the new transaction.

        Returns:
            Response: A HTTP response containing the serialized data of the created transaction or
            an error message.
        """
        serializer = TransactionSerializer(data=request.data)
        if serializer.is_valid():
            new_transaction = serializer.validated_data
            self.update_account_balance(
                request, new_transaction["account"], new_transaction["amount"]
            )
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @transaction.atomic
    def delete(self, request, transaction_id):
        """
        Handles DELETE requests. Deletes an existing transaction.

        Args:
            request (Request): The DELETE request sent by the client.
            transaction_id (int): The primary key ID of the transaction to delete.

        Returns:
            Response: A HTTP response indicating successful deletion or an error message.
        """
        old_transaction = get_object_or_404(Transaction, pk=transaction_id)
        self.check_object_permissions(request, old_transaction)
        self.update_account_balance(
            request, old_transaction.account, -old_transaction.amount
        )
        old_transaction.delete()
        return Response(
            {"detail": "Transaction deleted"}, status=status.HTTP_204_NO_CONTENT
        )
