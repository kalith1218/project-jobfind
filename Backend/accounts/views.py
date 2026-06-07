from rest_framework.decorators import api_view
from rest_framework.permissions import IsAuthenticated
from rest_framework.decorators import permission_classes

from rest_framework.response import Response
from rest_framework import status

from rest_framework_simplejwt.tokens import RefreshToken

from django.contrib.auth.models import User
from django.contrib.auth import authenticate

from .serializers import (
    RegisterSerializer,
    ProfileSerializer
)


@api_view(['POST'])
def register_user(request):
    try:
        serializer = RegisterSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()

            return Response(
                {"message": "User Registered Successfully"},
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    except Exception as e:
        print("REGISTER ERROR:", repr(e))
        raise


@api_view(['POST'])
def login_user(request):

    username = request.data.get("username")
    password = request.data.get("password")

    user = authenticate(
        username=username,
        password=password
    )

    if user:

        refresh = RefreshToken.for_user(user)

        return Response({

            "access": str(refresh.access_token),
            "refresh": str(refresh),

            "user": {
                "id": user.id,
                "username": user.username,
                "role": user.profile.role
            }
        })

    return Response(
        {"message": "Invalid Credentials"},
        status=400
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile_view(request):

    serializer = ProfileSerializer(
        request.user.profile
    )

    return Response(serializer.data)