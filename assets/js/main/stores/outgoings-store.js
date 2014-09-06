(function (app) {
	var outgoingsStore = function ($http, AccountServices, OutgoingServices, RecurringServices) {
		this.outgoings = [];

		this.initialize = function (accountId, cb) {

			this.outgoings = OutgoingServices.query({account: accountId }, function (){
				cb();
			});

		};

		this.add = function (outgoing, cb) {
			var outgoingsArray = this.outgoings;
			OutgoingServices.create(outgoing).$promise.then(
				// success
				function (result) {
					outgoingsArray.push(result);
					cb(result);
				},
				// error
				function (error) {
					console.log("Error");
					console.log(error);
				}
				);
		};

		this.checkAction = function (outgoing, cb) {
			$http.get('/outgoings/checkedToggle/', { params: {id: outgoing.id }});
			cb();
		};

		this.delete = function (outgoing, cb) {
			var outgoingsArray = this.outgoings;
			OutgoingServices.delete(outgoing).$promise.then(
				// success
				function (result) {
					outgoingsArray.splice(outgoingsArray.indexOf(outgoing), 1);
					cb(result);
				},
				// error
				function (error) {
					console.log("Error");
					console.log(error);
				}
				);
		};

		this.getAllRecurring = function (accountId, cb) {
			RecurringServices.query({account: accountId }, function (result) {
				cb(result);
			}, function (error) {
				console.log("Error");
				console.log(error);
			});
		};

		this.createRecurring = function (outgoing, cb) {
			RecurringServices.create(outgoing, function (createdRecurring, responseHeaders){
				cb(createdRecurring);
			});
		};

		this.deleteRecurring = function (outgoing, cb) {
			RecurringServices.delete(outgoing, 
				function (deletedOutgoing, responseHeaders) {
					cb(outgoing);
				},
				function (error) {
					console.log("Error");
					console.log(error);
				}
				);
		};

		this.addAllRecurrings = function (accountId, cb) {
			$http.get('/recurring/add-all/'+accountId).then(
				function () {
					cb();
				}, function (error) {
					console.log("Error");
					console.log(error);
				}
			);
		}
	}


	app.service('OutgoingsStore', ['$http', 'AccountServices', 'OutgoingServices', 'RecurringServices', outgoingsStore]);
})(angular.module('AccountApp'));