const { User, Post } = require('../models');

const seedBlogsAndUsers = async () => {
  // Seed users
  const userData = [
    {
      username: 'user1',
      email: 'user1@example.com',
      password: 'password1',
    },
    {
      username: 'user2',
      email: 'user2@example.com',
      password: 'password2',
    },
    // Add more user objects as needed
  ];

  const users = await User.bulkCreate(userData, {
    individualHooks: true,
    returning: true,
  });

  // Seed blog posts associated with users
  const blogData = [
    {
      title: 'Sample Blog Post 1',
      post_content: 'This is the content of the first blog post by user1.',
      user_id: users[0].id,
    },
    {
      title: 'Sample Blog Post 2',
      post_content: 'This is the content of the second blog post by user1.',
      user_id: users[0].id,
    },
    {
      title: 'Sample Blog Post 3',
      post_content: 'This is the content of the first blog post by user2.',
      user_id: users[1].id,
    },
    // Add more blog post objects as needed
  ];

  await Post.bulkCreate(blogData);

  console.log('\n----- USERS AND BLOG POSTS SEEDED -----\n');
};

seedBlogsAndUsers();