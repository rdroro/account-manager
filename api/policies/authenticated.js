/**
 * Allow any authenticated user.
 */
 module.exports = function (req, resp, ok) {

  // User is allowed, proceed to controller
  if (req.session.user) {
  	return ok();
  }
  // User is not allowed
  else {
    //return resp.json({error: 'Need authenticated user'}, 401);
    return resp.view('signin');
  }
  
};