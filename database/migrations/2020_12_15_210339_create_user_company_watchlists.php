<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserCompanyWatchlists extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_company_watchlists', function (Blueprint $table) {
            $table->Increments('id');
            $table->text('uid');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');  
            
            $table->unsignedInteger('other_user_id');
            $table->foreign('other_user_id')->references('user_id')->on('users');  

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
        Schema::dropIfExists('user_company_watchlists');
    }
}
