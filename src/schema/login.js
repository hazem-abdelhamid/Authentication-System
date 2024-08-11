import * as yup from "yup";

export const loginSchema = yup.object().shape({
  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username can only contain letters and numbers. No spaces, special characters, or underscores are allowed."
    ),
  password: yup.string().required(),
});
