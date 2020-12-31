<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostSharesTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('post_shares', function (Blueprint $table) {
            $table->Increments('id');
            $table->text('uid');
            $table->unsignedInteger('post_id');
            $table->foreign('post_id')->references('post_id')->on('posts');

            $table->unsignedInteger('share_by');
            $table->foreign('share_by')->references('user_id')->on('users');

            $table->unsignedInteger('share_to');
            $table->foreign('share_to')->references('id')->on('groups');

            $table->unsignedInteger('privacy_ids');
            $table->foreign('privacy_ids')->references('privacy_id')->on('privacy_rules');

            //$table->integer('share_by');
            //$table->integer('share_to');
            //$table->text('pri
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
        Schema::dropIfExists('post_shares');
    }
}
