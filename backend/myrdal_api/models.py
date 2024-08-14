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
