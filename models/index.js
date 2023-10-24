// Import the User, Post, and Comments models
const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

// Create associations between the models

// A User can have many Posts (one-to-many relationship)
User.hasMany(Post, {
  foreignKey: 'user_id', // Connects the user_id foreign key in the Post model
});

// A Post belongs to a User (one-to-one relationship)
Post.belongsTo(User, {
  foreignKey: 'user_id', // Connects the user_id foreign key in the Post model
});

// A Comments belongs to a User (one-to-one relationship)
Comments.belongsTo(User, {
  foreignKey: 'user_id', // Connects the user_id foreign key in the Comments model
});

// A Comments belongs to a Post (one-to-one relationship)
Comments.belongsTo(Post, {
  foreignKey: 'post_id', // Connects the post_id foreign key in the Comments model
});

// A User can have many Comments (one-to-many relationship) with CASCADE delete
User.hasMany(Comments, {
  foreignKey: 'user_id', // Connects the user_id foreign key in the Comments model
  onDelete: 'CASCADE', // If a user is deleted, their associated comments will be deleted as well
});

// A Post can have many Comments (one-to-many relationship) with CASCADE delete
Post.hasMany(Comments, {
  foreignKey: 'post_id', // Connects the post_id foreign key in the Comments model
  onDelete: 'CASCADE', // If a post is deleted, its associated comments will be deleted as well
});

// Export the User, Post, and Comments models and their associations
module.exports = { User, Post, Comments };
