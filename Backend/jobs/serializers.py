from rest_framework import serializers

from .models import Job


class JobSerializer(serializers.ModelSerializer):

    employer = serializers.CharField(
        source="created_by.username",
        read_only=True
    )

    class Meta:
        model = Job

        fields = "__all__"

        read_only_fields = [
            "created_by",
            "posted_on"
        ]