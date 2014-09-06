'use strict';

/* App Module */

var myApp = angular.module('AccountApp', ['ngRoute', 'AccountServices', 'OutgoingServices', 'UserServices', 'RecurringServices']).
config(['$routeProvider', function($routeProvider) {
	$routeProvider.
	when('/accounts', {templateUrl: '/templates/accountList.html',   controller: 'AccountCtrl'}).
	when('/create-account', {templateUrl: '/templates/createAccount.html', controller: "AccountCtrl"}).
	when('/account/:accountId', {templateUrl: '/templates/accountDetail.html',   controller: 'OutgoingCtrl'}).
	when('/users', {templateUrl: '/templates/usersList.html',   controller: 'UserCtrl'}).
	when('/recurring-outgoings/:accountId', {templateUrl: '/templates/recurring-outgoings.html',   controller: 'RecurringCtrl'}).
	otherwise({redirectTo: '/accounts'});
}]);
