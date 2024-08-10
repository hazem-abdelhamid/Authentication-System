// This component designed to collect the data and send it to the backend
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, CircularProgress, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axiosInstance from "./axiosInstance";
import { registerSchema } from "./schema/register";
import { useNavigate } from "react-router-dom";
import AlertMesssage from "./components/AlertMessage";

const Register = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isRequestSuccessfull, setIsRequestSuccessfull] = useState(false);
  const [errorMessages, setErrorMessages] = useState({});

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(registerSchema),
  });

  const onSubmit = async (data) => {
    setIsLoading(true);
    setErrorMessages({});
    try {
      const formattedObject = {
        first_name: data.firstName,
        last_name: data.lastName,
        phone: data.phone,
        email: data.email,
        password: data.password,
        password_confirmation: data.confirmPassword,
        username: data.username,
      };
      await axiosInstance.post("/auth/register", formattedObject);
      setIsRequestSuccessfull(true);
      setTimeout(() => {
        navigate("/auth/login");
      }, 2000);
    } catch (error) {
      setErrorMessages(error.response.data.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-2 max-w-sm my-5 mx-auto text-center border-2 border-sky-500 rounded-lg px-6 shadow-2xl">
      <form onSubmit={handleSubmit(onSubmit)}>
        <h2 className="text-2xl my-6">Register Page</h2>
        <div className="flex flex-col space-y-5">
          <TextField
            label="First Name"
            variant="outlined"
            className="w-full py-1.5 px-2.5 my-3 border border-black block"
            {...register("firstName")}
            error={!!errors?.firstName?.message}
            helperText={errors?.firstName?.message}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            className="w-full py-1.5 px-2.5 my-1 border border-black block"
            type="text"
            {...register("lastName")}
            error={!!errors?.lastName?.message}
            helperText={errors?.lastName?.message}
          />

          <TextField
            label="Phone"
            variant="outlined"
            className="w-full py-1.5 px-2.5 my-1 border border-black block"
            type="number"
            {...register("phone")}
            error={!!errors?.phone?.message}
            helperText={errors?.phone?.message}
          />
          <TextField
            label="E-mail"
            variant="outlined"
            className="w-full py-1.5 px-2.5 my-1 border border-black block"
            name="email"
            {...register("email")}
            error={!!errors?.email?.message}
            helperText={errors.email?.message}
          />
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
          <TextField
            label="Password Confirmaion"
            variant="outlined"
            className="w-full py-1.5 px-2.5 my-1 border border-black block"
            type="password"
            {...register("confirmPassword")}
            error={!!errors?.confirmPassword?.message}
            helperText={errors?.confirmPassword?.message}
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
            Register
          </Button>

          {/* Success message */}
          {isRequestSuccessfull && (
            <AlertMesssage title="User was created successfully, redirecting to login page..." />
          )}

          {/* Show error message for each validation error */}
          {Object.keys(errorMessages).length > 0
            ? Object.values(errorMessages).map((value) => (
                <Typography key={value[0].en} color="red">
                  {value[0].en}
                </Typography>
              ))
            : null}
        </div>
      </form>
    </div>
  );
};

export default Register;
