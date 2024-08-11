import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
// This component designed to collect the data and send it to the backend
import { yupResolver } from "@hookform/resolvers/yup";
import Cookies from "js-cookie";
import { useForm } from "react-hook-form";
import axiosInstance from "./axiosInstance";
import { loginSchema } from "./schema/login";

const Login = ({ setUser }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const formattedObject = {
        username: data.username,
        password: data.password,
      };
      const response = await axiosInstance.post("/auth/login", formattedObject);

      Cookies.set("authToken", response.data.data.accessToken, {
        expires: response.data.data.accessTokenExpiresIn,
      });
      const { user } = response.data.data;
      setUser(user);
      localStorage.setItem("user", JSON.stringify(user));
      navigate("/profile");
    } catch (error) {
      setErrorMessage(error.response.data.message.en);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="h-screen flex items-center justify-center">
      <div className="p-6 max-w-md w-full mx-auto text-center border-2 border-sky-500 rounded-lg shadow-2xl">
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2 className="text-2xl my-6">Login</h2>
          <div className="flex flex-col space-y-5">
            <TextField
              label="Username"
              variant="outlined"
              className="w-full py-1.5 px-2.5 my-1 border border-black block"
              type="text"
              {...register("username")}
              error={!!errors?.username?.message}
              helperText={errors?.username?.message}
            />
            <TextField
              label="Password"
              variant="outlined"
              className="w-full py-1.5 px-2.5 my-1 border border-black block"
              type="password"
              {...register("password")}
              error={!!errors?.password?.message}
              helperText={errors?.password?.message}
            />
            <Button variant="contained" type="submit" disabled={isLoading}>
              {isLoading ? (
                <CircularProgress
                  size="1rem"
                  color="inherit"
                  sx={{
                    marginRight: "0.3rem",
                  }}
                />
              ) : null}
              Login
            </Button>

            {!!errorMessage && (
              <Typography color="red">{errorMessage}</Typography>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
