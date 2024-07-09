const router = require('express').Router();

const { send_email } = require('../controller/appController.js')


/** HTTP Reqeust */
router.post('/send_email', send_email);


module.exports = router;