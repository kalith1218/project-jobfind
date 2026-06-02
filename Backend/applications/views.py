from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.response import Response

from .models import Application

from jobs.models import Job

from .serializers import (
    ApplicationSerializer
)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def apply_job(request, job_id):

    try:

        job = Job.objects.get(id=job_id)

    except Job.DoesNotExist:

        return Response(
            {"message": "Job not found"},
            status=404
        )

    if Application.objects.filter(
        job=job,
        applicant=request.user
    ).exists():

        return Response(
            {"message": "Already applied"},
            status=400
        )

    application = Application.objects.create(
        job=job,
        applicant=request.user,
        cover_letter=request.data.get(
            "cover_letter",
            ""
        )
    )

    serializer = ApplicationSerializer(
        application
    )

    return Response(
        serializer.data,
        status=201
    )


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def my_applications(request):

    applications = Application.objects.filter(
        applicant=request.user
    )

    serializer = ApplicationSerializer(
        applications,
        many=True
    )

    return Response(serializer.data)