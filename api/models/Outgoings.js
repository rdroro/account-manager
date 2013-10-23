/**
 * Outgoings
 *
 * @module      :: Model
 * @description :: Outgoings is a representation of outgoing for an account
 *
 */

 var Outgoings = {

 	attributes: {

 		account: 		'integer',
 		amount:			'float',
 		label: 			'string',
 		checked: 		'boolean',
 		checkedDate: { 	
 			type: 'date',
 			defaultsTo: '1990-01-16T08:01:00.310Z'
 		}
 	},

 	/**
 	 * Checked or unchecked outgoing in parameter
 	 * and add or remove it from the account balance 
 	 */
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
 	 				console.log("operation Done");
 	 			});
 	 		});
 	 	});
 	 }
 	};

 	module.exports = Outgoings;
