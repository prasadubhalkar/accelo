/**
 * [Will init any global functions or pollyfills and application level settings]
 */
var toRad = function(val){
    return (val * Math.PI / 180);
}

var accelo = angular.module('accelo', ['ionic','ngCordova']);
//initialize controller and add it to the module
accelo.controller('trackController',trackController);
accelo.controller('settingsController',settingsController);
accelo.controller('homeController',homeController);
accelo.directive('settingPage',settingPage);
accelo.directive('trackPage',trackPage);

// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
accelo.run(function($ionicPlatform) {
    $ionicPlatform.ready(function() {
        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
        // for form inputs)
        if(window.cordova && window.cordova.plugins.Keyboard) {
            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
        }
        if(window.StatusBar) {
            StatusBar.styleDefault();
        }
    });
});

/**
 * [define the route and start up configuration]
 */
accelo.config(function($stateProvider,$urlRouterProvider){
    $stateProvider.state('home', {
        url: '/',
        templateUrl     : 'templates/home.html',
        controller      : 'homeController as hc'
    });

    $urlRouterProvider.otherwise('/');
});