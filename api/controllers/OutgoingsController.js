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
  //  find: function (req, resp) {
  //   var begin = new Date();
  //   var end = new Date();
  //   begin.setDate(20);
  //   end.setDate(31);

  //   Outgoings.find({
  //     where: {
  //       or: [
  //       { 
  //         createdAt: {
  //           '>=': begin.toJSON() 
  //         }
  //       },
  //       { 
  //         checkedDate: ""
  //       }
  //       ]
  //     }
  //   }).exec( function (err, outgoings) {
  //     console.log(outgoings);
  //     resp.send(outgoings);
  //   });
  // },

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
