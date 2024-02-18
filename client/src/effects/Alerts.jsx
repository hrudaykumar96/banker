import propTypes from "prop-types";
const Alerts = ({ alt, sts }) => {
  return (
    alt && (
      <div
        className={`alert alert-${sts} alert-dismissible fade show text-center`}
        role="alert"
      >
        <strong>{alt}</strong>
      </div>
    )
  );
};
Alerts.propTypes = {
  alt: propTypes.any,
  sts: propTypes.any,
};
export default Alerts;