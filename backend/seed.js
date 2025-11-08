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

    // Clear all data from tables but keep the structure
    await User.destroy({ where: {}, truncate: true });
    await Job.destroy({ where: {}, truncate: true });
    await Application.destroy({ where: {}, truncate: true });
    await SavedJob.destroy({ where: {}, truncate: true });

    console.log("🗑️  All users and related data cleared");

    // Re-enable foreign key checks
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    // Create Admin Users
    const ayush = await User.create({
      name: "Ayush Ranjan",
      email: "ayush@admin.com",
      password: "123456",
      role: "admin",
      phone: "+91 98765 43210",
      bio: "System administrator with expertise in managing job portals",
      isActive: true,
    });

    const deepra = await User.create({
      name: "Deepra Banerjee",
      email: "deepra@admin.com",
      password: "123456",
      role: "admin",
      phone: "+91 98765 43211",
      bio: "Senior administrator focused on user management and system operations",
      isActive: true,
    });

    const vibhav = await User.create({
      name: "Vibhav Chavan",
      email: "vibhav@admin.com",
      password: "123456",
      role: "admin",
      phone: "+91 98765 43212",
      bio: "Technical administrator specializing in platform maintenance",
      isActive: true,
    });

    // Create Employer Users
    const techcorp = await User.create({
      name: "TechCorp",
      email: "techcorp@employer.com",
      password: "123456",
      role: "employer",
      phone: "+91 98765 11111",
      companyName: "TechCorp",
      companyWebsite: "https://techcorp.com",
      bio: "Leading technology company providing innovative solutions",
      isActive: true,
    });

    const innovateInc = await User.create({
      name: "Innovate Inc",
      email: "innovateinc@employer.com",
      password: "123456",
      role: "employer",
      phone: "+91 98765 11112",
      companyName: "Innovate Inc",
      companyWebsite: "https://innovateinc.com",
      bio: "Innovation-driven company focused on cutting-edge technology",
      isActive: true,
    });

    const futureWorks = await User.create({
      name: "FutureWorks",
      email: "futureworks@employer.com",
      password: "123456",
      role: "employer",
      phone: "+91 98765 11113",
      companyName: "FutureWorks",
      companyWebsite: "https://futureworks.com",
      bio: "Building the future of work through technology",
      isActive: true,
    });

    const digitalDreams = await User.create({
      name: "Digital Dreams",
      email: "digitaldreams@employer.com",
      password: "123456",
      role: "employer",
      phone: "+91 98765 11114",
      companyName: "Digital Dreams",
      companyWebsite: "https://digitaldreams.com",
      bio: "Creating digital experiences that inspire and engage",
      isActive: true,
    });

    // Create Candidate Users
    const candidate1 = await User.create({
      name: "Candidate1",
      email: "c1@candidate.com",
      password: "123456",
      role: "candidate",
      phone: "+91 98765 44444",
      bio: "Passionate software developer seeking new opportunities",
      skills: "JavaScript, React, Node.js, Python, SQL",
      education: "B.Tech in Computer Science, ABC University, 2022",
      experience: "1 year as Junior Developer at XYZ Tech",
      isActive: true,
    });

    const candidate2 = await User.create({
      name: "Candidate2",
      email: "c2@candidate.com",
      password: "123456",
      role: "candidate",
      phone: "+91 98765 44445",
      bio: "Frontend developer with eye for design",
      skills: "HTML, CSS, JavaScript, React, Vue.js, Tailwind CSS",
      education: "B.Tech in Information Technology, DEF College, 2021",
      experience: "2 years as Frontend Developer at WebSolutions Inc",
      isActive: true,
    });

    const candidate3 = await User.create({
      name: "Candidate3",
      email: "c3@candidate.com",
      password: "123456",
      role: "candidate",
      phone: "+91 98765 44446",
      bio: "Backend developer specializing in API development",
      skills: "Java, Spring Boot, MySQL, MongoDB, REST APIs",
      education: "MCA, GHI Institute, 2023",
      experience: "Fresher with strong internship experience",
      isActive: true,
    });

    const candidate4 = await User.create({
      name: "Candidate4",
      email: "c4@candidate.com",
      password: "123456",
      role: "candidate",
      phone: "+91 98765 44447",
      bio: "Full stack developer with cloud expertise",
      skills: "JavaScript, Python, AWS, Docker, Kubernetes, CI/CD",
      education: "B.Tech in Computer Engineering, JKL University, 2020",
      experience: "3 years as Full Stack Developer at CloudTech Solutions",
      isActive: true,
    });

    const candidate5 = await User.create({
      name: "Candidate5",
      email: "c5@candidate.com",
      password: "123456",
      role: "candidate",
      phone: "+91 98765 44448",
      bio: "Data analyst passionate about insights and analytics",
      skills: "Python, Pandas, SQL, Tableau, Power BI, Excel",
      education: "M.Sc. in Data Science, MNO College, 2022",
      experience: "1.5 years as Data Analyst at Analytics Corp",
      isActive: true,
    });

    console.log("✅ Users created");

    // Create jobs posted by different employers
    const jobs = [
      {
        title: "Senior Full Stack Developer",
        description:
          "We are looking for an experienced Full Stack Developer to join our dynamic team. You will be responsible for developing and maintaining web applications using modern technologies. The ideal candidate should have strong problem-solving skills and be able to work in a fast-paced environment.",
        requirements:
          "Bachelor's degree in Computer Science or related field\n5+ years of experience in web development\nStrong proficiency in React, Node.js, and TypeScript\nExperience with databases (MySQL, MongoDB)\nGood understanding of RESTful APIs and microservices\nExperience with version control (Git)\nExcellent communication and teamwork skills",
        responsibilities:
          "Develop and maintain full-stack web applications\nDesign and implement RESTful APIs\nCollaborate with cross-functional teams including designers and product managers\nWrite clean, maintainable, and well-documented code\nParticipate in code reviews and provide constructive feedback\nMentor junior developers and share best practices\nOptimize applications for maximum speed and scalability\nStay updated with emerging technologies and industry trends",
        company: "TechCorp",
        location: "Bangalore, Karnataka",
        salary: "₹15-25 LPA",
        salaryMin: 1500000,
        salaryMax: 2500000,
        jobType: "Full-time",
        industry: "Information Technology",
        experienceLevel: "Senior Level",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isFeatured: true,
        createdBy: techcorp.id,
      },
      {
        title: "React Native Mobile Developer",
        description:
          "Join our mobile development team to build cutting-edge applications for iOS and Android platforms using React Native. We are looking for a passionate developer who can create smooth and responsive mobile experiences.",
        requirements:
          "Bachelor's degree in Computer Science or equivalent\n3+ years of mobile development experience\nExpertise in React Native and JavaScript/TypeScript\nKnowledge of native iOS (Swift) and Android (Kotlin) development\nExperience with mobile app deployment to App Store and Play Store\nFamiliarity with mobile UI/UX principles\nStrong problem-solving and debugging skills\nExperience with state management (Redux, MobX)",
        responsibilities:
          "Develop mobile applications using React Native for iOS and Android\nOptimize app performance and reduce load times\nIntegrate with backend APIs and third-party services\nImplement responsive and intuitive UI designs\nDebug and fix issues reported by users or QA team\nWrite unit and integration tests\nMaintain app store listings and manage releases\nStay updated with latest mobile development trends and best practices",
        company: "Innovate Inc",
        location: "Mumbai, Maharashtra",
        salary: "₹12-18 LPA",
        salaryMin: 1200000,
        salaryMax: 1800000,
        jobType: "Full-time",
        industry: "Information Technology",
        experienceLevel: "Mid Level",
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        isFeatured: true,
        createdBy: innovateInc.id,
      },
      {
        title: "UI/UX Designer",
        description:
          "We are seeking a talented UI/UX Designer who can create beautiful, intuitive, and user-friendly interfaces for our digital products. The ideal candidate should have a strong portfolio and a passion for creating exceptional user experiences.",
        requirements:
          "Bachelor's degree in Design, HCI, or related field\n3+ years of UI/UX design experience\nProficiency in design tools (Figma, Adobe XD, Sketch, Photoshop, Illustrator)\nStrong portfolio demonstrating design skills and process\nUnderstanding of user-centered design principles and methodologies\nExperience with user research and usability testing\nKnowledge of HTML/CSS is a plus\nExcellent visual design skills with attention to detail",
        responsibilities:
          "Create wireframes, prototypes, and high-fidelity mockups\nDesign user interfaces for web and mobile applications\nConduct user research and analyze user feedback\nPerform usability testing and iterate on designs\nCollaborate with developers to ensure design feasibility\nMaintain and evolve the design system\nCreate user flows and journey maps\nPresent design concepts to stakeholders",
        company: "Digital Dreams",
        location: "Pune, Maharashtra",
        salary: "₹8-14 LPA",
        salaryMin: 800000,
        salaryMax: 1400000,
        jobType: "Full-time",
        industry: "Design",
        experienceLevel: "Mid Level",
        deadline: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000),
        isFeatured: true,
        createdBy: digitalDreams.id,
      },
      {
        title: "Backend Developer (Node.js)",
        description:
          "Join our backend team to build scalable APIs and microservices using Node.js and modern technologies. We need someone who can design efficient database schemas and write clean, maintainable code.",
        requirements:
          "Bachelor's degree in Computer Science or related field\n3+ years of Node.js development experience\nStrong knowledge of Express.js or similar frameworks\nExperience with SQL and NoSQL databases (PostgreSQL, MongoDB)\nUnderstanding of microservices architecture and design patterns\nExperience with message queues (RabbitMQ, Kafka)\nKnowledge of Docker and container orchestration\nGood problem-solving and analytical skills",
        responsibilities:
          "Develop and maintain RESTful APIs and GraphQL endpoints\nDesign and optimize database schemas and queries\nImplement authentication, authorization, and security best practices\nWrite comprehensive unit and integration tests\nDeploy and monitor applications in production\nMaintain detailed technical documentation\nCollaborate with frontend developers for API integration\nPerform code reviews and ensure code quality",
        company: "TechCorp",
        location: "Hyderabad, Telangana",
        salary: "₹10-16 LPA",
        salaryMin: 1000000,
        salaryMax: 1600000,
        jobType: "Full-time",
        industry: "Information Technology",
        experienceLevel: "Mid Level",
        deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        isFeatured: false,
        createdBy: techcorp.id,
      },
      {
        title: "DevOps Engineer",
        description:
          "We need an experienced DevOps Engineer to manage our cloud infrastructure and improve our deployment processes. The role involves automating workflows, ensuring system reliability, and implementing security best practices.",
        requirements:
          "Bachelor's degree in Computer Science or related field\n4+ years of DevOps experience\nExpertise in cloud platforms (AWS, Azure, or GCP)\nStrong knowledge of Docker and Kubernetes\nExperience with CI/CD tools (Jenkins, GitLab CI, GitHub Actions)\nProficiency in scripting languages (Python, Bash, PowerShell)\nExperience with infrastructure as code (Terraform, CloudFormation)\nKnowledge of monitoring tools (Prometheus, Grafana, ELK stack)",
        responsibilities:
          "Design, implement, and manage cloud infrastructure\nDevelop and maintain CI/CD pipelines for automated deployments\nMonitor system performance and troubleshoot issues\nImplement security measures and ensure compliance\nAutomate deployment and infrastructure provisioning\nManage container orchestration and microservices\nOptimize costs and resource utilization\nDocument infrastructure and deployment processes",
        company: "FutureWorks",
        location: "Chennai, Tamil Nadu",
        salary: "₹14-22 LPA",
        salaryMin: 1400000,
        salaryMax: 2200000,
        jobType: "Full-time",
        industry: "Information Technology",
        experienceLevel: "Senior Level",
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        isFeatured: false,
        createdBy: futureWorks.id,
      },
      {
        title: "Data Analyst",
        description:
          "We are looking for a detail-oriented Data Analyst to turn data into information, information into insight, and insight into business decisions. The ideal candidate should be passionate about working with data and have strong analytical skills.",
        requirements:
          "Bachelor's degree in Statistics, Mathematics, Economics, or related field\n2+ years of data analysis experience\nProficiency in SQL and database querying\nExperience with data visualization tools (Tableau, Power BI, Looker)\nStrong knowledge of Excel and statistical analysis\nFamiliarity with Python or R for data analysis\nExcellent analytical and problem-solving skills\nStrong communication skills to present findings",
        responsibilities:
          "Collect, process, and analyze large datasets\nCreate dashboards and reports for stakeholders\nIdentify trends, patterns, and insights from data\nPerform statistical analysis and A/B testing\nCollaborate with teams to understand data requirements\nDevelop and maintain data documentation\nEnsure data quality and integrity\nPresent findings and recommendations to management",
        company: "Innovate Inc",
        location: "Bangalore, Karnataka",
        salary: "₹6-12 LPA",
        salaryMin: 600000,
        salaryMax: 1200000,
        jobType: "Full-time",
        industry: "Data Science",
        experienceLevel: "Mid Level",
        deadline: new Date(Date.now() + 40 * 24 * 60 * 60 * 1000),
        isFeatured: true,
        createdBy: innovateInc.id,
      },
      {
        title: "Junior Frontend Developer",
        description:
          "Great opportunity for fresh graduates or developers with 1-2 years of experience to grow their career in web development. You will work with experienced developers and learn modern frontend technologies.",
        requirements:
          "Bachelor's degree in Computer Science or related field\n0-2 years of web development experience\nBasic knowledge of HTML5, CSS3, and JavaScript\nFamiliarity with React or Vue.js framework\nUnderstanding of responsive design principles\nBasic knowledge of Git version control\nEagerness to learn and adapt to new technologies\nGood problem-solving attitude",
        responsibilities:
          "Develop user interfaces using HTML, CSS, and JavaScript\nWork with React to build interactive components\nCollaborate with senior developers and designers\nWrite clean and maintainable code\nParticipate in team meetings and code reviews\nDebug and fix UI issues\nLearn and implement best practices\nAssist in improving user experience",
        company: "Digital Dreams",
        location: "Remote",
        salary: "₹4-7 LPA",
        salaryMin: 400000,
        salaryMax: 700000,
        jobType: "Remote",
        industry: "Information Technology",
        experienceLevel: "Entry Level",
        deadline: new Date(Date.now() + 60 * 24 * 60 * 60 * 1000),
        isFeatured: false,
        createdBy: digitalDreams.id,
      },
      {
        title: "Python Developer",
        description:
          "We are seeking a skilled Python Developer to join our team and work on various backend and data processing projects. The ideal candidate should have strong programming skills and experience with Python frameworks.",
        requirements:
          "Bachelor's degree in Computer Science or related field\n3+ years of Python development experience\nStrong knowledge of Python frameworks (Django, Flask, FastAPI)\nExperience with SQL and ORM tools (SQLAlchemy)\nFamiliarity with RESTful API development\nKnowledge of asynchronous programming\nExperience with testing frameworks (pytest, unittest)\nUnderstanding of software design patterns",
        responsibilities:
          "Develop and maintain Python applications and services\nWrite efficient and reusable code\nDesign and implement database schemas\nDevelop RESTful APIs and integrate third-party services\nWrite unit tests and ensure code coverage\nOptimize application performance\nDebug and resolve technical issues\nParticipate in architecture and design discussions",
        company: "FutureWorks",
        location: "Kolkata, West Bengal",
        salary: "₹8-14 LPA",
        salaryMin: 800000,
        salaryMax: 1400000,
        jobType: "Full-time",
        industry: "Information Technology",
        experienceLevel: "Mid Level",
        deadline: new Date(Date.now() + 35 * 24 * 60 * 60 * 1000),
        isFeatured: false,
        createdBy: futureWorks.id,
      },
      {
        title: "Machine Learning Engineer",
        description:
          "We are looking for a Machine Learning Engineer to develop and deploy ML models that solve real-world problems. You will work with large datasets and collaborate with data scientists and engineers.",
        requirements:
          "Master's degree in Computer Science, AI, or related field\n3+ years of ML/AI experience\nStrong knowledge of Python and ML libraries (TensorFlow, PyTorch, scikit-learn)\nExperience with data preprocessing and feature engineering\nUnderstanding of deep learning architectures (CNNs, RNNs, Transformers)\nExperience with cloud ML platforms (AWS SageMaker, Azure ML, Google AI Platform)\nKnowledge of MLOps and model deployment\nStrong mathematical foundation in linear algebra, calculus, and statistics",
        responsibilities:
          "Design and develop machine learning models\nPreprocess and analyze large datasets\nTrain, validate, and optimize ML models\nDeploy models to production environments\nMonitor model performance and retrain as needed\nCollaborate with data scientists and engineers\nImplement MLOps best practices\nStay updated with latest ML research and techniques",
        company: "TechCorp",
        location: "Bangalore, Karnataka",
        salary: "₹18-28 LPA",
        salaryMin: 1800000,
        salaryMax: 2800000,
        jobType: "Full-time",
        industry: "Artificial Intelligence",
        experienceLevel: "Senior Level",
        deadline: new Date(Date.now() + 45 * 24 * 60 * 60 * 1000),
        isFeatured: true,
        createdBy: techcorp.id,
      },
      {
        title: "Quality Assurance Engineer",
        description:
          "Join our QA team to ensure the quality and reliability of our software products. You will design test cases, perform manual and automated testing, and work closely with developers to identify and fix bugs.",
        requirements:
          "Bachelor's degree in Computer Science or related field\n2+ years of QA experience\nExperience with manual and automated testing\nKnowledge of testing tools (Selenium, JUnit, TestNG, Postman)\nUnderstanding of software development lifecycle\nExperience with bug tracking tools (JIRA, Bugzilla)\nBasic knowledge of programming (Java, Python, or JavaScript)\nStrong attention to detail and analytical skills",
        responsibilities:
          "Design and execute test cases and test plans\nPerform functional, regression, and integration testing\nAutomate test cases using testing frameworks\nIdentify, document, and track bugs\nCollaborate with developers to reproduce and fix issues\nPerform API testing and validate responses\nEnsure quality standards are met before releases\nContribute to continuous improvement of QA processes",
        company: "Innovate Inc",
        location: "Pune, Maharashtra",
        salary: "₹5-9 LPA",
        salaryMin: 500000,
        salaryMax: 900000,
        jobType: "Full-time",
        industry: "Information Technology",
        experienceLevel: "Mid Level",
        deadline: new Date(Date.now() + 50 * 24 * 60 * 60 * 1000),
        isFeatured: false,
        createdBy: innovateInc.id,
      },
    ];

    const createdJobs = await Job.bulkCreate(jobs);
    console.log("✅ Jobs created");

    // Create applications from candidates to different companies
    await Application.create({
      jobId: createdJobs[0].id, // Senior Full Stack Developer at TechCorp
      applicantId: candidate1.id,
      fullName: candidate1.name,
      email: candidate1.email,
      phone: candidate1.phone,
      education: candidate1.education,
      experience: candidate1.experience,
      skills: candidate1.skills,
      coverLetter:
        "I am excited to apply for the Senior Full Stack Developer position at TechCorp. With my experience in JavaScript and React, I believe I can contribute effectively to your team and help build innovative solutions.",
      status: "Pending",
    });

    await Application.create({
      jobId: createdJobs[1].id, // React Native Developer at Innovate Inc
      applicantId: candidate2.id,
      fullName: candidate2.name,
      email: candidate2.email,
      phone: candidate2.phone,
      education: candidate2.education,
      experience: candidate2.experience,
      skills: candidate2.skills,
      coverLetter:
        "I am very interested in the React Native Mobile Developer role at Innovate Inc. My frontend experience and passion for mobile development make me a great fit for this position.",
      status: "Under Review",
    });

    await Application.create({
      jobId: createdJobs[3].id, // Backend Developer at TechCorp
      applicantId: candidate3.id,
      fullName: candidate3.name,
      email: candidate3.email,
      phone: candidate3.phone,
      education: candidate3.education,
      experience: candidate3.experience,
      skills: candidate3.skills,
      coverLetter:
        "I am writing to express my interest in the Backend Developer position at TechCorp. Although I am a fresher, my strong foundation in Java and Spring Boot has prepared me well for this role.",
      status: "Pending",
    });

    await Application.create({
      jobId: createdJobs[4].id, // DevOps Engineer at FutureWorks
      applicantId: candidate4.id,
      fullName: candidate4.name,
      email: candidate4.email,
      phone: candidate4.phone,
      education: candidate4.education,
      experience: candidate4.experience,
      skills: candidate4.skills,
      coverLetter:
        "I am thrilled to apply for the DevOps Engineer position at FutureWorks. With my experience in AWS, Docker, and Kubernetes, I can help streamline your deployment processes.",
      status: "Shortlisted",
    });

    await Application.create({
      jobId: createdJobs[5].id, // Data Analyst at Innovate Inc
      applicantId: candidate5.id,
      fullName: candidate5.name,
      email: candidate5.email,
      phone: candidate5.phone,
      education: candidate5.education,
      experience: candidate5.experience,
      skills: candidate5.skills,
      coverLetter:
        "I am applying for the Data Analyst position at Innovate Inc with great enthusiasm. My experience with Python, SQL, and data visualization tools has equipped me with the skills needed to derive meaningful insights.",
      status: "Under Review",
    });

    await Application.create({
      jobId: createdJobs[6].id, // Junior Frontend Developer at Digital Dreams
      applicantId: candidate1.id,
      fullName: candidate1.name,
      email: candidate1.email,
      phone: candidate1.phone,
      education: candidate1.education,
      experience: candidate1.experience,
      skills: candidate1.skills,
      coverLetter:
        "I am interested in the Junior Frontend Developer position at Digital Dreams. This role aligns perfectly with my skills and career goals.",
      status: "Pending",
    });

    await Application.create({
      jobId: createdJobs[2].id, // UI/UX Designer at Digital Dreams
      applicantId: candidate2.id,
      fullName: candidate2.name,
      email: candidate2.email,
      phone: candidate2.phone,
      education: candidate2.education,
      experience: candidate2.experience,
      skills: candidate2.skills,
      coverLetter:
        "I would love to contribute to Digital Dreams as a UI/UX Designer. My frontend background gives me unique insights into creating designs that are both beautiful and implementable.",
      status: "Pending",
    });

    await Application.create({
      jobId: createdJobs[8].id, // Machine Learning Engineer at TechCorp
      applicantId: candidate4.id,
      fullName: candidate4.name,
      email: candidate4.email,
      phone: candidate4.phone,
      education: candidate4.education,
      experience: candidate4.experience,
      skills: candidate4.skills,
      coverLetter:
        "I am applying for the Machine Learning Engineer position at TechCorp. My cloud expertise and programming skills make me eager to transition into the ML field.",
      status: "Pending",
    });

    console.log("✅ Applications created");

    // Create some saved jobs
    await SavedJob.create({
      userId: candidate1.id,
      jobId: createdJobs[2].id, // UI/UX Designer at Digital Dreams
    });

    await SavedJob.create({
      userId: candidate1.id,
      jobId: createdJobs[7].id, // Python Developer at FutureWorks
    });

    await SavedJob.create({
      userId: candidate1.id,
      jobId: createdJobs[8].id, // Machine Learning Engineer at TechCorp
    });

    await SavedJob.create({
      userId: candidate2.id,
      jobId: createdJobs[0].id, // Senior Full Stack Developer at TechCorp
    });

    await SavedJob.create({
      userId: candidate2.id,
      jobId: createdJobs[5].id, // Data Analyst at Innovate Inc
    });

    await SavedJob.create({
      userId: candidate3.id,
      jobId: createdJobs[3].id, // Backend Developer at TechCorp
    });

    await SavedJob.create({
      userId: candidate3.id,
      jobId: createdJobs[9].id, // QA Engineer at Innovate Inc
    });

    await SavedJob.create({
      userId: candidate4.id,
      jobId: createdJobs[4].id, // DevOps Engineer at FutureWorks
    });

    await SavedJob.create({
      userId: candidate4.id,
      jobId: createdJobs[1].id, // React Native Developer at Innovate Inc
    });

    await SavedJob.create({
      userId: candidate5.id,
      jobId: createdJobs[5].id, // Data Analyst at Innovate Inc
    });

    await SavedJob.create({
      userId: candidate5.id,
      jobId: createdJobs[8].id, // Machine Learning Engineer at TechCorp
    });

    console.log("✅ Saved jobs created");

    console.log("\n🎉 Seed completed successfully!");
    console.log("\n👥 Test Accounts (All passwords: 123456):");
    console.log("\n📋 Admins:");
    console.log("  • Ayush Ranjan: ayush@admin.com");
    console.log("  • Deepra Banerjee: deepra@admin.com");
    console.log("  • Vibhav Chavan: vibhav@admin.com");
    console.log("\n🏢 Employers:");
    console.log("  • TechCorp: techcorp@employer.com");
    console.log("  • Innovate Inc: innovateinc@employer.com");
    console.log("  • FutureWorks: futureworks@employer.com");
    console.log("  • Digital Dreams: digitaldreams@employer.com");
    console.log("\n👤 Candidates:");
    console.log("  • Candidate1: c1@candidate.com");
    console.log("  • Candidate2: c2@candidate.com");
    console.log("  • Candidate3: c3@candidate.com");
    console.log("  • Candidate4: c4@candidate.com");
    console.log("  • Candidate5: c5@candidate.com");

    process.exit(0);
  } catch (error) {
    console.error("❌ Seed error:", error);
    process.exit(1);
  }
}

seed();
