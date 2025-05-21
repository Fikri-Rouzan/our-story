export default class HomeView {
  constructor(container) {
    this.container = container;
  }

  render(userName, stories = []) {
    this.container.innerHTML = `
      <div class="min-h-[calc(100vh-4rem)] p-4 overflow-auto">
        <h1 class="text-3xl mb-6">Selamat datang, ${userName}!</h1>
        <div id="stories-grid" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          ${stories
            .map(
              (s) => `
            <div data-id="${s.id}"
                 class="story-card bg-white rounded-lg shadow overflow-hidden cursor-pointer hover:shadow-lg transition">
              <img
                src="${s.photoUrl}"
                alt="${s.description}"
                class="w-full h-48 object-cover"
              />
              <div class="p-4">
                <h2 class="font-medium text-lg mb-2">${s.name}</h2>
                <p class="text-sm text-gray-600 mb-4">${s.description}</p>
                <a href="#/story/${s.id}"
                   class="text-blue-600 hover:underline text-sm">
                  Lihat Detail →
                </a>
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
      .addEventListener("click", (event) => {
        const card = event.target.closest(".story-card");
        if (!card) return;
        const id = card.dataset.id;
        handler(id);
      });
  }
}
