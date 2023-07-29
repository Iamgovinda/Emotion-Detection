from rest_framework import serializers


class CustomLoginSerializer(serializers.Serializer):
    google = 'google',
    facebook = 'facebook'
    PROVIDER_CHOICES = (
        (google, 'google'),
        (facebook, 'facebook'),
    )
    provider = serializers.ChoiceField(PROVIDER_CHOICES)
    token = serializers.CharField(max_length=500, required=False)
    id_token = serializers.CharField(max_length=500, required=False)

    def validate(self, attrs):
        provider = attrs.get('provider')
        token = attrs.get('token')
        id_token = attrs.get('id_token')
        if token and id_token:
            raise serializers.ValidationError({
                "Please use either token or id_token."
            })
        if provider == 'google':
            if not id_token:
                raise serializers.ValidationError({
                    'error': 'id_token is required for google social login!'
                })
        if provider == 'facebook':
            if not token:
                raise serializers.ValidationError({
                    'error': 'token is required for facebook social login'
                })
        return attrs
