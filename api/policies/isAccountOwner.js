/**
 * Check if user in session is owner of :id param account
 */
 module.exports = function (req, resp, ok) {

  // The user must be owner of account
  var accountId = req.param('account');
  if (!accountId) { return resp.send(404); }
  var accountList = req.session.user.accounts;
  // Check if user is the owner of selected account
  /*User is the owner if account is in the list
  req.session.user.account/. List is set during signin action*/
  for (var i = 0; i < accountList.length; i++) {
   if (accountList[i].id == accountId) {
    return ok();
  }
}

return resp.send(403, 'You are not the Owner of account');
};