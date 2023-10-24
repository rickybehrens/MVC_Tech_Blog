const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comments } = require('../models');
const withAuth = require('../utils/auth');

// Route to get the user's dashboard with their own posts and associated comments
router.get('/', withAuth, (req, res) => {
  console.log("User ID:", req.session.user_id);
  console.log("GET Posts");

  // Fetch all posts belonging to the authenticated user
  Post.findAll({
    where: {
      user_id: req.session.user_id // Use the user's ID from the session to find their posts
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post_content'
    ],
    include: [
      {
        model: Comments,
        attributes: ['id', 'comments_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // Serialize data before passing it to the template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('dashboard', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to get the edit page for a specific post by ID
router.get('/edit/:id', withAuth, (req, res) => {
  // Find a specific post by its ID
  Post.findOne({
    where: {
      id: req.params.id
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post_content'
    ],
    include: [
      {
        model: Comments,
        attributes: ['id', 'comments_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      if (!dbPostData) {
        res.status(404).json({ message: 'No post found with this id' });
        return;
      }

      // Serialize the data
      const post = dbPostData.get({ plain: true });

      res.render('edit-post', {
        post,
        loggedIn: true
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to get the create post page with the user's posts and associated comments
router.get('/create', withAuth, (req, res) => {
  // Fetch all posts belonging to the authenticated user
  Post.findAll({
    where: {
      user_id: req.session.user_id // Use the user's ID from the session to find their posts
    },
    attributes: [
      'id',
      'title',
      'created_at',
      'post_content'
    ],
    include: [
      {
        model: Comments,
        attributes: ['id', 'comments_text', 'post_id', 'user_id', 'created_at'],
        include: {
          model: User,
          attributes: ['username']
        }
      },
      {
        model: User,
        attributes: ['username']
      }
    ]
  })
    .then(dbPostData => {
      // Serialize data before passing to the template
      const posts = dbPostData.map(post => post.get({ plain: true }));
      res.render('create-post', { posts, loggedIn: true });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
