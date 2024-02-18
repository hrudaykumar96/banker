import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import { useEffect, useState } from "react";
import { usersdata } from "../../redux/getdata";
import { useDispatch } from "react-redux";
import ButtonLoader from "../effects/ButtonLoader";
import axios from "axios";
const WithdrawForm = ({ closewform, showalert }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const withdrawamount = async (values) => {
    try {
      setLoading(true);
      const response = await axios.put(
        "http://localhost:5000/users/withdraw",
        values
      );
      setMessage(response.data);
      setLoading(false);
    } catch (error) {
      document.write("<h3>Please try again later</h3>");
      document.close();
    }
  };
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
      withdrawamount(values);
      action.resetForm();
    },
  });
  useEffect(() => {
    if (message === "success") {
      showalert("money withdraw successfully", "success");
      dispatch(usersdata());
    } else if (message === "insufficient funds") {
      showalert("insufficient funds", "warning");
      dispatch(usersdata());
    } else {
      showalert(null);
    }
  });
  return (
    <div className="withdraw">
      <form className="withdraw-form" onSubmit={handleSubmit}>
        <h3 className="text-center">withdraw form</h3>
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
                value="withdraw"
                className="btn btn-success"
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={closewform}
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
WithdrawForm.propTypes = {
  closewform: propTypes.func,
  showalert: propTypes.func,
};
export default WithdrawForm;