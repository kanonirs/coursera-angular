(function() {
  'use strict';

  angular.module('NarrowItDownApp', [])
  .controller('NarrowItDownController', NarrowItDownController)
  .service('MenuSearchService', MenuSearchService)
  .directive('foundItems', FoundItemsDirective);

  MenuSearchService.$inject = ['$http'];
  NarrowItDownController.$inject = ['$scope', 'MenuSearchService'];

  function MenuSearchService($http) {
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
      return $http({
        method: "GET",
        url: "https://davids-restaurant.herokuapp.com/menu_items.json"
      }).then(function (result) {
          // process result and only keep items that match
          var list = result.data.menu_items;
          var foundItems = [];
          for (var i = 0; i < list.length; i++) {
            if (list[i].description.indexOf(searchTerm) != -1) {
              foundItems.push(list[i]);
            }
          }
          // return processed items
          return foundItems;
      });
    };
  };

  function NarrowItDownController($scope, MenuSearchService) {
    var ctrl = this;

    ctrl.found = [];
    ctrl.searchTerm = "";
    ctrl.search = function() {
      if (ctrl.searchTerm.length == 0) {
        ctrl.found = [];
      } else {
        var promise = MenuSearchService.getMatchedMenuItems(ctrl.searchTerm);
        promise.then(function(response) {
          ctrl.found = response;
        }).catch(function(error) {
          console.log("Error");
        });
      }
    };
    ctrl.removeItem = function(index) {
      ctrl.found.splice(index, 1);
    };
  };

  function FoundItemsDirective() {
    var ddo = {
      templateUrl: 'foundItems.html',
      restrict: 'E',
      scope: {
        foundItems: '<',
        onRemove: '&'
      }
    };
    return ddo;
  };
})();
