const router = require('express').Router();
const { Comments } = require('../../models');
const withAuth = require('../../utils/auth');

// Route to get all comments
router.get('/', (req, res) => {
  Comments.findAll({})
    .then(dbCommentsData => res.json(dbCommentsData))
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

// Route to create a new comment (with authentication)
router.post('/', withAuth, (req, res) => {
  // Check the session to ensure the user is authenticated
  if (req.session) {
    Comments.create({
      comments_text: req.body.comments_text,
      post_id: req.body.post_id,
      // Use the user_id from the session
      user_id: req.session.user_id,
    })
      .then(dbCommentsData => res.json(dbCommentsData))
      .catch(err => {
        console.log(err);
        res.status(400).json(err);
      });
  }
});

// Route to delete a comment by ID (with authentication)
router.delete('/:id', withAuth, (req, res) => {
  Comments.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(dbCommentsData => {
      if (!dbCommentsData) {
        res.status(404).json({ message: 'No Comments found with this id' });
        return;
      }
      res.json(dbCommentsData);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json(err);
    });
});

module.exports = router;
