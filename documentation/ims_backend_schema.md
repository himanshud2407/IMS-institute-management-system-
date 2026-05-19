# Backend Schema Document

## Users Table
- id
- name
- email
- password
- role

## Students
- id
- user_id
- course_id

## Teachers
- id
- user_id

## Courses
- id
- name

## Subjects
- id
- course_id

## Attendance
- id
- student_id
- date
- status

## Exams
- id
- name

## Results
- id
- student_id
- marks

## Face Data
- id
- user_id
- embedding

