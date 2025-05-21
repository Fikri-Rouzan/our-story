export default class AddStoryPresenter {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  init() {
    this.view.render();
    this.view._initElements();
    this.view.bindUIActions();
    this.view.initMap();
    this.view.bindSubmit(this._handleSubmit.bind(this));
  }

  _handleSubmit({ description, photo, lat, lon }) {
    const token = localStorage.getItem("token");
    const payload = {
      description,
      photo,
      lat: lat || undefined,
      lon: lon || undefined,
    };
    const action = token
      ? this.model.addStory(payload, token)
      : this.model.addStoryGuest(payload);

    action
      .then((res) => {
        if (!res.error) {
          alert("Story berhasil ditambahkan.");
          location.hash = "/";
        } else {
          alert(res.message);
        }
      })
      .catch(() => alert("Terjadi kesalahan jaringan."));
  }
}
