export default class HomeView {
  constructor(container) {
    this.container = container;
  }

  render(userName, stories = []) {
    this.container.innerHTML = `
      <div class="min-h-[calc(100vh-4rem)] p-4 overflow-auto">
        <h1 class="text-3xl mb-4">Selamat datang, ${userName}!</h1>
        <div id="map" class="w-full h-64 mb-6 rounded-lg shadow"></div>
        <div id="stories-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${stories
            .map(
              (s) => `
            <div data-id="${s.id}"
                 class="story-card bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition">
              <img
                src="${s.photoUrl}"
                alt="${s.description}"
                class="w-full h-40 object-cover"
              />
              <div class="p-4 space-y-1">
                <h2 class="font-semibold text-lg">${s.name}</h2>
                <p class="text-sm text-gray-700">${s.description}</p>
                <p class="text-xs text-gray-500">
                  ${new Date(s.createdAt).toLocaleDateString()} ${new Date(
                s.createdAt
              ).toLocaleTimeString()}
                </p>
              </div>
            </div>
          `
            )
            .join("")}
        </div>
      </div>`;
  }

  bindCardClicks(handler) {
    this.container
      .querySelector("#stories-grid")
      .addEventListener("click", (e) => {
        const card = e.target.closest(".story-card");
        if (!card) return;
        handler(card.dataset.id);
      });
  }
}
