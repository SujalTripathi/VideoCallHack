import "./App.css";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Home from './pages/home';
import Authentication from "./pages/authentication";
import VideoMeetComponent from "./pages/VideoMeet";
import { AuthProvider } from "./contexts/AuthContext";

function App() {
  return (
    <div className="App">
      <Router>
        <AuthProvider>
          <Routes>
                    <Route path="/" element={<Home />} />
            <Route path="/auth" element={<Authentication />} />
            <Route path="/:meetingId" element={<VideoMeetComponent />} />
          </Routes>
        </AuthProvider>
      </Router>
    </div>
  );
}

export default App;
