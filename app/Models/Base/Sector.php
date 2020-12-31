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
 * Class Sector
 * 
 * @property int $sectors_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $sectors_meta
 * 
 * @property Collection|Company[] $companies
 *
 * @package App\Models\Base
 */
class Sector extends Model
{
	use SoftDeletes;
	protected $table = 'sectors';
	protected $primaryKey = 'sectors_id';

	public function companies()
	{
		return $this->hasMany(Company::class);
	}
}
