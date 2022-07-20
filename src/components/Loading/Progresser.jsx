import React from "react";

//the component just for processing
const Progresser = () => {
  return (
    <div className="progress">
      <div
        className="progress-bar progress-bar-striped progress-bar-animated"
        role="progressbar"
        aria-valuenow="75"
        aria-valuemin="0"
        aria-valuemax="100"
        style={{ width: "75%" }}
      >
        Processing.....
      </div>
    </div>
  );
};

export default Progresser;
