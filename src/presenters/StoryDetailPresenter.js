export default class StoryDetailPresenter {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  init({ id }) {
    const token = localStorage.getItem("token");
    this.model
      .getStoryById(id, token)
      .then((res) => {
        if (!res.error) {
          this.view.render(res.story);
          this.view.bindBack(() => {
            location.hash = "/";
          });
        } else {
          this.view.showError(res.message);
        }
      })
      .catch(() => this.view.showError("Terjadi kesalahan jaringan."));
  }
}
