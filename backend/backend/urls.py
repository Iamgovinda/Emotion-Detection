"""
URL configuration for backend project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import RedirectView
from rest_framework_swagger.views import get_swagger_view
from django.conf import settings

from emotion_detector.commons.api.v1.swagger import SwaggerSchemaView

schema_view = get_swagger_view(title='Pastebin API')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api-auth/', include('rest_framework.urls',
                              namespace='rest_framework')),
    path('api/v1/', include('emotion_detector.api.v1.urls')),

]

if settings.DEBUG:
    urlpatterns += [
        path('api/v1/', SwaggerSchemaView.as_view()),
        path('', RedirectView.as_view(url='/api/root/', permanent=True))

    ]

