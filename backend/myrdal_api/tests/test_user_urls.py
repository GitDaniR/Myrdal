from rest_framework import status
from rest_framework.test import APITestCase

from myrdal_api.models import CustomUser


class UserViewTest(APITestCase):
    def setUp(self):
        self.user_data = {
            "email": "test@gmail.com",
            "password": "J8EoRsWXX",
            "first_name": "John",
            "last_name": "Doe",
            "date_of_birth": "2000-01-01",
        }

    def test_register_user(self):
        response = self.client.post("/api/auth/users/", self.user_data, secure=True)

        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        response_data = response.json()
        self.assertEqual(response_data["email"], self.user_data["email"])
        self.assertEqual(response_data["first_name"], self.user_data["first_name"])
        self.assertEqual(response_data["last_name"], self.user_data["last_name"])
        self.assertEqual(
            response_data["date_of_birth"], self.user_data["date_of_birth"]
        )

        # Validate that the user was created in the database
        self.assertTrue(
            CustomUser.objects.filter(email=self.user_data["email"]).exists()
        )

    def test_register_invalid_date_of_birth(self):
        self.user_data["date_of_birth"] = "9000-01-01"
        response = self.client.post("/api/auth/users/", self.user_data, secure=True)

        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_login_user(self):
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"],
        }

        self.client.post("/api/auth/users/", self.user_data, secure=True)
        response = self.client.post("/api/auth/jwt/create/", login_data, secure=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

        token_data = {"token": response.json()["access"]}

        response = self.client.post("/api/auth/jwt/verify/", token_data, secure=True)

        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_user(self):
        login_data = {
            "email": self.user_data["email"],
            "password": self.user_data["password"],
        }

        self.client.post("/api/auth/users/", self.user_data, secure=True)
        response = self.client.post("/api/auth/jwt/create/", login_data, secure=True)

        self.client.credentials(HTTP_AUTHORIZATION="JWT " + response.json()["access"])

        response = self.client.delete(
            "/api/auth/users/me/",
            {"current_password": self.user_data["password"]},
            secure=True,
        )

        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
