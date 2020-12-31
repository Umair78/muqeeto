<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class CompanyTipsStandard
 * 
 * @property int $company_tips_standard_id
 * @property string $name
 * @property string $standard_type
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $company_tips_standards_meta
 *
 * @package App\Models
 */
class CompanyTipsStandard extends Model
{
	use SoftDeletes;
	protected $table = 'company_tips_standards';
	protected $primaryKey = 'company_tips_standard_id';

	protected $fillable = [
		'name',
		'standard_type',
		'company_tips_standards_meta'
	];
}
