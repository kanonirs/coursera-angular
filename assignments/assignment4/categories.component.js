(function() {
  'use strict';

  angular.module('MenuApp')
  .component('categories', {
    templateUrl: 'categories.html',
    bindings: {
      list: '<'
    }
  });
})();
