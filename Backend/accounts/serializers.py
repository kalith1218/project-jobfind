from rest_framework import serializers
from django.contrib.auth.models import User

from .models import Profile


class RegisterSerializer(serializers.ModelSerializer):

    role = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = [
            'username',
            'email',
            'password',
            'role'
        ]

        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    # def create(self, validated_data):

    #     role = validated_data.pop('role')

    #     user = User.objects.create_user(
    #         username=validated_data['username'],
    #         email=validated_data['email'],
    #         password=validated_data['password']
    #     )

    #     user.profile.role = role
    #     user.profile.save()

    #     return user

    def create(self, validated_data):

        role = validated_data.pop('role')

        user = User.objects.create_user(
           username=validated_data['username'],
           email=validated_data['email'],
           password=validated_data['password']
        )

        Profile.objects.create(
           user=user,
           role=role
        )

        return user


class ProfileSerializer(serializers.ModelSerializer):

    username = serializers.CharField(
        source='user.username',
        read_only=True
    )

    email = serializers.CharField(
        source='user.email',
        read_only=True
    )

    class Meta:
        model = Profile

        fields = [
            'id',
            'username',
            'email',
            'role',
            'phone',
            'resume',
            'profile_image'
        ]