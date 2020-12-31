<div id="changePasswordModal" class="modal fade">
	<div class="modal-dialog modal-lg">
		<div class="modal-content text-dark text-right">
			<div class="modal-header">
				<h4 class="modal-title">{{ __("Change Password") }}</h4>
				<button type="button" class="close" data-dismiss="modal" aria-hidden="true">&times;</button>
			</div>
			<div class="modal-body">
				{{-- locations --}}
				<div class="col-12">
					<!-- Old Password -->
					<div class="form-group row">
						<label class="col-md-4 control-label" for="old_password">{{ __('Current Password') }}</label>
						<div class="col-md-8">
							<input type="password" class="form-control" name="old_password" id="old_password" placeholder="{{ __('Enter existing password') }}">
						</div>
						<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="old_password_err"></label>
					</div>
					<!-- Old Password -->
					<div class="form-group row">
						<label class="col-md-4 control-label" for="password">{{ __('New Password') }}</label>
						<div class="col-md-8">
							<input type="password" class="form-control" name="password" id="password" placeholder="{{ __('Enter New password') }}">
						</div>
						<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="password_err"></label>
					</div>
					<!-- Old Password -->
					<div class="form-group row">
						<label class="col-md-4 control-label" for="confirm_password">{{ __('Confirm Password') }}</label>
						<div class="col-md-8">
							<input type="password" class="form-control" name="confirm_password" id="confirm_password" placeholder="{{ __('Confirm New password') }}">
						</div>
						<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="confirm_password_err"></label>
						<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="password_conf_err"></label>
						<label class="offset-md-4 col-md-8 control-label text-danger text-left" id="same_password_err"></label>
					</div>
				</div>
			</div>
			<div class="modal-footer">
				<button type="button" class="btn btn-outline-success" id="btn_changePassword">Save</button>
				<button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
			</div>
		</div>
	</div>
</div>

<script>
	jQuery(document).ready(function($) {
		$('#btn_changePassword').on('click', function(event) {
			$('#loader').show();
			event.preventDefault();
			/* Act on the event */
			var post = {};
			var old_password = $('#old_password').val();
			var password = $('#password').val();
			var confirm_password = $('#confirm_password').val();
			var flag = true;
			old_password == '' ? ($('#old_password_err').html('{{ __("Please Enter Current Password!") }}'), flag = false) : ($('#old_password_err').html(''));
			password == '' ? ($('#password_err').html('{{ __("Please Enter New Password!") }}'), flag = false) : ($('#password_err').html(''));
			confirm_password == '' ? ($('#confirm_password_err').html('{{ __("Please Confirm New Password!") }}'), flag = false) : ($('#confirm_password_err').html(''));
			confirm_password != password ? ($('#password_conf_err').html('{{ __("New Passwords Do Not Match!!") }}'), flag = false) : ($('#password_conf_err').html(''));
			old_password != '' && password == old_password ? ($('#same_password_err').html('{{ __("Current Password and New Password Cannot be the Same!") }}'), flag = false) : ($('#same_password_err').html(''));
			console.log(flag);
			if(flag){
				post['old_password'] = old_password;
				post['password'] = password;
				post['confirm_password'] = confirm_password;
				post['_token'] = '{{ csrf_token() }}';
				// console.log(post);
				$.ajax({
					url: '{{ route("admin.login") }}',
					type: 'POST',
					data: post,
				})
				.done(function(response) {
					try {
						var json = JSON.parse(response);
					} catch(e) {
						var json = response;
					}
					// console.log(json);
					// console.log(json.code);
					if(json.code == 200){
						$('#pwd_changed_alert').show();
						$('#changePasswordModal').modal('hide');
					} else{
						$('#same_password_err').html(json.message);
						return false;
					}
					console.log("success");
				})
				.fail(function() {
					console.log("error");
					$('#changePasswordModal').modal('hide');
				})
				.always(function() {
					console.log("complete");
				});
			}
			$('#loader').hide();
		}); 
	});
</script>