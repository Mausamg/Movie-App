import React from "react";
import { useSelector } from "react-redux";
import moment from "moment";
import { Link } from "react-router";

function Cards({ data, trending, index, media_type }) {
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const mediaType = data.media_type ? data.media_type : media_type;
  const renderRating = (rating) => {
    if (!rating || rating === 0) {
      return "Not Rated"; // If rating is 0 or missing, show "Not Rated"
    }
    return " Rating : " + rating.toFixed(1) + "+"; // Show the rating rounded to 1 decimal place
  };
  return (
    <Link
      to={"/" + mediaType + "/" + data.id}
      className="w-full max-w-[225px] min-w-[225px] rounded h-80 overflow-hidden relative bg-neutral-700 ml-2 hover:scale-110 transition-all  flex justify-center items-center"
    >
      {data?.poster_path ? (
        <img src={imageURL + data?.poster_path} />
      ) : (
        <div className="bg-neutral-700 w-full flex justify-center items-center">
          NO Image Available
        </div>
      )}
      <div className="absolute top-0 ">
        {trending && (
          <div className="py-1 px-4  backdrop-blur-3xl bg-black/60 overflow-hidden  rounded-r-md text-white">
            #{index} Trending
          </div>
        )}
      </div>
      <div className="absolute bottom-0 h-14 backdrop-blur-3xl w-full bg-black/60 p-2">
        <h2 className=" text-ellipsis line-clamp-1 text-lg font-semibold">
          {data?.title || data?.name}
        </h2>
        <div className="text-sm text-neutral-400 flex justify-between items-center">
          <p>{moment(data.release_date).format("MMMM Do YYYY")}</p>
          <p className="bg-black px-1 text-xs text-white">
            {renderRating(data.vote_average)}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Cards;
