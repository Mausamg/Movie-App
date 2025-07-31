"use client";

import axios from "axios";
import { useEffect, useState, useCallback, useRef } from "react";
import { useLocation, useNavigate } from "react-router";
import { IoSearchOutline } from "react-icons/io5";
import { X } from "lucide-react";
import Cards from "../components/Cards";

function Searchpage() {
  const location = useLocation();
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [page, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const previousSearchRef = useRef("");

  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("q") || "";

  // Update local search input when URL changes
  useEffect(() => {
    setSearchInput(searchQuery);
  }, [searchQuery]);

  const fetchData = useCallback(
    async (pageNumber = 1, reset = false) => {
      if (loading || !searchQuery) return;
      setLoading(true);

      try {
        console.log(
          `Fetching search results for: "${searchQuery}", page: ${pageNumber}`
        );
        const response = await axios.get(`/search/multi`, {
          params: {
            query: searchQuery,
            page: pageNumber,
          },
        });

        if (response.data && response.data.results) {
          setData((prev) =>
            reset ? response.data.results : [...prev, ...response.data.results]
          );
        } else {
          console.warn(
            "Search API returned unexpected data format:",
            response.data
          );
          if (reset) setData([]);
        }
      } catch (error) {
        console.error("Search error:", error);
        if (reset) setData([]);
      } finally {
        setLoading(false);
      }
    },
    [searchQuery, loading]
  );

  useEffect(() => {
    // Only reset page and fetch if search query has changed
    if (searchQuery !== previousSearchRef.current) {
      setPageNo(1);
      if (searchQuery) {
        fetchData(1, true);
      } else {
        setData([]);
      }
      previousSearchRef.current = searchQuery;
    }
  }, [searchQuery, fetchData]);

  useEffect(() => {
    if (page > 1) fetchData(page);
  }, [page, fetchData]);

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
      !loading &&
      data.length > 0
    ) {
      setPageNo((prev) => prev + 1);
    }
  }, [loading, data.length]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Handle card click
  const handleCardClick = (item) => {
    if (!item || !item.id || !item.media_type) {
      console.error("Invalid item data for navigation:", item);
      return;
    }

    console.log(`Navigating to /${item.media_type}/${item.id}`);
    navigate(`/${item.media_type}/${item.id}`);
  };

  // Handle mobile search input with debounce
  const [debounceTimer, setDebounceTimer] = useState(null);

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearchInput(value);

    // Clear any existing timer
    if (debounceTimer) {
      clearTimeout(debounceTimer);
    }

    // Set a new timer for real-time search (300ms delay)
    const timer = setTimeout(() => {
      if (value.trim()) {
        navigate(`/search?q=${encodeURIComponent(value.trim())}`);
      } else {
        navigate("/");
      }
    }, 300);
    setDebounceTimer(timer);
  };

  const handleClearSearch = () => {
    setSearchInput("");
    navigate("/");
  };

  return (
    <div className="pt-20 px-4">
      {/* Mobile and tablet search bar */}
      <div className="md:hidden mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search movies, TV shows..."
            value={searchInput}
            onChange={handleSearchChange}
            className="w-full bg-neutral-800 text-white rounded-full px-4 py-3 pr-12 focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          {searchInput ? (
            <button
              onClick={handleClearSearch}
              className="absolute right-12 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          ) : null}
          <div className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400">
            <IoSearchOutline className="h-5 w-5" />
          </div>
        </div>
      </div>

      <div className="container mx-auto">
        <h2 className="text-2xl font-bold mb-6 text-white">
          {searchQuery ? `Results for "${searchQuery}"` : "Popular Searches"}
        </h2>

        {/* Results grid */}
        {data.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 md:gap-6">
            {data.map((searchData) => (
              <div
                key={searchData.id + "search"}
                onClick={() => handleCardClick(searchData)}
                className="cursor-pointer transition-transform hover:scale-105"
              >
                <Cards data={searchData} media_type={searchData.media_type} />
              </div>
            ))}
          </div>
        ) : (
          !loading &&
          searchQuery && (
            <div className="text-center py-12 text-neutral-300">
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-semibold mb-2">No results found</h3>
              <p>Try different keywords or check spelling</p>
            </div>
          )
        )}

        {/* Loading indicator */}
        {loading && (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-primary"></div>
          </div>
        )}

        {/* No search query state */}
        {!searchQuery && !loading && data.length === 0 && (
          <div className="text-center py-12 text-neutral-300">
            <div className="text-5xl mb-4">🎬</div>
            <h3 className="text-xl font-semibold mb-2">
              Search for movies and TV shows
            </h3>
            <p>Enter keywords to find your favorite content</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default Searchpage;
