<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateChatMessagesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('chat_messages', function (Blueprint $table) {
            $table->Increments('id');
            $table->text('uid');   
            $table->unsignedInteger('room_id');
            $table->foreign('room_id')->references('id')->on('chat_room');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');          
            $table->text('message');

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
        Schema::dropIfExists('chat_messages');
    }
}
