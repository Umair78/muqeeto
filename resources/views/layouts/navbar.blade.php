<nav class="navbar navbar-expand-xl navbar-dark bg-dark sticky-top" id="main_nav">
    <div class="container">
        {{-- <a class="navbar-brand" href="#">{{ env('APP_NAME') }}</a> --}}
        <a class="navbar-brand mr-5" href="{{ route('home') }}">
            <img src="{{ asset('assets/img/Quorex Logo 1.png') }}" alt="" height="80">
        </a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent"
                aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>

        <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <ul class="navbar-nav mr-auto rounded-1">
                <li class="nav-item rounded-1 {{ Request::segment(1) == 'home' ? 'active' : '' }}">
                    <a class="nav-link rounded-1 font-weight-bold montserrat-500" href="{{ url('home') }}">
                        <span class="fa fa-home"></span>
                        {{ __('Home') }} <span class="sr-only">(current)</span>
                    </a>
                </li>
                @php
                    $aboutUs = [
                      'about-us',
                      'why-us',
                      'our-offerings',
                      'mistakes',
                      'disclaimer'
                    ];
                    $insights = [
                      'companies',
                      'top_author',
                      'active_author',
                      'top_posts'
                    ];
                    // in_array(needle, haystack)
                @endphp
                <li class="nav-item dropdown rounded-1 montserrat-500 {{ in_array(Request::segment(1), $aboutUs) ? 'active' : '' }}">
                    <a class="nav-link dropdown-toggle rounded-1 montserrat-500" href="#" id="navbarDropdown"
                       role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="fa fa-address-card"></span>
                        <span class="montserrat-500">{{ __('About Us') }}</span>
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item font-weight-bold montserrat-500 {{ Request::segment(1) == 'about-us' ? 'active' : '' }}"
                           href="{{ route('about-us') }}">{{ __('About Us') }}</a>
                        <a class="dropdown-item font-weight-bold montserrat-500 {{ Request::segment(1) == 'why-us' ? 'active' : '' }}"
                           href="{{ route('why-us') }}">{{ __('Why Us') }}</a>
                        <a class="dropdown-item font-weight-bold montserrat-500 {{ Request::segment(1) == 'our-offerings' ? 'active' : '' }}"
                           href="{{ route('our-offerings') }}">{{ __('Our Offerings') }}</a>
                        <a class="dropdown-item font-weight-bold montserrat-500 {{ Request::segment(1) == 'mistakes' ? 'active' : '' }}"
                           href="{{ route('mistakes') }}">{{ __('Common Mistakes') }}</a>
                        <a class="dropdown-item font-weight-bold montserrat-500 {{ Request::segment(1) == 'disclaimer' ? 'active' : '' }}"
                           href="{{ route('disclaimer') }}">{{ __('Disclaimer') }}</a>
                    </div>
                </li>
                <li class="nav-item dropdown rounded-1 montserrat-500 {{ in_array(Request::segment(1), $insights) ? 'active' : '' }}">
                    <a class="nav-link dropdown-toggle rounded-1 montserrat-500" href="#" id="navbarDropdown"
                       role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                        <span class="fas fa-dice-d6"></span>
                        {{ __('Insights') }}
                    </a>
                    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                        <a class="dropdown-item font-weight-bold montserrat-500 {{ Request::segment(1) == 'companies'
                         ? 'active' : '' }}" href="{{ route('companies') }}">{{ __('List of Companies') }}</a>
                        <a class="dropdown-item font-weight-bold montserrat-500 {{ Request::segment(1) == 'why-us' ? 'active' : '' }}"
                           href="{{ route('why-us') }}">{{ __('Why Us') }}</a>
                        <a class="dropdown-item font-weight-bold montserrat-500 {{ Request::segment(1) == 'our-offerings' ? 'active' : '' }}"
                           href="{{ route('our-offerings') }}">{{ __('Our Offerings') }}</a>
                        <a class="dropdown-item font-weight-bold montserrat-500 {{ Request::segment(1) == 'mistakes' ? 'active' : '' }}"
                           href="{{ route('mistakes') }}">{{ __('Common Mistakes') }}</a>
                        <a class="dropdown-item font-weight-bold montserrat-500 {{ Request::segment(1) == 'disclaimer' ? 'active' : '' }}"
                           href="{{ route('disclaimer') }}">{{ __('Disclaimer') }}</a>
                    </div>
                </li>
                <li class="nav-item rounded-1 {{ Request::segment(1) == 'contact' ? 'active' : '' }}">
                    <a class="nav-link rounded-1 font-weight-bold montserrat-500" href="{{ route('contact-us') }}">
                        <span class="fa fa-id-card"></span>
                        {{ __('Contact') }}
                    </a>
                </li>
            </ul>
            <div class="form-inline my-2 my-lg-0">
                @if($user = Auth::user())
                    <li class="nav-item dropdown rounded-1 montserrat-500 list-unstyled">
                        <a href="#" title="" class="btn btn-danger bg-red montserrat-500 mr-4 dropdown-toggle"
                           id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true"
                           aria-expanded="false">
                            @if(isset($user->image))
                                @php $src = $user->image @endphp
                            @else
                                @php $src = "https://www.gravatar.com/avatar/00000000000000000000000000000000?d=mp&f=y" @endphp
                            @endif
                                <img src="{{ $src }}" alt="" class="rounded-circle" height="20">
                            {{ $user->name }}
                        </a>
                        <div class="dropdown-menu" aria-labelledby="navbarDropdown">
                            <a class="dropdown-item font-weight-bold montserrat-500"
                               href="{{ url('profile') }}">{{ __('Profile') }}</a>
                            <a class="dropdown-item font-weight-bold montserrat-500">{{ __('Why Us') }}</a>
                            <a class="dropdown-item font-weight-bold montserrat-500">{{ __('Our Offerings') }}</a>
                            <a class="dropdown-item font-weight-bold montserrat-500">{{ __('Common Mistakes') }}</a>
                            <a class="dropdown-item font-weight-bold montserrat-500">{{ __('Disclaimer') }}</a>
                            <a href="{{ URL::to('logout') }}" class="dropdown-item font-weight-bold montserrat-500">Logout</a>
                        </div>
                    </li>
                @else
                    <a href="{{ url('login') }}" title="" class="btn btn-danger bg-red montserrat-500 mr-4">
                        <span class="fas fa-sign-in-alt"></span>
                        {{ __('Login') }}
                    </a>
                    <a href="{{ url('register') }}" title="" class="btn btn-danger bg-red montserrat-500">
                        <span class="fas fa-user-plus"></span>
                        {{ __('Sign Up') }}
                    </a>
                @endif
            </div>
        </div>
    </div>
</nav>
