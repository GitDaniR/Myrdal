from django.urls import path
from myrdal_api.views import AccountApiView

urlpatterns = [
    path('accounts/', AccountApiView.as_view()),
]
