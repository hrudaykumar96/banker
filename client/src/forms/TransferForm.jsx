import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";
import { useEffect, useState } from "react";
import { usersdata } from "../../redux/getdata";
import { useDispatch } from "react-redux";
import ButtonLoader from "../effects/ButtonLoader";
const TransferForm = ({ closetform, data, showalert }) => {
  const dispatch = useDispatch();
  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const transfermoney = async (values) => {
    try {
      setLoading(true);
      const response = await axios.put(
        "http://localhost:5000/users/transfer",
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
      account_number: "",
      amount: "",
    },
    validationSchema: yup.object({
      amount: yup
        .number()
        .required("Enter Amount")
        .positive("Negative number not allowed")
        .min(1, "Amount should be greater than 0"),
      account_number: yup
        .string()
        .length(10, "Enter valid account number")
        .required("Enter account number"),
    }),
    onSubmit: async (values, action) => {
      transfermoney(values);
      action.resetForm();
    },
  });
  useEffect(() => {
    if (message === "success") {
      showalert("money transferred successfully", "success");
      dispatch(usersdata());
    } else if (message === "insufficient funds") {
      showalert("insufficient funds", "warning");
      dispatch(usersdata());
    } else if (message === "invalid account number") {
      showalert("invalid account number", "danger");
      dispatch(usersdata());
    } else if (message === "cannot send to own account") {
      showalert("cannot send to own account", "warning");
      dispatch(usersdata());
    } else {
      showalert(null);
    }
  });
  return (
    <div className="transfer">
      <form className="transfer-form" onSubmit={handleSubmit}>
        <h3 className="text-center">money transfer</h3>
        <div className="mb-3">from {data.account_number} to</div>
        <div className="mb-3">
          <div className="form-floating">
            <input
              type="number"
              className="form-control"
              id="floatingInput"
              placeholder="enter account number"
              name="account_number"
              value={values.account_number}
              onBlur={handleBlur}
              onChange={handleChange}
              style={errors.account_number && { border: "2px solid red" }}
            />
            <label htmlFor="floatingInput">account number</label>
            {errors.account_number && (
              <small className="text-danger">{errors.account_number}</small>
            )}
          </div>
        </div>
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
                value="transfer money"
                className="btn btn-success"
              />
              <button
                type="button"
                className="btn btn-danger"
                onClick={closetform}
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
TransferForm.propTypes = {
  closetform: propTypes.func,
  data: propTypes.any,
  showalert: propTypes.func,
};
export default TransferForm;