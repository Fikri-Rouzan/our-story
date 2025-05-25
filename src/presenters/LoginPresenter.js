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
            icon: "success",
            title: "Sign In Successful!",
            text: `Welcome back, ${res.loginResult.name}!`,
            showConfirmButton: false,
            timer: 1500,
          }).then(() => {
            location.hash = "/";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Sign In Failed",
            text: res.message,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Please try again later",
        });
      });
  }
}
