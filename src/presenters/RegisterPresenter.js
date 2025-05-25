import Swal from "sweetalert2";

export default class RegisterPresenter {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  init() {
    this.view.render();
    this.view.bindTogglePassword();
    this.view.bindSubmit(this.handleRegister.bind(this));
  }

  handleRegister(data) {
    this.model
      .register(data)
      .then((res) => {
        if (!res.error) {
          Swal.fire({
            icon: "success",
            title: "Sign Up Successful!",
            text: "Your account has been created. Please sign in to continue",
            confirmButtonText: "Sign In",
          }).then(() => {
            location.hash = "/login";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Sign Up Failed",
            text: res.message,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Please check your internet connection and try again",
        });
      });
  }
}
