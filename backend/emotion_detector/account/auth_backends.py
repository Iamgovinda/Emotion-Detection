import requests
from datetime import timedelta
from django.utils import timezone
from django.contrib.auth import get_user_model
from django.conf import settings

from .models import SocialUser

USER = get_user_model()


class SocialBaseBackend:
    AUTH_URL = None
    PROVIDER = None
    auth_errors = {}

    def auth(self, token):
        pass

    def get_user(self, uid, email):
        created = False
        social_account = SocialUser.objects.filter(provider=self.PROVIDER, uid=uid).first()
        if not social_account:
            user_instance = USER.objects.get_or_create(email=email)[0]  # get_or_create is required here
            social_account = SocialUser.objects.create(provider=self.PROVIDER, uid=uid, user=user_instance)
            created = True
        return social_account.user, created

    def get_user_instance(self, uid, email):
        return self.get_user(uid, email)[0]


class GoogleAuthBackend(SocialBaseBackend):
    PROVIDER = 'google'
    # refer : https://developers.google.com/identity/sign-in/android/backend-auth
    AUTH_URL = 'https://oauth2.googleapis.com/tokeninfo'

    def auth(self, data):
        if 'token' in data and data.get('token'):
            params = {'access_token': data.get('token')}
        elif 'id_token' in data and data.get('id_token'):
            params = {'id_token': data.get('id_token')}
        else:
            return None
        success, data = self.get_data(params)
        if success:
            uid = data['sub']
            email = data['email']
            return self.get_user_instance(uid, email)
        self.auth_errors = data
        return None

    def get_data(self, params):
        res = requests.get(url=self.AUTH_URL, params=params)
        res_dict = res.json()
        if 'error' in res_dict:  # can check status code too
            return False, res_dict
        return True, res_dict


class FacebookAuthBackend(SocialBaseBackend):
    PROVIDER = 'facebook'
    AUTH_URL = 'https://graph.facebook.com/me?fields=id,email&access_token={}'

    def auth(self, data):
        token = data.get('token')
        success, data = self.get_data(token)
        if success:
            uid = data['id']
            email = data.get('email')
            if not email:
                self.auth_errors = {'error': ['Valid Email is Required']}
                return None
            return self.get_user_instance(uid, email)
        self.auth_errors = data
        return None

    def get_data(self, token):
        url = self.AUTH_URL.format(token)
        res = requests.get(url=url)
        res_dict = res.json()
        if 'error' in res_dict:  # can check status code too
            return False, res_dict
        return True, res_dict
