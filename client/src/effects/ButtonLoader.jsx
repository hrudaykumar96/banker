const ButtonLoader = () => {
  return (
    <div>
      <button className="btn btn-primary" type="button" disabled>
        <span
          className="spinner-grow spinner-grow-sm"
          aria-hidden="true"
        ></span>
        <span role="status"> please wait... </span>
      </button>
    </div>
  );
};

export default ButtonLoader;