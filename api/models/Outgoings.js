/**
 * Outgoings
 *
 * @module      :: Model
 * @description :: Outgoings is a representation of outgoing for an account
 *
 */

 module.exports = {

 	attributes: {

 		account: 		'integer',
 		amount:			'float',
 		label: 			'string',
 		checked: {
 			type: 'boolean',
 			defaultsTo: false
 		},
 		checkedDate: {
 			type: 'string',
 			defaultsTo: '1990-01-16T08:01:00.310Z'
 		}
 	},

 	/* Checked or unchecked outgoing in parameter
 	* and add or remove it from the account balance */
 	checkedToggle: 	function(outgoing) {
 		outgoing.checked = outgoing.checked == true ? false : true;
 		outgoing.checkedDate = new Date();
 		outgoing.save(function(err) {
 			Account.findOneById(outgoing.account)
 			.exec(function (err, account){
 				if (outgoing.checked) {
 					account.balance += outgoing.amount;
 					account.balance = account.balance.toFixed(2);
 				}
 				else {
 					account.balance -= outgoing.amount;
 					account.balance = account.balance.toFixed(2);
 				}
 				account.save(function(err){
 					sails.log.debug("Status change for outgoing");
 				});
 			});
 		});
 	},
 };
