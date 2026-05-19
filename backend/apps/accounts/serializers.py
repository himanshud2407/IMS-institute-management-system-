from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework import serializers

class CustomTokenObtainPairSerializer(TokenObtainPairSerializer):
    email = serializers.CharField(required=False)

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.fields[self.username_field].required = False

    def validate(self, attrs):
        # Support both 'username' and 'email' fields in payload
        identifier = attrs.get('email') or attrs.get('username')
        
        if not identifier:
            raise serializers.ValidationError({"detail": "Email or username is required."})

        # Map to username field for the default authenticate mechanism
        attrs[self.username_field] = identifier
        
        return super().validate(attrs)
