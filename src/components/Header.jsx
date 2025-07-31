"use client";

import { useEffect, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router"; // Corrected import
import { IoSearchOutline } from "react-icons/io5";
import { Film, Tv, User } from "lucide-react"; // Added icons
import { navigation } from "../constants/Navigation";

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Only set initial search input from URL if we're on the search page
  const isSearchPage = location.pathname === "/search";
  const searchParams = new URLSearchParams(location.search);
  const queryFromUrl = searchParams.get("q") || "";

  const [searchInput, setSearchInput] = useState(
    isSearchPage ? queryFromUrl : ""
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [debounceTimer, setDebounceTimer] = useState(null);

  // Update search input when URL changes, but only on search page
  useEffect(() => {
    if (isSearchPage) {
      setSearchInput(queryFromUrl);
    } else if (!isSearchPage && searchInput) {
      // Clear search input when navigating away from search page
      setSearchInput("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, queryFromUrl, isSearchPage]);

  // Add scroll effect for header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!searchInput.trim()) return;

    setIsSubmitting(true);
    navigate(`/search?q=${encodeURIComponent(searchInput.trim())}`);

    // Reset submission state after navigation
    setTimeout(() => setIsSubmitting(false), 100);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Clear any existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set a new timer for real-time search (300ms delay)
    if (value.trim()) {
      const timer = setTimeout(() => {
        navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      }, 300);
      setDebounceTimer(timer);
    } else if (isSearchPage) {
      // If input is cleared and we're on search page, navigate to home
      const timer = setTimeout(() => {
        navigate("/");
      }, 300);
      setDebounceTimer(timer);
    }
  };

  const handleClearSearch = () => {
    setSearchInput("");
    clearTimeout(debounceTimer);

    // Only navigate if we're on the search page and there was a query
    if (isSearchPage && queryFromUrl) {
      navigate("/");
    }
  };

  return (
    <header
      className={`fixed top-0 w-full h-16 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-neutral-900/90 backdrop-blur-md shadow-lg"
          : "bg-gradient-to-b from-neutral-900/90 to-transparent"
      }`}
    >
      <div className="container mx-auto h-full px-4 flex items-center justify-between ">
        {/* Logo and Brand */}
        <div className="flex items-center">
          <Link to="/" className="flex items-center gap-2">
            {/* Fallback logo using Film icon */}
            <div className="flex items-center justify-center h-9 w-9 bg-primary rounded-full text-white">
              <Film className="h-5 w-5" />
            </div>
            <span className="text-white font-bold text-xl hidden sm:block">
              Screen Vortex
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-6 ml-8">
          {navigation().map((nav) => (
            <NavLink
              key={nav.label}
              to={nav.href}
              className={({ isActive }) =>
                `transition font-medium hover:text-white flex items-center gap-1 ${
                  isActive
                    ? "text-white border-b-2 border-primary pb-1"
                    : "text-neutral-300"
                }`
              }
            >
              {nav.label === "Movies" ? (
                <Film className="h-4 w-4" />
              ) : (
                <Tv className="h-4 w-4" />
              )}
              {nav.label}
            </NavLink>
          ))}
        </nav>

        {/* Search and User */}
        <div className="flex items-center gap-4">
          {/* Search input for larger screens */}
          <form
            className="relative  items-center hidden md:block"
            onSubmit={handleSubmit}
          >
            <input
              type="text"
              placeholder="Search movies, TV shows..."
              className="bg-neutral-800/50 text-white rounded-full px-4 py-2 pr-10 w-[200px] lg:w-[250px] focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              onChange={handleInputChange}
              value={searchInput}
            />
            {searchInput && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-12 text-neutral-400 hover:text-white"
              >
                ×
              </button>
            )}
            <button
              type="submit"
              className="text-white p-2 rounded-full hover:bg-neutral-700/50 transition-colors absolute right-1"
              disabled={isSubmitting}
            >
              <IoSearchOutline className="h-5 w-5" />
            </button>
          </form>

          {/* Mobile search button */}
          <button
            className="md:hidden text-white p-2 rounded-full hover:bg-neutral-700/50 transition-colors"
            onClick={() => navigate("/search")}
          >
            <IoSearchOutline className="h-5 w-5 " />
          </button>

          {/* User profile */}
          <div className="h-9 w-9 rounded-full overflow-hidden bg-neutral-700 flex items-center justify-center text-white hover:bg-neutral-600 transition-colors cursor-pointer">
            <User className="h-5 w-5" />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
