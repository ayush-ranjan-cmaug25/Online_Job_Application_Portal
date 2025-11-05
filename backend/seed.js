require("dotenv").config();
const bcrypt = require("bcrypt");
const sequelize = require("./config/db");
const User = require("./models/User");
const Job = require("./models/Job");
const Application = require("./models/Application");
const SavedJob = require("./models/SavedJob");

async function seed() {
  try {
    // Disable foreign key checks temporarily
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    
    await sequelize.sync({ force: true });
    console.log("🗑️  Database cleared");
    
    // Re-enable foreign key checks
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    // Create users
    const hashedPassword = await bcrypt.hash("password123", 10);

    const admin = await User.create({
      name: "Admin User",
      email: "admin@jobportal.com",
      password: hashedPassword,
      role: "admin",
      phone: "+91 98765 43210",
    });

    const employer1 = await User.create({
      name: "John Smith",
      email: "john@techcorp.com",
      password: hashedPassword,
      role: "employer",
      phone: "+91 98765 11111",
      companyName: "TechCorp Solutions",
      companyWebsite: "https://techcorp.com",
    });

    const employer2 = await User.create({
      name: "Sarah Johnson",
      email: "sarah@innovate.com",
      password: hashedPassword,
      role: "employer",
      phone: "+91 98765 22222",
      companyName: "Innovate Digital",
      companyWebsite: "https://innovatedigital.com",
    });

    const employer3 = await User.create({
      name: "Mike Chen",
      email: "mike@dataanalytics.com",
      password: hashedPassword,
      role: "employer",
      phone: "+91 98765 33333",
      companyName: "DataAnalytics Pro",
      companyWebsite: "https://dataanalytics.com",
    });

    const seeker1 = await User.create({
      name: "Alice Brown",
      email: "alice@example.com",
      password: hashedPassword,
      role: "seeker",
      phone: "+91 98765 44444",
      bio: "Passionate software developer with 3 years of experience",
      skills: "JavaScript, React, Node.js, Python",
      education: "B.Tech in Computer Science, IIT Delhi",
      experience: "3 years as Full Stack Developer at StartupXYZ",
    });

    const seeker2 = await User.create({
      name: "Bob Wilson",
      email: "bob@example.com",
      password: hashedPassword,
      role: "seeker",
      phone: "+91 98765 55555",
      bio: "Data scientist with expertise in machine learning",
      skills: "Python, TensorFlow, Pandas, SQL",
      education: "M.Sc. in Data Science, BITS Pilani",
      experience: "2 years as Data Analyst at Analytics Inc",
    });

    console.log("✅ Users created");

    // Create jobs
    const jobs = [
      {
        title: "Senior Full Stack Developer",
        description:
          "We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies.",
        requirements:
          "Bachelor's degree in Computer Science\n5+ years of experience in web development\nStrong proficiency in React and Node.js\nExperience with databases (MySQL, MongoDB)\nGood understanding of RESTful APIs",
        responsibilities:
          "Develop and maintain web applications\nCollaborate with cross-functional teams\nWrite clean, maintainable code\nParticipate in code reviews\nMentor junior developers",
        company: "TechCorp Solutions",
        location: "Bangalore, Karnataka",
        salary: "₹15-25 LPA",
        salaryMin: 1500000,
        salaryMax: 2500000,
        jobType: "Full-time",
        industry: "Information Technology",
        experienceLevel: "Senior Level",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isFeatured: true,
        createdBy: employer1.id,
      },
      {
        title: "React Native Mobile Developer",
        description:
          "Join our mobile development team to build cutting-edge applications for iOS and Android platforms using React Native.",
        requirements:
          "3+ years of mobile development experience\nExpertise in React Native\nKnowledge of native iOS/Android development\nExperience with mobile app deployment\nStrong problem-solving skills",
        responsibilities:
          "Develop mobile applications using React Native\nOptimize app performance\nIntegrate with backend APIs\nDebug and fix issues\nStay updated with latest mobile trends",
        company: "TechCorp Solutions",
        location: "Mumbai, Maharashtra",
        salary: "₹12-18 LPA",
        salaryMin: 1200000,
        salaryMax: 1800000,
        jobType: "Full-time",
        industry: "Information Technology",
        experienceLevel: "Mid Level",
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        isFeatured: true,
        createdBy: employer1.id,
      },
      {
        title: "UI/UX Designer",
        description:
          "We are seeking a talented UI/UX Designer who can create beautiful and intuitive user interfaces for our digital products.",
        requirements:
          "Bachelor's degree in Design or related field\n3+ years of UI/UX design experience\nProficiency in Figma, Adobe XD, or Sketch\nStrong portfolio demonstrating design skills\nUnderstanding of user-centered design principles",
        responsibilities:
          "Create wireframes and prototypes\nDesign user interfaces for web and mobile\nConduct user research and testing\nCollaborate with developers\nMaintain design system",
        company: "Innovate Digital",
        location: "Pune, Maharashtra",
        salary: "₹8-14 LPA",
        salaryMin: 800000,
        salaryMax: 1400000,
        jobType: "Full-time",
        industry: "Design",
        experienceLevel: "Mid Level",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isFeatured: true,
        createdBy: employer2.id,
      },
      {
        title: "Digital Marketing Manager",
        description:
          "Lead our digital marketing efforts and drive growth through innovative marketing strategies across multiple channels.",
        requirements:
          "5+ years of digital marketing experience\nExpertise in SEO, SEM, and social media marketing\nStrong analytical skills\nExperience with marketing tools (Google Analytics, etc.)\nExcellent communication skills",
        responsibilities:
          "Develop and execute marketing strategies\nManage social media campaigns\nAnalyze marketing metrics\nLead marketing team\nCollaborate with sales team",
        company: "Innovate Digital",
        location: "Hyderabad, Telangana",
        salary: "₹10-16 LPA",
        salaryMin: 1000000,
        salaryMax: 1600000,
        jobType: "Full-time",
        industry: "Marketing",
        experienceLevel: "Senior Level",
        deadline: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000),
        isFeatured: false,
        createdBy: employer2.id,
      },
      {
        title: "Data Scientist",
        description:
          "Join our data science team to work on challenging problems using machine learning and advanced analytics.",
        requirements:
          "Master's degree in Computer Science, Statistics, or related field\n3+ years of data science experience\nStrong programming skills in Python\nExperience with ML frameworks (TensorFlow, PyTorch)\nExcellent analytical and problem-solving skills",
        responsibilities:
          "Build and deploy ML models\nAnalyze large datasets\nCollaborate with engineering teams\nCommunicate insights to stakeholders\nStay updated with latest research",
        company: "DataAnalytics Pro",
        location: "Bangalore, Karnataka",
        salary: "₹18-30 LPA",
        salaryMin: 1800000,
        salaryMax: 3000000,
        jobType: "Full-time",
        industry: "Data Science",
        experienceLevel: "Senior Level",
        deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        isFeatured: true,
        createdBy: employer3.id,
      },
      {
        title: "Junior Frontend Developer",
        description:
          "Great opportunity for fresh graduates or developers with 1-2 years of experience to grow their career in web development.",
        requirements:
          "Bachelor's degree in Computer Science or related field\n0-2 years of experience\nBasic knowledge of HTML, CSS, JavaScript\nFamiliarity with React or Vue.js\nEagerness to learn",
        responsibilities:
          "Develop user interfaces\nWork with senior developers\nWrite clean code\nParticipate in team meetings\nLearn new technologies",
        company: "TechCorp Solutions",
        location: "Remote",
        salary: "₹4-7 LPA",
        salaryMin: 400000,
        salaryMax: 700000,
        jobType: "Remote",
        industry: "Information Technology",
        experienceLevel: "Entry Level",
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        isFeatured: false,
        createdBy: employer1.id,
      },
      {
        title: "DevOps Engineer",
        description:
          "We need an experienced DevOps Engineer to manage our cloud infrastructure and improve our deployment processes.",
        requirements:
          "4+ years of DevOps experience\nExpertise in AWS/Azure/GCP\nStrong knowledge of Docker and Kubernetes\nExperience with CI/CD pipelines\nScripting skills (Python, Bash)",
        responsibilities:
          "Manage cloud infrastructure\nImplement CI/CD pipelines\nMonitor system performance\nEnsure security compliance\nAutomate deployment processes",
        company: "DataAnalytics Pro",
        location: "Chennai, Tamil Nadu",
        salary: "₹14-22 LPA",
        salaryMin: 1400000,
        salaryMax: 2200000,
        jobType: "Full-time",
        industry: "Information Technology",
        experienceLevel: "Senior Level",
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        isFeatured: false,
        createdBy: employer3.id,
      },
      {
        title: "Product Manager",
        description:
          "Lead product development from concept to launch, working closely with engineering, design, and business teams.",
        requirements:
          "Bachelor's degree in Business, Engineering, or related field\n5+ years of product management experience\nStrong analytical and communication skills\nExperience with Agile methodologies\nData-driven decision making",
        responsibilities:
          "Define product vision and strategy\nManage product roadmap\nWork with cross-functional teams\nConduct market research\nAnalyze product metrics",
        company: "Innovate Digital",
        location: "Gurgaon, Haryana",
        salary: "₹20-35 LPA",
        salaryMin: 2000000,
        salaryMax: 3500000,
        jobType: "Full-time",
        industry: "Product Management",
        experienceLevel: "Senior Level",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isFeatured: true,
        createdBy: employer2.id,
      },
      {
        title: "Content Writer Intern",
        description:
          "Internship opportunity for aspiring content writers to gain hands-on experience in creating engaging content.",
        requirements:
          "Currently pursuing or completed Bachelor's degree\nExcellent writing skills\nBasic understanding of SEO\nCreativity and attention to detail\nWillingness to learn",
        responsibilities:
          "Write blog posts and articles\nResearch industry topics\nProofread content\nAssist in content strategy\nLearn from experienced writers",
        company: "Innovate Digital",
        location: "Remote",
        salary: "₹15,000-25,000/month",
        salaryMin: 180000,
        salaryMax: 300000,
        jobType: "Internship",
        industry: "Content Writing",
        experienceLevel: "Entry Level",
        deadline: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000),
        isFeatured: false,
        createdBy: employer2.id,
      },
      {
        title: "Backend Developer (Node.js)",
        description:
          "Join our backend team to build scalable APIs and microservices using Node.js and modern technologies.",
        requirements:
          "3+ years of Node.js development experience\nStrong knowledge of Express.js\nExperience with databases (MongoDB, PostgreSQL)\nUnderstanding of microservices architecture\nGood problem-solving skills",
        responsibilities:
          "Develop RESTful APIs\nOptimize database queries\nImplement authentication and authorization\nWrite unit tests\nMaintain documentation",
        company: "TechCorp Solutions",
        location: "Kolkata, West Bengal",
        salary: "₹10-16 LPA",
        salaryMin: 1000000,
        salaryMax: 1600000,
        jobType: "Full-time",
        industry: "Information Technology",
        experienceLevel: "Mid Level",
        deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        isFeatured: false,
        createdBy: employer1.id,
      },
    ];

    const createdJobs = await Job.bulkCreate(jobs);
    console.log("✅ Jobs created");

    // Create some applications
    await Application.create({
      jobId: createdJobs[0].id,
      applicantId: seeker1.id,
      fullName: seeker1.name,
      email: seeker1.email,
      phone: seeker1.phone,
      education: seeker1.education,
      experience: seeker1.experience,
      skills: seeker1.skills,
      coverLetter:
        "I am very excited about this opportunity and believe my skills align perfectly with your requirements.",
      status: "Under Review",
    });

    await Application.create({
      jobId: createdJobs[0].id,
      applicantId: seeker2.id,
      fullName: seeker2.name,
      email: seeker2.email,
      phone: seeker2.phone,
      education: seeker2.education,
      experience: seeker2.experience,
      skills: seeker2.skills,
      coverLetter: "I would love to bring my expertise to your team.",
      status: "Pending",
    });

    await Application.create({
      jobId: createdJobs[4].id,
      applicantId: seeker2.id,
      fullName: seeker2.name,
      email: seeker2.email,
      phone: seeker2.phone,
      education: seeker2.education,
      experience: seeker2.experience,
      skills: seeker2.skills,
      coverLetter:
        "As a data scientist, I am passionate about solving complex problems using machine learning.",
      status: "Shortlisted",
    });

    console.log("✅ Applications created");
    
    // Create some saved jobs
    await SavedJob.create({
      userId: seeker1.id,
      jobId: createdJobs[1].id,
    });

    await SavedJob.create({
      userId: seeker1.id,
      jobId: createdJobs[2].id,
    });

    await SavedJob.create({
      userId: seeker2.id,
      jobId: createdJobs[0].id,
    });

    console.log("✅ Saved jobs created");

    console.log("\n🎉 Seed completed successfully!");
    console.log("\n👥 Test Accounts:");
    console.log("Admin: admin@jobportal.com / password123");
    console.log("Employer 1: john@techcorp.com / password123");
    console.log("Employer 2: sarah@innovate.com / password123");
    console.log("Employer 3: mike@dataanalytics.com / password123");
    console.log("Seeker 1: alice@example.com / password123");
    console.log("Seeker 2: bob@example.com / password123");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
