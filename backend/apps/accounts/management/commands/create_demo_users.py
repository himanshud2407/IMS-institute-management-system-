from django.core.management.base import BaseCommand
from django.contrib.auth import get_user_model

User = get_user_model()

DEMO_USERS = [
    {
        'username': 'admin@ims.com',
        'email': 'admin@ims.com',
        'password': 'admin123',
        'first_name': 'Admin',
        'last_name': 'User',
        'role': 'admin',
        'is_staff': True,
    },
    {
        'username': 'teacher@ims.com',
        'email': 'teacher@ims.com',
        'password': 'teacher123',
        'first_name': 'Teacher',
        'last_name': 'User',
        'role': 'teacher',
    },
    {
        'username': 'student@ims.com',
        'email': 'student@ims.com',
        'password': 'student123',
        'first_name': 'Student',
        'last_name': 'User',
        'role': 'student',
    },
]


class Command(BaseCommand):
    help = 'Create demo admin, teacher, and student users for testing'

    def handle(self, *args, **options):
        for user_data in DEMO_USERS:
            email = user_data['email']
            password = user_data.pop('password')
            is_staff = user_data.pop('is_staff', False)

            user, created = User.objects.get_or_create(
                email=email,
                defaults=user_data
            )

            if created:
                user.set_password(password)
                user.is_staff = is_staff
                user.save()
                self.stdout.write(self.style.SUCCESS(
                    f'  [OK] Created {user_data["role"]} -> {email} / {password}'
                ))
            else:
                self.stdout.write(self.style.WARNING(
                    f'  [SKIP] {user_data["role"]} already exists -> {email}'
                ))

        self.stdout.write('')
        self.stdout.write(self.style.SUCCESS('Demo users ready!'))
        self.stdout.write('')
        self.stdout.write('Login credentials:')
        self.stdout.write('  Admin   -> admin@ims.com   / admin123')
        self.stdout.write('  Teacher -> teacher@ims.com / teacher123')
        self.stdout.write('  Student -> student@ims.com / student123')
