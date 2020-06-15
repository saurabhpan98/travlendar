module.exports = {
    forwardAuthenticated: function(req, res, next) {
      console.log("true");
      if (!req.isAuthenticated()) {
        return next();
      }
     
      res.redirect('/profile.html');
    }
  };