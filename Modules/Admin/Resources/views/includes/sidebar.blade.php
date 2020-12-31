
<nav id="sidebar">
    <div class="sidebar-header text-xl-center text-lg-center text-md-left text-sm-left text-xs-left">
        <h3>Quorex</h3>
        <h5>Admin Dashboard</h5>
        <h6>Quorex</h6>
    </div>
    <ul class="list-unstyled components">
        <li class="text-center mb-3">
            {{-- <img src="{{ $ngo->logo_path ? url(\Storage::url($ngo->logo_path)) : $ngo->logo_path }}" alt="" width="100" onerror="this.src = 'https://dummyimage.com/100/b5b1b5/000000&text=No+Logo'" class="img-fluid img-responsive"> --}}
        </li>
        <li {{ echoActiveClassIfRequestMatchesAdmin("home") }}>
            <a href="{{ route('admin.root') }}">
                <i class="fas fa-home"></i>
                Home
            </a>
        </li>
        <li {{ echoActiveClassIfRequestMatchesAdmin("companies") }}>
            <a href="{{ route('admin.companies') }}">
                <i class="fas fa-home"></i>
                Companies
            </a>
        </li>
        <li {{ echoActiveClassIfRequestMatchesAdmin("tips") }}>
            <a href="{{ route('admin.tips') }}">
                <i class="fas fa-home"></i>
                Tips
            </a>
        </li>
        <li {{ echoActiveClassIfRequestMatchesAdmin("kb") }}>
            <a href="{{ route('admin.kb') }}">
                <i class="fas fa-home"></i>
                Knowledge Center
            </a>
        </li>
        <li {{ echoActiveClassIfRequestMatchesAdmin("userMessages") }}>
            <a href="{{ route('admin.user.messages') }}">
                <i class="fas fa-comment-dots"></i>
                User Messages
            </a>
        </li>
        <li {{ echoActiveClassIfRequestMatchesAdmin("profile") }}>
            <a href="#">
                <i class="fas fa-id-card"></i>
                Profile
            </a>
        </li>
        <li {{ echoActiveClassIfRequestMatchesAdmin("logout") }}>
            <a href="{{ route('admin.logout') }}">
                <i class="fas fa-sign-out-alt"></i>
                Logout
            </a>
        </li>
    </ul>
    <ul class="list-unstyled CTAs" id="cs_copyright">
        <li>
            Designed & Developed by <a href="https://codestudio.com.pk">Code Studio</a>
        </li>
    </ul>
</nav>