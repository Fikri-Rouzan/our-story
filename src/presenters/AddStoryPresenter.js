import Swal from "sweetalert2";

export default class AddStoryPresenter {
  constructor(model, view, router) {
    this.model = model;
    this.view = view;
    this.router = router;
  }

  init() {
    this.view.render();
    this.view.bindBack(() => {
      location.hash = "/";
    });
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
          Swal.fire({
            icon: "success",
            title: "Story Added!",
            text: "Your story has been added",
            confirmButtonText: "OK",
          }).then(() => {
            location.hash = "/";
          });
        } else {
          Swal.fire({
            icon: "error",
            title: "Something Went Wrong",
            text: res.message,
          });
        }
      })
      .catch(() => {
        Swal.fire({
          icon: "error",
          title: "Network Error",
          text: "Please try again later",
        });
      });
  }
}
