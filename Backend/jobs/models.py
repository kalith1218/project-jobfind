from django.db import models
from django.contrib.auth.models import User


class Job(models.Model):

    JOB_TYPES = (
        ('full-time', 'Full Time'),
        ('part-time', 'Part Time'),
        ('internship', 'Internship'),
        ('remote', 'Remote'),
    )

    title = models.CharField(
        max_length=200
    )

    description = models.TextField()

    company = models.CharField(
        max_length=100
    )

    location = models.CharField(
        max_length=100
    )

    salary_range = models.CharField(
        max_length=100,
        blank=True
    )

    skills_required = models.TextField(
        blank=True
    )

    job_type = models.CharField(
        max_length=20,
        choices=JOB_TYPES
    )

    created_by = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    posted_on = models.DateTimeField(
        auto_now_add=True
    )

    def __str__(self):
        return self.title