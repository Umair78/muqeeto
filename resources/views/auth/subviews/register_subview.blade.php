<div class="col-md-5">
	<div class="card-outline-info">
		<div class="card-header bg-transparent border-bottom h5 montserrat-700">{{ __('Registration Form') }}</div>

		<div class="card-body">
			<form method="GET" action="{{ url('registor')}}">
				
				@csrf	
				@method('POST')		
				<div class="form-group row">
					<label for="name" class="col-12 col-form-label text-left">{{ __('Name') }}</label>

					<div class="col-md-12">
						<input id="name" type="text" class="form-control input-gray @error('name') is-invalid @enderror" name="name" value="{{ old('name') }}" required autocomplete="name" autofocus>

						@error('name')
						<span class="invalid-feedback" role="alert">
							<strong>{{ $message }}</strong>
						</span>
						@enderror
					</div>
				</div>

				<div class="form-group row">
					<label for="mobile" class="col-12 col-form-label text-left">{{ __('Mobile Number') }}</label>

					<div class="col-md-12">
						<input id="mobile" type="text" class="form-control input-gray @error('mobile') is-invalid @enderror" name="mobile" value="{{ old('mobile') }}" required autocomplete="tel" placeholder="03231234567 | +92-3331234567">

						@error('mobile')
						<span class="invalid-feedback" role="alert">
							<strong>{{ $message }}</strong>
						</span>
						@enderror
					</div>
				</div>

				<div class="form-group row">
					<label for="email" class="col-12 col-form-label text-left">{{ __('E-Mail Address') }}</label>

					<div class="col-md-12">
						<input id="email" type="email" class="form-control input-gray @error('email') is-invalid @enderror" name="email" value="{{ old('email') }}" required autocomplete="email">

						@error('email')
						<span class="invalid-feedback" role="alert">
							<strong>{{ $message }}</strong>
						</span>
						@enderror
					</div>
				</div>

				<div class="form-group row">
					<label for="password" class="col-12 col-form-label text-left">{{ __('Password') }}</label>

					<div class="col-md-12">
						<input id="password" type="password" class="form-control input-gray @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

						@error('password')
						<span class="invalid-feedback" role="alert">
							<strong>{{ $message }}</strong>
						</span>
						@enderror
					</div>
				</div>

				<div class="form-group row">
					<label for="password-confirm" class="col-12 col-form-label text-left">{{ __('Confirm Password') }}</label>

					<div class="col-md-12">
						<input id="password-confirm" type="password" class="form-control input-gray" name="password_confirmation" required autocomplete="new-password">
					</div>
				</div>

				<div class="form-group row">
					<div class="col-12">
						<div class="form-check">
							<input class="form-check-input checked-red custom-checkbox" type="checkbox" name="terms" id="terms" {{ old('terms') ? 'checked' : '' }}>

							<label class="form-check-label @error('terms') is-invalid @enderror" for="terms">
								{{ __('I Accept the terms and conditions of use!') }}
							</label>

							@error('terms')
							<span class="invalid-feedback" role="alert">
								<strong>{{ $message }}</strong>
							</span>
							@enderror
						</div>
					</div>
				</div>

				<div class="form-group row mb-0">
					<div class="col-md-5">
						<button type="submit" class="btn btn-dark bg-red btn-lg" disabled id="btn_register">
							<span class="fas fa-user-plus"></span>
							{{ __('Register') }}
						</button>
					</div>
				</div>
			</form>
		</div>
	</div>
</div>

<script>
	$(document).ready(function() {
		$("#terms").click(function(){   
			$("#btn_register").attr('disabled', !this.checked)
		});
	});
</script>