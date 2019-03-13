<?php

Route::middleware(['cors'])->group(function () {
  Route::get('/getTodos', 'TodoController@getTodos');
  Route::post('/addTodo', 'TodoController@addTodo');
  Route::post('/deleteTodo', 'TodoController@deleteTodo');
  Route::post('/toggleTodo', 'TodoController@toggleTodo');
});
