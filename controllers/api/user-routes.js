const router = require('express').Router();
const { User } = require('../../models');

// Route to create a new user
router.post('/', async (req, res) => {
  try {
    // Create a new user with the data provided in the request body
    const userData = await User.create(req.body);

    // Save the user's session and set session variables for user ID and login status
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;

      res.status(200).json(userData);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to handle user login
router.post('/login', async (req, res) => {
  try {
    // Find a user with the provided email
    const userData = await User.findOne({ where: { email: req.body.email } });

    if (!userData) {
      // If no user is found, respond with an error message
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Check if the provided password matches the stored password
    const validPassword = userData.checkPassword(req.body.password);

    if (!validPassword) {
      // If the password is not valid, respond with an error message
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    // Save the user's session and set session variables for user ID and login status
    req.session.save(() => {
      req.session.user_id = userData.id;
      req.session.loggedIn = true;
      
      res.json({ user: userData, message: 'You are now logged in!' });
    });

  } catch (err) {
    res.status(400).json(err);
  }
});

// Route to handle user logout
router.post('/logout', (req, res) => {
  console.log('log out route');

  if (req.session.loggedIn) {
    // If the user is logged in, destroy the session to log them out
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    // If the user is not logged in, respond with an error message
    res.status(404).end();
  }
});

module.exports = router;
