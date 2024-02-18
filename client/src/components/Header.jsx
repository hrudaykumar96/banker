import { Link } from "react-router-dom";
import propTypes from "prop-types";
import axios from "axios";
const Header = ({ opencngform, showalert, data }) => {
  const logoutBtn = async () => {
    await axios.get("http://localhost:5000/users/logout");
    showalert("user successfully logged out", "success");
  };
  return (
    <nav className="navbar navbar-expand-lg bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/home">
          <img src="/src/assets/logo.png" alt="" />
        </Link>
        <button
          className="navbar-toggler bg-light"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link className="nav-link text-light" to="/home/transactions">
                transactions
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link text-light" to="/home/transfer">
                fund transfer
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle text-light"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {data.name}
              </Link>
              <ul className="dropdown-menu">
                <li>
                  <Link className="dropdown-item" onClick={opencngform}>
                    change password
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" onClick={logoutBtn}>
                    logout
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};
Header.propTypes = {
  opencngform: propTypes.func,
  showalert: propTypes.func,
  data: propTypes.any,
};
export default Header;