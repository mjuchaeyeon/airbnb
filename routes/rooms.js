var express = require('express');
var Room = require('../models/Room'),
    User = require('../models/User'),
    Reservation= require('../models/Reservation');
var router = express.Router();

/*
대표적인 HTTP Method
GET: 서버에게 리소스를 보내달라고 요청
     주소 창에 주소를 입력하면 이 신호는 get으로 요청
POST: 서버에게 리소스 보내면서 생성해달라고 요청
      DB에 새로운 정보가 등록되거나, 사진 업로드하면 등록되거나
PUT: 서버에게 리소스를 추가 및 생성해달라고 요청
     POST와의 차이점은 뭔가요?
DELETE: 서버에게 리소스 삭제 요청
*/

function needAuth(req, res, next) {
  if (req.isAuthenticated()) {
    next();
  } else {
    req.flash('danger', '로그인이 필요합니다.');
    res.redirect('/signin');
  }
}

router.get('/', needAuth, function(req, res, next) {
  Room.find({}, function(err, result) {
    if (err) {
      return next(err);
    }
    // rooms에서 jade 파일을 실행시켜줘
    // 그리고 변수는 {} 인데 그 안에  jade 파일이 그리는데 쓰는 변수를 넣으면 됨. (함수처럼)
    res.render('rooms/rooms', {rooms: result});
  });
});



router.get('/new', needAuth, function(req, res, next) {
  res.render('rooms/edit', {rooms: {}});
});

/*
리소스를 추가 및 생성하는 post method
post method로 이 url이 들어오면 호출
db에 email, title, password, content를 저장
*/
router.post('/', needAuth, function(req, res,next){
    // console.log(req.body);
    var room = new Room();
    room.host = req.user.name;
    room.city = req.body.city;
    room.title = req.body.title;
    room.address = req.body.address;
    room.charge = req.body.charge;
    room.comment = req.body.comment;
    room.save(function(err, result) {
        if(err){
            next(err);
        }
        res.render('rooms/show', {rooms: result});
    });
});

/*
delete 메소드로 /:id url이 들어왔을 때 호출되는 함수
들어온 id 값을 찾고 삭제하는 함수를 수행한 다음 redirect
*/
router.delete('/:id', function(req, res, next) {
  Room.findOneAndRemove({_id: req.params.id}, function(err) {
    if (err) {
      return next(err);
    }
    res.redirect('/rooms');
  });
});

/*
get 메소드로 /:id/edit가 들어올 때 호출
글수정 누르면, localhost:3000/posts/583ac6fb603c8208e0d49165/edit 에서
edit.jade가 render됨. 기존 정보가 자동으로 입력되게 함 */
router.get('/:id/edit', function(req, res, next) {
  Room.findById(req.params.id, function(err, result) {
    if (err) {
      return next(err);
    }
    res.render('rooms/edit', {rooms: result});
  });
});

/* put 메소드로 /:id가 들어올 때 호출
localhost:3000/posts/583ac6fb603c8208e0d49165?_method=PUT
완료 버튼 누르고 실행
*/
router.put('/:id', function(req, res, next) {
  Room.findById(req.params.id, function(err, room) {
      if(err) {
          return next(err);
      }
      /* 비밀번호가 일치하지 않으면 back을 redirect */
      // if(room.password !== req.body.password){
      //     return res.redirect('back');
      // }
      room.city = req.body.city;
      room.title = req.body.title;
      room.address = req.body.address;
      room.charge = req.body.charge;
      room.comment = req.body.comment;
      // if(req.body.password) {
      //     room.password = req.body.password;
      // }
      room.save(function(err) {
          if(err){
              return next(err);
          }
          res.render('rooms/show', {rooms: room});
      });
  });
});

/*
url에 id를 얻었을 때 호출되는 함수 (?)
조회수를 +1 하고 다시 저장
다시 저장된 post 정보를 show.jade로 보냄
*/ 
router.get('/:id', function(req, res, next) {
  Room.findById(req.params.id, function(err, result) {
    if (err) {
      return next(err);
    }
    result.read = result.read + 1;
    result.save();
    res.render('rooms/show', {rooms: result});
  });
});

module.exports = router;