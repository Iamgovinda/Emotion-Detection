from django.contrib.auth import login
from django.utils import timezone
from knox.models import AuthToken

from rest_framework import permissions
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.authtoken.views import ObtainAuthToken

from rest_framework.response import Response


class LoginView(ObtainAuthToken):
    permission_classes = (permissions.AllowAny,)

    def post(self, request, format=None):
        serializer = AuthTokenSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data['user']
        instance, token = AuthToken.objects.create(user=user)
        user.last_login = timezone.now()
        user.save(update_fields=['last_login'])
        login(request, user)
        return Response(
            {
                'token': token,
                'available_tokens': AuthToken.objects.filter(user=user).count(),
                'expires_in': instance.expiry
            }
        )
