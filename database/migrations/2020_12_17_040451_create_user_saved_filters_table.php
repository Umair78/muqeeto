<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserSavedFiltersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_saved_filters', function (Blueprint $table) {
            $table->Increments('post_id');
            $table->text('uid');  

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');

            $table->unsignedInteger('other_user_id')->nullable();
            $table->foreign('other_user_id')->references('user_id')->on('users');

            $table->unsignedInteger('index_id')->nullable()->nullable();
            $table->foreign('index_id')->references('index_id')->on('indexes');

            $table->unsignedInteger('company_id');
            $table->foreign('company_id')->references('company_id')->on('companies');

            $table->unsignedInteger('sector_id')->nullable();
            $table->foreign('sector_id')->references('sector_id')->on('sectors')->nullable();
            $table->text('time_duration')->nullable();
           
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
        Schema::dropIfExists('user_saved_filters');
    }
}
