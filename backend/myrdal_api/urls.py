"""
URL patterns for the Myrdal API.

- `account_list_create`: Lists and creates accounts.
- `account_detail`: Retrieves, updates, or deletes a specific account.
- `transaction_list_create`: Lists and creates transactions.
- `transaction_detail`: Retrieves, updates, or deletes a specific transaction.
"""

from django.urls import path, include
from rest_framework.routers import DefaultRouter
from myrdal_api.views import AccountViewSet, TransactionApiView

router = DefaultRouter()
router.register(r'accounts', AccountViewSet, basename='account')

urlpatterns = [
    path('', include(router.urls)),
    path("transactions/", TransactionApiView.as_view(), name="transaction_list_create"),
    path(
        "transactions/<int:transaction_id>/",
        TransactionApiView.as_view(),
        name="transaction_detail",
    ),
]
