const router = require('express').Router();
const userRoutes = require('./user-routes');
const postRoutes = require('./post-routes');
const commentsRoutes = require('./comments-routes');

// Mount user routes under '/users'
router.use('/users', userRoutes);

// Mount post routes under '/posts'
router.use('/posts', postRoutes);

// Mount comments routes under '/comments'
router.use('/comments', commentsRoutes);

module.exports = router;
