{{-- @dd($tips->toArray()) --}}
@extends('layouts.master')
@section('content')
<div class="container-fluid mt-5 mb-5 pb-5">
	<div class="h1 montserrat-800 text-center text-uppercase">
		Trading Signals
	</div>
	@if(!$user)
	<div class="alert alert-danger text-center">
		<a href="{{ route('login') }}" class="mt-2 btn btn-danger bg-red btn-block">{{ __('Please login / register to view this page.') }}</a>
	</div>
	@else
	<div class="container-fluid">
		<ul class="nav nav-tabs nav-fill" id="myTab" role="tablist">
			<li class="nav-item" role="presentation">
				<a class="nav-link active" id="active-tab" data-toggle="tab" href="#active" role="tab" aria-controls="active" aria-selected="true">Active</a>
			</li>
			<li class="nav-item" role="presentation">
				<a class="nav-link" id="history-tab" data-toggle="tab" href="#history" role="tab" aria-controls="history" aria-selected="false">History</a>
			</li>
		</ul>
	</div>
	<div class="tab-content p-3" id="myTabContent">
		<div class="tab-pane fade show active" id="active" role="tabpanel" aria-labelledby="active-tab">
			<div class="table-responsive">
				<table class="table table-bordered table-striped table-hover" id="tips_table_active">
					<caption class="montserrat-100">* Trade at your own risk</caption>
					@include('layouts.subviews.tips_table_header')
					<tbody>
						@foreach($tips as $tip)
						@if($tip->company == null || $tip->deleted_at)
						@continue
						@endif
						@include('layouts.subviews.tips_table_body')
						@endforeach
					</tbody>
				</table>
			</div>
		</div>
		<div class="tab-pane fade" id="history" role="tabpanel" aria-labelledby="history-tab">
			<div class="table-responsive">
				<table class="table table-bordered table-striped table-hover" id="tips_table_history">
					<caption class="montserrat-100">* Trade at your own risk</caption>
					@include('layouts.subviews.tips_table_header')
					<tbody>
						@foreach($tips as $tip)
						@if($tip->company == null)
						@continue
						@endif
						@include('layouts.subviews.tips_table_body')
						@endforeach
					</tbody>
				</table>
			</div>
		</div>
	</div>
	@endif
</div>
@include('layouts.footer')
<script type="text/javascript">
	jQuery(document).ready(function($) {
		$('#tips_table_active').DataTable( {
			"order": [[ 0, "desc" ]]
		} );
		$('#tips_table_active').stickyTableHeaders();
		$('#tips_table_history').DataTable( {
			"order": [[ 9, "desc" ]]
		} );
		$('#tips_table_history').stickyTableHeaders();
		$('#main_nav').removeClass('sticky-top');
	});
</script>
@endsection