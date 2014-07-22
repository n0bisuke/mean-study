angular.module('controllers').controller('RegisterController', ['$scope', 'todos', function ($scope, todos) {
  $scope.newTitle = '';

  $scope.addTodo = function () {
    todos.add($scope.newTitle);
    $scope.newTitle = '';
  };
}]);
