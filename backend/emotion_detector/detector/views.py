from django.shortcuts import render

# Create your views here.
from rest_framework.mixins import CreateModelMixin
from rest_framework.response import Response
from rest_framework.serializers import Serializer
from rest_framework.viewsets import GenericViewSet

from emotion_detector.detector.main import emotion_detector


class ImageDetectionPOSTSerializer(Serializer):
    pass


class ImageDetectionPOSTViewset(CreateModelMixin, GenericViewSet):
    serializer_class = ImageDetectionPOSTSerializer

    def create(self, request, *args, **kwargs):
        label = emotion_detector(request.data.get('imageData'))
        return Response({'data': label if label is not None else 'neutral'})
