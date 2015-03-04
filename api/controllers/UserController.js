/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  // EXPRESS.js
	admin: function (req, res) {
    res.send('SUCCESS');
  },

  // CLIENT OK.
  client: function (req, res) {
    res.send('CLIENT OK');
  },

  signup: function (req, res) {
    res.view('signup');
  },

  create: function (req, res) {
    console.log(req.body);

    // POST -> req.body;
    // GET ?name=관석 -> req.query;
    // ROUTE/:id -> req.params.id;

    // ROUTE 생성하는 방법
    // 생성된 ROUTE 를 CONTROLLER 와 연결하는 방법
    // HTTP POST REQUEST -> 값을 확인하는 방법 -> req.body
    // res. send, json, view, serverError
    // + Validation 방법 -> Javascript

    // JSON.hasOwnProperty()
    // VALIDATION
    if ( !req.body.hasOwnProperty('email') ||
         !req.body.email.length > 0 ||
         !validateEmail(req.body.email) ) {
      return res.serverError('EMAIL_NOT_FOUND');
    }

    if ( !req.body.hasOwnProperty('password') ) {
      return res.serverError('PASSWORD_NOT_FOUND');
    }

    if ( !req.body.password.length > 6 ) {
      return res.serverError('PASSWORD_TOO_SHORT');
    }

    // PASSWORD가 일단 있고, 그 길이가 6자 이상일때만 Password OK 출력

    // 이름이 길이가 0보다 크면 Name OK

    // EMAIL 체크 else 서버에러
    // PASSWORD 체크 잘못된 거면 서버에러
    // NAME 체크 else 서버에러
    // req.body = 'name';

    // User.create(req.body) -> function (err, user) {};

    // 1.
    User.create(req.body, function (err, user) {
      if (err) {
        console.log('ERROR:', err);
        return res.serverError(err.message);
      }

      return res.json(user);
    });
  },

};

function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}