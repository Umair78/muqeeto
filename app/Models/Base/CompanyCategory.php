<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\Company;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class CompanyCategory
 * 
 * @property int $company_category_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $comp_cat_meta
 * 
 * @property Collection|Company[] $companies
 *
 * @package App\Models\Base
 */
class CompanyCategory extends Model
{
	use SoftDeletes;
	protected $table = 'company_categories';
	protected $primaryKey = 'company_category_id';

	public function companies()
	{
		return $this->hasMany(Company::class);
	}
}
