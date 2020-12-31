@php
saveVisit();
$usert = saveUserFCM();
// dd($usert);
// dd(session('fcm_token'));
@endphp
<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">

	<meta property="og:locale" content="en_GB" />
	<meta property="og:type" content="website" />
	<meta property="og:title" content="Quorex" />
	<meta property="og:description" content="Quorex Pakistan" />
	<meta property="og:url" content="https://quorex.pk/assets/img/Quorex%20Logo%201.png" />
	<meta property="og:site_name" content="Quorex" />
	<meta property="og:image" content="https://quorex.pk/assets/img/Quorex%20Logo%201.png" />

	<title>{{ env('APP_NAME') }}</title>
	@toastr_css
	
	<link rel="manifest" href="{{ 'manifest.json' }}">
	<link rel="icon" href="{{ asset('assets/img/favicon.png') }}">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.1/css/all.min.css" integrity="sha512-xA6Hp6oezhjd6LiLZynuukm80f8BoZ3OpcEYaqKoCV3HKQDrYjDE1Gu8ocxgxoXmwmSzM4iqPvCsOkQNiu41GA==" crossorigin="anonymous" />
	<link rel="stylesheet" href="{{ asset('assets/css/custom.css') }}">
	<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;500;700;800&display=swap" rel="stylesheet">
	<link rel="stylesheet" href="{{ asset('assets/css/socialicons.css') }}">
	<link rel="stylesheet" href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
	<link rel="stylesheet" href="https://cdn.datatables.net/1.10.21/css/dataTables.bootstrap4.min.css">
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/css/bootstrap-datepicker.css">
	<link href="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/css/select2.min.css" rel="stylesheet" />
	<link href="//cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/css/toastr.css" rel="stylesheet" />
	<link rel="stylesheet" href="{{ asset('assets/css/quorex.css') }}">
	
	<script src="https://code.jquery.com/jquery-3.5.1.min.js" crossorigin="anonymous"></script>
	<script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
	<script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>
	<script src="https://use.fontawesome.com/9b7b93f891.js"></script>
	<script type="text/javascript" src="//cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js"></script>
	<script type="text/javascript" src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js"></script>
	<script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap-datepicker/1.9.0/js/bootstrap-datepicker.min.js"></script>
	<script type="text/javascript" src="{{ asset('assets/js/jquery.autoscroll.js') }}"></script>
	<script data-ad-client="ca-pub-2971627968967249" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script>
	<!-- Global site tag (gtag.js) - Google Analytics -->
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-174682815-1"></script>
	<script src="https://cdn.jsdelivr.net/npm/select2@4.1.0-beta.1/dist/js/select2.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/toastr.js/latest/js/toastr.min.js"></script>
	<script src="https://unpkg.com/sticky-table-headers"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());

		gtag('config', 'UA-174682815-1');
	</script>

</head>
<body>
	<script type="text/javascript">
		window.fbAsyncInit = function() {
			FB.init({
				appId            : '1772600522882696',
				autoLogAppEvents : true,
				xfbml            : true,
				version          : 'v2.10'
			});
			FB.AppEvents.logPageView();
		};
		
		(function(d, s, id){
			var js, fjs = d.getElementsByTagName(s)[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement(s); js.id = id;
			js.src = "//connect.facebook.net/en_US/sdk.js";
			fjs.parentNode.insertBefore(js, fjs);
		}(document, 'script', 'facebook-jssdk'));
	</script>
	<!-- The social media icon bar -->
	{{-- <div class="icon-bar">
		<a href="#" class="facebook"><i class="fa fa-facebook"></i></a>
		<a href="#" class="twitter"><i class="fa fa-twitter"></i></a>
		<a href="#" class="google"><i class="fa fa-google"></i></a>
		<a href="#" class="linkedin"><i class="fa fa-linkedin"></i></a>
		<a href="#" class="youtube"><i class="fa fa-youtube"></i></a>
	</div> --}}
	@include('layouts.navbar')
	@yield('content')
	<!--Start of Tawk.to Script-->
	<script type="text/javascript">
		var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
		(function(){
			var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
			s1.async=true;
			s1.src='https://embed.tawk.to/5f286ae82da87279037e35c0/default';
			s1.charset='UTF-8';
			s1.setAttribute('crossorigin','*');
			s0.parentNode.insertBefore(s1,s0);
		})();
		function checkForUpdates() {
			$.ajax({
				url: '{{ route('check.updates') }}',
			})
			.done(function(res) {
				// console.clear();
				console.log(res);
				if(res == true){
					window.location = location.origin + location.pathname;
				}
			})
			.fail(function() {
				console.log("error");
			})
			.always(function() {
				console.log("complete");
			});
		}
		// window.checkingUpdates = setInterval(checkForUpdates, 10000);
	</script>
	<!--End of Tawk.to Script-->
	{{-- <script type="text/javascript"> var infolinks_pid = 3279758; var infolinks_wsid = 0; </script> <script type="text/javascript" src="//resources.infolinks.com/js/infolinks_main.js"></script> --}}
	@jquery
	@toastr_js
	@toastr_render

	<!-- The core Firebase JS SDK is always required and must be listed first -->
	<script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-messaging.js"></script>

	<!-- TODO: Add SDKs for Firebase products that you want to use https://firebase.google.com/docs/web/setup#available-libraries -->
	<script src="https://www.gstatic.com/firebasejs/7.19.1/firebase-analytics.js"></script>
	<script>
  	// Your web app's Firebase configuration
  	var firebaseConfig = {
  		apiKey: "AIzaSyCm56XlLvWcDSWLoxX_NAotWz_48ODXPxE",
  		authDomain: "quorex-6070e.firebaseapp.com",
  		databaseURL: "https://quorex-6070e.firebaseio.com",
  		projectId: "quorex-6070e",
  		storageBucket: "quorex-6070e.appspot.com",
  		messagingSenderId: "914685785685",
  		appId: "1:914685785685:web:2202bacaef6cfecef446dc",
  		measurementId: "G-H8D6YQLMPT"
  	};
  	// Initialize Firebase
  	firebase.initializeApp(firebaseConfig);
  	firebase.analytics();

  	var csrf_token = '{{ csrf_token() }}';
  </script>
  <script src="{{ 'js/firebase.js' }}"></script>
</body>
</html>