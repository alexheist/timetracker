from django.shortcuts import render
from rest_framework import authentication, permissions, response, viewsets

from . import models, serializers


class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = (authentication.SessionAuthentication,)
    permission_classes = [permissions.IsAuthenticated]
    queryset = models.User.objects.all().order_by("-id")
    serializer_class = serializers.UserSerializer
