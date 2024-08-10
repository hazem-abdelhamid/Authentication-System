import Login from "./Login";
import Register from "./Register";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
function App() {
  const [user, setUser] = useState("");
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Navigate to="/auth/register" />} />
          <Route path="/auth/register" element={<Register />} />
          <Route path="/auth/login" element={<Login setUser={setUser} />} />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <Profile user={user} />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
