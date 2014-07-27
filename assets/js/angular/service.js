'use strict';

/* Services */

angular.module('AccountServices', ['ngResource']).
factory('Account', function($resource){
	return $resource('account/:accountId', {}, {
		query: {method:'GET', params:{accountId:''}, isArray:true},
		create: {method: 'POST'},
		delete: {method: 'DELETE'}
	});
});

angular.module('OutgoingServices', ['ngResource']).
factory('Outgoing', function($resource){
	return $resource('outgoings/:outgoingId', {}, {
		query: {method:'GET', params:{outgoingId:''}, isArray:true},
		create: {method: 'POST'},
		delete: {method: 'DELETE'}
	});
});

angular.module('UserServices', ['ngResource']).
factory('User', function($resource){
	return $resource('user/:userId', {}, {
		query: {method:'GET', url: 'user/find/:userId', params:{userId:''}, isArray:true},
		create: {method: 'POST', url: "user/create"},
		delete: {method: 'DELETE'}
	});
});




