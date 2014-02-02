'use strict';

/* App Module */

var myApp = angular.module('AccountApp', ['ngRoute', 'AccountServices', 'OutgoingServices']).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/accounts', {templateUrl: '/templates/accountList.html',   controller: 'AccountCtrl'}).
	when('/create-account', {templateUrl: '/templates/createAccount.html', controller: "AccountCtrl"}).
	when('/account/:accountId', {templateUrl: '/templates/accountDetail.html',   controller: 'OutgoingCtrl'}).
	otherwise({redirectTo: '/accounts'});
}]);
