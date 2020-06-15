const router=require('express').Router();

const google=require('../config/googlepassport');


router.get('/google',
google.authenticate('google',{scope:['profile']}));

/*--- gooogle callback function----*/

router.get('/google/redirect',google.authenticate('google'),
(req,res)=>{
  res.redirect('/event'); //redirecting to event page
});


module.exports=router;
