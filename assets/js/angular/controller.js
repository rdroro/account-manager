'use strict';

/* Controllers */

function AccountCtrl($scope, $routeParams, Account) { 
   $.pnotify.defaults.styling = "bootstrap3";
   $.pnotify.defaults.history = false;

   $scope.total = 0;
   $scope.accounts = Account.query(function () {
      for (var i = 0; i < $scope.accounts.length; i++) {
         $scope.total += parseFloat($scope.accounts[i].balance);
      };

   });

   $scope.add = function () {
      if (isNaN($scope.account.balance)) {
         $.pnotify({
            title: "Error",
            text: "Balance must be a numeric value",
            type: "error"
         });
         return false;
      }
      $scope.account.name = $.trim($scope.account.name);
      Account.create($scope.account, 
         function (createdAccount, responseHeaders) {
            window.location = '/accounts';
         }, function (error) {
          $.pnotify({
            title: "Error",
            text: "OoOoOps Impossible to add account",
            type: "error"
         });
       })
   };

};

function OutgoingCtrl($scope, $routeParams, Outgoing, Account, $http) {
   $.pnotify.defaults.styling = "bootstrap3";
   $.pnotify.defaults.history = false;

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
      /* User can separate float number via comma or dot
      each comma are replaced by dot */
      if (typeof($scope.amount) == "undefined") {
         return false;
      }
      $scope.amount = $scope.amount.replace(',', '.');

      if (isNaN($scope.amount)) {
         $.pnotify({
            title: "Error",
            text: "Amount must be a numeric value",
            type: "error"
         });
         return false;
      }

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
      });
   };

   $scope.checkAction = function (outgoing) {
      $http.get('/outgoings/checkedToggle/', { params: {id: outgoing.id }});
      /* The value of outgoing.checked before execute event */
      /* If  outgoing.checked was unchecked*/
      if (!outgoing.checked) {
         var tmp = parseFloat($scope.account.balance) + parseFloat(outgoing.amount);
         $scope.account.balance = tmp.toFixed(2); 
      } else {
         var tmp = parseFloat($scope.account.balance) - parseFloat(outgoing.amount);
         $scope.account.balance = tmp.toFixed(2);
      }
   };

   $scope.delete = function (outgoing) {

      Outgoing.delete(outgoing,
         //Success
         function (deletedOutgoing, responseHeaders){
            console.log(parseFloat($scope.preBalance));
            console.log(parseFloat(outgoing.amount));
            $scope.preBalance = parseFloat($scope.preBalance) - parseFloat(outgoing.amount);
            $scope.outgoings.splice($scope.outgoings.indexOf(outgoing), 1);
         }, 
         // Error
         function(error) {
            $.pnotify({
               title: "Error",
               text: error.data.error,
               type: "error"
            });
         });
   };
}

function UserCtrl($scope, $routeParams, User) {
   $.pnotify.defaults.styling = "bootstrap3";
   $.pnotify.defaults.history = false;
   
   $scope.users = User.query();

   $scope.add = function () {

      var login = $scope.login;
      var password = login + "" + $scope.password;
      password = CryptoJS.SHA1(password);
      password = password.toString();

      var user = {
         login: $scope.login,
         name: $scope.name,
         password: password
      }

      User.create(user, function(createdUser, responseHeaders){
         $scope.users.push(createdUser);
      });

   };

   $scope.delete = function (user) {
      User.delete(user,
         function (deletedUser, responseHeaders) {
            $scope.users.splice($scope.users.indexOf(user), 1);
         },
         function (error) {
            $.pnotify({
               title: "Error",
               text: error.data.error,
               type: "error"
            });
         }
         )
   }

}

function RecurringCtrl ($scope, $routeParams, Recurring, Account, $http, $location) {
   $.pnotify.defaults.styling = "bootstrap3";
   $.pnotify.defaults.history = false;
   $scope.account = Account.get({id: $routeParams.accountId}, function(){
      $scope.outgoings = Recurring.query({account: $routeParams.accountId });
   });

   $scope.add = function() {

      $scope.amount = $scope.amount.replace(',', '.');

      if (isNaN($scope.amount)) {
         $.pnotify({
            title: "Error",
            text: "Amount must be a numeric value",
            type: "error"
         });
         return false;
      }

      var recurring = {
         account: $scope.account.id,
         label: $scope.label,
         amount: $scope.amount
      };

      Recurring.create(recurring, function (createdRecurring, responseHeaders){
         $scope.outgoings.push(createdRecurring);
         $scope.label = '';
         $scope.amount = '';
      });
   }

   $scope.delete = function (outgoing) {
      Recurring.delete(outgoing, 
         function (deletedOutgoing, responseHeaders) {
            $scope.outgoings.splice($scope.outgoings.indexOf(outgoing), 1);
         },
         function (error) {
           $.pnotify({
            title: "Error",
            text: error.data.error,
            type: "error"
         });
        }
        )
   }

   $scope.addAll = function () {
      var id = $scope.account.id;
      $http.get('/recurring/add-all/'+id);
      $location.url("/account/"+id);
   }

}






myApp.controller('AccountCtrl', ['$scope', '$routeParams', 'Account',  AccountCtrl]);
myApp.controller('OutgoingCtrl', ['$scope', '$routeParams', 'Outgoing', 'Account', '$http', OutgoingCtrl]);
myApp.controller('RecurringCtrl', ['$scope', '$routeParams', 'Recurring', 'Account', '$http', '$location', RecurringCtrl]);
myApp.controller('UserCtrl', ['$scope', '$routeParams', 'User', UserCtrl]);