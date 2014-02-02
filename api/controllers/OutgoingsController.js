/**
* OutgoingsController
*
* @module		:: Controller
* @description	:: Contains logic for handling requests.
*/

module.exports = {

   error: function (msg, code, resp) {
      resp.json({error: msg}, code);
   },

   /**
   * Method GET /outgoings/account=INTERGER
   * return only outgoings for account in parameter
   * outgoings filter : checked = false or checkedDate in current month
   */
   find: function (req, resp) {
      // Set date to the first day of the month
      var begin = new Date();
      begin.setDate(1);
      begin.setHours(0, 0, 0, 0);

      var accountId = req.param('account');
      Outgoings.find()
      .where({account: accountId})
      .where( {
         or: [
         { 
            checked: false
         },
         { 
            checkedDate: {
               ">=": begin.toJSON()
            }
         }
         ]
      }
      ).exec( function (err, outgoings) {
         resp.send(outgoings);
      });
   },

   /**
   * method GET /outgoings/checkedToggled?id=INTEGER
   * Try to change status of checked for the outgoing identified by id in parameter
   */
   checkedToggle: function (req, resp) {
      var id = req.param('id');

      Outgoings.findOneById(id)
      .exec(function (err, outgoing){
         if (err) { 
            return sails.controllers.outgoings.error(
               "Ressource not found!", 
               404, 
               resp);
         }
         Outgoings.checkedToggle(outgoing);
         return resp.send(200);
      });
   },

   /**
   * method DELETE /outgoings/id=INTEGER
   * Try to delete outgoing identified by id in parameter
   * condition : Delete unchecked outgoings
   */
   destroy : function (req, resp) {
      // Destroy only unchecked outgoing
      var id = req.param('id');
      Outgoings.findOne(id).done(function (err, outgoing) {
         if (err) {
            return sails.controllers.outgoings.error(
               "Server error. Please contact administrator", 
               503, 
               resp);
         }
         if (outgoing.checked) {
            return sails.controllers.outgoings.error(
               "You can't remove a checked outgoing. Please unchecked it and try again", 
               403, 
               resp);
            

         }
         outgoing.destroy(function (err) {
            if (err) {
               return sails.controllers.outgoings.error(
                  "Server error. Please contact administrator", 
                  503, 
                  resp);
            }
            resp.send(200);
         });
      });
   }


};
