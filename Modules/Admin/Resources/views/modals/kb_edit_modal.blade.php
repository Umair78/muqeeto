<div id="kb_edit_modal" class="modal fade">
	<div class="modal-dialog modal-lg">
		<div class="modal-content text-dark text-right">
			<form action="{{ route('admin.kb.update') }}" method="POST" accept-charset="utf-8" id="edit_kb_form">
				@csrf()
				<div class="modal-header">
					<h4 class="modal-title">{{ __("Edit News") }}</h4>
					<input type="hidden" name="news_id" id="news_id_edit">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<div class="col-12">
						<!-- News Categories -->
						<div class="form-group row">
							<label class="col-md-4 control-label" for="news_categories">{{ __('News Categories') }}</label>
							<div class="col-md-8">
								<select name="news_categories" id="news_categories" class="form-control">
									<option value="" disabled>N/A</option>
								</select>
							</div>
						</div>
						<!-- News Title -->
						<div class="form-group row">
							<label class="col-md-4 control-label" for="news_title">{{ __('Title') }}</label>
							<div class="col-md-8">
								<input type="text" name="news_title" id="news_title_edit" placeholder="Enter Extra Details" class="form-control" required>
								{{-- <textarea name="news_title" id="news_title_edit" placeholder="Enter Extra Details" class="form-control" rows="5" required></textarea> --}}
							</div>
							<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="news_title_err"></label>
						</div>
						<!-- News Name -->
						<div class="form-group row">
							<label class="col-md-4 control-label" for="news_name">{{ __('News') }}</label>
							<div class="col-md-8">
								<textarea name="news_name" id="news_name_edit" placeholder="Enter Extra Details" class="form-control" rows="5" required></textarea>
							</div>
							<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="news_name_err"></label>
						</div>
					</div>
				</div>
				<div class="modal-footer">
					<input type="submit" class="btn btn-outline-success" name="save" value="Save" onclick="saveEditForm()">
					{{-- <button type="submit" class="btn btn-outline-success">Save</button> --}}
					<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
				</div>
			</form>
		</div>
	</div>
</div>
<script type="text/javascript">
	function saveEditForm() {
		$('#edit_kb_form').submit();
	}
</script>