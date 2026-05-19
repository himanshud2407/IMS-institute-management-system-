# 📘 Product Requirements Document (PRD)

## 🏫 Institute Management System (IMS)

---

# 1. 🎯 Product Overview

## 1.1 Purpose

The **Institute Management System (IMS)** is a full-stack web platform designed to digitize and automate academic and administrative operations of an educational institute.

## 1.2 Goals

* Centralize institute operations (students, teachers, exams, fees)
* Automate attendance using **camera-based biometric (face recognition)**
* Provide role-based dashboards
* Enable real-time insights and reporting

## 1.3 Users

* Super Admin
* Teacher
* Student

---

# 2. 🧩 Core Modules

1. Authentication & RBAC
2. User Management
3. Student Management
4. Teacher Management
5. Attendance (Biometric)
6. Examination System
7. Fees Management
8. Timetable System
9. Reports & Analytics
10. Document Management

---

# 3. 👥 User Roles & Functional Requirements

---

## 🔐 3.1 Super Admin

### Capabilities

* Full system control

### Functional Requirements

#### User Management

* Create, update, delete users
* Assign roles
* Reset passwords

#### Academic Setup

* Create sessions (year/semester)
* Manage departments, courses, subjects

#### Student Management

* Approve admissions
* Assign students to batches

#### Teacher Management

* Assign subjects and classes
* Manage workload

#### Timetable

* Create and update schedules

#### Exams

* Create exams
* Define grading system
* Publish results

#### Attendance

* View all attendance records
* Generate reports

#### Fees

* Define fee structure
* Monitor payments

#### Reports

* Student performance
* Attendance analytics
* Financial reports

#### Audit Logs

* Track system activities

---

## 👨‍🏫 3.2 Teacher

### Functional Requirements

#### Profile

* View/update profile

#### Class Management

* View assigned classes and subjects

#### Attendance (Biometric)

* Mark attendance using camera
* Edit attendance (restricted)

#### Exams

* Enter and update marks

#### Student Insights

* View assigned students only

---

## 🎓 3.3 Student

### Functional Requirements

#### Profile

* View/update profile

#### Academic Info

* View enrolled courses
* View timetable

#### Attendance

* Auto-mark via face recognition
* View attendance records

#### Exams

* View results
* Download transcripts

#### Fees

* View fee status
* Pay fees (optional)

#### Documents

* Upload/download documents

---

# 4. 📷 Biometric Attendance System

## 4.1 Objective

Use camera-based facial recognition instead of hardware biometric devices.

## 4.2 Workflow

1. Register student face (store embeddings)
2. Capture live image via camera
3. Detect and recognize face
4. Match with database
5. Mark attendance with timestamp

## 4.3 APIs

* Register face
* Verify face
* Mark attendance
* Fetch attendance logs

## 4.4 Requirements

* Response time < 2 seconds
* Accuracy > 90%
* Secure storage (no raw images)

## 4.5 Security

* Liveness detection
* Encrypted biometric data
* Restricted API access

---

# 5. ⚙️ System Architecture

## 5.1 Architecture Style

* Modular Monolith (initial)
* Optional microservice for biometric processing

## 5.2 High-Level Flow

Frontend → API → Services → Database

---

# 6. 🧱 Backend Design

## 6.1 Modules

* Auth Module
* User Module
* Student Module
* Teacher Module
* Attendance Module
* Exam Module
* Fees Module
* Report Module

---

## 6.2 RBAC Model

### Roles

* super_admin
* teacher
* student

### Permissions (examples)

* attendance.mark
* exam.write
* user.manage

---

## 6.3 API Endpoints (Sample)

### Auth

* POST /auth/login
* POST /auth/register

### Users

* GET /users
* POST /users
* PATCH /users/:id

### Attendance

* POST /attendance/mark
* GET /attendance/report

### Exams

* POST /exam/marks
* GET /exam/results

---

# 7. 🗄️ Database Design

## Users

* id
* name
* email
* role

## Students

* user_id
* course_id
* batch

## Teachers

* user_id
* department

## Attendance

* id
* student_id
* timestamp
* status

## Exams

* id
* subject
* date

## Marks

* student_id
* exam_id
* marks

## Fees

* student_id
* amount
* status

## Face Data

* user_id
* embedding

---

# 8. 🎨 Frontend Requirements

## Dashboards

### Admin

* System stats
* Reports & analytics

### Teacher

* Class overview
* Attendance tools

### Student

* Attendance percentage
* Results
* Fees status

---

## Key Screens

* Login/Register
* Dashboard
* Attendance (Camera UI)
* Timetable
* Results
* Fees

---

# 9. 🔐 Security Requirements

* JWT authentication
* Role-based authorization
* HTTPS
* Password hashing (bcrypt/argon2)
* Rate limiting
* Secure file uploads

---

# 10. ⚡ Non-Functional Requirements

| Category     | Requirement     |
| ------------ | --------------- |
| Performance  | API < 300ms     |
| Scalability  | 10,000+ users   |
| Availability | 99% uptime      |
| Security     | OWASP standards |

---

# 11. 🔌 Integrations

* Payment: Razorpay / Stripe
* Storage: Supabase
* Camera: WebRTC
* Face Recognition: OpenCV / DeepFace

---

# 12. 🚀 Development Roadmap

## Phase 1 (MVP)

* Authentication & RBAC
* User Management

## Phase 2

* Attendance (basic)
* Exams

## Phase 3

* Biometric Attendance
* Fees

## Phase 4

* Reports & Analytics

---

# 13. 🧪 Testing Strategy

* Unit Testing (PyTest)
* API Testing (Postman)
* Load Testing
* Face Recognition Accuracy Testing

---

# 14. 📊 Success Metrics

* Attendance accuracy
* System uptime
* API response time
* User engagement

---

# 15. 🔮 Future Enhancements

* Mobile App (Flutter)
* AI-based analytics
* Multi-institute support
* Real-time notifications

---

# ⚠️ Notes

* Start with **Django + DRF** for faster development
* Use **FastAPI** for biometric microservice if needed
* Keep architecture modular (avoid early microservices)
* Use Supabase for DB + storage only

---
