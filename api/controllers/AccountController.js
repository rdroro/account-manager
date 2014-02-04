  /**
  * AccountController
  *
  * @module		:: Controller
  * @description	:: Contains logic for handling requests to access on model.Account
  */

  var AccountController = {

    /**
    * Entry point of authenticated user
    * this function display the main angular view see views/angularView.ejs
    * @return the view angularView.ejs with HTTP code 200
    */
    accountList: function (req, resp) {
      resp.view("angularView");
    },

    /**
    * Overwrite the default behaviour of creation
    * by setting the user.id in session into the body request
    * POST /account/create with following body 
    * { 
    *   name: STRING required
    *   balance: float required
    * }
    * @return json object representation of just created model.Account (see model.Account)
    */
    create: function (req, resp) {
      req.body.userId = req.session.user.id;
      Account.create(req.body, function (err, createdAccount){
        if (err) {
          return ErrorHandling.internal(err, resp);
        }
        return resp.json(createdAccount, 200);
      });
    },

    /**
    * Overwrite the default behaviour of find
    * by returning only session user's Accounts
    * GET /account return json array of Account (see model.Account)
    * GET /account/:id return json object of an Account where account.id = id
    * @return json object of model.Account if :id is set
    * json array of json model.Account object (see model.Account)
    */
    find: function (req, resp) {
      if (req.query.id) {
        Account.findOneById(req.query.id).done(function(err, account){
          if (err) {
            return ErrorHandling.internal(err, resp);
          }
          resp.json(account);
        });
        return;
      }
      Account.findByUserId(req.session.user.id).done(function(err, accounts){
        if (err) {
          return ErrorHandling.internal(err, resp);
        }
        resp.json(accounts);
      });
    }

  };

  module.exports = AccountController;
