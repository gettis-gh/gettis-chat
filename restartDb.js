import sequelize from './src/database/sequelize.js';

(async () => {
  try {
      await sequelize.sync({force: true});
      console.log("✅ Database synced");
  } catch (error) {
      console.error("❌ DB sync error:", error.message);
  }
})();