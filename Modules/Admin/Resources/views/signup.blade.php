@extends('includes.header')
@section('mainContent')
<link rel="stylesheet" href="{{ asset('assets/css/tree.css') }}">
<link rel="stylesheet" href="{{ asset('assets/css/checktree.css') }}">
<link rel="stylesheet" href="{{ asset('assets/css/hummingbird-treeview.css') }}">
<!-- Main Container Start -->
<div class="container" style="color: white;">
	<form id="form" class="form-horizontal" style="margin-top: 5em; margin-bottom: 5em;" method="post" action="{{ route('ngo.save.signup') }}" enctype="multipart/form-data">
		@csrf
		<fieldset class="text-center">

			<!-- Form Name -->
			<legend style="text-align: center;">Register With Us!</legend>
			@include('flash::message')
			<div class="alert alert-danger alert-dismissible hide" id="errorsDiv"></div>

			<!-- Company Logo -->
			<div class="form-group row">
				<label class="col-md control-label" for="picture">
					{{ __('Company Logo') }}
					<h6 id="btPic"><span class="badge badge-info">Click on the image to upload logo</span></h6>
				</label>
				<div class="col-md">
					<div class="row">
						<br>
						<label for="picUploader" class="col-md control-label label-md">
							<img id="image-preview" src="https://dummyimage.com/100/b5b1b5/000000&text=Logo" alt="your image" width="100" tabindex="-1" />
						</label>
						<input id="picUploader" name="picUploader" type="file" accept="image/*" style="display: none;" placeholder="Upload Logo" />
						<!-- <label class="custom-file-label col-md-6" for="picUploader" style="top: 5px;" id="picPath">Choose file</label> -->
						<label class="control-label col-md err" id="picUploaderErr" style="color: red; font-weight: bold;"></label>
					</div>
				</div>
			</div>

			<!-- Company Name -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="companyName">Company Name</label> 
				<div class="col-8">
					<input id="companyName" value="{{ old('data')['companyName'] }}" name="data[companyName]" type="text" placeholder="Company Name" class="form-control input-md" required="" autofocus>
				</div>
			</div>

			<!-- Company Email -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="companyEmail">Company Email</label> 
				<div class="col-8">
					<input id="companyEmail" value="{{ old('data')['companyEmail'] }}" name="data[companyEmail]" type="email" placeholder="Company Email" class="form-control input-md" required="">
				</div>
			</div>

			<!-- Company Phone -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="companyPhone">Company Phone #</label> 
				<div class="col-8">
					<input id="companyPhone" value="{{ old('data')['companyPhone'] }}" name="data[companyPhone]" type="tel" placeholder="Contact Person Phone #" class="form-control input-md" required="">
				</div>
			</div>

			<!-- Contact Person Name -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="cpName">Contact Person Name</label> 
				<div class="col-8">
					<input id="cpName" value="{{ old('data')['cpName'] }}" name="data[cpName]" type="text" placeholder="Contact Person Name" class="form-control input-md" required="">
				</div>
			</div>

			<!-- Login Email -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="email">Login Email</label> 
				<div class="col-8">
					<input id="email" value="{{ old('data')['email'] }}" name="data[email]" type="email" placeholder="Contact Person Email" class="form-control input-md" required="">
				</div>
			</div>

			<!-- Login Password -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="password">Login password</label> 
				<div class="col-8">
					<input id="password" value="{{ old('data')['password'] }}" name="data[password]" type="password" placeholder="Login password" class="form-control input-md" required="">
				</div>
			</div>

			<!-- About Your Company -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="aboutUs">About Your Company</label>
				<div class="col-8">
					<textarea class="form-control" id="aboutUs" value="{{ old('data')['aboutUs'] }}" name="data[aboutUs]" placeholder="About Your Company"></textarea>
				</div>
			</div>

			<!-- Address -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="address">Address</label>
				<div class="col-8">
					@include('ngo::modals.addAddress')
					<button type="button" class="btn btn-block btn-outline-light btn-dark" data-target="#ngo_addressModal" data-toggle="modal">{{ __('Add Address') }}</button>
					<input type="hidden" value="{{ old('data')['address'] }}" name="data[address]" id="address" value="">
					<input type="hidden" value="{{ old('data')['locationID'] }}" name="data[locationID]" id="locationID" value="">
				</div>
			</div>

			<!-- Locations -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="locations">Locations</label>
				<div class="col-8">
					@include('ngo::modals.addlocations')
					<button type="button" class="btn btn-block btn-outline-light btn-dark" data-target="#ngo_locationsModal" data-toggle="modal">{{ __('Select Locations') }}</button>
					{{-- <input type="hidden" name="locations" id="locations" value=""> --}}
				</div>
			</div>

			<!-- Categories -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="categories">Categories</label>
				<div class="col-8">
					@include('ngo::modals.addcategories')
					<button type="button" class="btn btn-block btn-outline-light btn-dark" data-target="#ngo_categoriesModal" data-toggle="modal">{{ __('Select Categories') }}</button>
					{{-- <input type="hidden" name="locations" id="locations" value=""> --}}
				</div>
			</div>

			<!-- Background -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="background">Background</label>
				<div class="col-8"> 
					<textarea class="form-control" id="background" value="{{ old('data')['background'] }}" name="data[background]" placeholder="Background"></textarea>
				</div>
			</div>

			<!-- Legal Status -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="legalStatus">LegalStatus</label>
				<div class="col-8"> 
					<textarea class="form-control" id="legalStatus" value="{{ old('data')['legalStatus'] }}" name="data[legalStatus]" placeholder="Legal Status"></textarea>
				</div>
			</div>

			<!-- Company Registration -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="radios">Are You Registered with SECP/ FBR?</label>
				<div class="col-md-8">
					<div class="form-check-inline">
						<label class="form-check-label radio-inline" for="show">
							<input id="show" class="form-check-input" type="radio" {{ old('data')['radios'] }} name="data[radios]" value="1">
							Yes
						</label> 
					</div>
					<div class="form-check-inline">
						<label class="form-check-label radio-inline" for="hide">
							<input id="hide" class="form-check-input" type="radio" {{ old('data')['radios'] }} name="data[radios]" value="0" checked>
							No
						</label>
					</div>
				</div>
			</div>

			<section id="registered">
				<!-- Company Name -->
				<div class="form-group row">
					<label class="col-md-3 control-label text-right" for="registeredOn">Company Registration Date</label> 
					<div class="col-8">
						<input id="registeredOn" value="{{ old('data')['registeredOn'] }}" name="data[registeredOn]" type="date" class="form-control input-md">
					</div>
				</div>
			</section>

			<!-- Any Other Details/ Remarks -->
			<div class="form-group row">
				<label class="col-md-3 control-label text-right" for="furtherDetails">Any Other Details/ Remarks</label>
				<div class="col-8"> 
					<textarea class="form-control" id="furtherDetails" value="{{ old('data')['furtherDetails'] }}" name="data[furtherDetails]" placeholder="Any Other Details/ Remarks"></textarea>
				</div>
			</div>

			<!-- Submit -->
			<div class="form-group row">
				<div class="offset-3 col-8"> 
					<button type="submit" id="submitForm" name="data[submitForm]" class="btn btn-lg btn-block btn-outline-light">Submit Details</button>
				</div>
			</div>
		</fieldset>
	</form>
</div>
<!-- Main Container End -->

<script src="{{ asset('assets/js/treejs.js') }}" type="text/javascript" charset="utf-8"></script>
<script src="{{ asset('assets/js/checktree.js') }}" type="text/javascript" charset="utf-8"></script>
<script src="{{ asset('assets/js/hummingbird-treeview.js') }}" type="text/javascript" charset="utf-8"></script>
<script>
	$(document).ready(function() {
		$("#picUploader").change(function(event) {
			readURL(this);
		});
		$("#aboutUs").Editor();
		$("#aboutUs").Editor("setText", "{{ old('data')['aboutUs'] }}");
		$("#background").Editor();
		$("#background").Editor("setText", "{{ old('data')['background'] }}");
		$("#legalStatus").Editor();
		$("#legalStatus").Editor("setText", "{{ old('data')['legalStatus'] }}");
		$("#furtherDetails").Editor();
		$("#furtherDetails").Editor("setText", "{{ old('data')['furtherDetails'] }}");
		$("#registered").hide();
		$("#hide").click(function(){
			$("#registered").hide();
		});
		$("#show").click(function(){
			$("#registered").show();
		});

		$('body').on('change keyup keydown', function(event) {
			// event.preventDefault();
			/* Act on the event */
			$("#aboutUs").text($("#aboutUs").Editor('getText'));
			$("#background").text($("#background").Editor('getText'));
			$("#legalStatus").text($("#legalStatus").Editor('getText'));
			$("#furtherDetails").text($("#furtherDetails").Editor('getText'));
		});

		$("#locations_treeview").hummingbird();
		$("#locations_treeview").hummingbird("collapseAll");

		$('#saveAddress').on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			$('#address').val($('#add_address').val());
			$('#locationID').val($('#add_tehsil').val());
			// $('#ngo_addressModal').modal('hide');
		});

		$('#submitForm').on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			validateForm();
		});
	});

	function readURL(input) {
		if (input.files && input.files[0]) {
			var reader = new FileReader();

			reader.onload = function(e) {
				$('#image-preview').attr('src', e.target.result);
			}

			reader.readAsDataURL(input.files[0]);
		}
	}

	function validateForm() {
		// return true;
		/* Act on the event */
		var postData = {};
		postData['name'] = $('#companyName').val();
		postData['email'] = $('#email').val();
		postData['phone'] = $('#companyPhone').val();
		postData['poc_email'] = $('#companyEmail').val();
		postData['_token'] = '{{ csrf_token() }}';
		console.clear();
		console.log(postData);
		console.log(JSON.stringify(postData));
		$.ajax({
			url: '{{ route("checkNgo") }}',
			type: 'POST',
			data: postData,
		})
		.done(function(retVal) {
			console.log(retVal);
			if(retVal){
				$("html, body").animate({ scrollTop: 0 }, 600); 
				$('#errorsDiv').show();
				$('#errorsDiv').html('A partner with these credentials is already registered. Please change credentials or login to continue');
				return false;
				// alert("found 1. sorry cannot register again");
			} else {
				$('#form').submit();
			}
			console.log("success");
		})
		.fail(function() {
			$("html, body").animate({ scrollTop: 0 }, 600); 
			$('#errorsDiv').html('Some Error Occured. Please try again');
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});

		return false;
	}
</script>

@endsection