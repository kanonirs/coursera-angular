(function() {
  'use strict';

  angular.module('MenuApp')
  .config(RoutesConfig);

  RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
  function RoutesConfig($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'home.html'
      })
      .state('categories', {
        url: '/categories',
        template: '<categories list="$ctrl.categories"></categories>',
        controller: 'CategoriesController as $ctrl',
        resolve: {
          categories: ['MenuDataService', function(MenuDataService) {
            return MenuDataService.getAllCategories();
          }]
        }
      })
      .state('categories.items', {
        url: '/items/{categoryIdx}',
        template: '<items list="$ctrl.items"></items>',
        controller: 'ItemsController as $ctrl',
        resolve: {
          items: ['$stateParams', 'MenuDataService', function($stateParams, MenuDataService) {
            return MenuDataService.getItemsForCategory($stateParams.categoryIdx);
          }]
        }
      });
  }
})();
