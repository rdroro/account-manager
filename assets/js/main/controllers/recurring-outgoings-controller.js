(function (app) {
	var recurringController = function ($scope, $routeParams, $location, AccountsStore, OutgoingsStore){

		var accountId = $routeParams.accountId;

		$scope.outgoings = [];

		$scope.account = AccountsStore.getAccountById(accountId);

		OutgoingsStore.getAllRecurring(accountId, function (result) {
			$scope.outgoings = result;
		});

		$scope.add = function() {

			$scope.amount = $scope.amount.replace(',', '.');

			if (isNaN($scope.amount)) {

				return false;
			}

			var recurring = {
				account: $scope.account.id,
				label: $scope.label,
				amount: $scope.amount
			};

			OutgoingsStore.createRecurring(recurring, function (createdRecurring){
				$scope.outgoings.push(createdRecurring);
				$scope.label = '';
				$scope.amount = '';
			});
		};

		$scope.delete = function (outgoing) {
			OutgoingsStore.deleteRecurring(outgoing, 
				function (outgoing) {
					$scope.outgoings.splice($scope.outgoings.indexOf(outgoing), 1);
				}
			);
		};

		$scope.addAll = function () {	
			OutgoingsStore.addAllRecurrings(accountId, function () {
				$location.url("/account/"+accountId);
			});
			
		};

	}

	app.controller('RecurringCtrl', ['$scope', '$routeParams', '$location', 'AccountsStore', 'OutgoingsStore' , recurringController])
})(angular.module('AccountApp'));