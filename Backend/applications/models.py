from django.db import models
from django.contrib.auth.models import User

from jobs.models import Job


class Application(models.Model):

    STATUS_CHOICES = (

        ('pending', 'Pending'),

        ('shortlisted', 'Shortlisted'),

        ('interview', 'Interview'),

        ('rejected', 'Rejected'),

        ('hired', 'Hired'),

    )

    job = models.ForeignKey(
        Job,
        on_delete=models.CASCADE
    )

    applicant = models.ForeignKey(
        User,
        on_delete=models.CASCADE
    )

    cover_letter = models.TextField(
        blank=True
    )

    status = models.CharField(
        max_length=20,
        choices=STATUS_CHOICES,
        default='pending'
    )

    applied_on = models.DateTimeField(
        auto_now_add=True
    )

    class Meta:

        unique_together = (
            'job',
            'applicant'
        )

    def __str__(self):
        return f"{self.applicant.username} -> {self.job.title}"