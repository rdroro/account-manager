(function (app) {

	var accountCtrl = function ($scope, $routeParams, AccountsStore, OutgoingsStore) {
		
		var accountId = $routeParams.accountId;

		$scope.predicate = "'checked'";

		$scope.account = AccountsStore.getAccountById(accountId);
		$scope.amout = '';
		$scope.label = '';
		

		OutgoingsStore.initialize(accountId, function() {
			$scope.outgoings = OutgoingsStore.outgoings;
			$scope.preBalance = $scope.account.balance; 
			for (var i = 0; i < $scope.outgoings.length; i++) {
				$scope.preBalance += (! $scope.outgoings[i].checked) ? parseFloat($scope.outgoings[i].amount) : 0;
			}
			$scope.preBalance = $scope.preBalance.toFixed(2);
		});


		/** 
		 *
		 * Add an outgoings to the table
		 * manage le DOM and use OutgoinsStore to persist data
		 * @todo add notification to manage errors
		 *
		 */
		$scope.add = function () {
			if (typeof($scope.amount) == "undefined") {
				return false;
			}

			/* User can separate float number via comma or dot
			each comma are replaced by dot */
			$scope.amount = $scope.amount.replace(',', '.');

			if (isNaN($scope.amount)) {
				return false;
			}

			var outgoing = {
				label: $scope.label,
				amount: $scope.amount,
				checked: false,
				account: $scope.account.id
			};

			// Persist data via OutgoinsStore
			OutgoingsStore.add(outgoing, function (){
				$scope.preBalance = parseFloat($scope.preBalance) + parseFloat(outgoing.amount);
				$scope.label='';
				$scope.amount='';	
			});
		};

		/**
		 *
		 * Delete outgoing from the table and persist with OutgoingsStore
		 *
		 */
		$scope.delete = function (outgoing) {
			OutgoingsStore.delete(outgoing, function (){
				$scope.preBalance = parseFloat($scope.preBalance) - parseFloat(outgoing.amount);
			});
		};

		/**
		 *
		 * Check action
		 *
		 */
		$scope.checkAction = function (outgoing) {
			OutgoingsStore.checkAction(outgoing, function(){
				/* The value of outgoing.checked before execute event */
				/* If  outgoing.checked was unchecked*/
				if (!outgoing.checked) {
					var tmp = parseFloat($scope.account.balance) + parseFloat(outgoing.amount);
					$scope.account.balance = tmp.toFixed(2); 
				} else {
					var tmp = parseFloat($scope.account.balance) - parseFloat(outgoing.amount);
					$scope.account.balance = tmp.toFixed(2);
				}
			});
		}
		
	}

	app.controller('AccountCtrl', ['$scope', '$routeParams', 'AccountsStore', 'OutgoingsStore', accountCtrl]);

})(angular.module('AccountApp'));