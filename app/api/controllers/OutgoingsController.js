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
