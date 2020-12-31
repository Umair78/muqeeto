<div class="col-md-5">
    <div class="card-outline-info">
        <div class="card-header bg-transparent border-bottom h5 montserrat-700">{{ __('Change Password') }}</div>

        <div class="card-body">
            <form method="POST" action="{{ route('profile.changepwd') }}">
                @csrf

                <div class="form-group row">
                    <label for="curr_password" class="col-12 col-form-label text-left montserrat-500">{{ __('Current Password') }}</label>

                    <div class="col-12">
                        <input id="curr_password" type="password" class="form-control @error('curr_password') is-invalid @enderror" name="curr_password" required autocomplete="current-password">

                        @error('curr_password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="password" class="col-12 col-form-label text-left montserrat-500">{{ __('New Password') }}</label>

                    <div class="col-12">
                        <input id="password" type="password" class="form-control @error('password') is-invalid @enderror" name="password" required autocomplete="new-password">

                        @error('password')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="password_confirmation" class="col-12 col-form-label text-left montserrat-500">{{ __('Confirm Password') }}</label>

                    <div class="col-12">
                        <input id="password_confirmation" type="password" class="form-control @error('password_confirmation') is-invalid @enderror" name="password_confirmation" required autocomplete="new-password">

                        @error('password_confirmation')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row mb-0">
                    <div class="col-md-8">
                        <button type="submit" class="btn btn-danger bg-red montserrat-500">
                            <span class="fa fa-save"></span>
                            {{ __('Update Password') }}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>