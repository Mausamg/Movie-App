# Movie App 🎬

A responsive movie discovery app built with React and Vite. Browse trending films, search the catalog, and view rich movie details powered by the TMDB API — with smooth infinite scrolling and robust loading/error states.

Designed for clarity and performance, this project is a strong portfolio piece for frontend roles and freelance client demos.

---

## Key Features ✨

- Search movies by title with instant results
- Infinite scroll for continuous browsing
- Trending movies section on the home page
- Movie details view (page or modal) with synopsis, cast, and metadata
- Responsive design for desktop, tablet, and mobile
- API integration with clear loading indicators and error handling

## Tech Stack 🧰

- React (component-driven UI)
- Vite (fast development server and build)
- Tailwind CSS (utility-first styling)
- Axios (HTTP client)
- The Movie Database (TMDB) API

## Screenshots 📸

Home / Trending
![Home Screen](https://via.placeholder.com/1200x700.png?text=Home+%2F+Trending)

Search Results / Infinite Scroll
![Search Screen](https://via.placeholder.com/1200x700.png?text=Search+Results)

Movie Details (Modal / Page)
![Details Screen](https://via.placeholder.com/1200x700.png?text=Movie+Details)

> Replace the placeholder images above with real screenshots from your app before publishing the repo.

## Installation 🚀

1. Clone the repository

```bash
git clone <your-repo-url>
cd moviehere
```

2. Install dependencies

```bash
npm install
```

3. Add environment variables (see below), then run locally

```bash
# copy the example (Unix/macOS)
cp .env.example .env
# Windows (PowerShell)
copy .env.example .env

npm run dev
```

4. Build for production

```bash
npm run build
npm run preview
```

## Environment variables (.env example) 🔐

Create a `.env` file at the project root (Vite requires `VITE_` prefix for client-exposed vars):

```text
VITE_TMDB_API_KEY=your_tmdb_api_key_here
VITE_TMDB_BASE_URL=https://api.themoviedb.org/3
# Optional: image base URL or other keys
```

Obtain an API key from https://www.themoviedb.org and keep it private.

## Folder structure overview 📁

Top-level structure (important files/folders):

```
├─ public/
├─ src/
│  ├─ assets/
│  ├─ auth/
│  │  ├─ LoginForm.jsx
│  │  └─ RegisterForm.jsx
│  ├─ components/
│  │  ├─ Cards.jsx
│  │  ├─ Header.jsx
│  │  └─ VideoPlay.jsx
│  ├─ constants/
│  ├─ context/
│  ├─ hooks/
│  ├─ pages/
│  ├─ routing/
│  └─ services/
├─ index.html
├─ package.json
└─ README.md
```

Refer to `src/` for the app logic, `services/` for API integration, and `components/` for reusable UI pieces.

## Live Demo 🔗

A hosted demo will be available here:

[Live demo — placeholder link](https://your-live-demo.example.com)

Replace the above link with your deployed site (Netlify / Vercel / GitHub Pages).

## Future improvements 🚧

- Add user authentication and favorites persistence (localStorage or backend)
- Add server-side rendering (SSR) or prerendered pages for SEO
- Improve accessibility (a11y) and keyboard navigation for modals
- Add unit and integration tests (Jest + React Testing Library)
- Rate limiting and caching for API calls

## Contact / Hire

If you'd like to see custom features or a production-ready deployment, contact me — this project is easy to adapt for client demos and interviews.

---

Made with ❤️ — clean, performant frontend code ready for production.
