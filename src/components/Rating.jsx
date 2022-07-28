import React from "react";
// import PropTypes from "prop-types";

const Rating = ({ value, text, color }) => {
  return (
    <div className="rating">
      <span>
        {[1, 2, 3, 4, 5].map((index) => (
          <i
            style={{ color }}
            key={index}
            className={
              value >= index
                ? "fa-solid fa-star"
                : value >= index - 0.5
                ? "fa-solid fa-star-half-stroke"
                : "fa-regular fa-star"
            }
          ></i>
        ))}
      </span>
      <span className="lead">{text && text}</span>
    </div>
  );
};

Rating.defaultProps = {
  color: "#FF9F29",
};

// Rating.propTypes = {
//   value: PropTypes.number.isRequired,
//   text: PropTypes.string.isRequired,
//   color: PropTypes.string,
// };

export default Rating;
