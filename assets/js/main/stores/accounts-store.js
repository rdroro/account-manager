(function (app) {
	var accountsStore = function (AccountServices) {
		this.accounts = [];

		this.initialize = function () {
			if (this.accounts.length == 0) {
				this.accounts = AccountServices.query();
			}
		};

		this.getAccountById = function (id) {
			if (this.accounts.length == 0) {
				this.accounts = AccountServices.query();
			}
			var account = null
			angular.forEach(this.accounts, function(value, key){
				if(id == value.id) {
					account = value;
				}
			});

			return account;
		};

		this.addAccount = function (account) {
			this.accounts.push({name: "PEL", balance: 10000});
		};

		this.initialize();
	}


	app.service('AccountsStore', ['AccountServices', accountsStore]);
})(angular.module('AccountApp'));