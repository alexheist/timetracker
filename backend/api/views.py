from django.shortcuts import render
from rest_framework import authentication
from rest_framework import permissions as rest_permissions
from rest_framework import response, status, viewsets

from . import authentication as auth
from . import models, permissions, serializers


class UserViewSet(viewsets.ModelViewSet):
    authentication_classes = (authentication.SessionAuthentication,)
    permission_classes = [permissions.IsPostOrIsAuthenticated]
    queryset = models.User.objects.all()
    serializer_class = serializers.UserSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        headers = self.get_success_headers(serializer.data)
        token = auth.MyTokenObtainPairSerializer.get_token(user)
        data = {
            "refresh": str(token),
            "access": str(token.access_token),
            "user_id": str(token.payload["id"]),
            "user_name": str(token.payload["name"]),
            "user_email": str(token.payload["email"]),
        }
        return response.Response(data, status=status.HTTP_201_CREATED, headers=headers)


class TeamViewSet(viewsets.ModelViewSet):
    authentication_classes = (authentication.SessionAuthentication,)
    permission_classes = [rest_permissions.IsAuthenticated]
    queryset = models.Team.objects.all()
    serializer_class = serializers.TeamSerializer
