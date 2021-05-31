//rout: sing with(ui)
<Route exact path="/?">
  <ul class="firebaseui-idp-list">
    <li class="firebaseui-list-item">
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        // class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-google firebaseui-id-idp-button"
        // data-provider-id="google.com"
        style="background-color:#ffffff"
        // data-upgraded=",MaterialButton"
      >
        <span class="firebaseui-idp-icon-wrapper">
          <img
            class="firebaseui-idp-icon"
            alt=""
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg"
          ></img>
        </span>
        <span class="firebaseui-idp-text firebaseui-idp-text-long">
          Sign in with Google
        </span>
        <span class="firebaseui-idp-text firebaseui-idp-text-short">
          Google
        </span>
      </button>
    </li>
    <li class="firebaseui-list-item">
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-facebook firebaseui-id-idp-button"
        data-provider-id="facebook.com"
        style="background-color:#3b5998"
        data-upgraded=",MaterialButton"
      >
        <span class="firebaseui-idp-icon-wrapper">
          <img
            class="firebaseui-idp-icon"
            alt=""
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/facebook.svg"
          ></img>
        </span>
        <span class="firebaseui-idp-text firebaseui-idp-text-long">
          Sign in with Facebook
        </span>
        <span class="firebaseui-idp-text firebaseui-idp-text-short">
          Facebook
        </span>
      </button>
    </li>
    <li class="firebaseui-list-item">
      <button
        onClick={(e) => {
          e.preventDefault();
        }}
        // class="firebaseui-idp-button mdl-button mdl-js-button mdl-button--raised firebaseui-idp-password firebaseui-id-idp-button"
        // data-provider-id="password"
        style="background-color:#db4437"
        // data-upgraded=",MaterialButton"
      >
        <span>
          <img
            class="firebaseui-idp-icon"
            alt=""
            src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/mail.svg"
          ></img>
        </span>
        <span>Sign in with email</span>
        <span>Email</span>
      </button>
    </li>
  </ul>
</Route>;
