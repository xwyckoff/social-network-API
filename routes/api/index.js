const router = require('express').Router();
const users = require('./userRoutes');

router.use('/Users', users);

module.exports = router;