var LocalStrategy = require('passport-local').Strategy,
    FacebookStrategy = require('passport-facebook').Strategy,
    User = require('../models/User');

module.exports = function(passport) {
  passport.serializeUser(function(user, done) {
    done(null, user.id);
  });

  passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
      done(err, user);
    });
  });

  passport.use('local-signin', new LocalStrategy({
    usernameField : 'email',
    passwordField : 'password',
    passReqToCallback : true
  }, function(req, email, password, done) {
    process.nextTick(function () {
      User.findOne({email: email}, function(err, user) {
        if (err) {
          return done(err);
        }

        if (!user) {
          return done(null, false, req.flash('danger', '존재하지 않는 사용자입니다.'));
        }

        if (!user.validatePassword(password)) {
          return done(null, false, req.flash('danger', '비밀번호가 일치하지 않습니다.'));
        }

        return done(null, user, req.flash('success', '로그인 성공'));
      });
    });
  }));

  passport.use(new FacebookStrategy({
    // 이 부분을 여러분 Facebook App의 정보로 수정해야 합니다.
    clientID : '1876060739291208',
    clientSecret : 'f5ae0b848d5bb0019b69255e1b440845',
    callbackURL : 'http://localhost:3000/auth/facebook/callback',
    profileFields : ["emails", "displayName", "name", "photos"]
  }, function(token, refreshToken, profile, done) {
    console.log(profile);
    // var email = profile.emails[0].value;
    var email = 'chae-yeon@nate.com';
    process.nextTick(function () {
      User.findOne({'facebook.id': profile.id}, function(err, user) {
        if (err) {
          return done(err);
        }
        if (user) {
          return done(null, user);
        } else {
          User.findOne({email: email}, function(err, user) {
            if (err) {
              return done(err);
            }
            if (!user) {
              user = new User({
                name: profile.displayName,
                // email: profile.emails[0].value
                email: email
              });
            }
            user.facebook.id = profile.id;
            user.facebook.token = profile.token;
            user.facebook.photo = profile.photos[0].value;
            user.save(function(err) {
              if (err) {
                return done(err);
              }
              return done(null, user);
            });
          });
        }
      });
    });
  }));
};
