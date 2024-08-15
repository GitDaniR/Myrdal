"""Module defining database models."""

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from myrdal_api.managers import CustomUserManager


class CustomUser(AbstractUser):
    """Custom User model that represents a user in the system.

    This model extends Django's built-in AbstractUser model and overrides the username
    field with email to use email as the primary identifier. It also adds a date_of_birth field.
    """

    username = None
    email = models.EmailField(_("email address"), unique=True)
    date_of_birth = models.DateField()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name", "date_of_birth"]

    objects = CustomUserManager()

    def __str__(self):
        """ Returns a string representation of the CustomUser instance.

        Returns:
            str: The email of the user.
        """        
        return self.email

class Account(models.Model):
    """
    The Account model represents a user's account in the system.
    It stores the name of the account and the current balance.

    """

    user = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    account_name = models.CharField(max_length=100)
    current_balance = models.DecimalField(max_digits=15, decimal_places=2, default=0.0)

    def __str__(self):
        """
        Returns a string representation of the Account instance.

        Returns:
            str: The name of the account.
        """
        return self.account_name