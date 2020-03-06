from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token["id"] = str(user.id)
        token["name"] = str(user.first_name)
        token["email"] = str(user.email)
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        data.update({"user_id": self.user.id})
        data.update({"user_name": self.user.first_name})
        data.update({"user_email": self.user.email})
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer
