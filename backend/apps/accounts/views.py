from django.shortcuts import render
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import get_user_model

User = get_user_model()

class LoginView(TokenObtainPairView):
    pass

class SignUpView(APIView):
    def post(self, request):
        first_name = request.data.get('first_name', '')
        last_name = request.data.get('last_name', '')
        email = request.data.get('email', '')
        password = request.data.get('password', '')

        if not email or not password:
            return Response(
                {"detail": "Email and password are required."},
                status=status.HTTP_400_BAD_REQUEST
            )

        if User.objects.filter(email__iexact=email).exists():
            return Response(
                {"detail": "An account with this email already exists."},
                status=status.HTTP_400_BAD_REQUEST
            )

        try:
            # We set the username as the email address to guarantee uniqueness and enable clean email login
            user = User.objects.create_user(
                username=email,
                email=email,
                password=password,
                first_name=first_name,
                last_name=last_name,
                role='student'  # default role
            )
            return Response(
                {"message": "User registered successfully!"},
                status=status.HTTP_201_CREATED
            )
        except Exception as e:
            return Response(
                {"detail": str(e)},
                status=status.HTTP_400_BAD_REQUEST
            )

class GoogleAuthView(APIView):
    def post(self, request):
        token = request.data.get('token')
        if not token:
            return Response({"detail": "Google authentication token is required."}, status=status.HTTP_400_BAD_REQUEST)

        try:
            from google.oauth2 import id_token
            from google.auth.transport import requests as google_requests
            from rest_framework_simplejwt.tokens import RefreshToken

            # Verify the token payload from Google
            # Note: We pass None for audience if we want to allow testing any Client ID,
            # or you can restrict it to your client ID later.
            idinfo = id_token.verify_oauth2_token(token, google_requests.Request(), clock_skew_in_seconds=10)

            email = idinfo.get('email')
            first_name = idinfo.get('given_name', '')
            last_name = idinfo.get('family_name', '')

            if not email:
                return Response({"detail": "Invalid token payload: Email missing."}, status=status.HTTP_400_BAD_REQUEST)

            # Retrieve or create a user mapped to this email
            user, created = User.objects.get_or_create(
                email=email,
                defaults={
                    'username': email,
                    'first_name': first_name,
                    'last_name': last_name,
                    'role': 'student'
                }
            )

            # Generate standard app JWT credentials
            refresh = RefreshToken.for_user(user)
            return Response({
                'refresh': str(refresh),
                'access': str(refresh.access_token),
                'email': user.email,
                'first_name': user.first_name,
                'created': created
            }, status=status.HTTP_200_OK)

        except ValueError as e:
            return Response({"detail": f"Google verification failed: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)
        except Exception as e:
            return Response({"detail": f"Server authentication error: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)