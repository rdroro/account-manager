/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

 var UserController = {

  index : function (req, resp) {
    if (req.session.user) {
      return resp.redirect('/accounts');
    }
    return resp.view('signin');
  },

  /**
   *
   * Use to login users.
   * req.param("login") is the user's login
   * req.param("password") is the sha1 password
   */
   signin: function (req, resp) {
    if (req.session.user) {
      return resp.redirect('/accounts');
    }
    var login = req.param('login');
    var password = req.param('password');

    if (!login || !password) {
      resp.send(403);
      return;
    }


    User.findOneByLogin(login)  	
    .done(function(err, user){
      if (err) {
  			// Do error stuff
  			resp.send(500, {error: 'Data Access Error'});
  			return;
  		} 

      if (!user) {
        return resp.send(403);
      }

      if (password === user.password) {
        req.session.user = user;
        Account.findByUserId(user.id)
        .exec(function (err, accounts) {
          req.session.user.accounts = accounts;
        });
        if (req.answerPage) {
          return resp.redirect(req.answerPage);
        }
        resp.redirect('/accounts');
      } else {
       resp.send(403);
     }
   });
  },

  signout:  function (req, resp) {
    delete req.session.user;
    return resp.redirect('/');
  }

};

module.exports = UserController;
