var express = require('express');
var router = express.Router();
var Room = require('../models/Room');
var User = require('../models/User');
var Reservation = require('../models/Reservation');


function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

// router.get('/', needAuth, function(req, res, next) {
//   res.render('rooms/confirm');
// });

router.get('/', needAuth, function(req, res, next) {
  // Reservation.findById
  res.render('rooms/confirm');
});


// router.get('/cities', needAuth, function(req, res, next) {
//   Room.find({city: req.query.city}, function(err, result) {
//     if (err) {
//       return next(err);
//     }
//     console.log(result);
//     res.render('rooms/cities', {rooms: result});
//   });
// });

// router.get('/reservation', needAuth, function(req, res, next) {
//     res.render('rooms/reservation', {reservation: {}});
// });

module.exports = router;
