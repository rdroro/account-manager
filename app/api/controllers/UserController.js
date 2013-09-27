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
  	var login = req.param('login');
  	var password = req.param('password');

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
  			console.log('connexion OK');
  			resp.send(200);
  		} else {
  			resp.send(403);
  		}
  	});
  }

};

module.exports = UserController;
