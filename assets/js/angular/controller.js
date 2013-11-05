'use strict';

/* Controllers */

function AccountCtrl($scope, $routeParams, Account) {
  $scope.total = 0;
  $scope.accounts = Account.query(function () {
    for (var i = 0; i < $scope.accounts.length; i++) {
      $scope.total += parseFloat($scope.accounts[i].balance);
    };

  });
};

function OutgoingCtrl($scope, $routeParams, Outgoing, Account, $http) {

  $scope.account = Account.get({id: $routeParams.accountId}, function(){
    $scope.outgoings = Outgoing.query({account: $routeParams.accountId }, function (){
      $scope.preBalance = $scope.account.balance;
      for (var i = 0; i < $scope.outgoings.length; i++) {
        $scope.preBalance += (! $scope.outgoings[i].checked) ? parseFloat($scope.outgoings[i].amount) : 0;
      }
      $scope.preBalance = $scope.preBalance.toFixed(2);
    });
  });


  $scope.add = function () {
    var outgoing = {
      label: $scope.label,
      amount: $scope.amount,
      checked: false,
      account: $scope.account.id
    };
    Outgoing.create(outgoing, function (createdOutgoing, responseHeaders) {
      $scope.preBalance = parseFloat($scope.preBalance) + parseFloat(createdOutgoing.amount);
      $scope.outgoings.push(createdOutgoing);
      $scope.label='';
      $scope.amount='';
    })
  },

  $scope.checkAction = function (outgoing) {
    $http.get('/outgoings/checkedToggle/', { params: {id: outgoing.id }});
    if (outgoing.checked) {
      var tmp = parseFloat($scope.account.balance) + parseFloat(outgoing.amount);
      $scope.account.balance = tmp.toFixed(2); 
    } else {
      var tmp = parseFloat($scope.account.balance) - parseFloat(outgoing.amount);
      $scope.account.balance = tmp.toFixed(2);
    }
  }
}




myApp.controller('AccountCtrl', ['$scope', '$routeParams', 'Account', AccountCtrl]);
myApp.controller('OutgoingCtrl', ['$scope', '$routeParams', 'Outgoing', 'Account', '$http', OutgoingCtrl]);