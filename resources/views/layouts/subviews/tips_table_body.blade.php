<tr class="">
	<td class="text-nowrap">{{ Carbon\Carbon::parse($tip->created_at, 'Asia/Karachi')->isoFormat('DD-MM-YYYY hh:mm A') }}</td>
	<td>{{ $tip->company->name }}</td>
	<td class="montserrat-700 text-center">{{ $tip->company->company_code }}</td>
	<td>{{ $tip->company->sector->name }}</td>
	@php
	$tip_details = json_decode($tip->tip_details, true);
	@endphp
	@foreach($tip_details as $item => $val)
	<td class="montserrat-700 text-center">
		{{ /*$item . " : " .*/ $val }} <br>
		@if($item == 'Current Rate')
		{{-- <font class="font-weight-normal">{{ Carbon\Carbon::parse($tip->created_at, 'Asia/Karachi')->isoFormat('hh:mm A') }}</font> --}}
		@endif
	</td>
	@endforeach
	@if($tip->tip_success_status)
	<td class="text-center">
		<div class="btn-success btn-block p-2">Tip Successful</div>
	</td>
	@else
	<td>
		-
	</td>
	@endif
	<td>{{ $tip->company_tips_meta }}</td>
	<td class="justify-content-between">
		<a href="https://www.facebook.com/dialog/share?
		app_id=1772600522882696
		&display=popup
		&image=https%3A%2F%2Fquorex.pk%2Fassets%2Fimg%2FQuorex%20Logo%201.png
		&title={{ $tip->company->company_code }}+Update!
		&description={{ $tip->company->company_code }}+Update!
		&quote={{ $tip->company->company_code }}+Update!
		&caption={{ $tip->company->company_code }}+Update!
		&href=https%3A%2F%2Fquorex.pk%2Ftips%2F
		&redirect_uri=https%3A%2F%2Fquorex.pk" target="_blank">
		<span class="fa fa-facebook-square"> Share</span>
	</a>
	<br>
	<a href="whatsapp://send?text={{ $tip->company->company_code }} Update!%0ahttps://quorex.pk/tips" data-action="share/whatsapp/share">
		<span class="fa fa-whatsapp text-whatsapp"> Share</span>
	</a>
</td>
</tr>