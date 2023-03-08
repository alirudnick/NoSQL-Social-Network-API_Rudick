const router = require('express').Router();
const usersRoutes = require('./usersroutes');

router.use('/', usersRoutes);

module.exports = router;
