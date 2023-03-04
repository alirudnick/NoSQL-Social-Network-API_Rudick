const router = require('express').Router();
const usersRoutes = require('./usersroutes');
const thoughtsRoutes = require('./thoughtsroutes');

router.use('/users', userRoutes);
router.use('/thoughts', thoughtRoutes);

module.exports = router;
