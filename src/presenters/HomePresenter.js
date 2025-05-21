export default class HomePresenter {
  constructor(view, router) {
    this.view = view;
    this.router = router;
  }

  init() {
    const name = localStorage.getItem("name") || "Guest";
    this.view.render(name);
  }
}
