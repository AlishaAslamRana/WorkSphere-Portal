var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WorkSphere' });
});
/* GET Dashboard Page */
router.get('/pagelayout', function(req, res) {
  res.render('pagelayout');
});

/* POST Login Route (Payload Receive & Redirect) */
router.post('/login', (req, res) => {
  const payload = {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password
  };
  console.log("Login Payload Received:", payload);
  res.redirect('/pagelayout');
})

//Password Validation Function (Returns true/false)
function validatePassword(password){
  if(!password) return false;
  const startsWithLetter = /^[a-zA-Z]/.test(password);
  const maxLength = password.length <= 8;
  const specialChar = /[!@#$%^&*"_(),:?.<>|{}]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return startsWithLetter && maxLength && specialChar && Number;
}

/* Post Sign Up Route */
router.post('/signup', (req, res) => {
  const{ username, email, password, confirm_password } = req.body;

  if(password === confirm_password && validatePassword(password)) {
    res.redirect('/pagelayout');
  }else{
    res.send("Validation Failed: Password rules not met.");
  }
});



module.exports = router;
