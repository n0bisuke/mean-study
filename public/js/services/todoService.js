angular.module('services').service('todos', ['$rootScope', '$filter', function ($scope, $filter) {
  var list = []; // ToDo リスト
  // ToDo リストの変更を監視し 全 $scope に対して change:list イベントを発行する
  $scope.$watch(function () {
    return list;
  }, function (value) {
    $scope.$broadcast('change:list', value);
  }, true);

  var where = $filter('filter');

  var done = { done: true };
  var remaining = { done: false };

  // リストが扱えるフィルタリング条件
  this.filter = {
    done: done,
    remaining: remaining
  };

  // 完了状態の ToDo のみを抽出して返す
  this.getDone = function () {
    return where(list, done);
  };

  // 要件を受け取り新しい ToDo をリストに加える
  this.add = function (title) {
    list.push({
      title: title,
      done: false
    });
  };

  // 引数の ToDo をリストから取り除く
  this.remove = function (currentTodo) {
    list = where(list, function (todo) {
      return currentTodo !== todo;
    });
  };

  // 完了状態の ToDo をリストから取り除く
  this.removeDone = function () {
    list = where(list, remaining);
  };

  // リスト内の ToDo すべての状態を引数に合わせる
  this.changeState = function (state) {
    angular.forEach(list, function (todo) {
      todo.done = state;
    });
  };
}])
