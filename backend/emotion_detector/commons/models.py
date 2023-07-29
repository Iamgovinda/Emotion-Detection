from django.db import models
import uuid


# Create your models here.

class TimeStampModel(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        ordering = '-updated_at',
        abstract = True


class UUIDBaseModel(TimeStampModel):
    uuid = models.UUIDField(default=uuid.uuid4, editable=False, unique=True)

    class Meta(TimeStampModel.Meta):
        abstract = True


class File(UUIDBaseModel):
    file = models.FileField(upload_to='files')
    name = models.CharField(max_length=100)
    file_type = models.CharField(max_length=50, blank=True, null=True)

    def __str__(self):
        return self.name


