import warnings

from django.utils.functional import cached_property
from django.conf import settings
from rest_framework import serializers
from rest_framework.serializers import ModelSerializer

from emotion_detector.commons.models import File
from emotion_detector.commons.utils import get_file_type


class DynamicFieldsModelSerializer(ModelSerializer):
    # see: https://www.django-rest-framework.org/api-guide/serializers/#dynamically-modifying-fields
    # modified to support exclude_fields , and request as attribute
    def __init__(self, instance=None, *args, **kwargs):
        # Don't pass the 'fields' arg up to the superclass
        fields = kwargs.pop('fields', None)
        exclude_fields = kwargs.pop('exclude_fields', None)

        # Instantiate the superclass normally
        super(DynamicFieldsModelSerializer, self).__init__(
            instance, *args, **kwargs
        )

        if fields is not None:
            # Drop any fields that are not specified in the `fields` argument.
            allowed = set(fields)
            existing = set(self.fields.keys())
            for field_name in existing - allowed:
                self.fields.pop(field_name)
        if exclude_fields is not None:

            warnings.showwarning(
                "exclude_fields will be deprecated on next Prod release, use fields instead",
                PendingDeprecationWarning,
                "commons/serializers.py", "29",
            )

            exclude_fields = set(exclude_fields)
            for field_name in exclude_fields:
                self.fields.pop(field_name)

    @cached_property
    def request(self):
        return self.context.get("request")

    def get_fields(self):
        fields = super().get_fields()
        #
        # in future , maybe use UserSerializer here
        # check if created_by and updated_by is instance of PrimaryKeyRelatedField because,
        # if someone overrides created_by and updated_by datatypes other than PrimaryKeyRelatedField
        # we shouldn't touch it
        return fields

    class Meta:
        model = type("IgnoreThisClassThisIsJustForCodeChecker", (),
                     {}
                     )  # to make sure , code checker doesnt give warnings


# pylint: disable=W0223 # Method 'create' is abstract in class 'BaseSerializer' but is not overridden
# pylint: disable=W0223 # Method 'update' is abstract in class 'BaseSerializer' but is not overridden
class DummySerializer(serializers.Serializer):
    # dummy serializer for using when serializer class is needed in viewset but actual serializer is not used
    # for maintaining swagger doc
    pass


class FileSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = File
        fields = 'uuid', 'created_at', 'updated_at', 'name', 'file', 'file_type'
        read_only_fields = ('uuid', 'created_at', 'updated_at', 'name')

    def create(self, validated_data):
        validated_data['name'] = validated_data['file'].name
        validated_data['file_type'] = get_file_type(validated_data['name'])
        return super().create(validated_data)

    @staticmethod
    def validate_file(file):
        ext = file.name.split('.')[-1]
        if ext.lower() not in settings.ALLOWED_FILE_FORMATS + settings.ALLOWED_IMAGE_FORMATS:
            raise serializers.ValidationError("Invalid file format")
        return file
