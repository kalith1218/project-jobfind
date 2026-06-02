from django.urls import path

from .views import (
    apply_job,
    my_applications
)

urlpatterns = [

    path(
        'apply/<int:job_id>/',
        apply_job
    ),

    path(
        'my/',
        my_applications
    ),
]