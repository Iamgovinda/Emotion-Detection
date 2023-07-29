from django.contrib.auth.base_user import AbstractBaseUser
from django.contrib.auth.models import AbstractUser
from django.contrib.auth.validators import UnicodeUsernameValidator
from django.db import models
import uuid

# Create your models here.
from emotion_detector.commons.models import TimeStampModel, File

from emotion_detector.account.manager import UserManager


class User(TimeStampModel, AbstractUser):
    username_validator = UnicodeUsernameValidator()
    username = models.UUIDField(
        max_length=150,
        unique=True,
        validators=[username_validator],
        error_messages={
            'unique': "A user with that username already exists.",
        },
        default=uuid.uuid4
    )
    email = models.EmailField(max_length=45, unique=True, error_messages={
        'unique': "A user with that email already exists.",
    }, )
    first_name = models.CharField(max_length=45)
    middle_name = models.CharField(max_length=45, null=True, blank=True)
    last_name = models.CharField(max_length=45)
    profile_picture = models.ForeignKey(File, on_delete=models.CASCADE, related_name='profile_picture_file', null=True,
                                        blank=True)

    last_login = models.DateTimeField('last login', blank=True, null=True)
    is_active = models.BooleanField(default=False)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    ACCOUNT_REGISTRATION_FIELDS = ['email', 'first_name', 'last_name', 'password', 'contact_number']

    objects = UserManager()

    @property
    def display_name(self):
        return f"{self.first_name} {self.last_name}".title() if not self.middle_name \
            else f"{self.first_name} {self.middle_name} {self.last_name}".title()

    def __str__(self):
        return f"{self.email}"
