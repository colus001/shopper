/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!documentation/policies
 *
 */

  // GET localhost:1337/
 // MIDDLE WARE -> express
module.exports = function(req, res, next) {
  console.log(req.session);

  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if ( req.session && req.session.user_id ) return next();

  return res.redirect('/login');
  // return res.forbidden();

  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  // return res.forbidden('You are not permitted to perform this action.');
};
