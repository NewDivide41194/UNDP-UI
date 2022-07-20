import React from "react";
import color from "../../../Feature/Config/color";

const ProgressBar = (props) => {
    const { percent,progress } = props;

  return (
      <div className="text-center">
            <div
      className="progress m-1"
      style={{ zIndex: 97, height: "7px", borderRadius: 10,background:color.greyColor}}
    >
      <div
        className="progress-bar"
        role="progressbar"
        aria-valuenow= "1"
        aria-valuemin="0"
        aria-valuemax="1"
        style={{
          width: `${progress}%`,
          background: color.SDG15,
          transition: "width .5s",
        }}
      ></div>
    </div>
    {percent}

      </div>
  
  );
};

export default ProgressBar;

// ${Math.floor(Math.random() * 100)}