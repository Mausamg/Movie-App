import { Outlet } from "react-router";
import "./App.css";
import Index from "./routing/Index.jsx";
import Header from "./components/Header";
import Footer from "./components/Footer";
import MobileNavigation from "./components/MobileNavigation";
import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBannerData, setImageURL } from "./store/movieoSlice.jsx";
import LoginForm from "./components/LoginForm.jsx";

function App() {
  const dispatch = useDispatch();
  const [error, setError] = useState(null);

  const fetchTrendingData = async () => {
    try {
      const response = await axios.get("/trending/all/week");
      dispatch(setBannerData(response.data.results));
      console.log("Trending data response:", response);
    } catch (error) {
      console.log("Error fetching trending data:", error);
      setError("Failed to fetch trending data.");
    }
  };

  const fetchConfig = async () => {
    try {
      const response = await axios.get("/configuration");
      dispatch(setImageURL(response.data.images.secure_base_url + "original"));
      console.log("Configuration response:", response);
    } catch (error) {
      console.log("Error fetching configuration:", error);
      setError("Failed to fetch configuration.");
    }
  };

  useEffect(() => {
    fetchTrendingData();
    fetchConfig();
  }, []);

  return (
    <main className="relative pb-14 lg:pb-0 flex flex-col min-h-screen ">
      {/* <LoginForm /> */}
      <Header />
      {error && <div className="error-message">{error}</div>}
      <div className="">
        <Outlet />
      </div>
      <Index />
      <Footer className="bottom-0" />
      <MobileNavigation />
    </main>
  );
}

export default App;
