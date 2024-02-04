from django.urls import path
from rest_framework.routers import DefaultRouter
from emotion_detector.account.api.v1.views.user import UserViewSet

from emotion_detector.account.api.v1.views.register import UserRegistrationView

from emotion_detector.account.views import APICheckViewSet

from emotion_detector.account.api.v1.views.login import LoginView

from emotion_detector.account.api.v1.views.social_login import SocialLoginView

r = DefaultRouter()
r.register('check', APICheckViewSet, basename='check')
r.register('user', UserViewSet, basename='user')

urlpatterns = [
                  path('register/', UserRegistrationView.as_view(), name="register-user"),
                  path('login/', LoginView.as_view(), name='knox_login'),
                  path('social-auth/', SocialLoginView.as_view(), name='social-auth'),
              ] + r.urls
