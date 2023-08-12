from django.contrib.auth import get_user_model
from rest_framework import serializers

from emotion_detector.commons.serializers import DynamicFieldsModelSerializer
from django.contrib.auth.password_validation import validate_password as dj_validate_password
USER = get_user_model()


class UserAccountRegistrationSerializer(DynamicFieldsModelSerializer):
    repeat_password = serializers.CharField(max_length=128, write_only=True,
                                            style={'input_type': 'password'})

    class Meta:
        model = USER
        fields = ['email', 'first_name', 'last_name', 'password'] + ['repeat_password']
        extra_kwargs = {
            'password': {
                'write_only': True
            }
        }

    @staticmethod
    def validate_password(password):
        dj_validate_password(password)
        return password

    def validate(self, attrs):
        if attrs['password'] != attrs['repeat_password']:
            raise serializers.ValidationError({'repeat_password': 'Does not match with password'})
        return attrs

    def create(self, validated_data):
        _ = validated_data.pop('repeat_password')
        password = validated_data.pop('password')
        instance = super().create(validated_data)

        instance.set_password(password)
        instance.save()
        return instance
