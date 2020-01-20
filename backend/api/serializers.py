from rest_framework import serializers

from . import models


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = models.User
        fields = ("id", "email", "password", "first_name", "last_name", "is_manager")

    def create(self, validated_data):
        print(validated_data)
        if validated_data["email"] is None:
            raise TypeError("Users must have an email address.")
        user = models.User.objects.create_user(**validated_data)
        print(user)
        # user.email = models.UserMana.normalize_email(email)
        # user.set_password(password)
        # user.save()
        return user
