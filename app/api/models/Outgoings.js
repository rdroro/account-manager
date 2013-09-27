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
  	checkedDate:  	'date'
    
  }

};

module.exports = Outgoings;
