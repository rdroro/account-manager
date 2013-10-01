/**
 * UserController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

 var UserController = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */

  signin: function (req, resp) {
    if (req.session.user) {
      return resp.redirect('/accounts');
    }
  	var login = req.param('login');
  	var password = req.param('password');

    if (!login || ! password) {
      resp.send(403);
      return;
    }

  	User.findOneByLogin(login)  	
  	.exec(function(err, user){
  		if (err) {
  			// Do error stuff
  			resp.send(500, {error: 'Data Access Error'});
  			return;
  		} 

  		if (user.length === 0) {
  			resp.send(403);
  			return;
  		}

  		// Login found, let's check password
  		var c = require('crypto');
  		var md5Hasher = c.createHash('md5');
  		md5Hasher.update(password);

  		var goodPassword = md5Hasher.digest('hex')
  		if (goodPassword === user.password) {
        req.session.user = user;
        Account.findByUserId(user.id)
        .exec(function (err, accounts) {
          req.session.user.accounts = accounts;
        });
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
