from rest_framework import serializers

from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ("id", "email", "password", "first_name", "last_name", "is_manager")

    def create(self, validated_data):
        user = models.User.objects.create_user(**validated_data)
        return user
