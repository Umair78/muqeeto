<div class="col-md-5">
    <div class="card-outline-info">

        <form method="POST" action="{{ route('profile.update') }}">
            @csrf
            <div class="card-header bg-transparent border-bottom h5 montserrat-700">
                <div class="row">
                    <div class="col-4 text-left">
                        {{ __('Profile') }}
                    </div>
                    <div class="col-8 text-right">
                        <button type="button" class="btn btn-danger bg-red montserrat-500" id="btn_edit">
                            <span class="fa fa-edit"></span>
                            {{ __('Edit') }}
                        </button>

                        <div class="row d-none" id="div_btns">
                            <div class="col">
                                <button type="submit" class="btn btn-danger bg-red montserrat-500" id="btn_update">
                                    <span class="fas fa-check"></span>
                                    {{ __('Update') }}
                                </button>
                            </div>
                            <div class="col">
                                <button type="reset" class="btn btn-danger bg-red montserrat-500" id="btn_reset" name="">
                                    <span class="fa fa-times"></span>
                                    {{ __('Cancel') }}
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="card-body">

                <div class="form-group row">
                    <div class="col-md-12">
                        <div class="avatar-upload">
                            <div class="avatar-edit d-none">
                                <input type='file' name="pic" class="profile" id="imageUpload"
                                       accept=".png, .jpg, .jpeg" autofocus
                                       disabled/>
                                <label for="imageUpload"></label>
                            </div>
                            <div class="avatar-preview">
                                {{--                                <div id="imagePreview" style="background-image: url(http://i.pravatar.cc/500?img=7);">--}}
                                <div id="imagePreview"
                                     style="background-image: url(https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y);">
                                </div>
                            </div>
                        </div>
                        @error('pic')
                        <span class="invalid-feedback" role="alert">
                            <strong>{{ $message }}</strong>
                        </span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="name" class="col-12 col-form-label text-left montserrat-500">{{ __('Name') }}</label>

                    <div class="col-md-12">
                        <input id="name" type="text" class="form-control profile @error('name') is-invalid @enderror"
                               name="name"
                               value="{{ old('name', $user->name) }}" autocomplete="name" autofocus disabled>

                        @error('name')
                        <span class="invalid-feedback" role="alert">
							<strong>{{ $message }}</strong>
						</span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="mobile"
                           class="col-12 col-form-label text-left montserrat-500">{{ __('Mobile Number') }}</label>

                    <div class="col-md-12">
                        <input id="mobile" type="text"
                               class="form-control profile @error('mobile') is-invalid @enderror" name="mobile"
                               value="{{ old('mobile', $user->mobile) }}" autocomplete="tel" disabled>

                        @error('mobile')
                        <span class="invalid-feedback" role="alert">
							<strong>{{ $message }}</strong>
						</span>
                        @enderror
                    </div>
                </div>

                <div class="form-group row">
                    <label for="email"
                           class="col-12 col-form-label text-left montserrat-500">{{ __('E-Mail Address') }}</label>

                    <div class="col-md-12">
                        <input id="email" type="email" class="form-control profile @error('email') is-invalid @enderror"
                               name="email"
                               value="{{ old('email', $user->email) }}" autocomplete="email" disabled>

                        @error('email')
                        <span class="invalid-feedback" role="alert">
							<strong>{{ $message }}</strong>
						</span>
                        @enderror
                    </div>
                </div>
            </div>
        </form>
    </div>
</div>

<script>
    $(document).ready(function () {
        $("#btn_edit").click(function () {
            $(this).hide();
            $('.profile').removeAttr('disabled');
            $('#div_btns').removeClass('d-none');
            $('.avatar-edit').removeClass('d-none');
        });
        $("#btn_reset").click(function () {
            $("#btn_edit").show();
            $('.profile').attr('disabled', true);
            $('#div_btns').addClass('d-none');
            $('.avatar-edit').addClass('d-none');
        });
    });

    function readURL(input) {
        if (input.files && input.files[0]) {
            let reader = new FileReader();
            reader.onload = function (e) {
                $('#imagePreview').css('background-image', 'url(' + e.target.result + ')');
                $('#imagePreview').hide();
                $('#imagePreview').fadeIn(650);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }

    $("#imageUpload").change(function () {
        readURL(this);
    });
</script>

<style>
    .avatar-upload {
        position: relative;
        max-width: 205px;
        margin: 0px auto;
    }

    .avatar-upload .avatar-edit {
        position: absolute;
        right: 12px;
        z-index: 1;
        top: 10px;
    }

    .avatar-upload .avatar-edit input {
        display: none;
    }

    .avatar-upload .avatar-edit input + label {
        display: inline-block;
        width: 34px;
        height: 34px;
        margin-bottom: 0;
        border-radius: 100%;
        background: #FFFFFF;
        border: 1px solid transparent;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.12);
        cursor: pointer;
        font-weight: normal;
        transition: all 0.2s ease-in-out;
    }

    .avatar-upload .avatar-edit input + label:hover {
        background: #f1f1f1;
        border-color: #d6d6d6;
    }

    .avatar-upload .avatar-edit input + label:after {
        content: "\f040";
        font-family: 'FontAwesome', serif;
        color: #757575;
        position: absolute;
        top: 10px;
        left: 0;
        right: 0;
        text-align: center;
        margin: auto;
    }

    .avatar-upload .avatar-preview {
        width: 192px;
        height: 192px;
        position: relative;
        border-radius: 100%;
        border: 6px solid #F8F8F8;
        box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.1);
    }

    .avatar-upload .avatar-preview > div {
        width: 100%;
        height: 100%;
        border-radius: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-position: center;
    }
</style>
