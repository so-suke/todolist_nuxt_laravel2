<?php

use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class TodosTableSeeder extends Seeder {
  /**
   * Run the database seeds.
   *
   * @return void
   */
  public function run() {
    DB::statement('SET FOREIGN_KEY_CHECKS=0');
    DB::table('todos')->truncate();
    DB::statement('SET FOREIGN_KEY_CHECKS=1');

    $todos = [
      [
        'comment' => 'sample_comment_0',
        'state' => 'working',
      ],
      [
        'comment' => 'sample_comment_1',
        'state' => 'done',
      ],
      [
        'comment' => 'sample_comment_2',
        'state' => 'working',
      ],
    ];

    foreach ($todos as $key => $todo) {
      DB::table('todos')->insert([
        'comment' => $todo['comment'],
        'state' => $todo['state'],
        'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
        'updated_at' => Carbon::now()->format('Y-m-d H:i:s'),
      ]);
    }
  }
}
