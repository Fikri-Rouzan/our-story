import NotFoundView from "../views/NotFoundView.js";

export default class NotFoundPresenter {
  constructor(container) {
    this.view = new NotFoundView(container);
  }

  init() {
    this.view.render();
  }
}
