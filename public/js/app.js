angular.module('App', [])
.service('todos', ['$rootScope', '$filter', function ($scope, $filter) {
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
.controller('RegisterController', ['$scope', 'todos', function ($scope, todos) {
  $scope.newTitle = '';

  $scope.addTodo = function () {
    todos.add($scope.newTitle);
    $scope.newTitle = '';
  };
}])
.controller('ToolbarController', ['$scope', 'todos', function ($scope, todos) {
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
}])
.controller('TodoListController', ['$scope', 'todos', function ($scope, todos) {
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
}])
.controller('MainController', ['$scope', function ($scope) {
  $scope.currentFilter = null;

  $scope.$on('change:filter', function (evt, filter) {
    $scope.currentFilter = filter;
  });
}])

/*
.controller('MainController', ['$scope','$filter', function ($scope, $filter) {
  $scope.todos = [];
  $scope.newTitle = ''; //入力された文字

  $scope.addTodo = function () {
    $scope.todos.push({
      title: $scope.newTitle,
      done: false
    });

    $scope.newTitle = ''; //init
  };

  // フィルタリング条件モデル
  $scope.filter = {
    done: { done: true },      // 完了のみ
    remaining: { done: false } // 未了のみ
  };

  // 現在のフィルタの状態モデル
  $scope.currentFilter = null;

  // フィルタリング条件を変更するメソッド
  $scope.changeFilter = function (filter) {
    $scope.currentFilter = filter;
  };

  var where = $filter('filter'); // filter フィルタ関数の取得
  $scope.$watch('todos', function (todos) {
    var length = todos.length;
    $scope.allCount = length;                             // 総件数モデル
    $scope.doneCount = where(todos, $scope.filter.done).length; // 完了件数モデル
    $scope.remainingCount = length - $scope.doneCount;          // 未了件数モデル
  }, true);

  var originalTitle;     // 編集前の要件
  $scope.editing = null; // 編集モードの ToDo モデルを表すモデル

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

  // 全て完了/未了
  $scope.checkAll = function () {
    var state = !!$scope.remainingCount; // 未了にするのか完了にするのかの判定

    angular.forEach($scope.todos, function (todo) {
      todo.done = state;
    });
  };

  // 完了した ToDo を全て削除
  $scope.removeDoneTodo = function () {
    $scope.todos = where($scope.todos, $scope.filter.remaining);
  };

  // 任意の ToDo を削除
  $scope.removeTodo = function (currentTodo) {
    $scope.todos = where($scope.todos, function (todo) {
      return currentTodo !== todo;
    });
  };

}])
*/
.directive('mySelect', [function () {
  return function (scope, $el, attrs) {
    // scope - 現在の $scope オブジェクト
    // $el   - jqLite オブジェクト(jQuery ライクオブジェクト)
    //         jQuery 使用時なら jQuery オブジェクト
    // attrs - DOM 属性のハッシュ(属性名は正規化されている)

    scope.$watch(attrs.mySelect, function (val) {
      if (val) {
        $el[0].select();
      }
    });
  };
}]);
