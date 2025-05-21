export default class AddStoryView {
  constructor(container) {
    this.container = container;
  }

  get template() {
    return `
      <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <form id="form-add-story" class="w-full max-w-lg bg-white p-6 rounded-lg shadow">
          <h2 class="text-2xl mb-4 text-center">Add New Story</h2>
          <div class="mb-4">
            <label class="block mb-1">Description</label>
            <textarea id="description" required
              class="w-full border rounded px-3 py-2 focus:outline-none focus:ring" rows="3"></textarea>
          </div>
          <div class="mb-4">
            <label class="block mb-1">Photo</label>
            <input type="file" id="photo" accept="image/*" required
              class="w-full focus:outline-none"/>
          </div>
          <div class="mb-4 flex space-x-4">
            <div class="flex-1">
              <label class="block mb-1">Latitude (opsional)</label>
              <input type="number" step="any" id="lat"
                class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
            </div>
            <div class="flex-1">
              <label class="block mb-1">Longitude (opsional)</label>
              <input type="number" step="any" id="lon"
                class="w-full border rounded px-3 py-2 focus:outline-none focus:ring"/>
            </div>
          </div>
          <button type="submit"
            class="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition">
            Submit
          </button>
        </form>
      </div>`;
  }

  render() {
    this.container.innerHTML = this.template;
  }

  bindSubmit(handler) {
    const form = document.getElementById("form-add-story");
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      const description = form.querySelector("#description").value.trim();
      const photo = form.querySelector("#photo").files[0];
      const lat = form.querySelector("#lat").value;
      const lon = form.querySelector("#lon").value;
      handler({ description, photo, lat, lon });
    });
  }

  showMessage(msg) {
    alert(msg);
  }
}
