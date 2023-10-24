const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/connection');
const bcrypt = require('bcrypt');

// Create our User model
class User extends Model {
    // Set up a method to run on instance data (per user) to check the password
    checkPassword(loginPw) {
        return bcrypt.compareSync(loginPw, this.password);
    }
}

// Define table columns and configuration for the User model
User.init(
    {
        // Define an 'id' column
        id: {
            type: DataTypes.INTEGER,
            allowNull: false,
            primaryKey: true,          // Primary key field
            autoIncrement: true       // Auto-incrementing
        },
        // Define a 'username' column
        username: {
            type: DataTypes.STRING,
            allowNull: false          // Username field, not nullable
        },
        // Define an 'email' column
        email: {
            type: DataTypes.STRING,
            allowNull: false,           // Email field, not nullable
            unique: true,              // Email values must be unique
            validate: {
                isEmail: true           // Validate as an email address
            }
        },
        // Define a 'password' column
        password: {
            type: DataTypes.STRING,
            allowNull: false,           // Password field, not nullable
            validate: {
                len: [8]                // Password length should be at least 8 characters
            }
        }
    },
    {
        hooks: {
            // Set up beforeCreate lifecycle "hook" functionality
            async beforeCreate(newUserData) {
                newUserData.password = await bcrypt.hash(newUserData.password, 10);
                return newUserData;
            },
            // Set up beforeUpdate lifecycle "hook" functionality
            async beforeUpdate(updatedUserData) {
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData;
            }
        },
        sequelize,                       // The database connection (sequelize)
        timestamps: true,                // Use timestamps (created_at and updated_at columns)
        freezeTableName: true,           // Prevent table name pluralization
        underscored: true,               // Use underscores instead of camelCase
        modelName: 'user'                // Model name
    }
);

// Export the User model
module.exports = User;
