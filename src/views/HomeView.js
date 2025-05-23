export default class HomeView {
  constructor(container) {
    this.container = container;
  }

  render(userName, stories = []) {
    this.container.innerHTML = `
      <div class="min-h-[calc(100vh-4rem-4rem)] p-4 overflow-auto">
        <!-- Welcome -->
        <h1 class="text-3xl text-primary font-bold mb-6">Welcome, ${userName}!</h1>

        <!-- Map -->
        <div id="map" class="w-full h-80 mb-8 rounded-lg shadow"></div>

        <!-- Stories -->
        <div
          id="stories-grid"
          class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch"
        >
          ${stories
            .map((story) => {
              const date = new Date(story.createdAt);
              const formattedDate = date.toLocaleDateString();
              const formattedTime = date.toLocaleTimeString();

              return `
                <div
                  data-id="${story.id}"
                  class="story-card bg-white rounded-lg shadow cursor-pointer transform transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg flex flex-col h-full overflow-hidden"
                >
                  <!-- Story image -->
                  <img
                    src="${story.photoUrl}"
                    alt="Story photo by ${story.name}: ${story.description}"
                    class="w-full h-48 object-cover"
                  />

                  <!-- Story author -->
                  <div class="p-4 flex flex-col flex-1">
                    <div class="flex items-center space-x-2">
                      <i class="fas fa-user text-gray-600"></i>
                      <h2 class="font-semibold text-lg">${story.name}</h2>
                    </div>

                    <!-- Story date -->
                    <div class="flex items-center text-sm text-gray-500 mt-2">
                      <i class="fas fa-calendar-days mr-1"></i>
                      <span>${formattedDate} ${formattedTime}</span>
                    </div>

                    <!-- Story description -->
                    <p
                      class="text-sm text-gray-700 mt-3 mb-5 text-justify line-clamp-4"
                    >
                      ${story.description}
                    </p>

                    <!-- View Details -->
                    <a
                      href="#/story/${story.id}"
                      class="mt-auto self-start inline-flex items-center px-3 py-2 bg-primary text-white font-medium rounded hover:bg-secondary transition max-w-max"
                    >
                      View Details
                      <i class="fas fa-arrow-right ml-2"></i>
                    </a>
                  </div>
                </div>
              `;
            })
            .join("")}
        </div>
      </div>
    `;
  }

  bindCardClicks(handler) {
    const grid = this.container.querySelector("#stories-grid");
    if (!grid) return;

    grid.addEventListener("click", (event) => {
      const card = event.target.closest(".story-card");
      if (card) {
        handler(card.dataset.id);
      }
    });
  }
}
