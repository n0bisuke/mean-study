angular.module('controllers').controller('ToolbarController', ['$scope', 'todos', function ($scope, todos) {
  $scope.filter = todos.filter;

  $scope.$on('change:list', function (evt, list) {
    var length = list.length;
    var doneCount = todos.getDone().length;

    $scope.allCount = length;
    $scope.doneCount = doneCount;
    $scope.remainingCount = length - doneCount;
  });

  $scope.checkAll = function () {
    todos.changeState(!!$scope.remainingCount);
  };

  $scope.changeFilter = function (filter) {
    $scope.$emit('change:filter', filter);
  };

  $scope.removeDoneTodo = function () {
    todos.removeDone();
  };
}]);
