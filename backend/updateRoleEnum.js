require("dotenv").config();
const sequelize = require("./config/db");

async function updateRoleEnum() {
  try {
    console.log("🔄 Updating role ENUM column...");
    
    // Alter the ENUM column to use 'candidate' instead of 'seeker'
    await sequelize.query(`
      ALTER TABLE Users 
      MODIFY COLUMN role ENUM('candidate', 'employer', 'admin') 
      DEFAULT 'candidate'
    `);
    
    console.log("✅ Role ENUM column updated successfully!");
    console.log("   Old values: 'seeker', 'employer', 'admin'");
    console.log("   New values: 'candidate', 'employer', 'admin'");
    
    process.exit(0);
  } catch (error) {
    console.error("❌ Error updating role ENUM:", error.message);
    process.exit(1);
  }
}

updateRoleEnum();
