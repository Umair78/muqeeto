@php
$curr_usr = session()->has('admin') ? session('admin') : false;
@endphp

<!DOCTYPE html>
<html>

<head>
	<!-- Global site tag (gtag.js) - Google Analytics
	<script async src="https://www.googletagmanager.com/gtag/js?id=G-Y1SFMVF7R3"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
		gtag('config', 'G-Y1SFMVF7R3');
	</script>
	Global site tag (gtag.js) - Google Analytics
	<script async src="https://www.googletagmanager.com/gtag/js?id=UA-165271859-1"></script>
	<script>
		window.dataLayer = window.dataLayer || [];
		function gtag(){dataLayer.push(arguments);}
		gtag('js', new Date());
	
		gtag('config', 'UA-165271859-1');
	</script>
	<script data-ad-client="ca-pub-3331863308120021" async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js"></script> -->
	
	<meta charset="utf-8">
	<meta name="viewport" content="width=device-width, initial-scale=1.0">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>.::Quorex - Admin Dashboard ::.</title>

	<link rel="icon" href="{{ asset('assets/img/favicon.png') }}">
	<!-- Bootstrap CSS CDN -->

	<link href="https://www.jqueryscript.net/css/jquerysctipttop.css" rel="stylesheet" type="text/css">
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/css/bootstrap.min.css" integrity="sha384-9gVQ4dYFwwWSjIDZnLEWnxCjeSWFphJiwGPXr1jddIhOegiu1FwO5qRGvFXOdJZ4" crossorigin="anonymous">
	<link rel="stylesheet" href="https://unpkg.com/bootstrap-material-design@4.1.1/dist/css/bootstrap-material-design.min.css" integrity="sha384-wXznGJNEXNG1NFsbm0ugrLFMQPWswR3lds2VeinahP8N0zJw9VWSopbjv2x7WCvX" crossorigin="anonymous">
	<!-- Our Custom CSS -->
	<link rel="stylesheet" href="{{ asset('assets/admin/css/style4.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/admin/css/style.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/admin/css/quorex_admin.css') }}">
	{{-- <link rel="stylesheet" href="{{ asset('assets/admin/summernote/summernote.css') }}"> --}}
	<link href="https://cdn.jsdelivr.net/npm/summernote@0.8.16/dist/summernote-lite.min.css" rel="stylesheet">
	{{-- <link rel="icon" href="../img/favicon.png"> --}}
	<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.13.0/css/all.min.css" />

	<link rel="stylesheet" type="text/css" href="{{ asset('assets/admin/css/mainstyle.css') }}" />

	<link href="https://unpkg.com/aos@2.3.1/dist/aos.css" rel="stylesheet">

	<link rel="stylesheet" href="https://code.jquery.com/ui/1.12.1/themes/smoothness/jquery-ui.css">
	{{-- <link rel="stylesheet" href="{{ asset('assets/css/tree.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/css/checktree.css') }}">
	<link rel="stylesheet" href="{{ asset('assets/css/hummingbird-treeview.css') }}"> --}}
	<link rel="stylesheet" href="https://glimberger.github.io/bstree/assets/css/bstree.css">

	<link rel="stylesheet" type="text/css" href="//cdn.datatables.net/1.10.21/css/jquery.dataTables.min.css">
	<!-- Font Awesome JS -->
	{{-- <script defer src="https://use.fontawesome.com/releases/v5.0.13/js/solid.js" integrity="sha384-tzzSw1/Vo+0N5UhStP3bvwWPq+uvzCMfrN1fEFe+xBmv1C/AtVX5K0uZtmcHitFZ" crossorigin="anonymous"></script>
	<script defer src="https://use.fontawesome.com/releases/v5.0.13/js/fontawesome.js" integrity="sha384-6OIrr52G08NpOFSZdxxz1xdNSndlD4vdcf/q2myIUVO0VsqaGHJsB0RaBE01VTOY" crossorigin="anonymous"></script> --}}

	<!-- jQuery CDN - Slim version (=without AJAX) -->
	<script src="https://code.jquery.com/jquery-3.3.1.slim.min.js" integrity="sha384-q8i/X+965DzO0rT7abK41JStQIAqVgRVzpbzo5smXKp4YfRvH+8abtTE1Pi6jizo" crossorigin="anonymous"></script>
	<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script>
	<!-- Bootstrap JS -->
	{{-- <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.1.0/js/bootstrap.min.js" integrity="sha384-uefMccjFJAIv6A+rW+L4AHf99KvxDjWSu1z9VI8SKNVmz4sk7buKt/6v9KI65qnm" crossorigin="anonymous"></script> --}}
	<script src="https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.1.0/js/bootstrap.bundle.js"></script>
	{{-- <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/popper.js"></script> --}}
	<!-- Popper.JS -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.0/umd/popper.js"></script>
	<!-- editor -->

	{{-- <script src="{{ asset('assets/admin/js/custom.js') }}"></script> --}}
	{{-- <script src="{{ asset('assets/admin/summernote/summernote.min.js') }}"></script> --}}
	<script src="https://cdn.jsdelivr.net/npm/summernote@0.8.16/dist/summernote-lite.min.js"></script>
	<script src="https://unpkg.com/aos@2.3.1/dist/aos.js"></script>

	{{-- <script src="{{ asset('assets/js/treejs.js') }}" type="text/javascript" charset="utf-8"></script>
	<script src="{{ asset('assets/js/checktree.js') }}" type="text/javascript" charset="utf-8"></script>
	<script src="{{ asset('assets/js/hummingbird-treeview.js') }}" type="text/javascript" charset="utf-8"></script> --}}
	<script src="https://glimberger.github.io/bstree/assets/js/jquery.bstree.js"></script>
	<script src="//cdn.datatables.net/1.10.21/js/jquery.dataTables.min.js" type="text/javascript" charset="utf-8"></script>
	<script src="https://cdn.datatables.net/1.10.21/js/dataTables.bootstrap4.min.js" type="text/javascript" charset="utf-8"></script>
</head>

<body>
	<!-- {{-- firebase start --}}
	<script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-app.js"></script>
	<script src="https://www.gstatic.com/firebasejs/7.14.6/firebase-analytics.js"></script>
	<script>
		var firebaseConfig = {
			apiKey: "AIzaSyBhHAVEhbaUqCQjkafRblYmQmx6KY3jR78",
			authDomain: "wokpak-b0bbe.firebaseapp.com",
			databaseURL: "https://wokpak-b0bbe.firebaseio.com",
			projectId: "wokpak-b0bbe",
			storageBucket: "wokpak-b0bbe.appspot.com",
			messagingSenderId: "674673716158",
			appId: "1:674673716158:web:6a42a9b62e4e6f65c227ef",
			measurementId: "G-80CXFQEF1E"
		};
		firebase.initializeApp(firebaseConfig);
		firebase.analytics();
	</script> -->
	{{-- firebase end --}}
	<div id="loader"></div>
	<!-- Preloader Start -->
	<script type="text/javascript">
		$(window).on('load', function() { 
			$('#loader').fadeOut('slow');
			// $('body').delay(350).css({'overflow':'auto'});
		})
	</script>
	<div class="wrapper">
		<!-- Sidebar  -->
		@if($curr_usr)
		@include('admin::includes.sidebar')
		@endif
		<!-- Page Content  -->
		<div id="content">
			<!-- top bar -->
			@if($curr_usr)
			@include('admin::includes.topbar')
			@endif
			@yield('content')
		</div>
	</div>

	
	<!--Start of Tawk.to Script-->
	<!-- <script type="text/javascript">
		var Tawk_API=Tawk_API||{}, Tawk_LoadStart=new Date();
		(function(){
			var s1=document.createElement("script"),s0=document.getElementsByTagName("script")[0];
			s1.async=true;
			s1.src='https://embed.tawk.to/5ea1ffb635bcbb0c9ab41900/default';
			s1.charset='UTF-8';
			s1.setAttribute('crossorigin','*');
			s0.parentNode.insertBefore(s1,s0);
		})();
	</script> -->
	<!--End of Tawk.to Script-->
	<script type="text/javascript">
		$(document).ready(function() {
			$('#sidebarCollapse').on('click', function() {
				$('#sidebar').toggleClass('active');
			});
			$('[data-toggle="tooltip"]').tooltip();
		});
	</script>
	@if($curr_usr)
	@include('admin::modals.changePasswordModal')
	@endif
</body>
</html>