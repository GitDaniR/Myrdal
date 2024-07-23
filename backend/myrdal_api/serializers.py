""" Module providin serializers. """
from djoser.serializers import UserSerializer, UserCreateSerializer

from myrdal_api.models import CustomUser

class CustomUserCreateSerializer(UserCreateSerializer):
    """ The serializer for creating CustomUser objects.
    """
    class Meta:
        """ Define underlying class and required fields.
        """
        model = CustomUser
        fields = ['email', 'password', 'first_name', 'last_name', 'date_of_birth',]

class CustomUserSerializer(UserSerializer):
    """ The class for serializing CustomUser objects.
    """
    class Meta:
        """ Define underlying class and required fields.
        """
        model = CustomUser
        fields = ['email', 'first_name', 'last_name', 'date_of_birth',]
