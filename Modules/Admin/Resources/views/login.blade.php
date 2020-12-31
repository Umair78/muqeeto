@extends('admin::layouts.master')

@section('content')
<style type="text/css" media="screen">
	body {
		background-color: rgba(205, 205, 205, 0.5);
	}
</style>
<div class="container mt-5" align="center">
	@include('flash::message')
	<form class="form-horizontal" method="post" action="{{ route('admin.login.action') }}" enctype="multipart/form-data">
		@csrf
		<fieldset>
			<!-- Form Name -->
			<legend>{{ __('Login') }}!</legend>
			@if($errors->any())
			<div class="col-6">
				<div class="alert alert-danger">
					<ul>
						@foreach ($errors->all() as $error)
						<li class="list-unstyled">{{ $error }}</li>
						@endforeach
					</ul>
				</div>
			</div>
			@endif
			@if(Session::has('message'))
			<div class="col-6">
				<div class="alert alert-success">
					{{ Session::get('message') }}
				</div>
			</div>
			@endif
			<!-- Email-->
			<div class="form-group row">
				<label class="col-md-4 control-label text-right" for="email">{{ __('Email') }}</label>
				<div class="col-md-4">
					<input id="email" name="email" type="email" placeholder="{{ __('Email') }}" class="form-control input-md" required autofocus>
				</div>
			</div>
			<!-- Password-->
			<div class="form-group row">
				<label class="col-md-4 control-label text-right" for="pwd">{{ __('Password') }}</label>
				<div class="col-md-4">
					<input id="pwd" name="password" type="password" placeholder="{{ __('Password') }}" class="form-control input-md" required>
				</div>
			</div>
			<!-- login btn-->
			<div class="form-group row">
				<div class="offset-4 col-4">
					<button type="submit" class="btn btn-outline-dark btn-lg btn-block">{{ __('Login') }}</button>
				</div>
			</div>
		</fieldset>
	</form>
</div>
@endsection
