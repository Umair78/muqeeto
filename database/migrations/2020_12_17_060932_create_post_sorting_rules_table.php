<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostSortingRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post_sorting_rules', function (Blueprint $table) {
            $table->Increments('id');
            $table->text('uid');
            //kia yeh refrenc
            //key hai ka nae
            // ?
            $table->unsignedInteger('post_id');
            $table->foreign('post_id')->references('post_id')->on('posts');
            $table->text('sorting_ids');

            $table->integer('status')->default('1');
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->nullable();           
            $table->timestamp('deleted_at')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('post_sorting_rules');
    }
}
