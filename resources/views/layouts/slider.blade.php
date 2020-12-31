<div id="home" class="carousel slide home-slider" data-ride="carousel" >
  <!-- <ol class="carousel-indicators">
    <li data-target="#home" data-slide-to="0" class="active"></li>
    <li data-target="#home" data-slide-to="1"></li>
    <li data-target="#home" data-slide-to="2"></li>
  </ol> -->
  <div class="carousel-inner">
    <div class="carousel-item active">
      <img src="{{ asset('assets/img/Slider Bg - Copy.jpg') }}" class="d-block w-100" alt="...">
      <div class="carousel-caption slider-n5 mt-5">
        <div class="row text-left mt-5">
          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
            <h1 class="text-uppercase mt-5 montserrat-700">Saving ko karo invest</h1>
            <p class="montserrat-500">In order to support investors with latest market trends and key trading signals, quorex.pk is a platform to rely on for regular updates.</p>
          </div>
          <div class="col-xl-5 col-lg-5 col-md-5 d-none d-md-none d-lg-block d-xl-block mb-n5">
            <img src="{{ asset('assets/img/5000.png') }}" alt="" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
    <div class="carousel-item">
      <img src="{{ asset('assets/img/Slider B-B.jpg') }}" class="d-block w-100" alt="...">
      <div class="carousel-caption slider-n5">
        <div class="row text-left mt-5">
          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
            <h1 class="text-uppercase mt-5 montserrat-700">Play stafe, stay safe</h1>
            <p class="montserrat-500">The reliable services of Quorex are meant to help clients to minimize losses in unstable situations.</p>
          </div>
          <div class="col-xl-5 col-lg-5 col-md-5 d-none d-md-none d-lg-block d-xl-block mb-n5">
            <img src="{{ asset('assets/img/Slider B-B.png') }}" alt="" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
    <div class="carousel-item">
      <img src="{{ asset('assets/img/Slider W-U.jpg') }}" class="d-block w-100" alt="...">
      <div class="carousel-caption slider-n5">
        <div class="row text-left mt-5">
          <div class="col-xl-7 col-lg-7 col-md-7 col-sm-12 col-xs-12">
            <h1 class="text-uppercase mt-5 montserrat-700">Why Us?</h1>
            <p class="montserrat-500">
              <li>Experienced Team Vast Knowledge of Stock Market</li>
              <li>Account / Portfolio Management</li>
              <li>Reliability  / Accuracy upto 80%</li>
              <li>Timely Alerts</li>
            </p>
          </div>
          <div class="col-xl-3 col-lg-3 col-md-3 d-none d-md-none d-lg-block d-xl-block mb-n5">
            <img src="{{ asset('assets/img/Target.png') }}" alt="" class="img-fluid">
          </div>
        </div>
      </div>
    </div>
  </div>
  <a class="carousel-control-prev" href="#home" role="button" data-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="sr-only">Previous</span>
  </a>
  <a class="carousel-control-next" href="#home" role="button" data-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="sr-only">Next</span>
  </a>
</div>
<script>
	jQuery(document).ready(function($) {
		$('.carousel').carousel();
	});
</script>