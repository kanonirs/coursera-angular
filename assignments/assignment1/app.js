(function() {
  'use strict';

  angular.module('LunchCheck', [])
  .controller('LunchCheckController', LunchCheckController);

  LunchCheckController.$inject = ['$scope'];

  function LunchCheckController($scope) {
    $scope.foodList = "";
    $scope.check = function() {
      if (!$scope.foodList) {
        $scope.msg = "Please enter data first";
      } else {
        var arr = $scope.foodList.split(',');
        if (arr.length <= 3) {
          $scope.msg = "Enjoy!";
        } else {
          $scope.msg = "Too much!";
        }
      }
    };
  };
})();
