// Import required classes and the Sequelize connection
const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Define the Comments model
class Comments extends Model {}

// Initialize the Comments model with attributes and options
Comments.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Primary key
      allowNull: false,
      autoIncrement: true, // Auto-increment
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'user', // References the 'user' model
        key: 'id',
      },
    },
    post_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'post', // References the 'post' model
        key: 'id',
      },
    },
    comments_text: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [1], // Minimum length of 1 character
      },
    },
  },
  {
    sequelize, // Use the provided Sequelize connection
    timestamps: true, // Enable timestamps (created_at, updated_at)
    freezeTableName: true, // Use the model name as the table name
    underscored: true, // Use underscores in column names
    modelName: 'comments', // Model name
  }
);

// Export the Comments model for use in other parts of the application
module.exports = Comments;
