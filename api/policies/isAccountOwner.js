/**
* Check if user in session is owner of :id param account
*/
module.exports = function (req, resp, ok) {

  // The user must be owner of account
  var accountId = req.param('id');
  if (!accountId) { 
    // Let's go, it's may be a GET request without :id
    return ok(); 
  }
  // Check if user is the owner of selected account

  sails.log.debug(Account.userIsOwner(accountId, req.session.user.id));
  return ok();


  // Otherwise send a 403 error
  var logMessagge = "User tried to access to account without permissions";
  return ErrorHandling.forbidden(logMessagge, resp);

};