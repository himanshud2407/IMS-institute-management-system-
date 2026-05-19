from django.contrib.auth import get_user_model
from django.contrib.auth.backends import ModelBackend
from django.db.models import Q

class EmailOrUsernameModelBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        
        login_identifier = username or kwargs.get('email')
        if not login_identifier:
            return None

        # Look up by username OR email (case-insensitive)
        user = UserModel.objects.filter(Q(username__iexact=login_identifier) | Q(email__iexact=login_identifier)).first()
        
        if user and user.check_password(password) and self.user_can_authenticate(user):
            return user
        return None
