"""
This module defines the configuration for the Myrdal API app.
"""

from django.apps import AppConfig


class MyrdalApiConfig(AppConfig):
    """
    Configuration for the Myrdal API app.
    """

    default_auto_field = "django.db.models.BigAutoField"
    name = "myrdal_api"
