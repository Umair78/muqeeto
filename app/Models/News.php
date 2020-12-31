<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models;

use Carbon\Carbon;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class News
 * 
 * @property int $news_id
 * @property string $name
 * @property int $news_category_id
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $news_meta
 * 
 * @property NewsCategory $news_category
 *
 * @package App\Models
 */
class News extends Model
{
	use SoftDeletes;
	protected $table = 'news';
	protected $primaryKey = 'news_id';

	protected $casts = [
		'news_category_id' => 'int'
	];

	protected $fillable = [
		'title',
		'name',
		'news_category_id',
		'news_meta'
	];

	public function news_category()
	{
		return $this->belongsTo(NewsCategory::class, 'news_category_id', 'news_category_id');
	}
}
