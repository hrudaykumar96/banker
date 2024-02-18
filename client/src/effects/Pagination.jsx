import propTypes from "prop-types";
import { Link } from "react-router-dom";
const Pagination = ({
  prepage,
  nextpage,
  changecurrentpage,
  currentPage,
  numbers,
}) => {
  return (
    <div className="pagination">
      <nav aria-label="...">
        <ul className="pagination">
          <li className="page-item">
            <Link className="page-link" onClick={prepage}>
              Previous
            </Link>
          </li>
          {numbers.map((n, i) => (
            <li
              className={`page-item ${currentPage === n ? "active" : ""}`}
              key={i}
            >
              <Link className="page-link" onClick={() => changecurrentpage(n)}>
                {n}
              </Link>
            </li>
          ))}
          <li className="page-item">
            <Link className="page-link" onClick={nextpage}>
              Next
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
Pagination.propTypes = {
  filteredData: propTypes.any,
  prepage: propTypes.func,
  nextpage: propTypes.func,
  changecurrentpage: propTypes.func,
  currentPage: propTypes.any,
  numbers: propTypes.any,
};
export default Pagination;