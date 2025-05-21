export default class HomeView {
  constructor(container) {
    this.container = container;
  }

  render(userName) {
    this.container.innerHTML = `
      <div class="min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center p-4">
        <h1 class="text-3xl mb-2">Selamat datang, ${userName}!</h1>
        <p class="text-center text-gray-600">Mulai eksplorasi cerita di aplikasi ini.</p>
      </div>`;
  }
}
