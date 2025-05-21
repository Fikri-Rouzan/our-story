export default class HomePresenter {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  init() {
    const name = localStorage.getItem("name") || "Guest";
    const token = localStorage.getItem("token");

    if (!token) {
      this.view.render(name, []);
    } else {
      this.model
        .getAllStories(token)
        .then((res) => {
          if (!res.error) {
            this.view.render(name, res.listStory);
            this._bindClicks();
          } else {
            this.view.render(name, []);
            alert(res.message);
          }
        })
        .catch(() => {
          this.view.render(name, []);
          alert("Terjadi kesalahan jaringan.");
        });
    }
  }

  _bindClicks() {
    this.view.bindCardClicks((id) => {
      location.hash = `/story/${id}`;
    });
  }
}
