import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { usersdata } from "../../redux/getdata";
import { useDispatch } from "react-redux";
import { useState } from "react";
import ButtonLoader from "../effects/ButtonLoader";
const DepositForm = ({ closedform, showalert }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const { values, errors, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      amount: "",
    },
    validationSchema: yup.object({
      amount: yup
        .number()
        .required("Enter Amount")
        .positive("Negative number not allowed")
        .min(1, "Amount should be greater than 0"),
    }),
    onSubmit: async (values, action) => {
      setLoading(true);
      await axios
        .put("http://localhost:5000/users/deposit", values)
        .catch(() => document.write("<h3>Please try again later</h3>"));
      action.resetForm();
      dispatch(usersdata());
      closedform();
      setLoading(false);
      showalert("money deposited successfully", "success");
    },
  });
  return (
    <div className="deposit">
      <form className="deposit-form" onSubmit={handleSubmit}>
        <h3 className="text-center">deposit form</h3>
        <div className="mb-3">
          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              id="floatingInput"
              placeholder="enter amount"
              name="amount"
              value={values.amount}
              onBlur={handleBlur}
              onChange={handleChange}
              style={errors.amount && { border: "2px solid red" }}
            />
            <label htmlFor="floatingInput">amount</label>
            {errors.amount && (
              <small className="text-danger">{errors.amount}</small>
            )}
          </div>
        </div>
        <div className="mb-3">
          {loading ? (
            <>
              <ButtonLoader />
            </>
          ) : (
            <>
              <input
                type="submit"
                value="deposit"
                className="btn btn-success"
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={closedform}
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
DepositForm.propTypes = {
  closedform: propTypes.func,
  showalert: propTypes.func,
};
export default DepositForm;