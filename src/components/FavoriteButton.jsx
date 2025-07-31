"use client";

import { useState, useEffect } from "react";
import { Heart } from "lucide-react";
import { useAuth } from "../context/useAuth";
import {
  addToFavorites,
  removeFromFavorites,
  checkIfFavorite,
} from "../services/favorites";
import { useNavigate } from "react-router";

/**
 * Favorite button component
 * @param {Object} props
 * @param {number} props.movieId - Movie ID
 * @param {string} props.title - Movie title
 * @param {string} props.posterPath - Movie poster path
 * @param {string} props.className - Additional CSS classes
 */
export default function FavoriteButton({
  movieId,
  title,
  posterPath,
  className = "",
}) {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if movie is in favorites when component mounts or user changes
    const checkFavoriteStatus = async () => {
      if (user) {
        setIsLoading(true);
        const isInFavorites = await checkIfFavorite(user.uid, movieId);
        setIsFavorite(isInFavorites);
        setIsLoading(false);
      } else {
        setIsFavorite(false);
      }
    };

    checkFavoriteStatus();
  }, [user, movieId]);

  const handleToggleFavorite = async (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (!user) {
      // Redirect to login if not authenticated
      navigate("/login");
      return;
    }

    setIsLoading(true);

    try {
      if (isFavorite) {
        await removeFromFavorites(user.uid, movieId);
        setIsFavorite(false);
      } else {
        await addToFavorites(user.uid, {
          id: movieId,
          title,
          poster_path: posterPath,
        });
        setIsFavorite(true);
      }
    } catch (error) {
      console.error("Error toggling favorite:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isLoading}
      className={`flex items-center justify-center rounded-full p-2 transition-all ${
        isFavorite
          ? "bg-primary text-white"
          : "bg-neutral-800/80 text-white hover:bg-neutral-700"
      } ${className}`}
      aria-label={isFavorite ? "Remove from favorites" : "Add to favorites"}
    >
      <Heart className={`h-5 w-5 ${isFavorite ? "fill-current" : ""}`} />
    </button>
  );
}
