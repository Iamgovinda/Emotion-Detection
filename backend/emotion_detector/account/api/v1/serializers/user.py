from emotion_detector.account.models import User
from emotion_detector.commons.serializers import DynamicFieldsModelSerializer


class UserSerializer(DynamicFieldsModelSerializer):
    class Meta:
        model = User
        fields = "first_name", "last_name", "email", "profile_picture"