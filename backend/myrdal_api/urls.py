from django.urls import path
from myrdal_api.views import AccountApiView

urlpatterns = [
    path('accounts/', AccountApiView.as_view(), name='account_list_create'),
    path('accounts/<int:account_id>/', AccountApiView.as_view(), name='account_detail'),
]
