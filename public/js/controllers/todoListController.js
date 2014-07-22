angular.module('controllers').controller('TodoListController', ['$scope', 'todos', function ($scope, todos) {
  $scope.$on('change:list', function (evt, list) {
    $scope.todoList = list;
  });

  var originalTitle;

  $scope.editing = null;

  $scope.editTodo = function (todo) {
    originalTitle = todo.title;
    $scope.editing = todo;
  };

  $scope.doneEdit = function (todoForm) {
    if (todoForm.$invalid) {
      $scope.editing.title = originalTitle;
    }
    $scope.editing = originalTitle = null;
  };

  $scope.removeTodo = function (todo) {
    todos.remove(todo);
  };
}]);
