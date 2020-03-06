import random
import string
import uuid

from django.conf import settings
from django.contrib.auth.base_user import AbstractBaseUser, BaseUserManager
from django.db import models
from django.db.models.signals import post_save
from django.dispatch import receiver


class UserManager(BaseUserManager):
    def create_user(
        self, email, password=None, first_name=None, last_name=None, is_manager=False
    ):
        if email is None:
            raise TypeError("Users must have an email address.")
        if password is None:
            raise TypeError("Users must have a password.")
        user = self.model(
            email=self.normalize_email(email),
            first_name=first_name,
            last_name=last_name,
        )
        user.set_password(password)
        user.save()
        return user

    def create_superuser(
        self, email, password=None, first_name=None, last_name=None, is_manager=False
    ):
        if password is None:
            raise TypeError("Superusers must have a password.")
        user = self.create_user(email, password, first_name, last_name, is_manager)
        user.is_superuser = True
        user.is_staff = True
        user.save()
        return user


class User(AbstractBaseUser):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.EmailField(unique=True)
    first_name = models.CharField(max_length=63)
    last_name = models.CharField(max_length=63)

    objects = UserManager()

    USERNAME_FIELD = "email"
    REQUIRED_FIELDS = ["first_name", "last_name"]

    @property
    def full_name(self):
        return f"{self.first_name} {self.last_name}"


class Team(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=127)
    invite_code = models.CharField(max_length=8, unique=True, editable=False)
    owner = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)

    def save(self, *args, **kwargs):
        if self.invite_code in [None, ""]:
            self.invite_code = "".join(
                random.choices(string.ascii_lowercase + string.digits, k=8)
            )
            while self.invite_code in __class__.objects.values("invite_code"):
                self.invite_code = "".join(
                    random.choices(string.ascii_lowercase + string.digits, k=8)
                )
        return super().save(*args, **kwargs)


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
