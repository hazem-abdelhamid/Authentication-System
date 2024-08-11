import Login from "./Login";
import Profile from "./Profile";
import ProtectedRoute from "./ProtectedRoute";
import Register from "./Register";

import { useEffect, useState } from "react";
import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    } else {
      setUser(null);
    }
  }, []);

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
