export default class AddStoryPresenter {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  init() {
    this.view.render();
    this.view.bindSubmit(this.handleSubmit.bind(this));
  }

  handleSubmit(data) {
    const token = localStorage.getItem("token");
    const action = token
      ? this.model.addStory(data, token)
      : this.model.addStoryGuest(data);

    action
      .then((res) => {
        if (!res.error) {
          this.view.showMessage("Story berhasil ditambahkan.");
          location.hash = "/";
        } else {
          this.view.showMessage(res.message);
        }
      })
      .catch(() => this.view.showMessage("Terjadi kesalahan jaringan."));
  }
}
