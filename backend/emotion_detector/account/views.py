# Create your views here.
from rest_framework.response import Response
from rest_framework.viewsets import GenericViewSet, ModelViewSet

from emotion_detector.commons.serializers import DummySerializer

from emotion_detector.account.models import User


class APICheckViewSet(ModelViewSet):
    serializer_class = DummySerializer
    queryset = User.objects.all()

    def list(self, request, *args, **kwargs):
        return Response(
            {
                'detail': 'done'
            }
        )
