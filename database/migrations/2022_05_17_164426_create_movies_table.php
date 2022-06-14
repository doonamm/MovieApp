<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMoviesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('movies', function (Blueprint $table) {
            $table->increments('id');
            $table->boolean('adult');
            $table->text('title');
            $table->text('tagline');
            $table->mediumText('overview');
            $table->string('status');
            $table->string('poster_path');
            $table->string('backdrop_path');
            $table->string('language', 10);
            $table->int('runtime');
            $table->double('popularity');
            $table->double('vote_average');
            $table->integer('vote_count');
            $table->bigInteger('revenue');
            $table->integer('comment_count');
            $table->date('release_date');
            $table->timestamp('created_at');
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('movies');
    }
}
