import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import ButtonLoader from "../effects/ButtonLoader";
import { useEffect, useState } from "react";
import axios from "axios";
import propTypes from "prop-types";
const Login = ({ showalert }) => {
  const navigate = useNavigate();
  const pageredirect = () => {
    navigate("/signup");
  };
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const loginuser = async (values) => {
    setLoading(true);
    await axios
      .post("http://localhost:5000/users/loginuser", values, {
        withCredentials: true,
      })
      .then((res) => setData(res))
      .catch(() => document.write("<h3>Please try again later</h3>"));
    setLoading(false);
  };
  const { values, errors, handleSubmit, handleChange, handleBlur } = useFormik({
    initialValues: {
      email: "",
      password: "",
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
    }),
    onSubmit: (values, action) => {
      loginuser(values);
      action.resetForm();
    },
  });
  useEffect(() => {
    if (data.data === "not user") {
      navigate("/signup");
      showalert("email not registered", "warning");
    } else if (data.data === "incorrect password") {
      showalert("incorrect password", "danger");
    } else if (data.data === undefined) {
      navigate("/");
    } else {
      navigate("/home");
    }
  }, [data]);
  return (
    <div className="login">
      <form className="login-form" onSubmit={handleSubmit}>
        <h3 className="text-center">login here</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <span className="text-danger">*</span>
          <input
            type="email"
            className="form-control"
            placeholder="enter email"
            value={values.email}
            name="email"
            onChange={handleChange}
            onBlur={handleBlur}
            style={errors.email ? { border: "2px solid red" } : { border: "" }}
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
            value={values.password}
            name="password"
            onChange={handleChange}
            onBlur={handleBlur}
            style={
              errors.password ? { border: "2px solid red" } : { border: "" }
            }
          />
          {errors.password && (
            <small className="text-danger">{errors.password}</small>
          )}
        </div>
        {loading ? (
          <>
            <ButtonLoader />
          </>
        ) : (
          <>
            <div className="mb-3 button">
              <input type="submit" className="btn btn-primary" value="login" />
              <Link to="/reset">forgot password</Link>
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-success w-100"
                onClick={pageredirect}
              >
                create account
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
};
Login.propTypes = {
  showalert: propTypes.func,
};
export default Login;
