<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

use Carbon\Carbon;


/**
 * Class Defaults
 * 
 * @property int $visit_ctr_id
 * @property string $ip
 * @property int $status
 * @property int $ctr
 * @property Carbon $created_at
 * @property Carbon $updated_at
 *
 * @package App\Models
 */

class VisitsCounter extends Model
{
    protected $table = 'visits_counter';
    protected $primaryKey = 'visit_ctr_id';

    protected $casts = [
        'status' => 'int',
        'ctr' => 'int',
        
    ];
    protected $fillable = [
		'status',
		'ctr',
		'ip',
		'status'
	];
}
