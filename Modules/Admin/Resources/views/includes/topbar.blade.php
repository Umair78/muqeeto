
<nav class="navbar navbar-expand-lg navbar-light bg-light sticky-top">
    <div class="container-fluid">
        <button type="button" id="sidebarCollapse" class="btn btn-sp">
            <i class="fas fa-align-left"></i>
        </button>

        <button class="btn btn-dark d-inline-block d-lg-none ml-auto" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <i class="fas fa-align-justify"></i>
        </button>
        <div class="alert alert-success alert-dismissible hide fade show" role="alert" id="pwd_changed_alert">
            {{ __('Password Changed Successfully') }}
            <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="collapse navbar-collapse" id="navbarSupportedContent" align="right">
            <ul class="nav navbar-nav ml-auto">
                <li class="nav-item active">
                    <u class="nav-link">Logged In: <strong><?php echo $curr_usr->name; ?></strong></u>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="javascript:;" data-target="#changePasswordModal" data-toggle="modal"><i class="fas fa-key"></i>Change Password</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="{{ route('admin.logout') }}"><i class="fas fa-sign-out-alt"></i>Logout</a>
                </li>
            </ul>
        </div>
    </div>
</nav>