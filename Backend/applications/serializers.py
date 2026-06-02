from rest_framework import serializers

from .models import Application


class ApplicationSerializer(
    serializers.ModelSerializer
):

    applicant_name = serializers.CharField(
        source='applicant.username',
        read_only=True
    )

    job_title = serializers.CharField(
        source='job.title',
        read_only=True
    )

    class Meta:

        model = Application

        fields = "__all__"