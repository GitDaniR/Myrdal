"""
Django settings for deployment of the backend project.
"""

import os
from dotenv import load_dotenv

from .settings import *  # pylint: disable=wildcard-import, unused-wildcard-import
from .settings import BASE_DIR

# Load environment variables
load_dotenv()

# Secret key
SECRET_KEY = os.environ["API_SECRET_KEY"]

# Disable debug mode
DEBUG = False

# Backend
ALLOWED_HOSTS = [os.environ.get("WEBSITE_HOSTNAME")]
CSRF_TRUSTED_ORIGINS = ["https://" + os.environ["WEBSITE_HOSTNAME"]]
APPEND_SLASH = True

# Frontend
CORS_ORIGIN_WHITELIST = ["gitdanir.github.io/Myrdal"]

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}


# Database configuration
CONNECTION = os.environ["AZURE_POSTGRESQL_CONNECTIONSTRING"]
CONNECTION_STR = {
    pair.split("=")[0]: pair.split("=")[1] for pair in CONNECTION.split(" ")
}

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.postgresql",
        "NAME": CONNECTION_STR["dbname"],
        "HOST": CONNECTION_STR["host"],
        "USER": CONNECTION_STR["user"],
        "PASSWORD": CONNECTION_STR["password"],
    }
}
