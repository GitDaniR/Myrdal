from django.test import TestCase
from myrdal_api.models import CustomUser

class CustomUserTest(TestCase):
    def test_create_user(self):
        user = CustomUser.objects.create_user(
            email='test@example.com',
            password='password123',
            first_name='Test',
            last_name='User',
            date_of_birth='2000-01-01'
        )
        self.assertEqual(user.__str__(), 'test@example.com')
        self.assertEqual(user.email, 'test@example.com')
        self.assertEqual(user.first_name, 'Test')
        self.assertEqual(user.last_name, 'User')
        self.assertEqual(user.date_of_birth, '2000-01-01')
        self.assertTrue(user.check_password('password123'))

    def test_create_user_no_email(self):
        with self.assertRaises(ValueError):
            CustomUser.objects.create_user(
                email='',
                password='password123',
                first_name='Test',
                last_name='User',
                date_of_birth='2000-01-01'
            )

    def test_create_superuser(self):
        user = CustomUser.objects.create_superuser(
            email='admin@example.com',
            password='password123',
            first_name='Admin',
            last_name='User',
            date_of_birth='2000-01-01'
        )
        self.assertEqual(user.email, 'admin@example.com')
        self.assertTrue(user.is_staff)
        self.assertTrue(user.is_superuser)

    def test_create_superuser_not_staff(self):
        with self.assertRaises(ValueError):
            CustomUser.objects.create_superuser(
                email='admin@example.com',
                password='password123',
                first_name='Admin',
                last_name='User',
                date_of_birth='2000-01-01',
                is_staff=False
            )

    def test_create_superuser_not_superuser(self):
        with self.assertRaises(ValueError):
            CustomUser.objects.create_superuser(
                email='admin@example.com',
                password='password123',
                first_name='Admin',
                last_name='User',
                date_of_birth='2000-01-01',
                is_superuser=False
            )
