export default class RegisterPresenter {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  init() {
    this.view.render();
    this.view.bindSubmit(this.handleRegister.bind(this));
  }

  handleRegister(data) {
    this.model
      .register(data)
      .then((res) => {
        if (!res.error) {
          this.view.showMessage("Register berhasil! Silakan login.");
          location.hash = "/login";
        } else {
          this.view.showMessage(res.message);
        }
      })
      .catch(() => this.view.showMessage("Terjadi kesalahan jaringan."));
  }
}
