@extends('includes.header')

@section('mainContent')
<div class="container mt-5" align="center" style="color: white;">
	<form id="resetForm" class="form-horizontal" method="post" action="{{ route('ngo.password.reset') }}" enctype="multipart/form-data">
		@csrf
		<input type="hidden" name="data[resetToken]" value="{{ $resetToken }}">
		<fieldset>
			<!-- Form Name -->
			<legend>{{ __('Enter New Password') }}!</legend>
			@include('flash::message')
			<!-- Email-->
			<div class="form-group row">
				<label class="col-md-4 control-label text-right" for="email">{{ __('Email') }}</label>
				<div class="col-md-4">
					<input id="email" type="email" placeholder="{{ __('Email') }}" class="form-control input-md" disabled value="{{ $email }}">
				</div>
			</div>
			<!-- Password-->
			<div class="form-group row">
				<label class="col-md-4 control-label text-right" for="password">{{ __('Password') }}</label>
				<div class="col-md-4">
					<input id="password" name="data[password]" type="password" placeholder="{{ __('Password') }}" class="form-control input-md" autofocus required>
				</div>
			</div>
			<!-- Confirm Password-->
			<div class="form-group row">
				<label class="col-md-4 control-label text-right" for="confirmPwd">{{ __('Confirm Password') }}</label>
				<div class="col-md-4 text-left">
					<input id="confirmPwd" name="data[confirmPwd]" type="password" placeholder="{{ __('Confirm Password') }}" class="form-control input-md" required>
					<label class="label text-left text-white bg-danger hide" id="pwdMatch_err">{{ __('Passwords Do not match') }}</label>
				</div>
			</div>
			<!-- login btn-->
			<div class="form-group row">
				<div class="offset-4 col-4">
					<button id="resetPwd" type="submit" class="btn btn-outline-light btn-lg btn-block">{{ __('Reset Password') }}</button>
				</div>
			</div>
		</fieldset>
	</form>
</div>
<script>
	$(document).ready(function() {
		$('#confirmPwd').on('keyup blur', function(event) {
			event.preventDefault();
			/* Act on the event */
			var pwd = $('#password').val();
			var pwd2 = $('#confirmPwd').val();
			if(pwd != pwd2){
				$('#pwdMatch_err').fadeIn('slow');
			} else{
				$('#pwdMatch_err').fadeOut('slow');
			}
		});
		$('#resetPwd').on('click', function(event) {
			event.preventDefault();
			/* Act on the event */
			var pwd = $('#password').val();
			var pwd2 = $('#confirmPwd').val();
			if(pwd != pwd2){
				alert('{{ __("Passwords do not match") }}');
				return false;
			} else{
				$('#resetForm').submit();
			}
			console.clear();
			console.log(pwd, pwd2);
			return false;
		});
	});
</script>
@endsection
