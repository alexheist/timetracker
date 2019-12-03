import random
import string
import uuid
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver
from django.contrib.auth.models import AbstractUser
from django.conf import settings

class User(AbstractUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    is_manager = models.BooleanField(default=False)

class Team(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=127)
    invite_code = models.CharField(max_length=8, unique=True)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

@receiver(post_save, sender=Team)
def create_invite_code(sender, instance, created, **kwargs):
    if created:
        while True:
            code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=8))
            if not Team.objects.filter(invite_code=code)[0]:
                break
        instance.invite_code = code

class Project(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=127)
    client = models.CharField(max_length=127)
    description = models.TextField(blank=True, null=True)
    team = models.ForeignKey(Team, on_delete=models.CASCADE)

class Hours(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    from_time = models.DateTimeField()
    to_time = models.DateTimeField()
    task = models.CharField(max_length=127)
    notes = models.TextField(blank=True, null=True)
    billable = models.BooleanField(default=True)
    project = models.ForeignKey(Project, on_delete=models.CASCADE)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
