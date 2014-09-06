(function (app) {

	var accountListCtrl = function ($scope, AccountsStore) {

		$scope.accounts = AccountsStore.accounts;

	}
	
	app.controller('AccountsListCtrl', ['$scope', 'AccountsStore', accountListCtrl]);
})(angular.module('AccountApp'));