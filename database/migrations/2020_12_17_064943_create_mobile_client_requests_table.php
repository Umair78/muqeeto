<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateMobileClientRequestsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('mobile_client_requests', function (Blueprint $table) {
            $table->Increments('id');
            $table->text('uid');
            $table->string('ip',255)->nullable();

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');
            
            $table->text('request_body')->nullable();
            $table->text('response_body')->nullable();
            $table->string('method',255);
            $table->integer('device_type');
            $table->string('app_version',255)->nullable();



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
        Schema::dropIfExists('mobile_client_requests');
    }
}
