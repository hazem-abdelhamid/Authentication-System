import { Button, CircularProgress } from "@mui/material";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
import axiosInstance from "./axiosInstance";

const Profile = ({ user }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    const token = Cookies.get("authToken");
    if (!token) alert("No token found");
    try {
      await axiosInstance.post("/auth/logout", null, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      Cookies.remove("authToken");
      localStorage.removeItem("user");
      navigate("/auth/login");
    } catch {
      alert("Something went wrong");
    }
  };

  if (!user) {
    return <CircularProgress />;
  } else {
    return (
      <div className="h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center max-w-sm w-full">
          <h1 className="text-2xl font-bold mb-4">
            Welcome to your profile {user.firstName.toUpperCase()}{" "}
            {user.lastName.toUpperCase()}
          </h1>
          <Button onClick={handleLogout}>Logout</Button>
        </div>
      </div>
    );
  }
};
export default Profile;
