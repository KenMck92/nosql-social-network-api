const router = require('express').Router();
const thoughtRoute = require('./thoughtRoute');
const userRoutes = require('./userRoutes');

router.use('/apps', thoughtRoute);
router.use('/users', userRoutes);

module.exports = router;
