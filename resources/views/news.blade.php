{{-- @dd(URL::current()) --}}
{{-- @dd($tips->toArray()) --}}
@extends('layouts.master')
@section('content')
<div class="container mt-5 mb-5 pb-5">
	<div class="h1 montserrat-800 text-center text-uppercase">
		News
	</div>
	@if(!$user)
	<div class="alert alert-danger text-center">
		<a href="{{ route('login') }}" class="mt-2 btn btn-danger bg-red btn-block">{{ __('Please login / register to view this page.') }}</a>
	</div>
	@else
	<div class="row">
		<div class="col-xl-8 col-lg-8 col-md-6 col-sm-12 col-xs-12">
			<div class="form-group row">
				<label for="date" class="col-1 col-form-label text-left">{{ __('Date') }}</label>
				<div class="col-4">
					<div class="input-group mb-3">
						<input type="text" class="form-control datepicker" name="" id="date" value="" placeholder="Select Date" autocomplete="off" readonly>
						<div class="input-group-append">
							<span class="input-group-text"><span class="fa fa-calendar"></span></span>
						</div>
					</div>
				</div>
				<label for="company" class="col-2 col-form-label text-right">{{ __('Company') }}</label>
				<div class="col-5">
					<div class="input-group mb-3">
						<select name="" class="form-control" id="company_select">
							<option value="0" disabled selected>Select</option>
							@foreach($companies as $company)
							<option value="{{ $company->company_id }}" {{ $company->company_id == $selected_company ? 'selected' : '' }}>{{ $company->company_code . " (" . $company->name . ")" }}</option>
							@endforeach
						</select>
					</div>
				</div>
			</div>
			@if(count($news))
			@foreach($news as $kb)
			<div class="card home-card rounded-1 mb-3">
				<div class="card-body">
					<div class="row">
						<h5 class="col-9 card-title text-left montserrat-700">
							{{ $kb->title }}
							<font class="small text-muted title_disp" title="{{ $kb->title . ", Added " . Carbon\Carbon::createFromTimeStamp(strtotime($kb->created_at))->diffForHumans() . " On " . Carbon\Carbon::parse($kb->created_at, 'Asia/Karachi')->isoFormat('DD-MM-YYYY h:m') . " " }}" data-toggle="tooltip" data-placement="top" >
								({{ Carbon\Carbon::createFromTimeStamp(strtotime($kb->created_at))->diffForHumans() }})
							</font>
							<font class="small">
								<a href="https://www.facebook.com/dialog/share?
								app_id=1772600522882696
								&display=popup
								&image=https%3A%2F%2Fquorex.pk%2Fassets%2Fimg%2FQuorex%20Logo%201.png
								&title={{ $kb->title }}
								&description={{ $kb->title }}
								&quote={{ $kb->title }}
								&caption={{ $kb->title }}
								&href={{ URL::current() }}
								&redirect_uri=https%3A%2F%2Fquorex.pk" target="_blank"> 
								<span class="fa fa-facebook-square"> Share</span>
							</a>
								&nbsp;
								<a href="whatsapp://send?text={{ $kb->title . " %0a" . URL::current() }}" data-action="share/whatsapp/share">
									<span class="fa fa-whatsapp text-whatsapp"> Share</span>
								</a>
							</font>
						</h5>
						<h6 class="col card-subtitle text-muted text-right">{{ $kb->news_category->name }}</h6>
					</div>
					<div class="card-text montserrat-500">
						{!! $kb->name !!}
					</div>
				</div>
			</div>
			@endforeach
			@else
			<div class="card home-card rounded-1 mb-3 bg-red-blurred p-3">
				No news for selected filters
			</div>
			@endif
		</div>
		<div class="col-xl-4 col-lg-4 col-md-6 col-sm-12 col-xs-12 border-left pl-4">
			{{-- feed --}}
			<div class="row">
				<div class="col-12 bg-red montserrat-700 text-white text-center rounded-1 p-3">
					Latest Alerts
				</div>
				<div class="col-12">
					<ul class="data-list list-unstyled" data-autoscroll>
						@foreach($latest_news as $kb)
						<li class="mousepointer">
							<div class="row title_disp" title="{{ $kb->title . ", Added " . Carbon\Carbon::createFromTimeStamp(strtotime($kb->created_at))->diffForHumans() . " On " . Carbon\Carbon::parse($kb->created_at, 'Asia/Karachi')->isoFormat('DD-MM-YYYY h:m') . " " }}" data-toggle="tooltip" data-placement="top">
								{{-- onclick="reroute('{{ Carbon\Carbon::parse($kb->created_at, 'Asia/Karachi')->isoFormat('YYYY-MM-DD') }}')" --}}
								<div class="col-7 text-left">
									💡 {{ $kb->title }}
								</div>
								<div class="col-5 text-muted small text-right">
									{{-- {{ Carbon\Carbon::parse($kb->created_at, 'Asia/Karachi')->isoFormat('DD-MM-YYYY h:m') }} --}}
									{{ Carbon\Carbon::createFromTimeStamp(strtotime($kb->created_at))->diffForHumans() }}
								</div>
							</div>
						</li>
						@endforeach
					</ul>
				</div>
			</div>
			{{-- Ads --}}
			<div class="row">
				<div class="col-12 bg-red montserrat-700 text-white text-center rounded-1 p-3">
					Ads
				</div>
				<div class="col-12">
					<ul class="list-unstyled border">
						<li class="m-5">
							<img class="img-fluid" alt="Code Studio Pakistan" src="https://codestudio.com.pk/assets/images/LinearLogo.png">
						</li>
						<li class="m-5">
							<img class="img-fluid" alt="Code Studio Pakistan" src="https://wallofkindness.com.pk/assets/img/logo.png">
						</li>
					</ul>
				</div>
			</div>
		</div>
	</div>
	@endif
</div>
@include('layouts.footer')
<script type="text/javascript">
	$(document).ready(function($) {
		$('.title_disp').tooltip();
		$('#company_select').select2({
			theme: "classic"
		});
		var today = new Date();
		var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
		var url_argument = '';
		$('.datepicker').datepicker({
			clearBtn: true,
			format: "dd/mm/yyyy",
			autoclose: true,
			endDate: date,
			todayHighlight: true,
			enableOnReadonly: true,
			todayBtn: 'linked',
			toggleActive: true
		}).on('changeDate', function(e) {
			console.log('datepicker', e);
			var selected = new Date(e.dates[0]);
			var selecteddate = selected.getFullYear()+'-'+(selected.getMonth()+1)+'-'+selected.getDate();
			url_argument = selecteddate;
			var selecteddate = selected.getDate()+'/'+(selected.getMonth()+1)+'/'+selected.getFullYear();
			$('.datepicker').val(selecteddate);
		});
		console.log('{{ $date }}');
		var today = new Date('{{ $date }}');
		console.log(today);
		var date = today.getDate()+'/'+(today.getMonth()+1)+'/'+today.getFullYear();
		$('.datepicker').datepicker('setDate', date);
		// $('.datepicker').val(date);
		$('.datepicker').on('change', function(event) {
			event.preventDefault();
			/* Act on the event */
			console.log('change event fired');
			var selected = new Date(url_argument);
			var selecteddate = selected.getFullYear()+'-'+(selected.getMonth()+1)+'-'+selected.getDate();
			var company_select = $('#company_select').val();
			if(company_select > 0){
				url = "{{ url('news') }}" + "/" + selecteddate + "/" + company_select;
				reroute(url);
			} else{
				url = "{{ url('news') }}" + "/" + selecteddate;
				reroute(url);
			}
		});
		$('#company_select').on('change', function(event) {
			event.preventDefault();
			var company_select = $('#company_select').val();
			if(company_select > 0){
				url = "{{ url('news') }}" + "/" + 0 + "/" + company_select;
				reroute(url);
			} else{
				url = "{{ url('news') }}";
				reroute(url);
			}
		});
	});
	function reroute(uri) {
		window.location = uri;
	}
</script>
<style>
	.data-list {
		height: 220px;
		/*width: 100%;*/
		padding: 2rem;
		overflow-y: hidden;
		border: 1px solid #cecece;
		/*border-radius: 5px;*/
	}
</style>
@endsection