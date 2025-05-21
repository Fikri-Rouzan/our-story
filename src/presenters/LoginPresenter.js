export default class LoginPresenter {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  init() {
    this.view.render();
    this.view.bindSubmit(this.handleLogin.bind(this));
  }

  handleLogin(data) {
    this.model
      .login(data)
      .then((res) => {
        if (!res.error) {
          localStorage.setItem("token", res.loginResult.token);
          localStorage.setItem("name", res.loginResult.name);
          location.hash = "/home";
        } else {
          this.view.showMessage(res.message);
        }
      })
      .catch(() => this.view.showMessage("Terjadi kesalahan jaringan."));
  }
}
