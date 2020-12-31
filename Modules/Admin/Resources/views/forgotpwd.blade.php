@extends('includes.header')

@section('mainContent')
<div class="container mt-5" align="center" style="color: white;">
	<form class="form-horizontal" method="post" action="{{ route('ngo.password.reset.sendmail') }}" enctype="multipart/form-data">
		@csrf
		<fieldset>
			<!-- Form Name -->
			<legend>{{ __('Forgot Password') }}!</legend>
			@include('flash::message')
			<!-- Email-->
			<div class="form-group row">
				<label class="col-md-4 control-label text-right" for="email">{{ __('Email') }}</label>
				<div class="col-md-4">
					<input id="email" name="email" type="email" placeholder="{{ __('Email') }}" class="form-control input-md" required autofocus>
				</div>
			</div>
			<!-- login btn-->
			<div class="form-group row">
				<div class="offset-4 col-4">
					<button type="submit" class="btn btn-outline-light btn-lg btn-block">{{ __('Reset Password') }}</button>
				</div>
			</div>
		</fieldset>
	</form>
</div>
@endsection
