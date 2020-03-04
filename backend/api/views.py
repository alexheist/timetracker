from django.shortcuts import render
from rest_framework import authentication, response, viewsets, status
from rest_framework_simplejwt.tokens import RefreshToken

from . import models, permissions, serializers


class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = (authentication.SessionAuthentication,)
    permission_classes = [permissions.IsPostOrIsAuthenticated]
    queryset = models.User.objects.all().order_by("-id")
    serializer_class = serializers.UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        token = RefreshToken.for_user(user)
        data = {
            "refresh": str(token),
            "access": str(token.access_token),
        }
        return response.Response(data, status=status.HTTP_201_CREATED, headers=headers)
