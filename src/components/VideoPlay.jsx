import React from "react";
import { IoClose } from "react-icons/io5";
import UseFetchDetail from "../hooks/UseFetchDetail";

const VideoPlay = ({ data, close, media_type }) => {
  const { data: videoData } = UseFetchDetail(
    `/${media_type}/${data?.id}/videos`
  );

  return (
    <section className="fixed inset-0 z-40 flex justify-center items-center bg-transparent">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-neutral-700 bg-opacity-50"></div>

      <div className="bg-black w-full lg:max-h-[80vh] max-w-screen-lg aspect-video rounded relative z-10">
        <button
          onClick={close}
          className="absolute -right-4 -top-5 text-3xl z-50 hover:cursor-pointer"
        >
          <IoClose />
        </button>

        <iframe
          src={`https://www.youtube.com/embed/${videoData?.results[0]?.key}`}
          className="w-full h-full"
          allowFullScreen
        />
      </div>
    </section>
  );
};

export default VideoPlay;
