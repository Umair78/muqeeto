@extends('admin::layouts.master')
@section('content')
<!-- breadcrumb -->
<nav aria-label="breadcrumb">
	<ol class="breadcrumb">
		<li class="breadcrumb-item active" aria-current="page">User Messages</li>
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
		{{-- <div class="row">
			<div class="col-12 text-center">
				<button type="button" class="btn btn-success btn-block" onclick="openKbModal()">
					<span class="fa fa-plus"></span>
					Add Information
				</button>
			</div>
		</div> --}}
		<div class="row">
			<div class="col text-left">
				<table class="table table-hover table-bordered table-striped" id="infoTable">
					<thead class="thead-dark">
						<tr>
							<th class="text-center text-nowrap">Sender Name</th>
							<th class="text-center text-nowrap">Sender Email</th>
							<th class="text-center text-nowrap">Email Subject</th>
							<th class="text-center text-nowrap">Email Message</th>
							<th class="text-center text-nowrap">Date/ Time</th>
							<th class="text-center text-nowrap">Actions</th>
						</tr>
					</thead>
					<tbody>
						@foreach($msgs as $msg)
						<tr>
							<td>{{ $msg->name }}</td>
							<td>
								<a href="mailto:{{ $msg->email }}">{{ $msg->email }}</a>
							</td>
							<td>{{ $msg->subject }}</td>
							<td>{{ $msg->message }}</td>
							<td>{{ $msg->created_at }}</td>
							<td class="text-center">
								@if(!$msg->deleted_at)
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
								<a href="javascript:;" title="" class="{{ $showIcons_for_Active }} msg_{{ $msg->id }}" data-id="{{ $msg->id }}" onclick="deactivateMsg(this)"><span class="fa fa-trash text-danger"></span></a>
								<a href="javascript:;" title="" class="{{ $showIcons_for_Inactive }} msg_{{ $msg->id }}" data-id="{{ $msg->id }}" onclick="reactivateMsg(this)"><span class="fa fa-play text-success"></span></a>
								&nbsp;&nbsp;&nbsp;
								<a href="mailto:{{ $msg->email }}" title=""><span class="fa fa-reply text-msg"></span></a>
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
		$('#infoTable').DataTable({
			initComplete: function() {
				$(this.api().table().container()).find('input').parent().wrap('<form>').parent().attr('autocomplete', 'off');
			}
		});
	});
	$(window).on('load', function(event) {
		$('input[type="search"]').val('');
		$('input[type="search"]').attr('autocomplete', 'off');
	});
	function deactivateMsg(argument) {
		$('#loader').show();
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		var msg_id = argument.dataset.id;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.msg.delete") }}',
				type: 'POST',
				data: {msg_id: msg_id, _token: '{{ csrf_token() }}'},
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
				if(res){
					$('.msg_'+msg_id).toggle();
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
	function reactivateMsg(argument) {
		$('#loader').show();
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		var msg_id = argument.dataset.id;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.msg.restore") }}',
				type: 'POST',
				data: {msg_id: msg_id, _token: '{{ csrf_token() }}'},
			})
			.done(function(res) {
				console.log("success");
				console.log(res);
				if(res){
					$('.msg_'+msg_id).toggle();
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
	function editMsg(argument) {
		$('#loader').show();
		$('#company_categories').html('<option value="">N/A</option>');
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		var news_id = argument.dataset.id;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.msg.edit") }}',
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
		$('#news_name_edit').val('');
		$('#news_id_edit').val(0);
		// $('#news_categories').html('<option value="" selected>N/A</option>');
		$.ajax({
			url: '{{ route("admin.msg.edit") }}',
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
