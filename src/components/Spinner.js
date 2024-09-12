import React from "react";
import "./Spinner.css";

const Spinner = ({ loading }) => {
  if (!loading) return null;
  return (
    <div className="spinner-container" data-testid="spinner">
      <div className="custom-spinner"></div>
    </div>
  );
};

export default Spinner;
