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
   resp.view('angularView.ejs');
 },

 accountDetail: function (req, resp) {
  Account.findOneById(req.param('id'))
  .exec(function(err, currentAccount){
    Outgoings.findByAccount(currentAccount.id)
    .exec(function (err, outgoings) {
      if (err) {
        resp.send(500);
      }
      resp.view('account/accountDetail', {
        account: currentAccount,
        outgoings: outgoings
      });
    });
  });

}

};

module.exports = AccountController;
