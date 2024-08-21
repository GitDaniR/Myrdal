"""
Django settings for deployment of the backend project.
"""

import os

from .settings import *  # pylint: disable=wildcard-import, unused-wildcard-import
from .settings import BASE_DIR

# Secret key
SECRET_KEY = os.environ["API_SECRET_KEY"]

# Disable debug mode
DEBUG = False

# Backend
ALLOWED_HOSTS = [os.environ["WEBSITE_HOSTNAME"]]
CSRF_TRUSTED_ORIGINS = ["https://" + os.environ["WEBSITE_HOSTNAME"]]
APPEND_SLASH = True

# Frontend
CORS_ALLOWED_ORIGINS = ["https://gitdanir.github.io"]

# pylint: disable=duplicate-code
MIDDLEWARE = [
    "django.middleware.security.SecurityMiddleware",
    "whitenoise.middleware.WhiteNoiseMiddleware",
    "django.contrib.sessions.middleware.SessionMiddleware",
    "django.middleware.common.CommonMiddleware",
    "django.middleware.csrf.CsrfViewMiddleware",
    "django.contrib.auth.middleware.AuthenticationMiddleware",
    "django.contrib.messages.middleware.MessageMiddleware",
    "django.middleware.clickjacking.XFrameOptionsMiddleware",
    "corsheaders.middleware.CorsMiddleware",
]
# pylint: enable=duplicate-code

REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    ),
}

STORAGES = {
    "default": {
        "BACKEND": "django.core.files.storage.FileSystemStorage",
    },
    "staticfiles": {
        "BACKEND": "whitenoise.storage.CompressedStaticFilesStorage",
    },
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

STATIC_ROOT = BASE_DIR / "staticfiles"
