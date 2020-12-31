{{-- @dd($tips->toArray()) --}}
@extends('layouts.master')
@section('content')
    <div class="container-fluid mt-5 mb-5 pb-5">
        <div class="h1 montserrat-800 text-center text-uppercase">
            Companies ({{ count($companies) }})
        </div>
        @if(!$user)
            <div class="alert alert-danger text-center">
                <a href="{{ route('login') }}"
                   class="mt-2 btn btn-danger bg-red btn-block">{{ __('Please login / register to view this page.') }}</a>
            </div>
        @else
            <div class="container">
                <ul>
                @foreach($companies as $company)
                    <li>{{ $company->name }}</li>
                @endforeach
                </ul>
            </div>
        @endif
    </div>
    @include('layouts.footer')
@endsection
