from django.urls import path

from .views import (
    job_list,
    job_detail,
    create_job,
    update_job,
    delete_job
)

urlpatterns = [

    path(
        '',
        job_list
    ),

    path(
        '<int:pk>/',
        job_detail
    ),

    path(
        'create/',
        create_job
    ),

    path(
        'update/<int:pk>/',
        update_job
    ),

    path(
        'delete/<int:pk>/',
        delete_job
    ),
]