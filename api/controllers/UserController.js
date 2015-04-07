/**
 * UserController
 *
 * @description :: Server-side logic for managing Users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

	index: function (req, res) {
		console.log(req.session);

		return res.view('homepage.html');
	},

	// route.js
	// 'POST /edit/:id'  : 'UserController.edit', -> req.params.id 를 보면 됨.

	// 프로필 수정하는 기능
	edit: function (req, res) {
		// var query = { id: req.params.id }; // 그냥 id 만 넣어도 됨
		var query = req.params.id;
		// id 는 일반적인 경우 자동으로 생성되는 숫자 혹은 숫자+문자의 값, OBJECT_ID 등

		// 찾고, 수정하고, 콜백
		User.update(query, req.body, function (err, users) {
			if (err) return res.serverError(err);
			if (users.length === 0) return res.serverError('USER_NOT_FOUND');

			return res.view('profile.html', users[0]);
		});
	},

	logout: function (req, res) {
    delete req.session.user_id;

    return res.redirect('/login');
  },

	login: function (req, res) {
		console.log(req.body);

		var query = { email: req.body.email };

		User.findOne(query, function (err, user) {
			if (err) return res.serverError(err);
			if (!user) return res.serverError('USER_NOT_FOUND');

			// 해당 이메일을 가진 유저는 있음.
			if ( user.password !== req.body.password )
				return res.serverError('PASSWORD_NOT_MATCH');

			req.session.user_id = user.id;

			return res.view('profile.html', user);
		});
	},

  // EXPRESS.js
	admin: function (req, res) {
    res.send('SUCCESS');
  },

  // CLIENT OK.
  client: function (req, res) {
    res.send('CLIENT OK');
  },

  signup: function (req, res) {
    console.log(req.query);

    res.view('signup');
  },

	// admin: function (req, res ) {
	// 	User
	// 		.count({})
	// 		.then(function (count) {
	// 			if ( count === 0 ) req.body.permission = 'ADMIN';
	//
	// 			return User.create(req.body);
	// 		})
	// 		.then(function (user) {
	// 			return res.redirect('/login');
	// 		});
	// },

  // create: function (req, res) {
  //   console.log(req.body);
	//
  //   // POST -> req.body;
  //   // GET ?name=관석 -> req.query;
  //   // ROUTE/:id -> req.params.id;
	//
  //   // ROUTE 생성하는 방법
  //   // 생성된 ROUTE 를 CONTROLLER 와 연결하는 방법
  //   // HTTP POST REQUEST -> 값을 확인하는 방법 -> req.body
  //   // res. send, json, view, serverError
  //   // + Validation 방법 -> Javascript
	//
  //   // JSON.hasOwnProperty()
  //   // VALIDATION
  //   if ( !req.body.hasOwnProperty('email') ||
  //        !req.body.email.length > 0 ||
  //        !validateEmail(req.body.email) ) {
  //     return res.serverError('EMAIL_NOT_FOUND');
  //   }
	//
  //   if ( !req.body.hasOwnProperty('password') ) {
  //     return res.serverError('PASSWORD_NOT_FOUND');
  //   }
	//
  //   if ( !req.body.password.length > 6 ) {
  //     return res.serverError('PASSWORD_TOO_SHORT');
  //   }
	//
  //   // PASSWORD가 일단 있고, 그 길이가 6자 이상일때만 Password OK 출력
	//
  //   // 이름이 길이가 0보다 크면 Name OK
	//
  //   // EMAIL 체크 else 서버에러
  //   // PASSWORD 체크 잘못된 거면 서버에러
  //   // NAME 체크 else 서버에러
  //   // req.body = 'name';
	//
  //   // User.create(req.body) -> function (err, user) {};
	//
  //   // CREATE / READ / UPDATE / DELETE
	//
  //   // req.body 인 User 를 만들거에요.
  //   User.create(req.body, function (err, user) {
  //     if (err) {
  //       console.log('ERROR:', err);
  //       return res.serverError(err.message);
  //     }
	//
  //     // return res.json(user);
  //     return res.redirect('/signup');
  //   });
  // },

  // sails generate api User 했기 때문에 User.~~~ 를 사용할 수 있음.

  drop: function (req, res) {
    console.log(req.query);

    // User db 에서 id 가 req.query.id 인 놈을 지울거에요.
    User.destroy({ id: req.query.id }, function (err, user) {
      if (err) {
        console.log('ERROR:', err);
        return res.serverError(err.message);
      }

      return res.json(user);
      // return res.redirect('/signup');
    });
  },
};

function validateEmail(email) {
  var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

	return re.test(email);
}
