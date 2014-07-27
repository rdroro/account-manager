/**
 * RecurringController
 *
 * @module      :: Controller
 * @description	:: A set of functions called `actions`.
 *
 *                 Actions contain code telling Sails how to respond to a certain type of request.
 *                 (i.e. do stuff, then send some JSON, show an HTML page, or redirect to another URL)
 *
 *                 You can configure the blueprint URLs which trigger these actions (`config/controllers.js`)
 *                 and/or override them with custom routes (`config/routes.js`)
 *
 *                 NOTE: The code you write here supports both HTTP and Socket.io automatically.
 *
 * @docs        :: http://sailsjs.org/#!documentation/controllers
 */

 module.exports = {

 	addAllRecurringOutgoings: function (req, resp) {
  	// Check params
  	if (!req.param('id')) {
  		return ErrorHandling.internal(err, resp);
  	}

  	var accountId = req.param('id');

  	Recurring.findByAccount(accountId).done(function (err, recurrings){
  		if (err) {
  			return ErrorHandling.internal(err, resp);
  		}

  		recurrings.forEach(function(item){
  			var outgoing = {
  				account: accountId,
  				label: item.label,
  				amount: item.amount
  			}

  			Outgoings.create(outgoing, function(err, created) {
  				if (err) {
  					return ErrorHandling.internal(err, resp);
  				}
  			});

  		});

  		resp.send(200);
  	});
  },


  /**
   * Overrides for the settings in `config/controllers.js`
   * (specific to RecurringController)
   */
   _config: {}


};
