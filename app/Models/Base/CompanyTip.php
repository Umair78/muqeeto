<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\Company;
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
 * @package App\Models\Base
 */
class CompanyTip extends Model
{
	use SoftDeletes;
	protected $table = 'company_tips';
	protected $primaryKey = 'company_tip_id';

	protected $casts = [
		'company_id' => 'int'
	];

	public function company()
	{
		return $this->belongsTo(Company::class);
	}
}
