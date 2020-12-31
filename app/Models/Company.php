<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Company
 * 
 * @property int $company_id
 * @property string $name
 * @property int $company_category_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $company_meta
 * @property int $sector_id
 * @property string $company_code
 * 
 * @property CompanyCategory $company_category
 * @property Sector $sector
 * @property Collection|CompanyTip[] $company_tips
 *
 * @package App\Models
 */
class Company extends Model
{
	use SoftDeletes;
	protected $table = 'companies';
	protected $primaryKey = 'company_id';

	protected $casts = [
		'company_category_id' => 'int',
		'sector_id' => 'int'
	];

	protected $fillable = [
		'name',
		'company_category_id',
		'company_meta',
		'sector_id',
		'company_code'
	];

	public function company_category()
	{
		return $this->belongsTo(CompanyCategory::class, 'company_category_id', 'company_category_id');
	}

	public function sector()
	{
		return $this->belongsTo(Sector::class, 'sector_id', 'sector_id');
	}

	public function company_tips()
	{
		return $this->hasMany(CompanyTip::class, 'company_id', 'company_id');
	}
}
