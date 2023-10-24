const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');

// Create our Post model
class Post extends Model {}

// Define fields/columns for the Post model
Post.init(
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,         // Primary key field
      autoIncrement: true       // Auto-incrementing
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false          // Title field, not nullable
    },
    post_content: {
      type: DataTypes.TEXT,
      allowNull: true             // Post content field, nullable
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: 'user',            // References the 'user' model
        key: 'id'                 // References the 'id' field in the 'user' model
      }
    }
  },
  {
    sequelize,                    // The database connection (sequelize)
    timestamps: true,             // Use timestamps (created_at and updated_at columns)
    freezeTableName: true,       // Prevent table name pluralization
    underscored: true,           // Use underscores instead of camelCase
    modelName: 'post'            // Model name
  }
);

// Export the Post model
module.exports = Post;
