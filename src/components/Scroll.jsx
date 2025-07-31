"use client";
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Cards from "./Cards";

const Scroll = ({ data = [], heading, trending, media_type, onItemClick }) => {
  const containerRef = useRef();

  const handleNext = () => {
    containerRef.current.scrollLeft += 300;
  };

  const handlePrev = () => {
    containerRef.current.scrollLeft -= 300;
  };

  return (
    <div className="container mx-auto px-4 my-8">
      <h2 className="text-xl lg:text-2xl font-bold mb-4 text-white capitalize">
        {heading}
      </h2>
      <div className="relative">
        <div
          ref={containerRef}
          className="flex overflow-x-auto gap-4 pb-4 snap-x scrollbar-hide scroll-smooth"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {data?.map((item, idx) => (
            <div
              key={item.id + "heading" + idx}
              onClick={() => {
                console.log("Card clicked, id:", item.id);
                if (onItemClick) onItemClick(item.id);
              }}
              className="flex-none w-[180px] sm:w-[200px] md:w-[220px] cursor-pointer snap-start"
            >
              <Cards
                data={item}
                index={idx + 1}
                trending={trending}
                media_type={media_type}
              />
            </div>
          ))}
        </div>

        {/* Navigation buttons */}
        <div className="absolute top-0 hidden md:flex justify-between w-full h-full items-center pointer-events-none">
          <button
            onClick={handlePrev}
            className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full shadow-lg pointer-events-auto transition-all transform -translate-x-2 hover:scale-110"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-6 w-6 hover:cursor-pointer" />
          </button>
          <button
            onClick={handleNext}
            className="bg-black/70 hover:bg-black/90 text-white p-2 rounded-full shadow-lg pointer-events-auto transition-all transform translate-x-2 hover:scale-110"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-6 w-6 hover:cursor-pointer" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Scroll;
