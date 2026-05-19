# Technical Requirement Document (TRD)

## 1. System Overview
The Institute Management System (IMS) is a full-stack web application designed to manage academic operations such as student lifecycle, attendance (biometric), exams, and administration.

## 2. Tech Stack
- Frontend: Next.js, Tailwind CSS
- Backend: Python (Django + Django REST Framework)
- Database: Supabase (PostgreSQL)
- Authentication: JWT

## 3. Core Modules
- User Management (Admin, Teacher, Student)
- Attendance (Camera-based biometric)
- Exams & Results
- Course & Subject Management

## 4. Functional Requirements
### Super Admin
- Full CRUD on users
- Manage courses, subjects
- View analytics

### Teacher
- Mark attendance
- Enter marks

### Student
- View attendance
- View results

## 5. Non-Functional Requirements
- Security (JWT, RBAC)
- Scalability
- Performance optimization
- Data privacy
