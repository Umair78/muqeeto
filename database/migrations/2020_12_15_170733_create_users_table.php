<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsersTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('users', function (Blueprint $table) {
            $table->Increments('user_id');
            // $table->unsignedInteger('package_id');
            // $table->foreign('package_id')->references('id')->on('packages');   
            // $table->string('full_name',255);//var char
            $table->string('name',255)->unique();
            $table->index('name'); 
            $table->string('email',255)->unique(); 
            $table->index('email');
            $table->timestamp('email_verified_at');
            $table->string('password',500)->default('0');
           // $table->string('plain_password',255);
            $table->string('remember_token',500)->nullable();
            $table->string('mobile_number',255)->unique()->default('0');

            $table->index('mobile_number');
            $table->string('provider',255)->nullable();
            $table->string('provider_id',255)->nullable();
            $table->integer('login_attempt')->length(11)->nullable();;
            $table->timestamp('last_login')->nullable();  
            //$table->text('uid');
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
        Schema::dropIfExists('users');
    }
}
