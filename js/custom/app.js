(function () {
    angular.module("myApp", [
        'seriveModule',
        'factoryModule',
        'controllerModule',
        'ngIdle',
        'ui.bootstrap'
        // upcoming modules...
    ])
     .config(['KeepaliveProvider', 'IdleProvider', function (KeepaliveProvider, IdleProvider) {
        IdleProvider.idle(5);
        IdleProvider.timeout(20);
        KeepaliveProvider.interval(1);
     }])
    
   
   
})();
