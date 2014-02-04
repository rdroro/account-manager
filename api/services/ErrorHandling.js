/*
* ErrorHandling provide an helper to manage error to the client and log in server
* a 'resp' parameter is set on each function to respond to the client
* in a controller you can juste use like this:
* return ErrorHandling.internal(err, resp)
* each response is a json object like: {error : STRING}
* by default, each function log into the server via ERROR level
*/
module.exports = {


	/**
	* This function return a HTTP 500 error with the json object
	* {error: "Internal server error"} 
	* @param string error to display in log
	* @param object the response provide by controller
	* @return json object {error: "Internal server error"} and HTTP 500 error
	*/
	internal: function (err, resp) {
		return ErrorHandling.sendResponse(err, "Internal server errror", 500, resp);
	},

	/**
	* This function return a HTTP 403 error with the json object
	* {error: "Forbidden access"} 
	* @param string error to display in log
	* @param object the response provide by controller
	* @return json object {error: "Forbidden access"} and HTTP 403 error
	*/
	forbidden: function (err, resp) {
		return ErrorHandling.sendResponse(err, "Forbidden access", 403, resp);
	},

	/**
	* This function return a HTTP 404 error with the json object
	* {error: "Resource not found"} 
	* @param string error to display in log
	* @param object the response provide by controller
	* @return json object {error: "Resource not found"} and HTTP 404 error
	*/
	notfound: function (err, resp) {
		return ErrorHandling.sendResponse(err, "Resource not found", 404, resp);
	},

	/**
	* This function manage the behaviour of error handling
	* each other function in this object must call sendResponse
	* to send and log errors
	* @param string error to display in log
	* @param string the message to the client (will be inside errorReturn json object)
	* @param interger the HTTP error code
	* @param object the response provide by controller
	* @return json object {error: msg} and HTTP code error where msg and code are in parameters
	*/
	sendResponse: function (err, msg, code, resp) {
		sails.log(msg);
		sails.log(err);
		var error = {error:  msg };
		return resp.json(error, code);
	}
};