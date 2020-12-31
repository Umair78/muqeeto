@extends('layouts.master')

@section('content')
<div class="container-fluid bg-gray">
	<div class="row">
		<div class="container mt-5 mb-5 bg-white rounded-1 shadow-1 pt-5 pb-5 border-bottom-red">
			@include('flash::message')
			<div class="row justify-content-center mb-5 bg-grey-blurred pt-3 pb-3">
					<div class="pr-3">
						<a href="{{ url('/login/facebook') }}" class="btn btn-white  montserrat-500"> <span class="rounded-circle fa fa-facebook fa-2x" style="height: 20px; width:15px"></span>  </a>
					</div>
					</br>				
				
					<div class="pr-3" >
						<a href="{{ url('/login/twitter') }}" class="btn btn-white montserrat-500 "> <span class="rounded-circle fa fa-twitter fa-2x" style="height: 20px; width:25px"></span></a>
					</div>	
					</br>
					<div class="pr-3">
						<a href="{{ url('/login/linkedin') }}" class="btn btn-white montserrat-500"> <span class="rounded-circle fa fa-linkedin fa-2x" style="height: 20px; width:25px"></span></a>
					</div>
					</br>
					<div  class="pr-3">
						<a href="{{ url('/login/google') }}" class="btn btn-white montserrat-500"> <span class="rounded-circle fa fa-google fa-2x" style="height: 20px; width:25px"></span></a>
					</div>
					</br>	
					<div class="pr-3">
						<a href="{{ url('/login/telegram') }}" class="btn btn-white montserrat-500"> <span class="rounded-circle fa fa-telegram fa-2x" style="height: 20px;width:25px"></a>
					</div>
			</div>
			
			
			<div class="row justify-content-center">
				@include('auth.subviews.login_subview')
				<div class="col-1 text-center">
					<div class="vl d-none d-md-block"></div>
					<hr class="d-sm-block d-md-none d-lg-none d-xl-none">
				</div>
				<!-- @include('auth.subviews.register_subview') -->
			</div>
		</div>
	</div>
</div>
@include('layouts.footer')
@endsection
