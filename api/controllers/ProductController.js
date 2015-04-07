/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {
	create: function (req, res) {
		// User.findOne(req.session.user_id, function (err, user) {
		// 	if (err) return res.serverError(err);
		// 	if ( !user || user.permission !== 'ADMIN' ) return res.serverError('PERMISSION_NOT_GRANTED');
		//
		// 	Product.create(req.body, function (err, product) {
		// 		if (err) return res.serverError(err);
		//
		// 		return res.redirect('/product');
		// 	});
		// });

		// PROMISE PATTERN - Bluebird module
		User
			.findOne(req.session.user_id) // Session User 가 관리자인가
			.then(function (user) {
				if ( !user || user.permission !== 'ADMIN' ) throw new Error('PERMISSION_NOT_GRANTED');

				req.body.createdBy = user.id; // 관리자가 맞으니 누가 만들었는지 값을 넣어준다

				return Product.create(req.body); // 프로덕트 만들어 준다
			})
			.then(function (product) {
				return res.redirect('/product');
			})
			.catch(function (err) {
				if (err) console.log('ERROR:', err);

				return res.serverError(err);
			});

		// async.waterfall([
		// 	function FindUser (callback) {
		// 		User.findOne(req.session.user_id, function (err, user) {
		// 			if (err) callback (err);
		//
		// 			callback(null, user);
		// 		});
		// 	},
		//
		// 	function CreateUser (user, callback) {
		// 		Product.create(req.body, function (err, product) {
		// 			if (err) callback (err);
		// 			if ( !user || user.permission !== 'ADMIN' ) return res.serverError('PERMISSION_NOT_GRANTED');
		//
		// 			callback(null, user, product);
		// 		});
		// 	},
		//
		// 	function Finally (user, product, null) {
		// 		return res.redirect('/product');
		// 	}
		// ]);
	},

	index: function (req, res) {
		Product
			.find({})
			.populateAll()
			.then(function (products) {
				var result = { products: products };
				return res.view('product.html', result);
			})
			.catch(function (err) {
				return res.serverError(err);
			});
	}
};
