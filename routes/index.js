const router = require('express').Router();
const appRoutes = require('./appRoutes');
const userRoutes = require('./userRoutes');
// Import all of the API routes from /api/index.js (no need for index.js though since it's implied)
const apiRoutes = require('./api');

// add prefix of `/api` to all of the api routes imported from the `api` directory
router.use('/api', apiRoutes);

router.use('/apps', appRoutes);
router.use('/users', userRoutes);

router.use((req, res) => {
    res.status(404).send('404 Error');
  });

module.exports = router;

