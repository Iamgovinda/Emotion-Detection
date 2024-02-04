from rest_framework.viewsets import ModelViewSet
from emotion_detector.account.api.v1.serializers.user import UserSerializer

from emotion_detector.account.models import User

from rest_framework.permissions import IsAuthenticated

class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer

    def get_permissions(self):
        if self.action in ["update", "partial_update"]:
            return [IsAuthenticated, ]
        return super().get_permissions()

    def get_queryset(self):
        if self.action in ["update", "partial_update"]:
            return User.objects.filter(username = self.request.user.username)
        return User.objects.all()


