import requests
from django.contrib.auth import get_user_model

from .models import SocialUser
from ..commons.models import File

USER = get_user_model()


class SocialBaseBackend:
    AUTH_URL = None
    PROVIDER = None
    auth_errors = {}

    def auth(self, token):
        pass

    def get_user(self, uid, email, data=None):
        created = False
        social_account = SocialUser.objects.filter(provider=self.PROVIDER, uid=uid).first()
        if not social_account:
            user_instance, has_created = USER.objects.get_or_create(email=email)  # get_or_create is required here
            if has_created:
                # code to download and save profile picture
                if data.get('picture'):
                    try:
                        res = requests.get(data.get('picture'))
                        if res.status_code in [200, 201]:
                            file_content = res.content
                            file_instance = File.objects.create(file=file_content,
                                                                name=f"{data.get('given_name')}'s Profile picture",
                                                                file_type="img")
                            user_instance.profile_picture = file_instance
                            user_instance.save()
                    except Exception as e:
                        pass
            if data:
                user_instance.first_name = data.get('given_name')
                user_instance.last_name = data.get('family_name')
            user_instance.is_active = True
            user_instance.save()
            social_account = SocialUser.objects.create(provider=self.PROVIDER, uid=uid, user=user_instance)
            created = True
        return social_account.user, created

    def get_user_instance(self, uid, email, data=None):
        return self.get_user(uid, email, data=data)[0]


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
            return self.get_user_instance(uid, email, data=data)
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
