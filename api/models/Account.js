/**
 * Account
 *
 * @module      :: Model
 * @description :: Account is a representation of bank account for user
 */

 module.exports = {

 	attributes: {

 		userId: {
 			type: 'integer',
 			required: true
 		},
 		name: {
 			type: 'string',
 			required: true
 		},
 		balance: {
 			type: 'float',
 			required: 'true'
 		}
 	},

 	/**
 	* DE NOT USE THIS FUNCTION - Asynchronous issue
 	* Check if user id can access to the account in parameter
 	* @param int the account id
 	* @param int the user id
 	* @return boolean true if user can acess to the account false otherwise
 	*/
 	userIsOwner: function (accountid, userid) {
 		var searchedAccount = {
 			id: accountid,
 			userId: userid
 		};
 		return Account.findOne(searchedAccount).done(function (err, account) {
 			if (err) {
 				sails.log.error('Database access problem in model.Account.userIsOwner');
 				return false;
 			}

 			if (!account) {
 				sails.log.debug("Access denied");
 				return false;
 			}
 			sails.log.debug("Access allowed");
 			return true;
 		});
 	}
 };