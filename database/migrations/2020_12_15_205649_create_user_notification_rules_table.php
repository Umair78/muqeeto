<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUserNotificationRulesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('user_notification_rules', function (Blueprint $table) {
            $table->Increments('id');
            $table->text('uid');   
           //privacy id F.K hai
            //text type kaisa (waan type Text hai)
            //phir vo F.k nae ho ge
            $table->unsignedInteger('privacy_id');
            $table->foreign('privacy_id')->references('privacy_id')->on('privacy_rules');
            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');
            $table->text('name');
            $table->string('type',255);
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
        Schema::dropIfExists('user_notification_rules');
    }
}
