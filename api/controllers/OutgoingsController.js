/**
 * OutgoingsController
 *
 * @module		:: Controller
 * @description	:: Contains logic for handling requests.
 */

 module.exports = {

  /* e.g.
  sayHello: function (req, res) {
    res.send('hello world!');
  }
  */

  /**
   * Override find function to return only outgoings
   * in the current month and unchecked outgoings
   *
   */
   find: function (req, resp) {
    var begin = new Date();
    begin.setDate(1);
    var accountId = req.param('account');

    // On récupère seulement les dépenses non checkées +
    // Celles dont la date de check est supérieur au premier jour du mois
    // en cours
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

  checkedToggle: function (req, resp) {
   var id = req.param('id');

   Outgoings.findOneById(id)
   .exec(function (err, outgoing){
    if (err) { return 'bad'; }
    Outgoings.checkedToggle(outgoing);
    return resp.send(200);
  });
 }


};
