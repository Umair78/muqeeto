<div id="company_edit_modal" class="modal fade">
	<div class="modal-dialog modal-lg">
		<div class="modal-content text-dark text-right">
			<form action="{{ route('admin.company.update') }}" method="POST" accept-charset="utf-8" id="edit_company_form">
				@csrf()
				<div class="modal-header">
					<h4 class="modal-title">{{ __("Edit Company") }}</h4>
					<input type="hidden" name="company_id" id="company_id_edit">
					<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
				</div>
				<div class="modal-body">
					<div class="alert alert-danger hide text-center" id="add_tip_err">
						Some Error Occured. Please try again.
					</div>
					<div class="col-12">
						<!-- Company Name -->
						<div class="form-group row">
							<label class="col-md-4 control-label" for="company_name">{{ __('Company Name') }}</label>
							<div class="col-md-8">
								<input type="text" class="form-control" name="company_name" id="company_name_edit" placeholder="{{ __('Enter Company Name') }}" required autocomplete="nope">
								<input type="text" class="form-control" name="position" id="position" placeholder="{{ __('Enter Company Position') }}" required autocomplete="nope" style="z-index: -1; position: fixed; margin-top: -100vh;">
							</div>
							<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="company_name_err"></label>
						</div>
						<!-- Company Code -->
						<div class="form-group row">
							<label class="col-md-4 control-label" for="company_code">{{ __('Company Code') }}</label>
							<div class="col-md-8">
								<input type="text" class="form-control" name="company_code" id="company_code_edit" placeholder="{{ __('Enter Company Code') }}" required autocomplete="nope">
							</div>
							<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="company_code_err"></label>
						</div>
						<!-- Company Categories -->
						<div class="form-group row">
							<label class="col-md-4 control-label" for="company_categories">{{ __('Company Categories') }}</label>
							<div class="col-md-8">
								<select name="company_categories" id="company_categories" class="form-control">
									<option value="">N/A</option>
								</select>
							</div>
						</div>
						<!-- Sectors -->
						<div class="form-group row">
							<label class="col-md-4 control-label" for="sectors">{{ __('Sectors') }}</label>
							<div class="col-md-8">
								<select name="sectors" id="sectors" class="form-control">
									<option value="">N/A</option>
								</select>
							</div>
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
		$('#edit_company_form').submit();
	}
</script>