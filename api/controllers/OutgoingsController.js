/**
* OutgoingsController
*
* @module		:: Controller
* @description	:: Contains logic for handling requests.
*/

module.exports = {

   /**
   * Overwrite the default behaviour of find
   * by retourning only outgoings for account in parameter
   * Method GET /outgoings/:account type interger
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
         if (err) {
           return ErrorHandling.internal(err, resp);
        }
        resp.json(outgoings, 200);
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
            return ErrorHandling.internal(err, resp);
         }
         Outgoings.checkedToggle(outgoing);
         return resp.send(200);
      });
   },

   /**
   * Overwrite the default behaviour of destroy
   * method DELETE /outgoings/id=INTEGER
   * Try to delete outgoing identified by id in parameter
   * condition : Delete unchecked outgoings
   */
   destroy : function (req, resp) {
      // Destroy only unchecked outgoing
      var id = req.param('id');
      Outgoings.findOne(id).done(function (err, outgoing) {
         if (err) {
            return ErrorHandling.internal(err, resp);
         }
         if (outgoing.checked) {
            return ErrorHandling.forbidden(err, resp);
         }
         outgoing.destroy(function (err) {
            if (err) {
               return ErrorHandling.internal(err, resp);
            }
            resp.send(200);
         });
      });
   }


};
