const seedPosts = require('./blogsData');

const sequelize = require('../config/connection');

const seedAll = async () => {
  await sequelize.sync({ force: true });
  console.log('\n----- DATABASE SYNCED -----\n');
  await seedPosts();
  console.log('\n----- POSTS SEEDED -----\n');

  process.exit(0);
};

seedAll();