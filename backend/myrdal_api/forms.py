"""Module for forms."""
from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from myrdal_api.models import CustomUser


class CustomUserCreationForm(UserCreationForm):
    """ From for creating a user.
    """
    class Meta:
        """ Define underlying class and required fields.
        """
        model = CustomUser
        fields = ("email", 'date_of_birth', 'first_name', 'last_name',)


class CustomUserChangeForm(UserChangeForm):
    """ From for editing a user.
    """
    class Meta:
        """ Define underlying class and required fields.
        """
        model = CustomUser
        fields = ("email", 'first_name', 'last_name', 'date_of_birth',)
