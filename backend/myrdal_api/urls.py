"""
URL patterns for the Myrdal API.

- `account_list_create`: Lists and creates accounts.
- `account_detail`: Retrieves, updates, or deletes a specific account.
- `transaction_list_create`: Lists and creates transactions.
- `transaction_detail`: Retrieves, updates, or deletes a specific transaction.
"""

from django.urls import path
from myrdal_api.views import AccountApiView, TransactionApiView

urlpatterns = [
    path("accounts/", AccountApiView.as_view(), name="account_list_create"),
    path("accounts/<int:account_id>/", AccountApiView.as_view(), name="account_detail"),
    path("transactions/", TransactionApiView.as_view(), name="transaction_list_create"),
    path(
        "transactions/<int:transaction_id>/",
        TransactionApiView.as_view(),
        name="transaction_detail",
    ),
]
