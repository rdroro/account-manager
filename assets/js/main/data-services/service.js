(function (app) {
	app.factory('AccountServices', function ($resource){
		return $resource('account/:accountId', {}, {
			query: {method:'GET', params:{accountId:''}, isArray:true},
			create: {method: 'POST'},
			delete: {method: 'DELETE'}
		});
	});
}(angular.module('AccountApp')));

(function (app) {
	app.factory('OutgoingServices', function ($resource){
		return $resource('outgoings/:outgoingId', {}, {
			query: {method:'GET', params:{outgoingId:''}, isArray:true},
			create: {method: 'POST'},
			delete: {method: 'DELETE'}
		});
	});
}(angular.module('AccountApp')));

(function (app) {
	app.factory('RecurringServices', function($resource){
	return $resource('recurring/:recurringId', {}, {
		query: {method:'GET', params:{recurringId:''}, isArray:true},
		create: {method: 'POST'},
		delete: {method: 'DELETE'}
	});
});
}(angular.module('AccountApp')));




