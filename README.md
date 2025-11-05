# 🚀 Online Job Application Portal

A modern, full-stack job portal application built with React, Node.js, Express, and MySQL. Features a stunning "Liquid Glass" UI design with blue gradient accents, providing an elegant user experience for job seekers, employers, and administrators.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.2.0-61dafb)
![Node](https://img.shields.io/badge/Node.js-Express-green)
![MySQL](https://img.shields.io/badge/Database-MySQL-orange)

---

## 📋 Table of Contents

- [Features](#-features)
- [Tech Stack](#-tech-stack)
- [Project Structure](#-project-structure)
- [Prerequisites](#-prerequisites)
- [Installation & Setup](#-installation--setup)
- [Running the Application](#-running-the-application)
- [User Roles](#-user-roles)
- [API Endpoints](#-api-endpoints)
- [Database Schema](#-database-schema)
- [Screenshots](#-screenshots)
- [Team](#-team)
- [License](#-license)

---

## ✨ Features

### For Candidates (Job Seekers)
- 🔍 **Browse & Search Jobs** - Filter jobs by title, location, and company
- 📝 **Easy Application** - Apply for jobs with resume and cover letter
- 📊 **Application Tracking** - Track status of all submitted applications
- 💾 **Save Jobs** - Bookmark interesting positions for later
- 👤 **Profile Management** - Maintain candidate profile and contact information

### For Employers
- ➕ **Post Jobs** - Create detailed job listings with requirements
- 📋 **Manage Listings** - Edit or delete job postings
- 👥 **Review Applications** - View and manage candidate applications
- 📈 **Dashboard Analytics** - Track job performance and applicant metrics
- ✅ **Application Status** - Update application status (Pending, Reviewed, Accepted, Rejected)

### For Administrators
- 📊 **System Overview** - Monitor platform statistics
- 🔧 **Manage Jobs** - Oversee all job postings across the platform
- 📑 **Manage Applications** - View and manage all applications
- 👥 **User Management** - Monitor total registered users
- 🗑️ **Content Moderation** - Remove inappropriate job listings

### General Features
- 🎨 **Modern UI** - Liquid Glass design with glassmorphism effects
- 📱 **Responsive Design** - Works seamlessly on desktop, tablet, and mobile
- 🔐 **Secure Authentication** - JWT-based authentication and authorization
- ✅ **Form Validation** - Comprehensive client-side validation
- 🔄 **Live Reload** - Development mode with hot reloading
- 🌐 **RESTful API** - Well-structured backend API

---

## 🛠 Tech Stack

### Frontend
- **React 18.2.0** - JavaScript library for building user interfaces
- **React Router DOM 6.11.0** - Declarative routing for React
- **Bootstrap 5.3.0** - CSS framework for responsive design
- **Axios 1.4.0** - Promise-based HTTP client
- **React Scripts 5.0.1** - Create React App build configuration

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Fast, unopinionated web framework
- **Sequelize ORM** - Promise-based Node.js ORM for MySQL
- **MySQL** - Relational database management system
- **bcrypt** - Password hashing library
- **dotenv** - Environment variable management
- **CORS** - Cross-Origin Resource Sharing middleware
- **Nodemon** - Auto-restart development server

### Development Tools
- **Nodemon** - Automatic server restart on file changes
- **ESLint** - JavaScript linting utility
- **Git** - Version control

---

## 📁 Project Structure

```
Online_Job_Application_Portal/
│
├── backend/
│   ├── config/
│   │   └── db.js                 # Database configuration
│   ├── models/
│   │   ├── User.js               # User model
│   │   ├── Job.js                # Job model
│   │   ├── Application.js        # Application model
│   │   └── SavedJob.js           # Saved jobs model
│   ├── routes/
│   │   ├── auth.js               # Authentication routes
│   │   ├── jobs.js               # Job-related routes
│   │   ├── applications.js       # Application routes
│   │   └── savedJobs.js          # Saved jobs routes
│   ├── .env                      # Environment variables
│   ├── server.js                 # Express server setup
│   ├── seed.js                   # Database seeding script
│   └── package.json              # Backend dependencies
│
├── frontend/
│   ├── public/
│   │   └── index.html            # HTML template
│   ├── src/
│   │   ├── components/
│   │   │   ├── Navbar.js         # Navigation bar
│   │   │   └── Footer.js         # Footer component
│   │   ├── contexts/
│   │   │   └── AuthContext.js    # Authentication context
│   │   ├── pages/
│   │   │   ├── Home.js           # Landing page
│   │   │   ├── Login.js          # Login page
│   │   │   ├── Register.js       # Registration page
│   │   │   ├── Jobs.js           # Job listings page
│   │   │   ├── JobDetail.js      # Job details page
│   │   │   ├── PostJob.js        # Post job form (Employer)
│   │   │   ├── ManageJobs.js     # Manage jobs (Employer)
│   │   │   ├── ApplicationForm.js # Application form
│   │   │   ├── ApplicantDashboard.js # Candidate dashboard
│   │   │   ├── EmployerDashboard.js # Employer dashboard
│   │   │   ├── AdminDashboard.js  # Admin dashboard
│   │   │   ├── About.js          # About page
│   │   │   └── Contact.js        # Contact page
│   │   ├── App.js                # Main app component
│   │   ├── index.js              # Entry point
│   │   └── styles.css            # Custom styles
│   └── package.json              # Frontend dependencies
│
└── README.md                     # This file
```

---

## 📦 Prerequisites

Before you begin, ensure you have the following installed:

- **Node.js** (v14 or higher) - [Download](https://nodejs.org/)
- **MySQL** (v8.0 or higher) - [Download](https://www.mysql.com/downloads/)
- **npm** (comes with Node.js) or **yarn**
- **Git** - [Download](https://git-scm.com/)

---

## 🚀 Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/yourusername/online-job-portal.git
cd online-job-portal
```

### 2. Backend Setup

#### a. Navigate to backend directory
```bash
cd backend
```

#### b. Install dependencies
```bash
npm install express@4.18.2 sequelize@6.31.0 mysql2@3.3.0 bcrypt@5.1.0 dotenv@16.0.3 cors@2.8.5 nodemon@2.0.22
```

#### c. Configure Environment Variables
Create a `.env` file in the backend directory:

```env
DB_NAME=Online_Job_Application_Portal
DB_USER=root
DB_PASS=your_mysql_password
DB_HOST=localhost
PORT=5000
JWT_SECRET=your_jwt_secret_key_here
```

#### d. Create MySQL Database
```sql
CREATE DATABASE Online_Job_Application_Portal;
```

#### e. Seed the Database (Optional)
```bash
npm run seed
```
This will create sample data including:
- 3 demo employers
- 5 demo candidates
- 10 sample jobs
- Sample applications

**Demo Accounts Created:**
- **Employer:** employer1@company.com / password123
- **Candidate:** candidate1@email.com / password123
- **Admin:** (You'll need to create manually)

### 3. Frontend Setup

#### a. Navigate to frontend directory
```bash
cd ../frontend
```

#### b. Install dependencies
```bash
npm install react@18.2.0 react-dom@18.2.0 react-scripts@5.0.1 react-router-dom@6.11.0 axios@1.4.0 bootstrap@5.3.0
```

---

## 🏃 Running the Application

### Method 1: Run Both Servers Separately (Recommended)

#### Terminal 1 - Backend Server
```bash
cd backend
npm run dev
```
✅ Backend will run on: **http://localhost:5000**

#### Terminal 2 - Frontend Server
```bash
cd frontend
npm start
```
✅ Frontend will run on: **http://localhost:3000**

### Method 2: Production Build

#### Build Frontend
```bash
cd frontend
npm run build
```

#### Serve Static Files (Optional)
You can configure Express to serve the built React app.

---

## 👥 User Roles

### 1. Candidate (Job Seeker)
- Browse and search jobs
- Apply for positions
- Track application status
- Save jobs for later
- Manage profile

**Registration:**
- Select "Candidate" role during registration
- Provide name, email, phone, and password

### 2. Employer (Company)
- Post job listings
- Manage job postings
- Review applications
- Update application status
- View analytics

**Registration:**
- Select "Employer" role during registration
- Provide company name and contact details

### 3. Administrator
- Full system access
- Monitor platform statistics
- Manage all jobs and applications
- User management capabilities

**Creating Admin Account:**

**Method 1: Update Seed File**
```javascript
// In backend/seed.js, add:
{
  name: 'Admin User',
  email: 'admin@jobportal.com',
  password: await bcrypt.hash('admin123', 10),
  role: 'admin',
  phone: '+91 98765 00000'
}
```

**Method 2: Direct Database Update**
```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'your-email@example.com';
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/register      - Register new user
POST   /api/auth/login         - Login user
```

### Jobs
```
GET    /api/jobs               - Get all jobs
GET    /api/jobs/:id           - Get specific job
POST   /api/jobs               - Create job (Employer only)
PUT    /api/jobs/:id           - Update job (Employer only)
DELETE /api/jobs/:id           - Delete job (Owner/Admin only)
GET    /api/jobs/employer/:id  - Get jobs by employer
```

### Applications
```
GET    /api/applications              - Get all applications (Admin)
GET    /api/applications/job/:jobId   - Get applications for job
GET    /api/applications/user/:userId - Get user's applications
POST   /api/applications              - Submit application
PUT    /api/applications/:id          - Update application status
DELETE /api/applications/:id          - Delete application
```

### Saved Jobs
```
GET    /api/saved-jobs/user/:userId   - Get saved jobs
POST   /api/saved-jobs                - Save a job
DELETE /api/saved-jobs/:id            - Remove saved job
```

---

## 🗄 Database Schema

### Users Table
```sql
- id (PK, INT, Auto Increment)
- name (VARCHAR)
- email (VARCHAR, Unique)
- password (VARCHAR, Hashed)
- role (ENUM: 'seeker', 'employer', 'admin')
- phone (VARCHAR)
- companyName (VARCHAR, for employers)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

### Jobs Table
```sql
- id (PK, INT, Auto Increment)
- employerId (FK, INT)
- title (VARCHAR)
- description (TEXT)
- company (VARCHAR)
- location (VARCHAR)
- salaryMin (DECIMAL)
- salaryMax (DECIMAL)
- jobType (ENUM: 'Full-time', 'Part-time', 'Contract', 'Internship')
- experienceLevel (ENUM: 'Entry', 'Mid', 'Senior', 'Lead')
- skills (TEXT)
- deadline (DATE)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

### Applications Table
```sql
- id (PK, INT, Auto Increment)
- jobId (FK, INT)
- userId (FK, INT)
- fullName (VARCHAR)
- email (VARCHAR)
- phone (VARCHAR)
- resumeUrl (VARCHAR)
- coverLetter (TEXT)
- status (ENUM: 'pending', 'reviewed', 'accepted', 'rejected')
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

### SavedJobs Table
```sql
- id (PK, INT, Auto Increment)
- userId (FK, INT)
- jobId (FK, INT)
- createdAt (DATETIME)
- updatedAt (DATETIME)
```

---

## 📸 Screenshots

### Home Page
*Landing page with hero section and featured jobs*

### Job Listings
*Browse and filter available positions*

### Employer Dashboard
*Manage job postings and review applications*

### Admin Dashboard
*System-wide statistics and management*

---

## 👨‍💻 Team

**CDAC Project - Web Programming Technologies**

- **Ayush Ranjan** - PRN: 250840320040
- **Vibhav Chavan** - PRN: 250840320232
- **Deepra Banerjee** - PRN: 250840320052

---

## 🔧 Troubleshooting

### Backend won't start
- ✅ Check MySQL is running
- ✅ Verify database credentials in `.env`
- ✅ Ensure database `Online_Job_Application_Portal` exists
- ✅ Check port 5000 is not in use

### Frontend won't start
- ✅ Ensure backend is running first
- ✅ Check port 3000 is not in use
- ✅ Delete `node_modules` and reinstall: `npm install`

### Login/Authentication Issues
- ✅ Clear browser localStorage
- ✅ Check browser console for errors
- ✅ Verify CORS is configured properly

### Database Connection Error
```bash
# Check MySQL status
sudo systemctl status mysql  # Linux
brew services list | grep mysql  # macOS

# Restart MySQL if needed
sudo systemctl restart mysql  # Linux
brew services restart mysql  # macOS
```

---

## 🌟 Features in Development

- [ ] Email notifications
- [ ] Advanced search filters
- [ ] Resume parser
- [ ] Video interview scheduling
- [ ] Payment integration for premium listings
- [ ] Mobile application
- [ ] AI-powered job matching

---

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📞 Support

For support, email: info@jobportal.com or raise an issue in the repository.

---

## 🙏 Acknowledgments

- **CDAC** - Centre for Development of Advanced Computing
- **Bootstrap** - For the UI framework
- **React Community** - For excellent documentation
- **Sequelize** - For the ORM support

---

<div align="center">

**Made with ❤️ by Team JobPortal**

⭐ Star this repository if you found it helpful!

</div>
