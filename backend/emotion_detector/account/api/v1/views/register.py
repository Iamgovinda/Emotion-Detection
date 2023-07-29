from django.contrib.auth import get_user_model
from rest_framework import status
from rest_framework.generics import CreateAPIView

from emotion_detector.account.api.v1.serializers.register import UserAccountRegistrationSerializer
from rest_framework.response import Response

USER = get_user_model()


class UserRegistrationView(CreateAPIView):
    """
        Register a new user
    """

    serializer_class = UserAccountRegistrationSerializer
    permission_classes = []

    def create(self, request, *args, **kwargs):
        try:
            user = USER.objects.get(email=request.data.get('email'))
        except USER.DoesNotExist:
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            self.perform_create(serializer)
            headers = self.get_success_headers(serializer.data)
            return Response({"detail": "User Account has been created. "}, status=status.HTTP_201_CREATED,
                            headers=headers)
        return Response({
            'detail': 'User with this email already exists.'
        })
