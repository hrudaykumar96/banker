import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import propTypes from "prop-types";
import ButtonLoader from "../effects/ButtonLoader";
const PasswordReset = ({ showalert }) => {
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { values, errors, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      email: yup
        .string()
        .email("enter valid email")
        .required("enter your email"),
      password: yup
        .string()
        .required("enter your password")
        .min(5, "password should be atleast 5 characters")
        .max(12, "password should not exceeds greater than 12 characters"),
      confirm_password: yup
        .string()
        .required("enter confirm password")
        .oneOf(
          [yup.ref("password")],
          "password does not match with confirm password"
        ),
    }),
    onSubmit: async (values, action) => {
      setLoading(true);
      await axios
        .put("http://localhost:5000/users/update", values)
        .then((res) => setMessage(res.data))
        .catch(() => document.write("<h3>Please try again later</h3>"));
      action.resetForm();
      setLoading(false);
    },
  });
  useEffect(() => {
    if (message === "password changed") {
      navigate("/");
      showalert("password changed successfully", "success");
    } else if (message === "email not registered") {
      navigate("/signup");
      showalert("email not registered", "warning");
    } else {
      navigate("/reset");
    }
  }, [message]);
  return (
    <div className="pwdreset">
      <form className="reset-form" onSubmit={handleSubmit}>
        <h3 className="text-center">reset password</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <span className="text-danger">*</span>
          <input
            type="email"
            className="form-control"
            placeholder="enter email"
            name="email"
            value={values.email}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.email && { border: "2px solid red" }}
          />
          {errors.email && (
            <small className="text-danger">{errors.email}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <span className="text-danger">*</span>
          <input
            type="password"
            className="form-control"
            placeholder="enter password"
            name="password"
            value={values.password}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.password && { border: "2px solid red" }}
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="confirm password" className="form-label">
            confirm password
          </label>
          <span className="text-danger">*</span>
          <input
            type="password"
            className="form-control"
            placeholder="enter confirm password"
            name="confirm_password"
            value={values.confirm_password}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.confirm_password && { border: "2px solid red" }}
          />
          {errors.confirm_password && (
            <small className="text-danger">{errors.confirm_password}</small>
          )}
        </div>
        <div className="mb-3 button">
          {loading ? (
            <>
              <ButtonLoader />
            </>
          ) : (
            <>
              <input
                type="submit"
                className="btn btn-success"
                value="reset password"
              />
              <Link to="/">Login here</Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
PasswordReset.propTypes = {
  showalert: propTypes.func,
};
export default PasswordReset;