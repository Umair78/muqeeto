@extends('layouts.master')

@section('content')
<div class="container-fluid bg-gray">
	<div class="row">
		<div class="container mt-5 mb-5 bg-white rounded-1 shadow-1 pt-5 pb-5 border-bottom-red">
			@include('flash::message')
			<div class="col-12 mb-5 bg-red-blurred pt-3 pb-3 text-center">
				<a href="{{ url('/login/facebook') }}" class="btn btn-info bg-facebook montserrat-500"> <span class="fa fa-facebook"></span> | Facebook Login</a>
			</div>
			<div class="row justify-content-center">
				<div class="pb-5 montserrat-800">
					OR
				</div>
			</div>
			<div class="row justify-content-center">
				<!-- @include('auth.subviews.login_subview') -->
				<div class="col-1 text-center">
					<div class="vl d-none d-md-block"></div>
					<hr class="d-sm-block d-md-none d-lg-none d-xl-none">
				</div>
				@include('auth.subviews.register_subview') -->
			</div>
		</div>
	</div>
</div>
@include('layouts.footer')
@endsection
