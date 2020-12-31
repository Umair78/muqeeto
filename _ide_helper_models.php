<?php

// @formatter:off
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models\Base{
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
 * @property CompanyCategory $company_category
 * @property Sector $sector
 * @property Collection|CompanyTip[] $company_tips
 * @package App\Models\Base
 * @property-read int|null $company_tips_count
 * @method static \Illuminate\Database\Eloquent\Builder|Company newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Company newQuery()
 * @method static \Illuminate\Database\Query\Builder|Company onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Company query()
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCompanyCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCompanyCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCompanyMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereSectorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Company withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Company withoutTrashed()
 */
	class Company extends \Eloquent {}
}

namespace App\Models\Base{
/**
 * Class CompanyCategory
 *
 * @property int $company_category_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $comp_cat_meta
 * @property Collection|Company[] $companies
 * @package App\Models\Base
 * @property-read int|null $companies_count
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory newQuery()
 * @method static \Illuminate\Database\Query\Builder|CompanyCategory onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereCompCatMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereCompanyCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|CompanyCategory withTrashed()
 * @method static \Illuminate\Database\Query\Builder|CompanyCategory withoutTrashed()
 */
	class CompanyCategory extends \Eloquent {}
}

namespace App\Models\Base{
/**
 * Class CompanyTip
 *
 * @property int $company_tip_id
 * @property int $company_id
 * @property string $tips
 * @property string $position
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $company_tips_meta
 * @property Company $company
 * @package App\Models\Base
 * @property string $tip_details
 * @property int $created_by
 * @property int|null $tip_success_status
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip newQuery()
 * @method static \Illuminate\Database\Query\Builder|CompanyTip onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip query()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereCompanyTipId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereCompanyTipsMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereTipDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereTipSuccessStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereTips($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|CompanyTip withTrashed()
 * @method static \Illuminate\Database\Query\Builder|CompanyTip withoutTrashed()
 */
	class CompanyTip extends \Eloquent {}
}

namespace App\Models\Base{
/**
 * Class CompanyTipsStandard
 *
 * @property int $company_tips_standard_id
 * @property string $name
 * @property string $standard_type
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $company_tips_standards_meta
 * @package App\Models\Base
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard newQuery()
 * @method static \Illuminate\Database\Query\Builder|CompanyTipsStandard onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard query()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereCompanyTipsStandardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereCompanyTipsStandardsMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereStandardType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|CompanyTipsStandard withTrashed()
 * @method static \Illuminate\Database\Query\Builder|CompanyTipsStandard withoutTrashed()
 */
	class CompanyTipsStandard extends \Eloquent {}
}

namespace App\Models\Base{
/**
 * Class FailedJob
 *
 * @property int $id
 * @property string $connection
 * @property string $queue
 * @property string $payload
 * @property string $exception
 * @property Carbon $failed_at
 * @package App\Models\Base
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob query()
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereConnection($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereException($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereFailedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob wherePayload($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereQueue($value)
 */
	class FailedJob extends \Eloquent {}
}

namespace App\Models\Base{
/**
 * Class Group
 *
 * @property int $groups_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $groups_meta
 * @package App\Models\Base
 * @method static \Illuminate\Database\Eloquent\Builder|Group newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Group newQuery()
 * @method static \Illuminate\Database\Query\Builder|Group onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Group query()
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereGroupsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereGroupsMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Group withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Group withoutTrashed()
 */
	class Group extends \Eloquent {}
}

namespace App\Models\Base{
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
 * @property NewsCategory $news_category
 * @package App\Models\Base
 * @property string|null $title
 * @method static \Illuminate\Database\Eloquent\Builder|News newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|News newQuery()
 * @method static \Illuminate\Database\Query\Builder|News onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|News query()
 * @method static \Illuminate\Database\Eloquent\Builder|News whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereNewsCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereNewsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereNewsMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|News withTrashed()
 * @method static \Illuminate\Database\Query\Builder|News withoutTrashed()
 */
	class News extends \Eloquent {}
}

namespace App\Models\Base{
/**
 * Class NewsCategory
 *
 * @property int $news_category_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $comp_cat_meta
 * @property Collection|News[] $news
 * @package App\Models\Base
 * @property-read int|null $news_count
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory newQuery()
 * @method static \Illuminate\Database\Query\Builder|NewsCategory onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereCompCatMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereNewsCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|NewsCategory withTrashed()
 * @method static \Illuminate\Database\Query\Builder|NewsCategory withoutTrashed()
 */
	class NewsCategory extends \Eloquent {}
}

namespace App\Models\Base{
/**
 * Class PasswordReset
 *
 * @property string $email
 * @property string $token
 * @property Carbon $created_at
 * @package App\Models\Base
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset query()
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset whereToken($value)
 */
	class PasswordReset extends \Eloquent {}
}

namespace App\Models\Base{
/**
 * Class Sector
 *
 * @property int $sectors_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $sectors_meta
 * @property Collection|Company[] $companies
 * @package App\Models\Base
 * @property int $sector_id
 * @property-read int|null $companies_count
 * @method static \Illuminate\Database\Eloquent\Builder|Sector newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sector newQuery()
 * @method static \Illuminate\Database\Query\Builder|Sector onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Sector query()
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereSectorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereSectorsMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Sector withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Sector withoutTrashed()
 */
	class Sector extends \Eloquent {}
}

namespace App\Models\Base{
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
 * @package App\Models\Base
 * @property string|null $mobile
 * @property string|null $provider
 * @property string|null $provider_id
 * @property string|null $image
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Query\Builder|User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFcmToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGroupKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePpwd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProvider($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|User withTrashed()
 * @method static \Illuminate\Database\Query\Builder|User withoutTrashed()
 */
	class User extends \Eloquent {}
}

namespace App\Models{
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
 * @property CompanyCategory $company_category
 * @property Sector $sector
 * @property Collection|CompanyTip[] $company_tips
 * @package App\Models
 * @property-read int|null $company_tips_count
 * @method static \Illuminate\Database\Eloquent\Builder|Company newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Company newQuery()
 * @method static \Illuminate\Database\Query\Builder|Company onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Company query()
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCompanyCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCompanyCode($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCompanyMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereSectorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Company whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Company withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Company withoutTrashed()
 */
	class Company extends \Eloquent {}
}

namespace App\Models{
/**
 * Class CompanyCategory
 *
 * @property int $company_category_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $comp_cat_meta
 * @property Collection|Company[] $companies
 * @package App\Models
 * @property-read int|null $companies_count
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory newQuery()
 * @method static \Illuminate\Database\Query\Builder|CompanyCategory onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereCompCatMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereCompanyCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|CompanyCategory withTrashed()
 * @method static \Illuminate\Database\Query\Builder|CompanyCategory withoutTrashed()
 */
	class CompanyCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * Class CompanyTip
 *
 * @property int $company_tip_id
 * @property int $company_id
 * @property string $tips
 * @property string $position
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $company_tips_meta
 * @property Company $company
 * @package App\Models
 * @property string $tip_details
 * @property int $created_by
 * @property int|null $tip_success_status
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip newQuery()
 * @method static \Illuminate\Database\Query\Builder|CompanyTip onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip query()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereCompanyId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereCompanyTipId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereCompanyTipsMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereCreatedBy($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip wherePosition($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereTipDetails($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereTipSuccessStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereTips($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTip whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|CompanyTip withTrashed()
 * @method static \Illuminate\Database\Query\Builder|CompanyTip withoutTrashed()
 */
	class CompanyTip extends \Eloquent {}
}

namespace App\Models{
/**
 * Class CompanyTipsStandard
 *
 * @property int $company_tips_standard_id
 * @property string $name
 * @property string $standard_type
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $company_tips_standards_meta
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard newQuery()
 * @method static \Illuminate\Database\Query\Builder|CompanyTipsStandard onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard query()
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereCompanyTipsStandardId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereCompanyTipsStandardsMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereStandardType($value)
 * @method static \Illuminate\Database\Eloquent\Builder|CompanyTipsStandard whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|CompanyTipsStandard withTrashed()
 * @method static \Illuminate\Database\Query\Builder|CompanyTipsStandard withoutTrashed()
 */
	class CompanyTipsStandard extends \Eloquent {}
}

namespace App\Models{
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
 * @package App\Models
 * @property \Illuminate\Support\Carbon|null $deleted_at
 * @method static \Illuminate\Database\Eloquent\Builder|ContactUs newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactUs newQuery()
 * @method static \Illuminate\Database\Query\Builder|ContactUs onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactUs query()
 * @method static \Illuminate\Database\Eloquent\Builder|ContactUs whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactUs whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactUs whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactUs whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactUs whereMessage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactUs whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactUs whereSubject($value)
 * @method static \Illuminate\Database\Eloquent\Builder|ContactUs whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|ContactUs withTrashed()
 * @method static \Illuminate\Database\Query\Builder|ContactUs withoutTrashed()
 */
	class ContactUs extends \Eloquent {}
}

namespace App\Models{
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
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder|Defaults newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Defaults newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Defaults query()
 * @method static \Illuminate\Database\Eloquent\Builder|Defaults whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Defaults whereDefaultsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Defaults whereKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Defaults whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Defaults whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Defaults whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Defaults whereValue($value)
 */
	class Defaults extends \Eloquent {}
}

namespace App\Models{
/**
 * Class FailedJob
 *
 * @property int $id
 * @property string $connection
 * @property string $queue
 * @property string $payload
 * @property string $exception
 * @property Carbon $failed_at
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob query()
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereConnection($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereException($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereFailedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob wherePayload($value)
 * @method static \Illuminate\Database\Eloquent\Builder|FailedJob whereQueue($value)
 */
	class FailedJob extends \Eloquent {}
}

namespace App\Models{
/**
 * Class Group
 *
 * @property int $groups_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $groups_meta
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder|Group newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Group newQuery()
 * @method static \Illuminate\Database\Query\Builder|Group onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Group query()
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereGroupsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereGroupsMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Group whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Group withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Group withoutTrashed()
 */
	class Group extends \Eloquent {}
}

namespace App\Models{
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
 * @property NewsCategory $news_category
 * @package App\Models
 * @property string|null $title
 * @method static \Illuminate\Database\Eloquent\Builder|News newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|News newQuery()
 * @method static \Illuminate\Database\Query\Builder|News onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|News query()
 * @method static \Illuminate\Database\Eloquent\Builder|News whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereNewsCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereNewsId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereNewsMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereTitle($value)
 * @method static \Illuminate\Database\Eloquent\Builder|News whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|News withTrashed()
 * @method static \Illuminate\Database\Query\Builder|News withoutTrashed()
 */
	class News extends \Eloquent {}
}

namespace App\Models{
/**
 * Class NewsCategory
 *
 * @property int $news_category_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $comp_cat_meta
 * @property Collection|News[] $news
 * @package App\Models
 * @property-read int|null $news_count
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory newQuery()
 * @method static \Illuminate\Database\Query\Builder|NewsCategory onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory query()
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereCompCatMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereNewsCategoryId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|NewsCategory whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|NewsCategory withTrashed()
 * @method static \Illuminate\Database\Query\Builder|NewsCategory withoutTrashed()
 */
	class NewsCategory extends \Eloquent {}
}

namespace App\Models{
/**
 * Class PasswordReset
 *
 * @property string $email
 * @property string $token
 * @property Carbon $created_at
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset query()
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|PasswordReset whereToken($value)
 */
	class PasswordReset extends \Eloquent {}
}

namespace App\Models{
/**
 * Class Sector
 *
 * @property int $sector_id
 * @property string $name
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @property string $deleted_at
 * @property string $sectors_meta
 * @property Collection|Company[] $companies
 * @package App\Models
 * @property-read int|null $companies_count
 * @method static \Illuminate\Database\Eloquent\Builder|Sector newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|Sector newQuery()
 * @method static \Illuminate\Database\Query\Builder|Sector onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|Sector query()
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereSectorId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereSectorsMeta($value)
 * @method static \Illuminate\Database\Eloquent\Builder|Sector whereUpdatedAt($value)
 * @method static \Illuminate\Database\Query\Builder|Sector withTrashed()
 * @method static \Illuminate\Database\Query\Builder|Sector withoutTrashed()
 */
	class Sector extends \Eloquent {}
}

namespace App\Models{
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
 * @package App\Models
 * @property string|null $mobile
 * @property string|null $provider
 * @property string|null $provider_id
 * @property string|null $image
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Query\Builder|User onlyTrashed()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFcmToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGroupKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePpwd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProvider($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUserId($value)
 * @method static \Illuminate\Database\Query\Builder|User withTrashed()
 * @method static \Illuminate\Database\Query\Builder|User withoutTrashed()
 */
	class User extends \Eloquent {}
}

namespace App\Models{
/**
 * Class VisitsCounter
 *
 * @property int $visit_ctr_id
 * @property string $ip
 * @property int $ctr
 * @property int $status
 * @property Carbon $created_at
 * @property Carbon $updated_at
 * @package App\Models
 * @method static \Illuminate\Database\Eloquent\Builder|VisitsCounter newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VisitsCounter newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|VisitsCounter query()
 * @method static \Illuminate\Database\Eloquent\Builder|VisitsCounter whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VisitsCounter whereCtr($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VisitsCounter whereIp($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VisitsCounter whereStatus($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VisitsCounter whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|VisitsCounter whereVisitCtrId($value)
 */
	class VisitsCounter extends \Eloquent {}
}

namespace App{
/**
 * App\User
 *
 * @property int $user_id
 * @property string $name
 * @property string $email
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string|null $password
 * @property string|null $ppwd
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon $created_at
 * @property \Illuminate\Support\Carbon $updated_at
 * @property string|null $fcm_token
 * @property string|null $deleted_at
 * @property int $group_id
 * @property string $group_key
 * @property string|null $mobile
 * @property string|null $provider
 * @property string|null $provider_id
 * @property string|null $image
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection|\Illuminate\Notifications\DatabaseNotification[] $notifications
 * @property-read int|null $notifications_count
 * @method static \Illuminate\Database\Eloquent\Builder|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder|User query()
 * @method static \Illuminate\Database\Eloquent\Builder|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereDeletedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereFcmToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGroupId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereGroupKey($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereImage($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereMobile($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User wherePpwd($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProvider($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereProviderId($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUpdatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder|User whereUserId($value)
 */
	class User extends \Eloquent {}
}

