@extends('admin::layouts.master')
@section('content')
<!-- breadcrumb -->
<nav aria-label="breadcrumb">
	<ol class="breadcrumb">
		<li class="breadcrumb-item active" aria-current="page">Companies List</li>
	</ol>
</nav>
@include('flash::message')
<!-- dasboard -->
<div class="dashpad" align="center">
	<div class="container mt-5">
		<div class="row">
			<div class="col-12 text-center">
				<div class="alert alert-success hide" id="success_msg">
					Tip Successfully added.
				</div>
			</div>
		</div>
		<div class="row">
			<div class="col text-left">
				<table class="table table-hover table-bordered table-striped" id="companiesTable">
					<thead class="thead-dark">
						<tr>
							<th class="text-center text-nowrap">Sr #</th>
							<th class="text-center text-nowrap">Name</th>
							<th class="text-center text-nowrap">Code</th>
							<th class="text-center text-nowrap">Sector</th>
							<th class="text-center text-nowrap">Category</th>
							<th class="text-center text-nowrap">Today's Tip</th>
							<th class="text-center text-nowrap">Actions</th>
						</tr>
					</thead>
					<tbody>
						@foreach($companies as $company)
						<tr>
							<td>{{ $company->company_id }}</td>
							<td>{{ $company->name }}</td>
							<td>{{ $company->company_code }}</td>
							<td>{{ $company->company_category->name }}</td>
							<td>{{ $company->sector->name }}</td>
							@php
							$company_tip_id = $company_tips->where('company_id', $company->company_id)->pluck('company_tip_id')->first();
							@endphp
							<td id="cell_{{ $company->company_id }}">
								@if($company_tips->where('company_id', $company->company_id)->count())
								<a href="javascript:;" title="" class="company_tip_{{ $company->company_id }}" data-id="{{ $company->company_id }}" data-tipid="{{ $company_tip_id }}" data-name="{{ $company->name }}" onclick="removeCompanyTip(this)"><span class="fa fa-times text-danger"></span></a> &nbsp;
								<a href="javascript:;" title="" class="company_tip_{{ $company->company_id }}" data-id="{{ $company->company_id }}" data-tipid="{{ $company_tip_id }}" data-name="{{ $company->name }}" onclick="editCompanyTip(this)"><span class="fa fa-edit text-info"></span></a> &nbsp;
								@else
								<a href="javascript:;" title="" class="company_tip_{{ $company->company_id }}" data-id="{{ $company->company_id }}" data-name="{{ $company->name }}" onclick="openAddTipModal(this)"><span class="fa fa-plus text-success fa-2x"></span></a> &nbsp;
								@endif
								{{ $company_tips->where('company_id', $company->company_id)->pluck('tips')->first() }}
								<br>
								<small class="text-nowrap">{!! cleanJson_forShow($company_tips->where('company_id', $company->company_id)->pluck('tip_details')->first()) !!}</small>
								<br>
								<small>{{ $company_tips->where('company_id', $company->company_id)->pluck('company_tips_meta')->first() }}</small>
							</td>
							<td class="text-center">
								@if(!$company->deleted_at)
								@php 
								$showIcons_for_Inactive = 'hide';
								$showIcons_for_Active = '';
								@endphp
								@else
								@php
								$showIcons_for_Inactive = ''; 
								$showIcons_for_Active = 'hide';
								@endphp
								@endif
								<a href="javascript:;" title="" class="{{ $showIcons_for_Active }} company_{{ $company->company_id }}" data-id="{{ $company->company_id }}" onclick="deactivateCompany(this)"><span class="fa fa-trash text-danger"></span></a>
								<a href="javascript:;" title="" class="{{ $showIcons_for_Inactive }} company_{{ $company->company_id }}" data-id="{{ $company->company_id }}" onclick="reactivateCompany(this)"><span class="fa fa-play text-success"></span></a>
								&nbsp;&nbsp;&nbsp;
								<a href="javascript:;" title="" class="{{ $showIcons_for_Active }} company_{{ $company->company_id }}" data-id="{{ $company->company_id }}" onclick="editCompany(this)"><span class="fa fa-edit text-info"></span></a>
							</td>
						</tr>
						@endforeach
					</tbody>
				</table>
			</div>
		</div>
	</div>
	@include('admin::modals.company_tips_modal')
	@include('admin::modals.company_edit_modal')
</div>
<script>
	$(document).ready(function() {
		$('#companiesTable').DataTable();
	});
	$(window).on('load', function(event) {
		$('#companiesTable_filter label input').val('');
	});
	function deactivateCompany(argument) {
		$('#loader').show();
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		var company_id = argument.dataset.id;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.company.delete") }}',
				type: 'POST',
				data: {company_id: company_id, _token: '{{ csrf_token() }}'},
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
				if(res){
					$('.company_'+company_id).toggle();
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
				$('#loader').hide();
			});
			
		}
	}
	function reactivateCompany(argument) {
		$('#loader').show();
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		var company_id = argument.dataset.id;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.company.restore") }}',
				type: 'POST',
				data: {company_id: company_id, _token: '{{ csrf_token() }}'},
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
				if(res){
					$('.company_'+company_id).toggle();
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
				$('#loader').hide();
			});
			
		}
	}
	function removeCompanyTip(argument) {
		$('#loader').show();
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		var company_tip_id = argument.dataset.tipid;
		var company_id = argument.dataset.id;
		var company_name = argument.dataset.name;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.company.tip.delete") }}',
				type: 'POST',
				data: {company_tip_id: company_tip_id, _token: '{{ csrf_token() }}'},
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
				if(res){
					$('#cell_'+company_id).html('<a href="javascript:;" title="" class="company_tip_'+company_id+'" data-id="'+company_id+'" data-name="'+company_name+'" onclick="openAddTipModal(this)"><span class="fa fa-plus text-success fa-2x"></span></a>');
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
				$('#loader').hide();
			});
			
		}
	}
	function editCompanyTip(argument) {
		$('#loader').show();
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		var company_tip_id = argument.dataset.tipid;
		var company_id = argument.dataset.id;
		var company_name = argument.dataset.name;
		if(confirmation){
			$.ajax({
				url: 'editCompanyTip/'+company_tip_id,
				type: 'GET',
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
				try {
					var json = $.parseJSON(res);
				} catch(e) {
					var json = res;
				}
				if(json.code != 200){
					alert(json.message);
				} else{
					populateTipDetails(json.data, company_id, company_name);
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
				$('#loader').hide();
			});
			
		}
	}
	function populateTipDetails(tip, company_id, company_name) {
		$('#company_id').val(company_id);
		$('#company_name').html(company_name);
		$('#tip_text').val('');
		if(tip.tips == 'Sell Call'){
			$('#sellCall').attr('checked', 'true');
		}
		if(tip.tips == 'Buy Call'){
			$('#buyCall').attr('checked', 'true');
		}
		if(tip.tips == 'Hold'){
			$('#noAction').attr('checked', 'true');
		}
		$('#curr_rate').val(tip.tip_details['Current Rate']);
		$('#buyAt').val(tip.tip_details['Buy @']);
		$('#sellAt').val(tip.tip_details['TP @']);
		$('#stopLoss').val(tip.tip_details['Stop Loss @']);
		$('#other_details').val(tip.company_tips_meta);
		if(tip.position == 'Going Up'){
			$('#up').attr('checked', 'true');
		}
		if(tip.position == 'Going Down'){
			$('#down').attr('checked', 'true');
		}
		if(tip.position == 'No Change'){
			$('#static').attr('checked', 'true');
		}
		$('#success_msg').hide();
		$('#add_tip_err').hide();
		$('#saveTip').attr('onclick', 'updateCompanyTip('+tip.company_tip_id+')');
		$('#company_tips_modal').modal('show');
	}
	function openAddTipModal(argument) {
		$.ajax({
			url: '{{ route('admin.check.auth') }}',
		})
		.done(function(res) {
			if(res == false){
				window.location = location.href;
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
		var company_id = argument.dataset.id;
		var company_name = argument.dataset.name;
		console.log('company_id : ', company_id);
		$('#company_id').val(company_id);
		$('#company_name').html(company_name);
		$('#tip_text').val('');
		$('#other_details').val('');
		$('#co_position').val('');
		$('#success_msg').hide();
		$('#add_tip_err').hide();
		$('#company_tips_modal').modal('show');
	}
	function editCompany(argument) {
		$('#loader').show();
		$('#company_categories').html('<option value="">N/A</option>');
		$('#sectors').html('<option value="">N/A</option>');
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		var company_id = argument.dataset.id;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.company.edit") }}',
				type: 'POST',
				data: {company_id: company_id, _token: '{{ csrf_token() }}'},
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
				window.compres = res;
				try {
					var json = JSON.parse(res);
				} catch(e) {
					var json = res;
				}
				if(typeof(json) == 'string'){
					alert(json);
					return false;
				}
				$('#company_id_edit').val(company_id);
				$('#company_name_edit').val(json.company.name);
				$('#company_name_edit').val(json.company.name);
				$('#company_code_edit').val(json.company.company_code);
				var company_categories = json.company_categories;
				var sectors = json.sectors;
				company_categories.forEach(populate_categories);
				sectors.forEach(populate_sectors);
				$('#company_categories').val(json.company.company_category.company_category_id);
				$('#sectors').val(json.company.sector.sector_id);
				$('#company_edit_modal').modal('show');
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
				$('#loader').hide();
			});
		}
	}
	function populate_categories(company_categories) {
		select = document.getElementById('company_categories');
		var opt = document.createElement('option');
		opt.value = company_categories.company_category_id;
		opt.innerHTML = company_categories.name;
		select.appendChild(opt);
	}
	function populate_sectors(sectors) {
		select = document.getElementById('sectors');
		var opt = document.createElement('option');
		opt.value = sectors.sector_id;
		opt.innerHTML = sectors.name;
		select.appendChild(opt);
	}
</script>
@endsection
