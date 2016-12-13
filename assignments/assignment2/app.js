(function() {
  'use strict';

  angular.module('ShoppingListCheckOff', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService);

  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];

  function ToBuyController(ShoppingListCheckOffService) {
    var toBuy = this;

    toBuy.list = ShoppingListCheckOffService.getToBuyList();
    toBuy.buy = function(index) {
      ShoppingListCheckOffService.buy(index);
    };
  };

  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var alreadyBought = this;

    alreadyBought.list = ShoppingListCheckOffService.getAlreadyBoughtList();
  };

  function ShoppingListCheckOffService() {
    var service = this;
    var toBuyList = [
      {name: "Cookies", quantity: 10},
      {name: "Bananas", quantity: 5},
      {name: "Oranges", quantity: 7},
      {name: "Cola", quantity: 3},
      {name: "Cake", quantity: 1}
    ];
    var alreadyBoughtList = [];

    this.buy = function(index) {
      alreadyBoughtList.push( toBuyList[index] );
      toBuyList.splice( index, 1 );
    };

    this.getToBuyList = function() {
      return toBuyList;
    };

    this.getAlreadyBoughtList = function() {
      return alreadyBoughtList;
    };
  };
})();
