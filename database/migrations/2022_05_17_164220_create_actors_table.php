<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateActorsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('actors', function (Blueprint $table) {
            $table->increments('id');
            $table->string('name');
            $table->date('birthday');
            $table->enum('gender', ['male', 'female']);
            $table->string('place_of_birth');
            $table->string('profile_path');
            $table->mediumText('biography');
            $table->string('imdb_id');
            $table->double('popularity');
        });
    }

    public function down()
    {
        Schema::dropIfExists('actors');
    }
}
