import { Route, Routes } from "react-router";
import Home from "../pages/Home";
import Explorepage from "../pages/Explorepage";
import Detailpage from "../pages/Detailpage";
import Searchpage from "../pages/Searchpage";
import About from "../pages/About";
const Index = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path=":explore" element={<Explorepage />} />
        <Route path=":explore/:id" element={<Detailpage />} />
        <Route path="search" element={<Searchpage />} />
      </Routes>
    </div>
  );
};
export default Index;
