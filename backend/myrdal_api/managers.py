"""Module providing managers."""

from django.contrib.auth.base_user import BaseUserManager
from django.utils.translation import gettext_lazy as _


class CustomUserManager(BaseUserManager):
    """
    Custom user model manager where email is the unique identifiers
    for authentication instead of usernames.
    """

    def create_user(  # pylint: disable=too-many-arguments
        self, email, password, first_name, last_name, date_of_birth, **extra_fields
    ):
        """
        Create and save a user with the given email and password.
        """
        if not email:
            raise ValueError(_("Users must have an email address"))

        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
            date_of_birth=date_of_birth,
            **extra_fields,
        )

        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(  # pylint: disable=too-many-arguments
        self, email, password, first_name, last_name, date_of_birth, **extra_fields
    ):
        """
        Create and save a SuperUser with the given email and password.
        """
        extra_fields.setdefault("is_staff", True)
        extra_fields.setdefault("is_superuser", True)
        extra_fields.setdefault("is_active", True)

        if extra_fields.get("is_staff") is not True:
            raise ValueError(_("Superuser must have is_staff=True."))
        if extra_fields.get("is_superuser") is not True:
            raise ValueError(_("Superuser must have is_superuser=True."))

        user = self.create_user(
            email=email,
            password=password,
            first_name=first_name,
            last_name=last_name,
            date_of_birth=date_of_birth,
            **extra_fields,
        )
        user.save(using=self._db)

        return user
