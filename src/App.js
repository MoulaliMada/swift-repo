import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileScreen from "./components/ProfileScreen";
import CommentsDashboard from "./components/CommentsDashboard";
import NotFound from "./components/NotFound";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileScreen />} />
        <Route path="/comments-dashboard" element={<CommentsDashboard />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
