<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateDefaultsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('defaults', function (Blueprint $table) {
            $table->engine = 'InnoDB';
            $table->bigIncrements('defaults_id');
            $table->string('name',500)->collate('utf8_unicode_ci')->nullable();
            $table->string('value',500)->collate('utf8_unicode_ci')->nullable();
            $table->string('key')->collate('utf8_unicode_ci')->default('');
            $table->string('default_key')->default('admin');
            $table->integer('status')->default(1);
            $table->timestamp('created_at')->default(DB::raw('CURRENT_TIMESTAMP'));
            $table->timestamp('updated_at')->default(DB::raw('CURRENT_TIMESTAMP'));
             
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('defaults');
    }
}
