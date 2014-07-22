(function(angular) {
    var MODULES = [];
    var MODULE_GROUP = [
        'controllers',
        'filters',
        'services',
        'directives'
    ];
    for (var i = 0, len = MODULE_GROUP.length; i < len; i++) {
        angular.module(MODULE_GROUP[i],[]);
    }
    angular.module('App',MODULES.concat(MODULE_GROUP));
})(angular);
