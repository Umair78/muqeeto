<div id="company_tips_modal" class="modal fade">
	<div class="modal-dialog modal-lg">
		<div class="modal-content text-dark text-right">
			<div class="modal-header">
				<h4 class="modal-title">{{ __("Add Tip for ") }} <font id="company_name"></font></h4>
				<input type="hidden" name="company_id" id="company_id">
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				<div class="alert alert-danger hide text-center" id="add_tip_err">
					Some Error Occured. Please try again.
				</div>
				<div class="col-12">
					<!-- Pro Tip -->
					<div class="form-group row">
						<label class="col-md-4 control-label" for="tip_text">{{ __('Pro Tip') }}</label>
						<div class="col-md-8 text-left">
							<div class="row">
								<!-- Buy Call -->
								<div class="form-check col">
									<input type="radio" class="form-check-input" id="buyCall" name="tip_text" value="Buy Call">
									<label class="form-check-label" for="buyCall">Buy Call</label>
								</div>
								<!-- Sell Call -->
								<div class="form-check col">
									<input type="radio" class="form-check-input" id="sellCall" name="tip_text" value="Sell Call">
									<label class="form-check-label" for="sellCall">Sell Call</label>
								</div>
								<!-- Hold -->
								<div class="form-check col">
									<input type="radio" class="form-check-input" id="noAction" name="tip_text" value="Hold">
									<label class="form-check-label" for="noAction">Hold</label>
								</div>
							</div>
						</div>
						<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="tip_text_err"></label>
					</div>
					<!-- Current Rate -->
					<div class="form-group row">
						<label class="col-md-4 control-label" for="curr_rate">{{ __('Current Rate') }}</label>
						<div class="col-md-8 text-left">
							<div class="row">
								<div class="form-check col">
									<input type="number" step="0.01" class="form-control" id="curr_rate" name="tip_details[]" data-name="Current Rate" value="Current Rate" required>
								</div>
							</div>
						</div>
						<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="curr_rate_err"></label>
					</div>
					<!-- Tip Details -->
					<div class="form-group row">
						<label class="col-md-4 control-label" for="tip_text">{{ __('Tip Details') }}</label>
						<div class="col-md-8 text-left">
							<div class="row">
								<!-- Buy Call -->
								<div class="form-check col">
									Buy @ <input type="text" step="0.01" class="form-control" id="buyAt" name="tip_details[]" data-name="Buy @" required>
								</div>
								<!-- Sell Call -->
								<div class="form-check col">
									Sell (Target) @ <input type="text" step="0.01" class="form-control" id="sellAt" name="tip_details[]" data-name="TP @" required>
								</div>
								<!-- Hold -->
								<div class="form-check col">
									Stop Loss @ <input type="text" step="0.01" class="form-control" id="stopLoss" name="tip_details[]" data-name="Stop Loss @" required>
								</div>
							</div>
						</div>
						<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="tip_text_err"></label>
					</div>
					<!-- Other Details -->
					<div class="form-group row">
						<label class="col-md-4 control-label" for="other_details">{{ __('Other Details') }}</label>
						<div class="col-md-8">
							<textarea name="other_details" id="other_details" placeholder="Enter Extra Details" class="form-control" rows="5" required></textarea>
						</div>
						<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="other_details_err"></label>
					</div>
					<!-- Company Position -->
					<div class="form-group row">
						<label class="col-md-4 control-label" for="co_position">{{ __('Company Position') }}</label>
						<div class="col-md-8 text-left">
							<div class="row">
								<!-- Up -->
								<div class="form-check col">
									<input type="radio" class="form-check-input" id="up" name="co_position" value="Going Up">
									<label class="form-check-label" for="up">Going Up</label>
								</div>
								<!-- Down -->
								<div class="form-check col">
									<input type="radio" class="form-check-input" id="down" name="co_position" value="Going Down">
									<label class="form-check-label" for="down">Going Down</label>
								</div>
								<!-- Static -->
								<div class="form-check col">
									<input type="radio" class="form-check-input" id="static" name="co_position" value="No Change">
									<label class="form-check-label" for="static">No Change</label>
								</div>
							</div>
						</div>
						<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="position_err"></label>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-outline-success" onclick="addCompanyTip()" id="saveTip">Save</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<script>
	function addCompanyTip() {
		$('#loader').show();
		var tip_text = $('input[name=tip_text]:checked').val();
		var tip_details = $('input[name^="tip_details"]').map(function(){ var key = $(this).data('name'); return { [key]: $(this).val() };}).get();
		var other_details = $('#other_details').val();
		var co_position = $('input[name=co_position]:checked').val();
		var company_id = $('#company_id').val();
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.company.tip.add") }}',
				type: 'POST',
				data: {company_id: company_id, tip_text: tip_text, other_details: other_details, tip_details: tip_details, co_position: co_position, _token: '{{ csrf_token() }}'},
			})
			.done(function(res) {
				console.log("success");
				// return false;
				try {
					var json = JSON.parse(res);
				} catch(e) {
					var json = res;
				}
				console.log(json);
				if(typeof(json) == 'object'){
					$('#success_msg').html('Tip Successfully Added for ' + $('#company_name').html());
					$('#success_msg').show();
					var company_name = $('#company_name').html();
					var html = '<a href="javascript:;" title="" class="company_tip_'+company_id+'" data-id="'+company_id+'" data-tipid="'+json.company_tip_id+'" data-name="'+company_name+'" onclick="removeCompanyTip(this)"><span class="fa fa-times text-danger"></span></a> ';
					html += '<a href="javascript:;" title="" class="company_tip_'+company_id+'" data-id="'+company_id+'" data-tipid="'+json.company_tip_id+'" data-name="'+company_name+'" onclick="editCompanyTip(this)"><span class="fa fa-edit text-info"></span></a> ';
					html += json.tips;
					html += '<br><small>'+json.tip_details+'</small>';
					html += '<br><small>'+json.company_tips_meta+'</small>';
					$('#cell_'+company_id).html(html);
					$('#company_tips_modal').modal('hide');
				} else{
					$('#add_tip_err').html('Some error occured. Please try again! ' + json);
					$('#add_tip_err').show();
				}
			})
			.fail(function(err) {
				console.log("error");
				$('#add_tip_err').html('Some error occured. Please try again! ' + err);
				$('#add_tip_err').show();
			})
			.always(function() {
				console.log("complete");
				$('#loader').hide();
			});
			
		}
	}
	function validate_addCompanyTip(element) {
	}
	function updateCompanyTip(company_tip_id) {
		$('#loader').show();
		var tip_text = $('input[name=tip_text]:checked').val();
		var tip_details = $('input[name^="tip_details"]').map(function(){ var key = $(this).data('name'); return { [key]: $(this).val() };}).get();
		var other_details = $('#other_details').val();
		var co_position = $('input[name=co_position]:checked').val();
		var company_id = $('#company_id').val();
		// var confirmation = confirm('Sure to Deactivate?');
		var confirmation = true;
		if(confirmation){
			$.ajax({
				url: '{{ route("admin.company.tip.update") }}',
				type: 'POST',
				data: {company_tip_id: company_tip_id, company_id: company_id, tip_text: tip_text, other_details: other_details, tip_details: tip_details, co_position: co_position, _token: '{{ csrf_token() }}'},
			})
			.done(function(res) {
				console.log("success");
				// return false;
				try {
					var json = JSON.parse(res);
				} catch(e) {
					var json = res;
				}
				console.log(json);
				if(typeof(json) == 'object'){
					$('#success_msg').html('Tip Successfully Updated for ' + $('#company_name').html());
					$('#success_msg').show();
					var company_name = $('#company_name').html();
					var html = '<a href="javascript:;" title="" class="company_tip_'+company_id+'" data-id="'+company_id+'" data-tipid="'+json.company_tip_id+'" data-name="'+company_name+'" onclick="removeCompanyTip(this)"><span class="fa fa-times text-danger"></span></a> ';
					html += '<a href="javascript:;" title="" class="company_tip_'+company_id+'" data-id="'+company_id+'" data-tipid="'+json.company_tip_id+'" data-name="'+company_name+'" onclick="editCompanyTip(this)"><span class="fa fa-edit text-info"></span></a> ';
					html += json.tips;
					html += '<br><small>'+json.tip_details+'</small>';
					html += '<br><small>'+json.company_tips_meta+'</small>';
					$('#cell_'+company_id).html(html);
					$('#company_tips_modal').modal('hide');
				} else{
					$('#add_tip_err').html('Some error occured. Please try again! ' + json);
					$('#add_tip_err').show();
				}
			})
			.fail(function(err) {
				console.log("error");
				$('#add_tip_err').html('Some error occured. Please try again! ' + err);
				$('#add_tip_err').show();
			})
			.always(function() {
				console.log("complete");
				$('#loader').hide();
			});
			
		}
	}
</script>