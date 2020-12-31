{{-- @dd(session()->all()) --}}
{{-- @dd($tips->toArray()) --}}
@extends('layouts.master')
@section('content')
    {{--<div class="container-fluid">
        <div class="col-10 offset-1">
            <marquee behavior="scroll" direction="left" onmouseover="this.stop();" onmouseout="this.start();">
            </marquee>
        </div>
    </div>--}}
    @include('layouts.slider')

    <div class="container mb-5 pb-5">
        {{-- Tips & News --}}
        <div class="row mt-xl-n5 mt-lg-n5 mt-md-5 mt-sm-5 mb-5 home-tipNews" id="tips_news">
            {{-- Tips --}}
            <div class="col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12 mb-5">
                <div class="card home-card rounded-1 mousepointer" onclick="reroute('tips')">
                    <div class="card-body">
                        <h5 class="card-title text-center montserrat-700">Latest Trading Signals</h5>
                        <h6 class="card-subtitle mb-2 text-muted text-center">
                            <span class="fa fa-signal fa-2x text-red"></span>
                            {{-- <img src="{{ asset('assets/img/Icon.jpg') }}" alt=""> --}}
                        </h6>
                        <p class="card-text text-truncate">
                            @php
                                $i = 0;
                                $max = 2;
                                if($user){
                                    $max = 5;
                                }
                            @endphp
                            @foreach($tips as $tip)
                                {{-- @dd($tip->company) --}}
                                @if($tip->company == null || $tip->deleted_at)
                                    @continue
                                @endif
                                @if($i++ == $max)
                                    @break
                                @endif
                                @php
                                    $tip_details = json_decode($tip->tip_details, true);
                                @endphp
                                <font class="title_disp"
                                      title="{{ $tip->company->company_code . " " . $tip->tips . " " }} Buy @ {{ $tip_details['Buy @'] }}, TP @ {{ $tip_details['TP @'] }}, Stop Loss @ {{ $tip_details['Stop Loss @'] }}"
                                      data-toggle="tooltip" data-placement="top">
                                    <font class="montserrat-500">{{ $tip->company->company_code }}</font>
                                    - {{ $tip->tips }},
                                    <small class="red-underline montserrat-500">Buy @ {{ $tip_details['Buy @'] }}, TP
                                        @ {{ $tip_details['TP @'] }}, Stop Loss
                                        @ {{ $tip_details['Stop Loss @'] }}</small>
                                    <br>
                                </font>
                            @endforeach
                            @if(!$user)
                                <a href="{{ route('login') }}"
                                   class="mt-2 btn btn-danger bg-red btn-block">{{ __('Login / Register to View more tips') }}</a>
                        @else
                            <div class="row">
                                <div class="col">
                                </div>
                                <div class="col text-right montserrat-500">
                                    <a href="{{ route('tips') }}" class="text-red">Read More <span
                                            class="fa fa-angle-double-right"></span></a>
                                </div>
                            </div>
                            @endif
                            </p>
                    </div>
                </div>
            </div>
            {{-- News --}}
            <div
                class="offset-xl-1 offset-lg-1 offset-md-0 offset-sm-0 offset-xs-0 col-xl-5 col-lg-5 col-md-12 col-sm-12 col-xs-12">
                <div class="card home-card rounded-1 mousepointer">
                    <div class="card-body">
                        <h5 class="card-title text-center montserrat-700">Latest Alerts</h5>
                        <h6 class="card-subtitle mb-2 text-muted text-center">
                            <span class="fa fa-newspaper-o fa-2x text-red"></span>
                            {{-- <img src="{{ asset('assets/img/Icon.jpg') }}" alt=""> --}}
                        </h6>
                        <div class="card-text montserrat-500 pl-1 pr-1">
                            @foreach($news as $kb)
                                <div class="row title_disp"
                                     title="{{ $kb->title . ", Added " . Carbon\Carbon::createFromTimeStamp(strtotime($kb->created_at))->diffForHumans() . " On " . Carbon\Carbon::parse($kb->created_at, 'Asia/Karachi')->isoFormat('DD-MM-YYYY h:m') . " " }}"
                                     data-toggle="tooltip" data-placement="top"
                                     onclick="reroute('news/{{ Carbon\Carbon::parse($kb->created_at, 'Asia/Karachi')->isoFormat('YYYY-MM-DD') }}')">
                                    <div class="col-8 text-left">
                                        {{ $kb->title }}
                                    </div>
                                    <div class="col-4 text-muted small text-right">
                                        {{-- {{ Carbon\Carbon::parse($kb->created_at, 'Asia/Karachi')->isoFormat('DD-MM-YYYY h:m') }} --}}
                                        {{ Carbon\Carbon::createFromTimeStamp(strtotime($kb->created_at))->diffForHumans() }}
                                    </div>
                                </div>
                            @endforeach
                            <div class="row">
                                <div class="col">
                                </div>
                                <div class="col text-right">
                                    <a href="{{ route('news') }}" class="text-red">Read More <span
                                            class="fa fa-angle-double-right"></span></a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        {{-- About Us --}}
        <div class="row mt-5" id="aboutus">
            <div class="col-12 mt-5 pt-5">
                <div class="h3 text-danger text-center text-uppercase montserrat-700">
                    About Us
                </div>
                <div class="text-center montserrat-500">
                    {!! $aboutUs !!}
                </div>
            </div>
        </div>
        {{-- After About Us --}}
        <div class="row mt-5">
            <div class="col-12 mt-5 pt-5">
                <div class="row offset-xl-1 offset-lg-1 offset-md-1 offset-sm-0">
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="text-left mt-5 montserrat-500">
                            <div class="h3 text-danger text-left text-uppercase montserrat-700">
                                Our Mission
                            </div>
                            {!! $home_mission !!}
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <img src="{{ asset('assets/img/Mission.jpg') }}" alt="" class="img-fluid">
                    </div>
                </div>
            </div>
        </div>
        {{-- After About Us --}}
        <div class="row mt-5">
            <div class="col-12 mt-5 pt-5">
                <div class="row offset-xl-1 offset-lg-1 offset-md-1 offset-sm-0">
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-12 col-xs-12">
                        <img src="{{ asset('assets/img/Vision.jpg') }}" alt="" class="img-fluid">
                    </div>
                    <div class="col-xl-6 col-lg-6 col-md-6 col-sm-12 col-xs-12">
                        <div class="text-left mt-5 montserrat-500">
                            <div class="h3 text-danger text-left text-uppercase montserrat-700">
                                Our Vision
                            </div>
                            {!! $home_vision !!}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    {{-- Our Team --}}
    <!-- <div class="row mt-5">
			<div class="col-12 mt-5 pt-5">
				<div class="h3 text-danger text-center text-uppercase mb-5 montserrat-700">
					Our Team
				</div>
				<div class="card-deck text-center">
					<div class="card team-card rounded-1">
						{{-- <img src="https://picsum.photos/200/200?random=1" class="card-img-top team-card" alt="..."> --}}
        <div class="card-body montserrat-500 rounded-1">
            <h5 class="card-title">CIO</h5>
            <p class="card-text">Muhammad Sabir</p>
            <p class="card-text"><small>Co-Founder</small></p>
        </div>
    </div>
    <div class="card team-card rounded-1">
{{-- <img src="https://picsum.photos/200/200?random=1" class="card-img-top team-card" alt="..."> --}}
        <div class="card-body montserrat-500 team-card rounded-1">
            <h5 class="card-title">CTO</h5>
            <p class="card-text">Muhammad Junaid Naeem</p>
            <p class="card-text"><small>Co-Founder</small></p>
        </div>
    </div>
    <div class="card team-card rounded-1">
{{-- <img src="https://picsum.photos/200/200?random=1" class="card-img-top team-card" alt="..."> --}}
        <div class="card-body montserrat-500 rounded-1">
            <h5 class="card-title">CXO</h5>
            <p class="card-text">Raja Shoaib Ahmed</p>
            <p class="card-text"><small>Co-Founder</small></p>
        </div>
    </div>
    <div class="card team-card rounded-1">
{{-- <img src="https://picsum.photos/200/200?random=1" class="card-img-top team-card" alt="..."> --}}
        <div class="card-body montserrat-500 rounded-1">
            <h5 class="card-title">Marketing Officer</h5>
            <p class="card-text">Waheed Ahmed</p>
            <p class="card-text"><small>Co-Founder</small></p>
        </div>
    </div>
</div>
</div>
</div> -->
    </div>
    @include('layouts.footer')
    <script>
        function reroute(uri) {
            window.location = uri;
        }

        $(document).ready(function ($) {
            $('.nav-link').on('click', function (event) {
                var scroll_to = $(this).attr('data-id');
                // console.log($(this).parent('.nav-item'));
                // console.log(scroll_to, $("#"+scroll_to).offset().top - 150);
                $([document.documentElement, document.body]).animate({
                    scrollTop: $("#" + scroll_to).offset().top - 150
                }, 2000);
                $('.nav-item.active').removeClass('active');
                $(this).parent('.nav-item').addClass('active');
            });
            $('.title_disp').tooltip();
        });
    </script>
@endsection
