<?php

/**
 * Created by Reliese Model.
 */

namespace App\Models\Base;

use App\Models\News;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

/**
 * Class NewsCategory
 * 
 * @property int $news_category_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $comp_cat_meta
 * 
 * @property Collection|News[] $news
 *
 * @package App\Models\Base
 */
class NewsCategory extends Model
{
	use SoftDeletes;
	protected $table = 'news_categories';
	protected $primaryKey = 'news_category_id';

	public function news()
	{
		return $this->hasMany(News::class);
	}
}
