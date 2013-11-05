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
  	if (req.isAjax) {
  		return resp.send(403, 'Need authenticated user');
  	} else {
  		return resp.view('user/signin');
  	}
  }
  
};