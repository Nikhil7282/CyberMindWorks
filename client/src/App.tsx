import "./App.css";
import { Routes, Route } from "react-router-dom";
import AdminPage from "./Pages/AdminPage";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="App text-black">
      <Navbar />
      <Routes>
        <Route element={<AdminPage />} path="/" />
      </Routes>
    </div>
  );
}

export default App;
