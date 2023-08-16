from rest_framework.routers import DefaultRouter

from emotion_detector.detector.views import ImageDetectionPOSTViewset

ROUTER = DefaultRouter()
ROUTER.register(r'img-detection-post', ImageDetectionPOSTViewset, basename='thdd')

urlpatterns = [] + ROUTER.urls
