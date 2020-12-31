@extends('admin::layouts.master')
@section('content')
<!-- breadcrumb -->
<nav aria-label="breadcrumb">
	<ol class="breadcrumb">
		<li class="breadcrumb-item active" aria-current="page">Home</li>
	</ol>
</nav>
{{-- @include('flash::message') --}}
<!-- dasboard -->
<div class="dashpad" align="center">
	<div class="container mt-5">
		<div class="row">
			<div class="col">
				{{ __('Admin Dashboard') }}
			</div>
		</div>
		<div class="row">
			<div class="col text-left">
				@php
				$curr_usr = session()->has('admin') ? session('admin') : false;
				// dump($curr_usr->toArray());
				@endphp
				@foreach($curr_usr->toArray() as $key => $value)
				{{ $key }} : <b>{{ $value }}</b>
				<br>
				@endforeach
			</div>
		</div>
	</div>

</div>
@endsection
