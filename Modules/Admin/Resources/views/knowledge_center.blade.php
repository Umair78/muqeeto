@extends('admin::layouts.master')
@section('content')
<!-- breadcrumb -->
<nav aria-label="breadcrumb">
	<ol class="breadcrumb">
		<li class="breadcrumb-item active" aria-current="page">Knowledge Center</li>
	</ol>
</nav>
@include('flash::message')
<!-- dasboard -->
<div class="dashpad" align="center">
	<div class="container mt-5">
		<!-- <div class="row">
			<div class="col-12 text-center">
				<div class="alert alert-success hide" id="success_msg">
					Tip Successfully added.
				</div>
			</div>
		</div> -->
		<div class="row">
			<div class="col-12 text-center">
				<button type="button" class="btn btn-success btn-block" onclick="openKbModal()">
					<span class="fa fa-plus"></span>
					Add Information
				</button>
			</div>
		</div>
		<div class="row">
			<div class="col text-left">
				<table class="table table-hover table-bordered table-striped" id="infoTable">
					<thead class="thead-dark">
						<tr>
							<th class="text-center text-nowrap">Sr #</th>
							<th class="text-center text-nowrap">Category</th>
							<th class="text-center text-nowrap">Title</th>
							<th class="text-center text-nowrap">Details</th>
							<th class="text-center text-nowrap">Actions</th>
						</tr>
					</thead>
					<tbody>
						@foreach($news as $info)
						<tr>
							<td>{{ $info->news_id }}</td>
							<td>{{ $info->news_category->name }}</td>
							<td>{{ $info->title }}</td>
							<td>{{ $info->name }}</td>
							<td class="text-center">
								@if(!$info->deleted_at)
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
								<a href="javascript:;" title="" class="{{ $showIcons_for_Active }} info_{{ $info->news_id }}" data-id="{{ $info->news_id }}" onclick="deactivateKb(this)"><span class="fa fa-trash text-danger"></span></a>
								<a href="javascript:;" title="" class="{{ $showIcons_for_Inactive }} info_{{ $info->news_id }}" data-id="{{ $info->news_id }}" onclick="reactivateKb(this)"><span class="fa fa-play text-success"></span></a>
								&nbsp;&nbsp;&nbsp;
								<a href="javascript:;" title="" class="{{ $showIcons_for_Active }} info_{{ $info->news_id }}" data-id="{{ $info->news_id }}" onclick="editKb(this)"><span class="fa fa-edit text-info"></span></a>
							</td>
						</tr>
						@endforeach
					</tbody>
				</table>
			</div>
		</div>
	</div>
	@include('admin::modals.kb_edit_modal')
</div>
<script>
	$(document).ready(function() {
		$('#infoTable').DataTable();
	});
	function deactivateKb(argument) {
		$('#loader').show();
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		var kb_id = argument.dataset.id;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.kb.delete") }}',
				type: 'POST',
				data: {kb_id: kb_id, _token: '{{ csrf_token() }}'},
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
				if(res){
					$('.info_'+kb_id).toggle();
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
	function reactivateKb(argument) {
		$('#loader').show();
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		var kb_id = argument.dataset.id;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.kb.restore") }}',
				type: 'POST',
				data: {kb_id: kb_id, _token: '{{ csrf_token() }}'},
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
				if(res){
					$('.info_'+kb_id).toggle();
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
	function editKb(argument) {
		$('#loader').show();
		$('#company_categories').html('<option value="">N/A</option>');
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		var news_id = argument.dataset.id;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.kb.edit") }}',
				type: 'POST',
				data: {news_id: news_id, _token: '{{ csrf_token() }}'},
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
				$('#news_id_edit').val(news_id);
				$('#news_title_edit').val(json.news.title);
				$('#news_name_edit').val(json.news.name);
				var news_categories = json.news_categories;
				news_categories.forEach(populate_categories);
				$('#news_categories').val(json.news.news_category.news_category_id);
				$('#kb_edit_modal').modal('show');
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
	function populate_categories(news_categories) {
		select = document.getElementById('news_categories');
		var opt = document.createElement('option');
		opt.value = news_categories.news_category_id;
		opt.innerHTML = news_categories.name;
		select.appendChild(opt);
	}
	function openKbModal() {
		$('#loader').show();
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
		
		$('#news_name_edit').val('');
		$('#news_id_edit').val(0);
		// $('#news_categories').html('<option value="" selected>N/A</option>');
		$.ajax({
			url: '{{ route("admin.kb.edit") }}',
			type: 'POST',
			data: {news_id: '0', _token: '{{ csrf_token() }}'},
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
			var news_categories = json.news_categories;
			news_categories.forEach(populate_categories);
			$('#news_categories').val('1');
			$('#kb_edit_modal').modal('show');
		})
		.fail(function() {
			console.log("error");
		})
		.always(function() {
			console.log("complete");
			$('#loader').hide();
		});
	}
</script>
@endsection
