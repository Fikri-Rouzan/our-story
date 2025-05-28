export default class NotFoundView {
  constructor(container) {
    this.container = container;
  }

  render() {
    this.container.innerHTML = `
      <main
        id="main-content"
        role="main"
        class="min-h-[calc(100vh-4rem-4rem)] pt-16 flex items-center justify-center bg-gray-100"
      >
        <div class="text-center p-12 bg-white rounded-xl shadow-xl w-lg mx-4">
          <i class="fas fa-exclamation-triangle text-7xl text-yellow-500 mb-6"></i>
          <h1 class="text-6xl font-extrabold text-gray-800 mb-6">404</h1>
          <p class="text-2xl text-gray-600 mb-8">
            Sorry, we can’t find the page you’re looking for
          </p>
          <a
            href="#/"
            class="inline-flex items-center px-6 py-3 bg-primary text-white font-semibold rounded-lg hover:bg-secondary transition"
          >
            <i class="fas fa-arrow-left mr-3"></i>
            Return to Homepage
          </a>
        </div>
      </main>
    `;
  }
}
