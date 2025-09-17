// src/pages/About.jsx

export default function About() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-550 text-gray-100 px-6 py-12">
      <div className="max-w-3xl text-center">
        <h1 className="text-4xl font-bold mb-6 text-red-500">
          🎬 About Screen Vortex
        </h1>
        <p className="text-lg leading-relaxed mb-6">
          Welcome to <span className="font-semibold">Screen Vortex</span>, your
          go-to space for discovering movies from across the world.
        </p>

        <ul className="text-left list-disc list-inside space-y-2 mb-6">
          <li>
            🔎 <span className="font-semibold">Explore movies</span> by genre,
            rating, and popularity.
          </li>
          <li>
            🎥 <span className="font-semibold">Watch trailers</span> and get a
            sneak peek before deciding what to watch.
          </li>
          <li>
            ⭐ <span className="font-semibold">Stay informed</span> with cast,
            crew, release dates, and reviews.
          </li>
          <li>
            📌 <span className="font-semibold">Build your watchlist</span> so
            you never lose track of what’s next.
          </li>
        </ul>

        <p className="text-lg leading-relaxed">
          At <span className="font-semibold">Screen Vortex</span>, we don’t
          stream movies. Instead, we provide all the details and insights you
          need to decide{" "}
          <span className="italic">what to watch, where to watch, and why</span>{" "}
          it’s worth your time.
        </p>

        <p className="mt-6 text-xl font-semibold text-red-400">
          ✨ Discover. Decide. Dive into stories.
        </p>
      </div>
    </div>
  );
}
