@extends('layouts.master')
@section('content')

<!-- Main Container Start -->
<div class="container aboutUs mb-5">
	<style type="text/css" media="screen">
		#privacy_policy h1,#privacy_policy h2,#privacy_policy h3,#privacy_policy h4,#privacy_policy h5,#privacy_policy h6,#privacy_policy p a{
			color: #ed2f59;
		}
		#privacy_policy p a:hover{
			background-color: #ed2f59;
			color: #fff;
		}
		#privacy_policy p{
			color: #000;
		}
		#privacy_policy h1{
			font-size: 40px;
		}
	</style>
	{{-- About Us --}}
	<div class="row mt-5" id="aboutus">
		<div class="col-12 mt-5 pt-5">
			<div class="h3 text-danger text-center text-uppercase montserrat-700">
				About Us
			</div>
			<div class="text-center montserrat-500">
				{!! $aboutUs !!}
			</div>
		</div>
	</div>
	{{-- After About Us --}}
	<div class="row mt-5">
		<div class="col-12 mt-5 pt-5">
			<div class="row offset-xl-1 offset-lg-1 offset-md-1 offset-sm-0">
				<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
					<div class="text-left mt-5 montserrat-500">
						<div class="h3 text-danger text-left text-uppercase montserrat-700">
							Our Mission
						</div>
						{!! $home_mission !!}
					</div>
				</div>
				<div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
					<img src="{{ asset('assets/img/Mission.jpg') }}" alt="" class="img-fluid">
				</div>
			</div>
		</div>
	</div>
	{{-- After About Us --}}
	<div class="row mt-5">
		<div class="col-12 mt-5 pt-5">
			<div class="row offset-xl-1 offset-lg-1 offset-md-1 offset-sm-0">
				<div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
					<img src="{{ asset('assets/img/Vision.jpg') }}" alt="" class="img-fluid">
				</div>
				<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
					<div class="text-left mt-5 montserrat-500">
						<div class="h3 text-danger text-left text-uppercase montserrat-700">
							Our Vision
						</div>
						{!! $home_vision !!}
					</div>
				</div>
			</div>
		</div>
	</div>
</div>

@include('layouts.footer')

@endsection
