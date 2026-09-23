import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import AddProblem from "./pages/AddProblem";
import Problems from "./pages/Problems.jsx";
import Progress from "./pages/Progress.jsx";
import AIRecommendations from "./pages/AIRecommendations.jsx";

function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route path="/" element={<Login />} />

        <Route path="/signup" element={<Signup />} />

        <Route path="/dashboard" element={<Dashboard />} />

        <Route path="/add-problem" element={<AddProblem />} />

        <Route path="/problems" element={<Problems />} />

        <Route path="/progress" element={<Progress />} />

        <Route
          path="/ai-recommendations"
          element={<AIRecommendations />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;