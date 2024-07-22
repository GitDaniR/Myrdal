"""Module defining database models."""

from django.contrib.auth.models import AbstractUser
from django.db import models
from django.utils.translation import gettext_lazy as _

from .managers import CustomUserManager


class CustomUser(AbstractUser):
    """ The user model.
    """
    username = None
    email = models.EmailField(_('email address'), unique=True)
    date_of_birth = models.DateField()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name', 'date_of_birth']

    objects = CustomUserManager()

    def __str__(self):
        return self.email
