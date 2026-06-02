from django.urls import path

from .views import (
    register_user,
    login_user,
    profile_view
)

urlpatterns = [

    path(
        'register/',
        register_user
    ),

    path(
        'login/',
        login_user
    ),

    path(
        'profile/',
        profile_view
    ),
]