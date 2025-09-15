import * as Yup from "yup";

export const contactSchema = Yup.object({
  name: Yup.string()
    .required("Enter your name")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
    .min(3)
    .max(30),
  email: Yup.string().email().required("Enter your email"),
  phone: Yup.string()
    .required("Enter your phone number")
    .matches(/^[6-9]\d{9}$/, "Invalid phone number")
    .min(10)
    .max(10),
  message: Yup.string().required("Enter your message").min(3).max(2000),
});

export const subscribeSchema = Yup.object({
  email: Yup.string().email().required("Enter your email"),
});

export const signupSchema = Yup.object({
  name: Yup.string()
    .required("Enter your name")
    .matches(/^[A-Za-z\s]+$/, "Only letters and spaces are allowed")
    .min(3)
    .max(20),
  email: Yup.string().email().required("Enter your email"),
  password: Yup.string()
    .required("Enter your password")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/,
      "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
    )
    .min(8)
    .max(20),
});

export const verifyOTPSchema = Yup.object({
  otp: Yup.string()
    .required("Enter your OTP")
    .matches(/^\d{6}$/, "OTP must be a 6-digit number")
    .min(6)
    .max(6),
});

export const loginSchema = Yup.object({
  email: Yup.string().email().required("Enter your email"),
  password: Yup.string().required("Enter your password").min(6).max(20),
});

export const saveEditAddressSchema = Yup.object({
  address_type: Yup.string().required("Enter your address type").min(2).max(20),
  street: Yup.string().required("Enter your street name").min(2).max(20),
  address: Yup.string().required("Enter your address").min(2).max(50),
  landmark: Yup.string().required("Enter your address").min(2).max(50),
  city: Yup.string().required("Enter your city name").min(2).max(20),
  state: Yup.string().required("Enter your state name").min(2).max(20),
  zipcode: Yup.string().required("Enter your zipcode").matches(/^[0-9]{6}$/, 'Pincode must be exactly 6 digits and contain only numbers').min(6),
});
