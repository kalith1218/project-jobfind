from rest_framework.decorators import (
    api_view,
    permission_classes
)

from rest_framework.permissions import (
    IsAuthenticated
)

from rest_framework.response import Response
from rest_framework import status

from .models import Job
from .serializers import JobSerializer


@api_view(['GET'])
def job_list(request):

    search = request.GET.get("search")

    if search:
        jobs = Job.objects.filter(
            title__icontains=search
        )
    else:
        jobs = Job.objects.all().order_by('-posted_on')

    serializer = JobSerializer(
        jobs,
        many=True
    )

    return Response(serializer.data)


@api_view(['GET'])
def job_detail(request, pk):

    try:
        job = Job.objects.get(id=pk)

    except Job.DoesNotExist:

        return Response(
            {"message": "Job not found"},
            status=404
        )

    serializer = JobSerializer(job)

    return Response(serializer.data)


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def create_job(request):

    if request.user.profile.role != "employer":

        return Response(
            {"message": "Only employers can create jobs"},
            status=403
        )

    serializer = JobSerializer(
        data=request.data
    )

    if serializer.is_valid():

        serializer.save(
            created_by=request.user
        )

        return Response(
            serializer.data,
            status=201
        )

    return Response(
        serializer.errors,
        status=400
    )


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def update_job(request, pk):

    try:
        job = Job.objects.get(id=pk)

    except Job.DoesNotExist:

        return Response(
            {"message": "Job not found"},
            status=404
        )

    if job.created_by != request.user:

        return Response(
            {"message": "Permission denied"},
            status=403
        )

    serializer = JobSerializer(
        job,
        data=request.data,
        partial=True
    )

    if serializer.is_valid():

        serializer.save()

        return Response(serializer.data)

    return Response(
        serializer.errors,
        status=400
    )


@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def delete_job(request, pk):

    try:
        job = Job.objects.get(id=pk)

    except Job.DoesNotExist:

        return Response(
            {"message": "Job not found"},
            status=404
        )

    if job.created_by != request.user:

        return Response(
            {"message": "Permission denied"},
            status=403
        )

    job.delete()

    return Response(
        {"message": "Job deleted successfully"}
    )