from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include
from rest_framework import routers

from api import views

router = routers.DefaultRouter()

urlpatterns = [
    path('api/', include(router.urls)),
    path('api/auth/', include('rest_framework.urls', namespace='rest_framework')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
