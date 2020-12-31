<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class Group
 * 
 * @property int $groups_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $groups_meta
 *
 * @package App\Models\Base
 */
class Group extends Model
{
	use SoftDeletes;
	protected $table = 'groups';
	protected $primaryKey = 'groups_id';
}
