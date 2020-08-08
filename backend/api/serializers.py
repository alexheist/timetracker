from rest_framework import serializers

from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ("id", "email", "password", "first_name", "last_name")

    def create(self, validated_data):
        user = models.User.objects.create_user(**validated_data)
        return user


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.Project
        fields = ("id", "client", "name", "description")


class TeamSerializer(serializers.ModelSerializer):
    members = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    projects = ProjectSerializer(many=True, source="project_set")

    class Meta:
        model = models.Team
        fields = (
            "id",
            "name",
            "invite_code",
            "owner",
            "members",
            "projects",
            "pay_period_string",
        )
