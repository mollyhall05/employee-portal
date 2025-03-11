# Employee Portal Web Application

## Overview

This project is a **web-based Employee Portal** designed to manage employees, leave requests, work schedules, expenses, notifications, and messaging.

## Features

- **Employee Management:** View and update employee information.
- **Work Scheduling:** Track and manage work shifts.
- **Leave Requests:** Employees can submit annual leave requests, and managers can approve or deny them.
- **Expense Tracking:** Employees can submit expenses, and management can review/approve/deny them.
- **Notifications:** Managers can post notifications, which employees can view in their portal.
- **User Roles:** Different roles include **FDM Consultant, FDM Management Staff, System Admin, and Client and Business Partners**.

## Tech Stack

- **Frontend:** React (with Tailwind CSS)
- **Backend:** Node.js (Express.js)
- **Database:** PostgreSQL / MySQL
- **Authentication:** JWT-based authentication
- **Deployment:** Docker, AWS/GCP (optional)

## Setup & Installation
### 1. Clone the repository
```sh
git clone https://github.com/yourusername/employee-portal.git
cd employee-portal
```
### 2. Setup and start the backend (Node.js and Express)
```sh
cd backend
npm install
npm start
```
### 3. Setup and start the frontend (React)
```sh
cd ../frontend
npm install
npm run dev
```
The app should be available at http://localhost:5173
