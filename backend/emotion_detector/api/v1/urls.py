from django.urls import path, include

urlpatterns = [
    path('account/', include('emotion_detector.account.api.v1.urls')),
    path('commons/', include('emotion_detector.commons.api.v1.urls')),
]