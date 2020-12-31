<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class CompanyTip
 * 
 * @property int $company_tip_id
 * @property int $company_id
 * @property string $tips
 * @property string $position
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $company_tips_meta
 * 
 * @property Company $company
 *
 * @package App\Models
 */
class CompanyTip extends Model
{
	use SoftDeletes;
	protected $table = 'company_tips';
	protected $primaryKey = 'company_tip_id';

	protected $casts = [
		'company_id' => 'int'
	];

	protected $fillable = [
		'company_id',
		'tips',
		'tip_details',
		'position',
		'company_tips_meta',
		'created_by',
		'tip_success_status'
	];

	public function company()
	{
		return $this->belongsTo(Company::class, 'company_id', 'company_id');
	}
}
