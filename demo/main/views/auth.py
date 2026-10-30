from django.contrib.auth.models import User
from rest_framework import generics, serializers, status
from rest_framework.authtoken.models import Token
from rest_framework.authtoken.serializers import AuthTokenSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.validators import UniqueValidator
from rest_framework.views import APIView

from main.serializers import UserSerializer


class SignUpSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])
    username = serializers.CharField(validators=[UniqueValidator(queryset=User.objects.all())])
    password = serializers.CharField(min_length=8, write_only=True)
    name = serializers.CharField(source="first_name", required=False, allow_blank=True)
    surname = serializers.CharField(source="last_name", required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ("id", "username", "email", "password", "name", "surname")

    def create(self, validated_data):
        return User.objects.create_user(**validated_data)


class UserCreate(APIView):
    permission_classes = (AllowAny,)

    def post(self, request):
        serializer = SignUpSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response(serializer.data, status=status.HTTP_201_CREATED)


class UserList(generics.ListAPIView):
    queryset = User.objects.all().order_by("id")
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)


@api_view(["POST"])
@permission_classes([AllowAny])
def login(request):
    serializer = AuthTokenSerializer(data=request.data, context={"request": request})
    serializer.is_valid(raise_exception=True)
    user = serializer.validated_data["user"]
    token, _ = Token.objects.get_or_create(user=user)
    return Response({"token": token.key, "username": user.username})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
def logout(request):
    if request.auth is not None:
        request.auth.delete()
    return Response(status=status.HTTP_200_OK)
