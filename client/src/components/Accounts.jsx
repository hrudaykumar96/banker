import { Outlet } from "react-router-dom";
import propTypes from "prop-types";
const Accounts = ({ data }) => {
  return (
    <div className="accounts">
      <table className="table table-striped text-center">
        <thead>
          <tr>
            <th>account number</th>
            <th>account holder name</th>
            <th>balance</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>{data.account_number}</td>
            <td>{data.name}</td>
            <td>
              <i className="fa-solid fa-indian-rupee-sign"></i> {data.balance}
            </td>
          </tr>
        </tbody>
      </table>
      <Outlet />
    </div>
  );
};
Accounts.propTypes = {
  data: propTypes.any,
};
export default Accounts;