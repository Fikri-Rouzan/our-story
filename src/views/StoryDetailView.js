export default class StoryDetailView {
  constructor(container) {
    this.container = container;
  }

  render(story) {
    this.container.innerHTML = `
      <div class="min-h-[calc(100vh-4rem)] p-4 overflow-auto">
        <button id="back-btn" class="mb-4 text-blue-600 hover:underline">
          ← Kembali
        </button>
        <div class="max-w-2xl mx-auto bg-white rounded-lg shadow overflow-hidden">
          <img
            src="${story.photoUrl}"
            alt="${story.description}"
            class="w-full h-64 object-cover"
          />
          <div class="p-6 space-y-4">
            <h2 class="text-2xl font-medium">${story.name}</h2>
            <p class="text-gray-500">
              ${new Date(story.createdAt).toLocaleString()}
            </p>
            <p>${story.description}</p>
          </div>
        </div>
        <div id="detail-map" class="max-w-2xl mx-auto mt-6 bg-white rounded-lg shadow overflow-hidden">
          <div class="w-full h-64" id="map-container"></div>
        </div>
      </div>`;
  }

  bindBack(handler) {
    this.container
      .querySelector("#back-btn")
      .addEventListener("click", handler);
  }

  showError(msg) {
    this.container.innerHTML = `
      <div class="min-h-[calc(100vh-4rem)] flex items-center justify-center p-4">
        <p class="text-red-500">${msg}</p>
      </div>`;
  }
}
