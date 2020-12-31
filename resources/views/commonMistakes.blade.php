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
	{!! $commonMistakes !!}
</div>

@include('layouts.footer')

@endsection
