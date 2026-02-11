import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import axios from "axios";
import { Provider } from "react-redux";
import { store } from "./store/store.jsx";
import { AuthProvider } from "./context/authProvider.jsx";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers = {
  accept: "application/json",
  Authorization:
    "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkYjA1MmNkNGY3NjNjZjNmY2Q4YjAzMTM3ZjlhNWMxYSIsIm5iZiI6MTc0MTcwNjQ5NS4xMzQsInN1YiI6IjY3ZDA1NGZmNjY4OTJiYWQ2MjgxMzRlZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.TFBzQSsSmgr8hxE-arb_knSZnA_qg9Xv_RfMbvrqTCU",
};

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </Provider>,
);
