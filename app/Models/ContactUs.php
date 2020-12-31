<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class ContactUs
 * 
 * @property int $id
 * @property string $name
 * @property string $subject
 * @property string $email
 * @property string $message
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @package App\Models
 */
class ContactUs extends Model
{
	use SoftDeletes;
	protected $table = 'contact_us';

	protected $fillable = [
		'name',
		'subject',
		'email',
		'message',
		'created_at',
		'updated_at',
		'deleted_at'
	];
}
