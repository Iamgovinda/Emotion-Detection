from django.urls import path

from emotion_detector.commons.views import FileView

urlpatterns = [
    path('file/', FileView.as_view(), name='file'),
]