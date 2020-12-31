<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserNotificationLogsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_notification_logs', function (Blueprint $table) {
            $table->Increments('id');
            $table->text('uid');

          
            $table->unsignedInteger('notification_id');
            $table->foreign('notification_id')->references('id')->on('user_notifications');

            $table->integer('entity_id')->nullable();
            $table->string('entity_type',255)->nullable();
            $table->text('entity_class')->nullable();
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
        Schema::dropIfExists('user_notification_logs');
    }
}
