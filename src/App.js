import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProfileScreen from "./components/ProfileScreen";
import CommentsDashboard from "./components/CommentsDashboard";


function App() {


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ProfileScreen />} />
        <Route path="/comments-dashboard" element={<CommentsDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
