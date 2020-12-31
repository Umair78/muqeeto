@extends('admin::layouts.master')
@section('content')
<!-- breadcrumb -->
<nav aria-label="breadcrumb">
	<ol class="breadcrumb">
		<li class="breadcrumb-item active" aria-current="page">Company Tips List</li>
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
							<th class="text-center text-nowrap">Company</th>
							<th class="text-center text-nowrap">Tip</th>
							<th class="text-center text-nowrap">Tip Details</th>
							<th class="text-center text-nowrap">Position</th>
							<th class="text-center text-nowrap">Description</th>
							<th class="text-center text-nowrap">Status</th>
							<th class="text-center text-nowrap">Added On</th>
							<th class="text-center text-nowrap">Success Status</th>
							<th class="text-center text-nowrap">Actions</th>
						</tr>
					</thead>
					<tbody>
						@foreach($company_tips as $tip)
						@if(!$tip->company)
						@continue
						@endif
						<tr>
							<td>{{ $tip->company_tip_id }}</td>
							<td>{{ $tip->company->company_code }}</td>
							<td>{{ $tip->tips }}</td>
							<td>
								@foreach(json_decode($tip->tip_details, true) as $key => $val)
								{{ $key . " = " . $val }} <br>
								@endforeach
							</td>
							<td>{{ $tip->position }}</td>
							<td>{{ $tip->company_tips_meta }}</td>
							@if($tip->deleted_at)
							<td class="text-danger">
								{{ __('In Active') }}
								<span class="fa fa-sync-alt mousepointer" onclick="changeTipStatus(this, true)" data-id="{{ $tip->company_tip_id }}"></span>
							</td>
							@else
							<td class="text-success">
								{{ __('Active') }}
								<span class="fa fa-sync-alt mousepointer" onclick="changeTipStatus(this, false)" data-id="{{ $tip->company_tip_id }}"></span>
							</td>
							@endif
							<td>{{ $tip->created_at }}</td>
							@if($tip->tip_success_status)
							<td class="text-center">
								<div class="btn-success btn-block p-5">Tip Successful</div>
							</td>
							@else
							<td>
								-
							</td>
							@endif
							<td class="text-center text-nowrap">
								<a href="{{ url('admin/updateTipSuccessStatus') . '/' . $tip->company_tip_id . '/' . 1 }}"><span class="fa fa-thumbs-up text-success fa-2x"></span></a>
								&nbsp;&nbsp;&nbsp;
								<a href="{{ url('admin/updateTipSuccessStatus') . '/' . $tip->company_tip_id . '/' . 0 }}"><span class="fa fa-thumbs-down text-danger fa-2x"></span></a>
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
	function changeTipStatus(tip, status) {
		var company_tip_id = tip.dataset.id;
		if(status){
			var uri = '{{ route("admin.tip.status.change") }}';
		} else{
			var uri = '{{ route("admin.company.tip.delete") }}';
		}
		$.ajax({
			url: uri,
			type: 'POST',
			data: {status: status, company_tip_id: company_tip_id, _token: '{{ csrf_token() }}'},
		})
		.done(function(res) {
			try {
				var json = $.parseJSON(res);
			} catch(e) {
				var json = res;
			}
			console.log('status change : ', res);
			if(res){
				location.reload();
			}
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
		});
	}
</script>
@endsection
