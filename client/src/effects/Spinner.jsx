const Spinner = () => {
  return (
    <div className="spinner">
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
      <br />
      <h4 className="text-center">loading please wait...</h4>
    </div>
  );
};
export default Spinner;