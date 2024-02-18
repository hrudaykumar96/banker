import { Link } from "react-router-dom";
import { useFormik } from "formik";
import * as yup from "yup";
import ButtonLoader from "../effects/ButtonLoader";
import propTypes from "prop-types";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = ({ showalert }) => {
  const [data, setData] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { values, handleSubmit, handleBlur, handleChange, errors } = useFormik({
    initialValues: {
      name: "",
      email: "",
      mobile: "",
      dob: "",
      gender: "",
      address: "",
      password: "",
      confirm_password: "",
    },
    validationSchema: yup.object({
      name: yup
        .string()
        .min(4, "name should be atleast 4 characters")
        .required("enter your name"),
      email: yup
        .string()
        .email("enter valid email")
        .required("enter your email"),
      mobile: yup
        .string()
        .length(10, "enter valid mobile number")
        .required("enter your mobile number"),
      dob: yup.string().required("please select your date of birth"),
      gender: yup.string().required("Please select gender"),
      address: yup
        .string()
        .min(5, "enter your full address")
        .required("enter your address"),
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
        .post("http://localhost:5000/users/createuser", values)
        .then((res) => setData(res))
        .catch(() => document.write("<h3>Please try again later</h3>"));
      action.resetForm();
      setLoading(false);
    },
  });
  useEffect(() => {
    if (data.data === "success") {
      navigate("/");
      showalert("user registered successfully", "success");
    } else if (data.data === "email already registered") {
      navigate("/signup");
      showalert("email already registered", "warning");
    } else if (data.data === "mobile number already registered") {
      navigate("/signup");
      showalert("mobile number already registered", "warning");
    } else {
      navigate("/signup");
    }
  }, [data]);
  return (
    <div className="signup">
      <form className="signup-form row container" onSubmit={handleSubmit}>
        <h3 className="text-center">signup here</h3>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">
            name
          </label>
          <span className="text-danger">*</span>
          <input
            type="text"
            className="form-control"
            placeholder="enter your name"
            name="name"
            value={values.name}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.name && { border: "2px solid red" }}
          />
          {errors.name && <small className="text-danger">{errors.name}</small>}
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <span className="text-danger">*</span>
          <input
            type="email"
            className="form-control"
            placeholder="enter your email"
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
        <div className="mb-3 col-sm-6">
          <label htmlFor="mobile" className="form-label">
            mobile number
          </label>
          <span className="text-danger">*</span>
          <input
            type="number"
            className="form-control"
            placeholder="enter your mobile number"
            name="mobile"
            value={values.mobile}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.mobile && { border: "2px solid red" }}
          />
          {errors.mobile && (
            <small className="text-danger">{errors.mobile}</small>
          )}
        </div>
        <br />
        <div className="mb-3 col-sm-6">
          <label htmlFor="date" className="form-label">
            date of birth
          </label>
          <span className="text-danger">*</span>
          <input
            type="date"
            className="form-control"
            name="dob"
            value={values.dob}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.dob && { border: "2px solid red" }}
          />
          {errors.dob && <small className="text-danger">{errors.dob}</small>}
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="gender" className="form-label">
            gender
          </label>
          <span className="text-danger">*</span>
          <br />
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="male"
              style={errors.gender && { border: "2px solid red" }}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="male">
              male
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="female"
              style={errors.gender && { border: "2px solid red" }}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="female">
              female
            </label>
          </div>
          <div className="form-check form-check-inline">
            <input
              className="form-check-input"
              type="radio"
              name="gender"
              value="other"
              style={errors.gender && { border: "2px solid red" }}
              onBlur={handleBlur}
              onChange={handleChange}
            />
            <label className="form-check-label" htmlFor="other">
              other
            </label>
          </div>
          <br />
          {errors.gender && (
            <small className="text-danger">{errors.gender}</small>
          )}
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">
            address
          </label>
          <span className="text-danger">*</span>
          <textarea
            cols="30"
            rows="10"
            className="form-control"
            placeholder="enter your address"
            name="address"
            value={values.address}
            onBlur={handleBlur}
            onChange={handleChange}
            style={errors.address && { border: "2px solid red" }}
          ></textarea>
          {errors.address && (
            <small className="text-danger">{errors.address}</small>
          )}
        </div>
        <div className="mb-3 col-sm-6">
          <label htmlFor="password" className="form-label">
            password
          </label>
          <span className="text-danger">*</span>
          <input
            type="password"
            className="form-control"
            placeholder="enter your password"
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
        <div className="mb-3 col-sm-6">
          <label htmlFor="cnfpassword" className="form-label">
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
                value="create account"
              />
              <Link to="/">Login here</Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
Signup.propTypes = {
  showalert: propTypes.func,
};
export default Signup;