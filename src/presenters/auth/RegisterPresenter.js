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
            toast: true,
            position: "top-right",
            icon: "success",
            title: "Sign Up Successful!",
            text: "Your account has been created. Please sign in to continue",
            showConfirmButton: false,
            timer: 2500,
            timerProgressBar: true,
            customClass: {
              container: "swal-container",
            },
          });

          location.hash = "/login";
        } else {
          Swal.fire({
            icon: "error",
            title: "Sign Up Failed",
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
          text: "Please check your internet connection and try again",
          showConfirmButton: false,
          timer: 2500,
          timerProgressBar: true,
        });
      });
  }
}
