import * as yup from "yup";

// schema for yup validation
export const registerSchema = yup.object().shape({
  firstName: yup.string().required("First name is required"),
  lastName: yup.string().required("Last name is required"),
  username: yup
    .string()
    .required("Username is required")
    .matches(
      /^[a-zA-Z0-9]+$/,
      "Username can only contain letters and numbers. No spaces, special characters, or underscores are allowed."
    ),
  email: yup.string().email().required(),
  phone: yup
    .string()
    .required("Phone is required")
    .matches(
      /^01\d{9}$/,
      "Phone number must start with 01 and be 11 digits long."
    ),
  password: yup
    .string()
    .required()
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{6,}$/,
      "Password must be at least 6 characters long and contain at least one lowercase letter, one uppercase letter, and one special character."
    ),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
});
