""" Module providin serializers. """

import datetime
from djoser.serializers import ValidationError
from djoser.serializers import UserSerializer, UserCreateSerializer
from rest_framework import serializers

from myrdal_api.models import CustomUser, Account, Transaction


class CustomUserCreateSerializer(UserCreateSerializer):
    """
    Serializer for creating CustomUser instances.
    """

    class Meta:
        model = CustomUser
        fields = [
            "email",
            "password",
            "first_name",
            "last_name",
            "date_of_birth",
        ]

    def validate_date_of_birth(self, value):
        """
        Validator which prevents users from setting a date of birth
        which is in the future.

        Args:
            value: The date of birth value.

        Raises:
            ValidationError: Date of birth cannot be in the future.

        Returns:
            The input value.
        """
        if value > datetime.date.today():
            raise ValidationError("The date cannot be in the future!")
        return value


class CustomUserSerializer(UserSerializer):
    """
    Serializer for CustomUser instances.
    """

    class Meta:
        model = CustomUser
        fields = [
            "email",
            "first_name",
            "last_name",
            "date_of_birth",
        ]


class AccountSerializer(serializers.ModelSerializer):
    """
    Serializer for the Account model.
    """

    class Meta:
        model = Account
        fields = ["id", "user", "account_name", "current_balance"]
        read_only_fields = ['user']  


class TransactionSerializer(serializers.ModelSerializer):
    """
    Serializer for the Transaction model.
    """

    class Meta:
        model = Transaction
        fields = [
            "id",
            "account",
            "payee",
            "date_time",
            "amount",
            "description",
            "category",
        ]
