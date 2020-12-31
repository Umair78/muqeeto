@extends('layouts.master')

@section('content')
<div class="container-fluid bg-gray">
	<div class="row">
		<div class="container mt-5 mb-5 bg-white rounded-1 shadow-1 pt-5 pb-3 border-bottom-red">
			@include('flash::message')
			<div class="row justify-content-center">
				@include('layouts.subviews.profile_subview')
				<div class="col-1 text-center">
					<div class="vl-half d-none d-md-block"></div>
					<hr class="d-sm-block d-md-none d-lg-none d-xl-none">
				</div>
				@include('layouts.subviews.changepwd_subview')
			</div>
		</div>
	</div>
</div>
@include('layouts.footer')
<style>
	.alert {
		text-align: center;
	}
</style>
@endsection
