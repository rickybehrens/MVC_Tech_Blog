const router = require('express').Router();
const apiRoutes = require('./api'); // Import API routes
const homeRoutes = require('./home-routes.js'); // Import home-related routes
const dashboardRoutes = require('./dashboard-routes.js'); // Import dashboard-related routes

// Use the API routes for paths starting with /api
router.use('/api', apiRoutes);

// Use the home-related routes for the root path '/'
router.use('/', homeRoutes);

// Use the dashboard-related routes for paths starting with /dashboard
router.use('/dashboard', dashboardRoutes);

// If no routes match, respond with a 404 error
router.use((req, res) => {
  res.status(404).end();
});

module.exports = router;
