import { Slider, withStyles } from "@material-ui/core";
import React from "react";
import color from "../Config/color";

const ScrollSlider = (props) => {
  const { value, onChange } = props;
  return (
    <div
      className="mx-2"
      style={{ width: 2645, position: "absolute", top: 95 }}
    >
      <Slider
        value={value}
        aria-labelledby="discrete-slider-restrict"
        step={null}
        marks={marks}
        onChange={onChange}
        style={{ color: color.primaryColor }}
      />
    </div>
  );
};

const marks = [
  { value: 1.7 },
  { value: 6 },
  { value: 11.7 },
  { value: 17.8 },
  { value: 23.3 },
  { value: 28 },
  { value: 32.1 },
  { value: 37.4 },
  { value: 43.2 },
  { value: 48 },
  { value: 53.5 },
  { value: 59.5 },
  { value: 64.3 },
  { value: 68.5 },
  { value: 75 },
  { value: 82.5 },
  { value: 93.4 },
];

export default ScrollSlider;
