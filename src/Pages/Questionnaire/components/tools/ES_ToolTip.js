import React from "react";
import ReactTooltip from "react-tooltip";
import Colors from "../../../../Feature/Config/color";

export const ESTooltip = (props) => {
  const { id, level, data, place, effect, bgColor,color } = props;

  const NewlineText = (text) => {
    return (
      <ul>
        {text.split("/n").map((str,k) => (
          <li key={k}>{str}</li>
        ))}
      </ul>
    );
  };

  return (
    <ReactTooltip
      id={id}
      place={place ? place : ""}
      effect={effect ? effect : ""}
      className="w-50 p-2 zindex-tooltip"
      arrowColor={"rgba(255,255,255,0)"}
      backgroundColor={bgColor || Colors.primaryColor}
      effect="float"
      multiline
    >
      <div
        className={`font-weight-bold ${level ? "border-bottom" : "null"} pb-1`}
      >
        {level ? level : null}
      </div>
      <span style={{color:color}}>
              {data ? NewlineText(data) : null}

      </span>
    </ReactTooltip>
  );
};
