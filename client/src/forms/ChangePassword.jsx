import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useState } from "react";
import ButtonLoader from "../effects/ButtonLoader";
const ChangePassword = ({ closecngform, data, showalert }) => {
  const [loading, setLoading] = useState("");
  const { values, errors, handleSubmit, handleBlur, handleChange } = useFormik({
    initialValues: {
      email: `${data.email}`,
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
        .catch(() => document.write("<h3>Please try again later</h3>"));
      action.resetForm();
      setLoading(false);
      closecngform();
      showalert("password changed successfully", "success");
    },
  });
  return (
    <div className="cngpasswd">
      <form className="pwdcng-form" onSubmit={handleSubmit}>
        <h3 className="text-center">change password</h3>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            email
          </label>
          <span className="text-danger">*</span>
          <input
            type="email"
            className="form-control"
            placeholder="enter email"
            value={data.email}
            disabled
            name="email"
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
              <button
                className="btn btn-danger"
                type="button"
                onClick={closecngform}
              >
                Cancel
              </button>
            </>
          )}
        </div>
      </form>
    </div>
  );
};
ChangePassword.propTypes = {
  closecngform: propTypes.func,
  data: propTypes.any,
  showalert: propTypes.func,
};
export default ChangePassword;