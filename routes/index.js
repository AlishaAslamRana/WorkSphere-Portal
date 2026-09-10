var express = require('express');
var router = express.Router();
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'WorkSphere' });
});
/* GET PageLayout Page */
router.get('/pagelayout', function(req, res) {
  res.render('pagelayout');
});
// GET Dashboard Page
router.get('/dashboard', (req, res) => {
  res.render('dashboard'); // views/dashboard.ejs file ko render karega
});
// GET Orders Page
router.get('/orders', (req, res) => {
  const ordersData = [
    {id: "ORD-101", name: "Ali Khan", email: "alikhan@gmail.com", price: "500.00", status: "Completed"},
    {id: "ORD-102", name: "Ayesha Aslam", email: "ayeshaaslam@gmail.com", price: "280.50", status: "Pending"},
    {id: "ORD-103", name: "Roha Jibran", email: "rohajibran@gmail.com", price: "1000.00", status: "Processing" },
    {id: "ORD-104", name: "Ahmad Latif", email: "ahmadlatif@gmail.com", price: "300.00", status: "Completed"},
    {id: "ORD-105", name: "Momina Tariq", email: "mominatariq@gmail.com", price: "220.00", status: "Cancelled" },
    {id: "ORD-106", name: "Qaisar Ali", email: "qaisarali@gmail.com", price: "910.00", status: "Pending"},
    {id: "ORD-107", name: "Fatima Noor", email: "fatimanoor@gmail.com", price: "750.75", status: "Processing"},
    {id: "ORD-108", name: "Zainab Raza", email: "zainabraza@gmail.com", price: "400.00", status: "Completed"}
    
  ];
  res.render('orders', { orders: ordersData });
});

// Currently logged-in user data
let currentUser = {
  username: "",
  email: "",
  password: ""
};

// GET Profile Page
router.get('/profile', (req, res) => {
  res.render('profile', { user: currentUser, error: null, success: null });
});

// POST Profile Update Route
router.post('/profile', (req, res) => {
  const { username, email, password } = req.body;

  if (!validatePassword(password)) {
    return res.send("Validation Failed: Password rules not met.");
  }

  // Update global/session object
  currentUser = { username, email, password };

  // res.render ke bajaye redirect karein
  res.redirect('/profile');
});
/* POST Login Route (Payload Receive & Redirect) */
router.post('/login', (req, res) => {
  currentUser = {
    username: req.body.username || "User",
    email: req.body.email || "",
    password: req.body.password || ""
  };
  console.log("Login Payload Received:", currentUser);
  res.redirect('/pagelayout');
});

//Password Validation Function (Returns true/false)
function validatePassword(password){
  if(!password) return false;
  const startsWithLetter = /^[a-zA-Z]/.test(password);
  const maxLength = password.length <= 8;
  const specialChar = /[!@#$%^&*"_(),:?.<>|{}]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  return startsWithLetter && maxLength && specialChar && hasNumber;
}

/* Post Sign Up Route */
router.post('/signup', (req, res) => {
  const { username, email, password, confirm_password } = req.body;

  if(password === confirm_password && validatePassword(password)) {
    currentUser = { username, email, password };
    res.redirect('/pagelayout');
  } else {
    res.send("Validation Failed: Password rules not met.");
  }
});

router.get('/logout', (req, res) => {
  if(req.session) {
    req.session.destroy((err) => {
      if(err) {
        return res.status(500).send('Logout Failed');
      }
      res.clearCookie('connect.sid');
      return res.redirect('/');
    });
  } else {
    res.redirect('/');
  }
});
router.get('/login', (req, res) => {
  res.render('index'); 
});

module.exports = router;
