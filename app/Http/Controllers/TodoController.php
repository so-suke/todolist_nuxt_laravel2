<?php

namespace App\Http\Controllers;
use App\Todo;
use Illuminate\Http\Request;

class TodoController extends Controller {
  // 全てのtodoを取得。
  public function getTodos() {
    $todos = Todo::all();
    return $todos;
  }

  public function addTodo(Request $request) {
    $todo = new Todo;
    $todo->comment = $request->comment;
    $todo->state = $request->state;
    $todo->save();
    return $todo;
  }

  // 該当idのtodoを削除
  public function deleteTodo(Request $request) {
    $todo = Todo::find($request->id);
    $todo->delete();
    return $todo;
  }

  // todoの状態を切替(作業中 <=> 完了)
  public function toggleTodo(Request $request) {
    $todo = Todo::find($request->id);
    $todo->state = $request->new_state;
    $todo->save();
    return $todo;
  }
}
