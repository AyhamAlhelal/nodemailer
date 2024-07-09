const router = require('express').Router();
const path = require( 'path' );

const { send_email } = require('../controller/appController.js')


/** HTTP Reqeust */
router.post('/send_email', send_email);

router.get( '/' , (req , res) => {
    res.sendFile( path.join( __dirname , '../public' , 'index.html') );
} );


module.exports = router;