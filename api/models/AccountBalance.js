/**
 * AccountBalance
 *
 * @module      :: Model
 * @description :: AAccountBalance store month balance for each account
 *
 */

 var AccountBalance = {

 	attributes: {


 		accountId: 		'string',
 		date: 			'date',
 		balance: 		'float'

 	}

 };

 module.exports = AccountBalance;
