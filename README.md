# National-Service-Scheme

That Repository is Create For Develop national service scheme for my collage project  

# National Service Scheme (NSS) App

This is a **National Service Scheme (NSS) App**, developed using **Node.js**, **React Native (Expo)**, and **MySQL**. It helps manage NSS activities, volunteers, events, and reports efficiently.

## Features

### **Frontend (React Native - Expo)**
- Volunteer Registration & Login (JWT Authentication)
- Profile Management
- View & Register for NSS Events
- Attendance Marking for Events
- Notifications & Announcements
- Feedback & Report Submission

### **Backend (Node.js - Express)**
- User Authentication (JWT + Bcrypt)
- Manage Volunteers & Events
- Attendance & Participation Tracking
- Admin Dashboard APIs
- Generate Reports
- MySQL Database Integration

## **Project Setup & Installation**

### **Backend (Node.js - Express.js)**
- Must Follow The Below Step For Run Prject
1. **Clone the repository**
   ```sh
   git clone https://github.com/shailesh-04/National-Service-Scheme.git
   cd National-Service-Scheme
   ```
2. **Install dependencies**
3. - Backend
   ```sh
   cd SERVER
   npm install
   ```
4. **Configure the environment variables**
   - Create a `.env` file in the `server/` directory
   - connect local sql server
   ```
   mv dot.env .env
   ```
5. **Run the MySQL Database Migration**
   - create all nessary tables
   ```sh
   npm run migration
   ```
6. **Start the server**
   ```sh
   npm start
   ```
   The backend will be running on `http://localhost:3000`

0. **Command**
   ```sh
      git clone https://github.com/shailesh-04/National-Service-Scheme.git
      cd National-Service-Scheme
      cd SERVER
      npm install
      mv dot.env .env
      npm run migration
      npm start
   ```
---

### **Frontend (React Native - Expo)**

1. **Navigate to the frontend directory**
   ```sh
   cd ../APP
   ```
2. **Install dependencies**
   ```sh
   npm install
   mv dot.env .env
   ```
3. **Start the Expo development server**
   ```sh
   npm start
   ```
   This will launch the Metro Bundler, and you can scan the QR code with the Expo Go app.

## **Project Structure**

```
📂 nss-project
│── 📂 backend (Node.js + Express + MySQL)
│   │── 📂 config (Database configuration)
│   │── 📂 controllers (Route handlers)
│   │── 📂 models (Sequelize models)
│   │── 📂 routes (API endpoints)
│   │── 📂 middleware (JWT, Authentication, Error Handling)
│   │── index.js (Main server file)
│   │── package.json
│   └── .env
│
│── 📂 frontend (React Native - Expo)
│   │── 📂 src
│   │   │── 📂 components (Reusable UI components)
│   │   │── 📂 screens (All App Screens)
│   │   │── 📂 navigation (Stack & Tab Navigation)
│   │   │── 📂 services (API Calls to Backend)
│   │   │── App.js (Main App Entry Point)
│   │── package.json
│   └── app.json
│
└── README.md
```

## **API Endpoints**

### **Authentication**
- `POST /api/auth/register` - Register a new volunteer
- `POST /api/auth/login` - Login a volunteer

### **Events**
- `GET /api/events` - Get all events
- `POST /api/events` - Create a new event (Admin)
- `POST /api/events/register/:id` - Register for an event

### **Attendance**
- `POST /api/attendance/mark` - Mark attendance for an event

### **Reports**
- `GET /api/reports` - Fetch volunteer participation reports

## **Technologies Used**

- **Backend**: Node.js, Express.js, MySQL, Sequelize, JWT Authentication
- **Frontend**: React Native, Expo, Axios, React Navigation
- **Database**: MySQL

## **Contributors**
- Your Name (@shailesh-04m)
- Other Team Members

## **License**
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
