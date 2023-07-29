from django.utils import timezone
from knox.models import AuthToken

from rest_framework.authtoken.models import Token
from rest_framework import status
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.generics import GenericAPIView
from rest_framework.response import Response
from emotion_detector.account.api.v1.serializers.social_login import CustomLoginSerializer

from emotion_detector.account.auth_backends import GoogleAuthBackend, FacebookAuthBackend


class SocialLoginView(GenericAPIView):
    serializer_class = CustomLoginSerializer

    PROVIDER_MAPS = {
        'google': GoogleAuthBackend,
        'facebook': FacebookAuthBackend,
    }

    @staticmethod
    def get_user_response(user):
        if user.is_active:
            token, _ = AuthToken.objects.get_or_create(user=user)
            user.last_login = timezone.now()
            user.save()
            return Response(
                {'token': token.key, 'id': user.id, 'first_name': user.first_name,
                 'last_name': user.last_name, 'name': user.display_name, 'email': user.email,
                 })
        else:
            return Response({'message': 'User is not active or user email doesnt exists.'})

    def post(self, request, *args, **kwargs):
        if 'provider' in request.data:
            provider = request.data.get('provider')

            if provider not in self.PROVIDER_MAPS:
                return Response({'message': 'Invalid Provider'}, status=status.HTTP_400_BAD_REQUEST)

            token = request.data.get("token") or request.data.get('id_token')  # just for validation
            if not token:
                return Response({'message': 'Valid token or id_token is required'}, status=status.HTTP_400_BAD_REQUEST)

            auth_class = self.PROVIDER_MAPS[provider]()
            user = auth_class.auth(request.data)
            if not user:
                return Response({'message': 'Couldn\'t Authenicate', 'extra_data': auth_class.auth_errors},
                                status=status.HTTP_400_BAD_REQUEST)

        else:
            serializer = self.serializer_class(data=self.request.data, context={'request': request})
            serializer.is_valid(raise_exception=True)

            user = serializer.validated_data['user']
        return self.get_user_response(user)
