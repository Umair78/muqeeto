<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;

/**
 * Class Defaults
 * 
 * @property int $defaults_id
 * @property string $name
 * @property string $value
 * @property string $key
 * @property int $status
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @package App\Models
 */
class Defaults extends Model
{
	protected $table = 'defaults';
	protected $primaryKey = 'defaults_id';

	protected $casts = [
		'status' => 'int'
	];

	protected $fillable = [
		'name',
		'value',
		'key',
		'status'
	];
}
