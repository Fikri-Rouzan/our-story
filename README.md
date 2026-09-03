# Our Story

## 📌 Description

A Progressive Web App (PWA) for sharing personal stories with interactive geolocation tagging and multimedia uploads. Built using the Model-View-Presenter (MVP) architecture, the platform features user authentication, dynamic story feeds, interactive maps via MapTiler/Leaflet, offline data caching, and Web Push notifications for real-time user engagement.

---

## 🛠️ Tech Stack

| Category                    | Technologies Used                                |
| :-------------------------- | :----------------------------------------------- |
| 🌐 **Programming Language** | `JavaScript`                                     |
| 📄 **Markup Language**      | `HTML`                                           |
| 🧩 **Framework**            | `Tailwind CSS`                                   |
| ⚛️ **Libraries**            | `Leaflet`, `sweetalert2`, `IndexedDB`, `Workbox` |
| ⚡ **Tool**                 | `Vite`                                           |
| 🗺️ **Map Services**         | `OpenStreetMap`, `MapTiler`                      |
| 🚀 **Deployment**           | `Netlify`                                        |

---

## ⚙️ Setup Instructions

1. **Prerequisites**
   - Node.js 24 or higher.
   - Git installed on your system.
   - PNPM 10 installed on your system (Optional).
   - An active [MapTiler](https://www.maptiler.com) account and API key.

2. **MapTiler API Key Setup**
   - Visit the official [MapTiler website](https://www.maptiler.com).
   - Create a new account or log in to your existing account.
   - Once redirected to your dashboard, navigate to the **API Keys** menu and click **New Key**.
   - Enter a descriptive name for the key, then click **Save**.
   - Copy the generated API key to use during the environment configuration phase.

3. **Clone the Repository**

```bash
git clone https://github.com/Fikri-Rouzan/our-story.git
cd our-story
```

4. **Install Packages**

```bash
# Using npm
npm i

# Using pnpm
pnpm i
```

5. **Configure Environment Variable**

```bash
cp .env.example .env
```

- Open the `.env` file and configure the following variable

  ```env
  VITE_MAPTILER_API_KEY="YOUR_MAPTILER_API_KEY"
  ```

6. **Run the Program**

```bash
# Using npm
npm run dev

# Using pnpm
pnpm dev
```
