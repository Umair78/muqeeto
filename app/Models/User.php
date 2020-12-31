<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class User
 * 
 * @property int $user_id
 * @property string $name
 * @property string $email
 * @property Carbon $email_verified_at
 * @property string $password
 * @property string $ppwd
 * @property string $remember_token
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $fcm_token
 * @property string $deleted_at
 * @property int $group_id
 * @property string $group_key
 *
 * @package App\Models
 */
class User extends Model
{
	use SoftDeletes;
	protected $table = 'users';
	protected $primaryKey = 'user_id';

	protected $casts = [
		//'group_id' => 'int'
	];

	protected $dates = [
		//'email_verified_at'
	];

	protected $hidden = [
		'password',
		'remember_token',
		//'fcm_token'
	];

	protected $fillable = [
		'name',
		'email',
		'email_verified_at',
		'password',
		'mobile',
		//'ppwd',
		'remember_token',
		//'fcm_token',
		//'group_id',
		//'group_key'
	];
}
