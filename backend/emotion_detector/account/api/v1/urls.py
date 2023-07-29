from django.urls import path
from rest_framework.routers import DefaultRouter

from emotion_detector.account.api.v1.views.register import UserRegistrationView

from emotion_detector.account.views import APICheckViewSet

r = DefaultRouter()
r.register('check', APICheckViewSet, basename='check')

urlpatterns = [
    path('register/', UserRegistrationView, name="register-user")
]
