'use strict';

/* Controllers */

function AccountCtrl($scope, $routeParams, Account) {
  $scope.accounts = Account.query();
};

function OutgoingCtrl($scope, $routeParams, Outgoing, Account) {
  $scope.account = Account.get({id: $routeParams.accountId});
  $scope.outgoings = Outgoing.query({account: $routeParams.accountId });

  $scope.add = function () {
    var outgoing = {
      label: $scope.label,
      amount: $scope.amount
    };
    $scope.account.balance += parseInt(outgoing.amount);
    $scope.outgoings.push(outgoing);
    $scope.label='';
    $scope.amount='';
  }
}




myApp.controller('AccountCtrl', ['$scope', '$routeParams', 'Account', AccountCtrl]);
myApp.controller('OutgoingCtrl', ['$scope', '$routeParams', 'Outgoing', 'Account', OutgoingCtrl]);