"use client";
import { useParams, useNavigate } from "react-router"; // Same import in React Router 7
import UseFetchDetail from "../hooks/UseFetchDetail";
import { useSelector } from "react-redux";
import moment from "moment";
import Divider from "../components/Divider";
import Scroll from "../components/Scroll";
import UseFetch from "./UseFetch";
import { useState } from "react";
import VideoPlay from "../components/VideoPlay";

function Detailpage() {
  const params = useParams();
  const navigate = useNavigate(); // Works the same in React Router 7
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const { data, loading } = UseFetchDetail(`${params?.explore}/${params?.id}`);
  const { data: castData } = UseFetchDetail(
    `/${params?.explore}/${params?.id}/credits`
  );
  const { data: similarData } = UseFetch(
    `/${params?.explore}/${params?.id}/similar`
  );
  const hours = Math.floor(data?.runtime / 60);
  const minutes = data?.runtime % 60;

  const [playVideo, setPlayVideo] = useState(false);
  const [playVideoId, setPlayVideoId] = useState("");

  // Placeholder image for missing poster or backdrop
  const placeholderImage = "https://via.placeholder.com/300x450?text=No+Image";

  const handleSimilarShowClick = (id) => {
    // In React Router 7, navigate works the same way
    navigate(`/${params.explore}/${id}`);
  };
  const handlePlayVideo = (data) => {
    setPlayVideoId(data);
    setPlayVideo(true);
  };
  if (loading) {
    return <div className="text-white text-2xl py-20 ml-165">Loading...</div>;
  }

  return (
    <div>
      {/* Background Image */}
      <div className="w-full h-[350px] relative">
        <div className="w-full h-full hidden lg:block">
          <img
            src={
              data?.backdrop_path
                ? imageURL + data.backdrop_path
                : placeholderImage
            }
            alt={data?.title || data?.name || "Movie Backdrop"}
            className="h-full object-cover w-full"
          />
        </div>
        <div className="absolute bg-gradient-to-t from-neutral-900 to-transparent w-full h-full top-0"></div>
      </div>

      {/* Movie Details */}
      <div className="container mx-auto px-3 py-16 lg:py-2 flex flex-col lg:flex-row gap-4">
        {/* Movie Poster */}
        <div className="relative mx-auto -mt-98 w-fit lg:ml-1 lg:-mt-6 lg:mx-0">
          <img
            src={
              data?.poster_path ? imageURL + data.poster_path : placeholderImage
            }
            alt={data?.title || data?.name || "Movie Poster"}
            className="min-h-85 w-65 min-w-65 object-cover rounded-md"
          />
          <button
            onClick={() => handlePlayVideo(data)}
            className="mt-3 hover:cursor-pointer w-full py-2 px-4 text-center bg-white text-black rounded font-bold text-lg hover:bg-gradient-to-l from-red-500 to-orange-500 hover:scale-105 transition-all"
          >
            Play Now
          </button>
        </div>

        {/* Movie Info */}
        <div>
          <h2 className="text-4xl font-bold text-white">
            {data?.title || data?.name}
          </h2>
          {data?.tagline && (
            <p className="text-neutral-300 italic">- {data.tagline}</p>
          )}
          <Divider />
          <div className="flex items-center my-2 gap-4">
            <p className="text-lg text-neutral-200">
              Rating:{" "}
              {data?.vote_average
                ? Number(data.vote_average).toFixed(1) + "+"
                : "N/A"}
            </p>
            <span>|</span>
            <p className="text-lg text-neutral-200">
              Views: {data?.vote_count ? Number(data.vote_count) : "N/A"}
            </p>
            <span>|</span>
            <p className="text-lg text-neutral-200">
              Duration: {data?.runtime ? `${hours}h ${minutes}m` : "Unknown"}
            </p>
          </div>
          <Divider />
          <div>
            <h3 className="text-2xl font-bold text-white mb-1 mt-4">
              Overview
            </h3>
            <p className="text-neutral-300">{data?.overview}</p>
          </div>
          <Divider />
          <div className="flex items-center gap-4 my-4 text-center text-[17px] text-neutral-200">
            <p>Status: {data?.status}</p>
            <span>|</span>
            <p>
              Released Date:{" "}
              {data?.release_date
                ? moment(data.release_date).format("MMMM Do YYYY")
                : "Unknown"}
            </p>
            <span>|</span>
            <p>
              Revenue:{" "}
              {data?.revenue ? `$${data.revenue.toLocaleString()}` : "Unknown"}
            </p>
          </div>
          <Divider />

          {/* Director Below Status */}
          <div className="mt-4">
            <p>
              <span className="text-white">Director: </span>
              {castData?.crew?.find((person) => person.job === "Director")
                ?.name || "Unknown"}
            </p>
          </div>
          <Divider />
        </div>
      </div>
      <div className="container mx-auto">
        {castData?.cast?.some((star) => star?.profile_path) && (
          <h2 className="text-2xl font-bold my-3 ml-12">Star Cast:</h2>
        )}
        <div className="grid grid-cols-[repeat(auto-fit,96px)] gap-6 ml-10">
          {castData?.cast
            ?.filter((el) => el?.profile_path)
            .map((starCast, index) => {
              return (
                <div key={index}>
                  <div className="">
                    <img
                      src={
                        imageURL + starCast?.profile_path || "/placeholder.svg"
                      }
                      className="w-24 h-24 rounded-full object-cover"
                      alt={starCast?.name || "Star Cast"}
                      onError={(e) => {
                        e.target.src = placeholderImage;
                      }}
                    />
                  </div>
                  <p className="font-semibold text-neutral-300 text-center text-sm">
                    {starCast?.name}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
      <div>
        <Scroll
          data={similarData}
          heading={"Similar " + params?.explore + " Shows"}
          media_type={params?.explore}
          onItemClick={handleSimilarShowClick}
        />
      </div>
      {playVideo && (
        <VideoPlay
          data={playVideoId}
          close={() => setPlayVideo(false)}
          media_type={params?.explore}
        />
      )}
    </div>
  );
}

export default Detailpage;
