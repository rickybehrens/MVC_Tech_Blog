const User = require('./User');
const Post = require('./Post');
const Comments = require('./Comments');

//create associations
User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    foreignKey: 'user_id',
});

Comments.belongsTo(User, {
    foreignKey: 'user_id',
  });
  
Comments.belongsTo(Post, {
    foreignKey: 'post_id',
});
  
User.hasMany(Comments, {
    foreignKey: 'user_id',
    onDelete: 'CASCADE',
});
  
Post.hasMany(Comments, {
    foreignKey: 'post_id',
    onDelete: 'CASCADE',
});

module.exports = {User, Post, Comments};