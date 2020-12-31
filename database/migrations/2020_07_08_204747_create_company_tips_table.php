<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyTipsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_tips', function (Blueprint $table) {
            $table->bigIncrements('company_tip_id');
            $table->unsignedInteger('company_id');
            $table->foreign('company_id')->references('company_id')->on('companies');
            $table->text('tips');
            $table->text('position');
            $table->timestamps();
            //$table->softDeletes('deleted_at', 0)->nullable();
            $table->text('company_tips_meta')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_tips');
    }
}
