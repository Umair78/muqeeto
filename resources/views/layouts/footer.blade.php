@php
$defaults = get_contactUs_details();
$contactUs_title = $defaults->where('key', 'contactUs_title')->pluck('value')->first();
$contactUs_desc = $defaults->where('key', 'contactUs_desc')->pluck('value')->first();
$address = $defaults->where('key', 'address')->pluck('value')->first();
$addresses = explode(',', $address);
$phones = json_decode($defaults->where('key', 'phones')->pluck('value')->first(), true);
$emails = json_decode($defaults->where('key', 'emails')->pluck('value')->first(), true);
@endphp

{{-- Contact Us & Footer --}}
<div class="" id="contactus">
	<div class="text-white bg-red pt-5 pb-5 pl-3 pr-3">
		<div class="container">
			<div class="col-12">
				<div class="h3 text-center text-uppercase montserrat-800">
					{!! $contactUs_title !!}
				</div>
				<div class="text-center montserrat-500">
					{!! $contactUs_desc !!}
				</div>
			</div>
			<div class="col-12 mt-5">
				<div class="row">
					<div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12 text-center montserrat-700">
						<div class="h2">
							{!! $contactUs_title !!}
						</div>
						<div class="row montserrat-500">
							<div class="offset-2 col-2 text-right">
								<span class="fa fa-map-marker fa-2x"></span>
							</div>
							<div class="col text-left">
								<address>
									@foreach($addresses as $address)
									{{ $address }}
									<br>
									@endforeach
								</address>
							</div>
						</div>
						<div class="row montserrat-500">
							<div class="offset-2 col-2 text-right">
								<span class="fa fa-envelope fa-2x"></span>
							</div>
							<div class="col text-left">
								<address>
								<a href="umairabbasi">abc</a>
									
								</address>
							</div>
						</div>
						<div class="row montserrat-500">
							<div class="offset-2 col-2 text-right">
								<span class="fas fa-phone-alt fa-2x"></span>
							</div>
							<div class="col text-left">
								<address>
									<a href="">bharakoh</a>
								</address>
							</div>
						</div>
					</div>
					<div class="col-xl-8 col-lg-8 col-md-8 col-sm-12 col-xs-12 montserrat-500">
						@include('flash::message')
						<form action="{{ route('contactUs') }}" method="post" accept-charset="utf-8">
							@csrf()
							<div class="col-12">
								<div class="row">
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
										<input type="text" required class="bg-red-blurred placeholder-white form-control input-lg input-red montserrat-500" name="sender_name" value="" placeholder="Enter Your Name Here">
									</div>
									<div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
										<input type="text" required class="bg-red-blurred placeholder-white form-control input-lg input-red montserrat-500" name="sender_email" value="" placeholder="Enter Your Email">
									</div>
								</div>
							</div>
							<div class="col-12 mt-3">
								<input type="text" required class="bg-red-blurred placeholder-white form-control input-lg input-red montserrat-500" name="sender_subject" value="" placeholder="Enter Subject">
							</div>
							<div class="col-12 mt-3">
								<textarea name="sender_message" rows="5" required class="bg-red-blurred placeholder-white form-control input-red montserrat-500" placeholder="Enter Your Message"></textarea>
							</div>
							<div class="col-12 mt-3">
								<input type="submit" class="btn btn-block btn-white font-weight-bold text-uppercase montserrat-500" value="Submit">
							</div>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="text-center pt-5 pb-5 pl-3 pr-3 montserrat-500" style="background-color: rgba(0, 0, 0, 0.1); border-bottom: .5em solid #ed2f59;">
		{{-- <div> --}}
			Copyrights &copy; {{ now()->year }}. All Rights Reserved by <a href="https://codestudio.com.pk" title="" class="text-red montserrat-700">Code Studio - Pakistan</a>
			<br>
			<a href="{{ route('disclaimer') }}" class="text-black-50">{{ __('Disclaimer') }}</a>  &nbsp;|&nbsp;  
			<a href="{{ route('why-us') }}" class="text-black-50">{{ __('Why Us') }}</a>  &nbsp;|&nbsp;  
			<a href="{{ route('our-offerings') }}" class="text-black-50">{{ __('Our Offerings') }}</a>  &nbsp;|&nbsp;  
			<a href="{{ route('mistakes') }}" class="text-black-50">{{ __('Common Mistakes') }}</a>  &nbsp;|&nbsp;  
			<a href="{{ route('privacypolicy') }}" class="text-black-50">{{ __('Privacy Policy') }}</a>
		{{-- </div> --}}
	</div>
</div>