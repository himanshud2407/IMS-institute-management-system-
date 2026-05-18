from django.urls import path
from .views import LoginView, SignUpView, GoogleAuthView

urlpatterns = [
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignUpView.as_view(), name='signup'),
    path('google/', GoogleAuthView.as_view(), name='google'),
]