import { useEffect, useState } from "react";
import Pagination from "../effects/Pagination";
import propTypes from "prop-types";
import { useFormik } from "formik";
import * as yup from "yup";
const Transactions = ({ transactions }) => {
  const [transaction, setTransaction] = useState();
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredData, setFilteredData] = useState([]);
  useEffect(() => {
    if (transactions.transactions.length === 0) {
      setTransaction(false);
    } else {
      setTransaction(true);
    }
  }, [transactions.transactions]);
  useEffect(() => {
    if (startDate === null || endDate === null) {
      setFilteredData(transactions.transactions);
    } else {
      const fromdate = startDate.getTime();
      const todate = endDate.getTime();
      const filtered = transactions.transactions.filter((item) => {
        const itemDate = new Date(item.date);
        const transactiontime = itemDate.getTime();
        return transactiontime >= fromdate && transactiontime <= todate;
      });
      setFilteredData(filtered);
    }
  }, [startDate, endDate, transactions]);
  const [currentPage, setCurrentPage] = useState(1);
  const recordsperpage = 10;
  const lastindex = currentPage * recordsperpage;
  const firsindex = lastindex - recordsperpage;
  const records = filteredData.slice(firsindex, lastindex);
  const npage = Math.ceil(filteredData.length / recordsperpage);
  const numbers = [...Array(npage + 1).keys()].slice(1);
  const prepage = () => {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  const nextpage = () => {
    if (currentPage !== npage) {
      setCurrentPage(currentPage + 1);
    }
  };
  const changecurrentpage = (id) => {
    setCurrentPage(id);
  };
  const { values, errors, handleSubmit, handleChange, handleBlue } = useFormik({
    initialValues: {
      from: "",
      to: "",
    },
    validationSchema: yup.object({
      from: yup
        .date()
        .max(new Date(), "future dates not allowed")
        .required("select date range"),
      to: yup
        .date()
        .required("select date range")
        .max(new Date(), "future dates not allowed")
        .min(yup.ref("from"), "must be later than from date"),
    }),
    onSubmit: (values) => {
      setStartDate(new Date(values.from));
      setEndDate(new Date(values.to));
    },
  });
  return (
    <div className="transactions">
      <h3 className="text-center">transactions</h3>
      {transaction ? (
        <>
          <form className="transaction-form mb-3" onSubmit={handleSubmit}>
            <div className="mb-3 col">
              <label htmlFor="from" className="form-label">
                from
              </label>
              <input
                type="date"
                className="form-control"
                value={values.from}
                onChange={handleChange}
                onBlur={handleBlue}
                name="from"
                style={errors.from && { border: "2px solid red" }}
              />
              {errors.from && (
                <small className="text-danger">{errors.from}</small>
              )}
            </div>
            <div className="mb-3">
              <label htmlFor="to" className="form-label">
                to
              </label>
              <input
                type="date"
                className="form-control"
                value={values.to}
                onChange={handleChange}
                onBlur={handleBlue}
                name="to"
                style={errors.to && { border: "2px solid red" }}
              />
              {errors.to && <small className="text-danger">{errors.to}</small>}
            </div>
            <div className="mb-3">
              <br />
              <input type="submit" value="search" className="btn btn-success" />
            </div>
          </form>
          {filteredData.length === 0 ? (
            <>
              <p className="text-danger text-center">no transactions found</p>
            </>
          ) : (
            <>
              <table className="table table-striped text-center">
                <thead>
                  <tr>
                    <th>transaction date</th>
                    <th>transaction type</th>
                    <th>transaction amount</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map &&
                    records.map((data, index) => {
                      let date = new Date(data.createdAt);
                      return (
                        <tr key={index}>
                          <td>{date.toLocaleDateString()}</td>
                          <td>{data.transaction_type}</td>
                          <td>
                            <i className="fa-solid fa-indian-rupee-sign"></i>
                            {data.transaction_amount}
                          </td>
                        </tr>
                      );
                    })}
                </tbody>
              </table>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={window.print}
              >
                Print
              </button>
              <br />
              {filteredData.length > 10 ? (
                <>
                  <Pagination
                    numbers={numbers}
                    prepage={prepage}
                    nextpage={nextpage}
                    changecurrentpage={changecurrentpage}
                    currentPage={currentPage}
                  />
                </>
              ) : null}
            </>
          )}
        </>
      ) : (
        <>
          <p className="text-danger">No Transactions Found</p>
        </>
      )}
    </div>
  );
};
Transactions.propTypes = {
  transactions: propTypes.any,
};
export default Transactions;