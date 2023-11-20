import "./App.css";
import Home from "./pages/Home";
import Startmatch from "./pages/Startmatch";
import Showdetails from "./pages/Showdetails";
import { Router, Routes, Route, BrowserRouter } from "react-router-dom";
function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/start-match" element={<Startmatch />}></Route>
          <Route path="/" element={<Home />}></Route>
          <Route path="/show-details" element={<Showdetails />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
