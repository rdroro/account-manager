/**
 * AccountController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

 var AccountController = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */

  accountList: function (req, resp) {
   resp.view('account/accountList', {
    accounts: req.session.user.accounts
  });
 },

 accountDetail: function (req, resp) {
    // isAccountOwner set req.param.account
    var currentAccount = req.param.account;
    resp.send('200', currentAccount.name+' is own');
  }
  

};

module.exports = AccountController;
