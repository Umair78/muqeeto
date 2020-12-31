<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateCompanyTipsStandardsTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('company_tips_standards', function (Blueprint $table) {
            $table->bigIncrements('company_tips_standard_id');
            $table->string('name', 500);
            $table->string('standard_type', 500)->default('TIP')->comment('TIP, POS');
            $table->timestamps();
            $table->softDeletes('deleted_at', 0)->nullable();
            $table->text('company_tips_standards_meta')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('company_tips_standards');
    }
}
