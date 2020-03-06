from rest_framework import serializers

from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ("id", "email", "password", "first_name", "last_name")

    def create(self, validated_data):
        user = models.User.objects.create_user(**validated_data)
        return user


class TeamSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Team
        fields = ("id", "name", "invite_code", "owner")
