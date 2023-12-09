import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
        <Route exact path="/mainpage" element={<MainPage />} />
        {/* Add other routes here */}
      </Routes>
    </Router>
  );
}

export default App;
