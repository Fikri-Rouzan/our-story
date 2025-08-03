import Swal from "sweetalert2";

export default class LoginPresenter {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  init() {
    this.view.render();
    this.view.bindTogglePassword();
    this.view.bindSubmit(this.handleLogin.bind(this));
  }

  handleLogin(data) {
    this.model
      .login(data)
      .then((res) => {
        if (!res.error) {
          localStorage.setItem("token", res.loginResult.token);
          localStorage.setItem("name", res.loginResult.name);

          Swal.fire({
            toast: true,
            position: "top-right",
            icon: "success",
            title: "Sign In Successful!",
            text: `Welcome back, ${res.loginResult.name}!`,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            customClass: {
              container: "swal-container",
            },
          });

          location.hash = "/";
        } else {
          Swal.fire({
            icon: "error",
            title: "Sign In Failed",
            text: res.message,
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Please try again later",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      });
  }
}
