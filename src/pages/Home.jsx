import BannerHome from "./BannerHome";
import { useSelector } from "react-redux";
import Scroll from "../components/Scroll";
import UseFetch from "./UseFetch";

function Home() {
  const trendingData =
    useSelector((state) => state.movieoData.bannerData) || [];
  const { data: nowplaying } = UseFetch("/movie/now_playing");
  const { data: TopRated } = UseFetch("/movie/top_rated");
  const { data: TopRatedShows } = UseFetch("/tv/popular");
  const { data: UpcomingMovies } = UseFetch("/movie/upcoming");
  return (
    <div>
      <BannerHome />
      <Scroll data={trendingData} heading="Trending Shows" trending={true} />
      <Scroll data={nowplaying} heading="Now Playing" media_type={"movie"} />
      <Scroll data={TopRated} heading="Top Rated Movies" media_type={"movie"} />
      <Scroll
        data={TopRatedShows}
        heading="Popular TV Shows"
        media_type={"tv"}
      />
      <Scroll
        data={UpcomingMovies}
        heading="Upcoming Shows..."
        media_type={"movie"}
      />
    </div>
  );
}

export default Home;
