<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreatePostsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('posts', function (Blueprint $table) {
            $table->Increments('post_id');
            $table->text('uid');  

            $table->unsignedInteger('user_id');
            $table->foreign('user_id')->references('user_id')->on('users');

            $table->unsignedInteger('privacy_id');
            $table->foreign('privacy_id')->references('privacy_id')->on('privacy_rules');

            $table->unsignedInteger('index_id')->nullable();
            $table->foreign('index_id')->references('index_id')->on('indexes');

            $table->unsignedInteger('company_id')->nullable();
            $table->foreign('company_id')->references('company_id')->on('companies');

            $table->unsignedInteger('sector_id')->nullable();
            $table->foreign('sector_id')->references('sector_id')->on('sectors')->nullable();

            //$table->foreignId('privacy_id')->constrained('privacy_rules');
            //$table->foreignId('index_id')->constrained('indexes')->nullable();
            //$table->foreignId('company_id')->constrained('companies')->nullable();
            //$table->foreignId('sector_id')->constrained('sectors')->nullable();
            $table->string('title',255);
            $table->text('body');
            $table->text('hash_tags')->nullable();
            $table->text('images')->nullable();
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
        Schema::dropIfExists('posts');
    }
}
