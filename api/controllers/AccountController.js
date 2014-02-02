  /**
  * AccountController
  *
  * @module		:: Controller
  * @description	:: Contains logic for handling requests.
  */

  var AccountController = {

    accountList: function (req, resp) {
      resp.view("angularView");
    },

    create: function (req, resp) {
      req.body.userId = req.session.user.id;
      Account.create(req.body, function (err, createdAccount){
        if (err) {
          resp.json({error: "Immpossible to create account"}, 500);
        }
        return resp.json(createdAccount, 200);
      });
    },

    find: function (req, resp) {
      if (req.query.id) {
        Account.findOneById(req.query.id).done(function(err, account){
          resp.json(account);
        });
        return;
      }
      Account.findByUserId(req.session.user.id).done(function(err, accounts){
        resp.json(accounts);
      });
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
