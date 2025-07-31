import React, { useEffect, useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { FaAngleRight, FaAngleLeft } from "react-icons/fa6";
import { Link } from "react-router";

const BannerHome = () => {
  const bannerData = useSelector((state) => state.movieoData.bannerData);
  const imageURL = useSelector((state) => state.movieoData.imageURL);
  const [currentImage, setCurrentImage] = useState(0);

  const handleNext = useCallback(() => {
    if (currentImage < bannerData.length - 1) {
      setCurrentImage((prev) => prev + 1);
    }
  }, [currentImage, bannerData.length]);

  const handlePrevious = useCallback(() => {
    if (currentImage > 0) {
      setCurrentImage((prev) => prev - 1);
    }
  }, [currentImage]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (currentImage < bannerData.length - 1) {
        handleNext();
      } else {
        setCurrentImage(0);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [bannerData.length, currentImage, handleNext]);

  return (
    <section className="w-full h-full">
      <div className="flex min-h-full max-h-full overflow-hidden">
        {bannerData.map((data, index) => (
          <div
            key={data.id + "bannerHome" + index}
            className="min-w-full min-h-full lg:min-h-full overflow-hidden relative group transition-all"
            style={{ transform: `translateX(-${currentImage * 100}%)` }}
          >
            <div className="w-full h-full">
              <img
                src={imageURL + data.backdrop_path}
                className=" z-[-1] h-screen w-screen object-cover"
                alt={data.title || data.name}
              />
            </div>

            {/***button next and previous image */}
            <div className="absolute top-0 w-full h-full  group-hover:lg:flexabsolute hidden items-center justify-between px-4 group-hover:lg:flex">
              <button
                onClick={handlePrevious}
                className="bg-white p-1 rounded-full text-xl z-10 text-black hover:cursor-pointer"
              >
                <FaAngleLeft />
              </button>
              <button
                onClick={handleNext}
                className="bg-white p-1 rounded-full text-xl z-10 text-black hover:cursor-pointer"
              >
                <FaAngleRight />
              </button>
            </div>

            <div className="absolute top-0 w-full h-full bg-gradient-to-t from-neutral-900 to-transparent"></div>

            <div className="container mx-auto">
              <div className="w-full absolute bottom-0 max-w-md px-3">
                <h2 className="font-bold text-2xl lg:text-4xl text-white drop-shadow-2xl">
                  {data?.title || data?.name}
                </h2>
                <p className="text-ellipsis line-clamp-5 my-2">
                  {data.overview}
                </p>
                <div className="flex items-center gap-4">
                  <p>Rating: {Number(data.vote_average).toFixed(1)}+</p>
                  <span>|</span>
                  <p>View: {Number(data.popularity).toFixed(0)}</p>
                </div>
                <div className="flex items-center gap-4">
                  <Link
                    to={`/${data?.media_type}/${data.id}`}
                    className="bg-white px-4 py-2  text-black font-bold rounded mt-4 hover:bg-gradient-to-l from-red-700 to-orange-500 shadow-md transition-all hover:scale-105 hover:cursor-pointer"
                  >
                    Play Now
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default BannerHome;
