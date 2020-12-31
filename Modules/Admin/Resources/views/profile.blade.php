{{-- @dd(collect($locations)->groupBy('Province')) --}}
@extends('ngo::layouts.master')
@section('content')
<!-- breadcrumb -->
<nav aria-label="breadcrumb">
	<ol class="breadcrumb">
		<li class="breadcrumb-item active" aria-current="page">Profile</li>
	</ol>
</nav>
<!-- dasboard -->
<div class="dashpad" align="center">
	@include('flash::message')
	<!-- Main Container Start -->
	<div class="container">
		<div class="row">
			<div class="col-12 text-xl-right text-lg-right text-md-right text-sm-center text-xs-center">
				<button type="button" class="btn btn-outline-success btn-lg" onclick="enableEdit()" id="edit">{{ __('Edit') }}</button>
			</div>
		</div>
		<form id="form" class="form-horizontal" style="margin-top: 5em; margin-bottom: 5em;" method="post" action="{{ route('ngo.save.profile') }}" enctype="multipart/form-data">
			@csrf
			<fieldset class="text-center">

				<!-- Form Name -->
				<legend style="text-align: center;">Partner Profile</legend>
				@include('flash::message')

				<!-- Company Logo -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="picture">
						{{ __('Company Logo') }}
						<h6 id="btPic"><span class="badge badge-info">Click on the image to upload logo</span></h6>
					</label>
					<div class="col-md-8 text-center">
						<div class="row">
							<label for="picUploader" class="col-md-9 control-label label-md">
								<img id="image-preview" src="https://dummyimage.com/100/b5b1b5/000000&text=Logo" alt="your image" width="100" tabindex="-1" />
							</label>
							<input id="picUploader" name="picUploader" type="file" accept="image/*" style="display: none;" placeholder="Upload Logo" />
						</div>
					</div>
				</div>

				<!-- Company Name -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="name">Company Name</label> 
					<div class="col-md-8">
						<input id="name" value="{{ old('data', $ngo)['name'] }}" name="data[name]" type="text" placeholder="Company Name" class="form-control input-md" required="" autofocus>
					</div>
				</div>

				<!-- Company Email -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="poc_email">Company Email</label> 
					<div class="col-md-8">
						<input id="poc_email" value="{{ old('data', $ngo)['poc_email'] }}" name="data[poc_email]" type="email" placeholder="Company Email" class="form-control input-md" required="">
					</div>
				</div>

				<!-- Company Phone -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="phone">Company Phone #</label> 
					<div class="col-md-8">
						<input id="phone" value="{{ old('data', $ngo)['phone'] }}" name="data[phone]" type="tel" placeholder="Contact Person Phone #" class="form-control input-md" required="">
					</div>
				</div>

				<!-- Contact Person Name -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="poc_name">Contact Person Name</label> 
					<div class="col-md-8">
						<input id="poc_name" value="{{ old('data', $ngo)['poc_name'] }}" name="data[poc_name]" type="text" placeholder="Contact Person Name" class="form-control input-md" required="">
					</div>
				</div>

				<!-- Login Email -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="email">Login Email</label> 
					<div class="col-md-8">
						<input id="email" value="{{ old('data', $ngo)['email'] }}" name="data[email]" type="email" placeholder="Contact Person Email" class="form-control input-md" required="">
					</div>
				</div>

				<!-- About Your Company -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="about">About Your Company</label>
					<div class="col-md-8">
						<textarea class="form-control" id="about" value="{{ old('data', $ngo)['about'] }}" name="data[about]" placeholder="About Your Company">{!! old('data', $ngo)['about'] !!}</textarea>
					</div>
				</div>

				<!-- Address -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="address">Address</label>
					<div class="col-md-8">
						@include('ngo::modals.addAddressProfile')
						<button disabled="disabled" type="button" class="btn btn-block btn-outline-dark btn-dark" data-target="#ngo_addressModal" data-toggle="modal">{{ __('Update Address') }}</button>
						<input type="hidden" value="{{ old('data', $ngo)['ngo_address'] }}" name="data[ngo_address]" id="address" value="">
						<input type="hidden" value="{{ old('data', $ngo)['ngo_locId'] }}" name="data[ngo_locId]" id="locationID" value="">
					</div>
				</div>

				<!-- Locations -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="locations">Locations</label>
					<div class="col-md-8">
						@include('ngo::modals.addlocationsProfile')
						{{-- @include('ngo::modals.addlocations') --}}
						<button disabled="disabled" type="button" class="btn btn-block btn-outline-dark btn-dark" data-target="#ngo_locationsModal" data-toggle="modal">{{ __('Select Locations') }}</button>
						{{-- <input type="hidden" name="locations" id="locations" value=""> --}}
					</div>
				</div>

				<!-- Categories -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="categories">Categories</label>
					<div class="col-md-8">
						@include('ngo::modals.addcategoriesProfile')
						<button disabled="disabled" type="button" class="btn btn-block btn-outline-dark btn-dark" data-target="#ngo_categoriesModal" data-toggle="modal">{{ __('Select Categories') }}</button>
						{{-- <input type="hidden" name="locations" id="locations" value=""> --}}
					</div>
				</div>

				<!-- background -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="background">Background</label>
					<div class="col-md-8"> 
						<textarea class="form-control" id="background" value="{{ old('data', $ngo)['background'] }}" name="data[background]" placeholder="background">{!! old('data', $ngo)['background'] !!}</textarea>
					</div>
				</div>

				<!-- Legal Status -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="legal_status">legal_status</label>
					<div class="col-md-8"> 
						<textarea class="form-control" id="legal_status" value="{{ old('data', $ngo)['legal_status'] }}" name="data[legal_status]" placeholder="Legal Status">{!!  old('data', $ngo)['legal_status']  !!}</textarea>
					</div>
				</div>

				<!-- Company Registration -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="radios">Are You Registered?</label>
					<div class="col-md-8 text-left table-bordered border-dark">
						<div class="form-check-inline">
							<input id="show" class="form-check-input" type="radio" {{ old('data', $reg_Yes)['is_registered'] }} name="data[is_registered]" value="1">
							<label class="form-check-label" for="show">
								Yes
							</label> 
						</div>
						<div class="form-check-inline">
							<input id="hide" class="form-check-input" type="radio" {{ old('data', $reg_No)['is_registered'] }} name="data[is_registered]" value="0">
							<label class="form-check-label" for="hide">
								No
							</label>
						</div>
						<section id="registered" class="{{ $date_hidden }}">
							<!-- Company Name -->
							<div class="row col-12">
								<label class="col-md-5 control-label text-left" for="registration_date">Company Registration Date</label> 
								<div class="col-md-5">
									<input id="registration_date" value="{{ str_replace(' 00:00:00', '', old('data', $ngo)['registration_date']) }}" name="data[registration_date]" type="text" class="form-control input-md">
								</div>
							</div>
						</section>
					</div>
				</div>

				<!-- Any Other Details/ Remarks -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-xl-right text-lg-right text-md-right text-sm-center text-xs-center" for="extra_details">Any Other Details/ Remarks</label>
					<div class="col-md-8"> 
						<textarea class="form-control" id="extra_details" value="{{ old('data', $ngo)['extra_details'] }}" name="data[extra_details]" placeholder="Any Other Details/ Remarks">{!!  old('data', $ngo)['extra_details']  !!}</textarea>
					</div>
				</div>

				<!-- Submit -->
				<div class="form-group row">
					<div class="offset-md-3 col-md-8"> 
						<button disabled="disabled" type="submit" id="submitForm" name="data[submitForm]" class="btn btn-lg btn-block btn-outline-dark">Submit Details</button>
					</div>
				</div>

			</fieldset>
		</form>
	</div>
	<!-- Main Container End -->
</div>

<script>
	$(document).ready(function() {
		defaults();
		events();
	});

	function defaults() {
		$("#about").summernote('disable');
		$("#background").summernote('disable');
		$("#legal_status").summernote('disable');
		$("#extra_details").summernote('disable');
		$( "#registration_date" ).datepicker();
		$('input').attr('disabled', 'disabled');
		$('textarea').attr('disabled', 'disabled');
		$('select').attr('disabled', 'disabled');
		$("#picUploader").change(function(event) {
			readURL(this);
		});
	}

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#image-preview').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	function enableEdit() {
		$('#edit').hide();
		$('input').removeAttr('disabled');
		$('textarea').removeAttr('disabled');
		$('select').removeAttr('disabled');
		$('button').removeAttr('disabled');
		$("#about").summernote('enable');
		$("#background").summernote('enable');
		$("#legal_status").summernote('enable');
		$("#extra_details").summernote('enable');
	}

	function events() {
		$("#hide").click(function(){
			$("#registered").hide();
		});
		$("#show").click(function(){
			$("#registered").show();
		});
		$( "#registration_date" ).on('keyup', function(event) {
			event.preventDefault();
			$(this).val('');
		});
		$('#saveAddress').on('click', function(event) {
			event.preventDefault();
			$('#address').val($('#add_address').val());
			$('#locationID').val($('#add_tehsil').val());
		});
	}
</script>
@endsection
