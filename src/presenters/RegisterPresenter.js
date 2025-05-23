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
            title: "Registration Successful!",
            text: "Please sign in to continue",
            confirmButtonText: "OK",
          }).then(() => {
            location.hash = "/login";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Registration Failed",
            text: res.message,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Network Error Occurred",
          text: "Check your internet connection and try again",
        });
      });
  }
}
