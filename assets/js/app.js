
angular.module('AccountApp', [
		'ngRoute',
		'angular-loading-bar',
		'ngResource',
	]);

angular.module('AccountApp').config(['$routeProvider', function ($routeProvider) {
	$routeProvider.when('/accounts', {
		templateUrl: '/templates/accountList.html',
		controller: 'AccountsListCtrl',
	});

	$routeProvider.when('/account/:accountId', {
		templateUrl: '/templates/accountDetail.html',
		controller: 'AccountCtrl'
	});

	$routeProvider.when('/recurring-outgoings/:accountId', {
		templateUrl: '/templates/recurring-outgoings.html',
		controller: 'RecurringCtrl'
	});

	$routeProvider.otherwise({redirectTo: '/accounts'});
}]);