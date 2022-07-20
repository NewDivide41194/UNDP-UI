import React from "react";
import Color from "../../../../Feature/Config/color";
import "../../../../App.css";

export const ESInput = (props) => {
  const {
    style,
    className,
    placeHolder,
    disabled,
    required,
    type,
    id,
    height,
    width,
    onChange,
    value,
    maxLength,
    pattern,
    myRef,
    unit,
    onKeyDown,
    max,
    inputIcon,
  } = props;

  const defaultStyle = {
    width: width === undefined ? "100%" : width,
    padding: 18,
    fontSize: 14,
    height: `${height}`,
    boxShadow: "none",
    shapeOutline: "none",
    outline: "none",
    border: `2px solid ${Color.lightGrey}`,
    borderRadius: 5,
  };
  const userStyle = style === undefined ? {} : style;

  const __handleFocus = () => {
    document.getElementById(
      id
    ).style.border = `2px solid ${Color.primaryColor}`;
  };
  const __handleBlur = () => {
    document.getElementById(id).style.border = `2px solid ${Color.lightGrey}`;
  };

  return (
    <div className="d-flex flex-row px-0">
      {inputIcon && (
        <i
          className={`${inputIcon}`}
          style={{
            position: "absolute",
            padding: "10px",
            color: "#CDCDCD",
            fontSize: 19,
          }}
        ></i>
      )}
      <input
        ref={myRef}
        autocomplete="new-password"
        // spellCheck="false"
        id={id}
        disabled={disabled}
        required={required}
        onChange={(e)=>onChange(e)}
        style={{
          ...defaultStyle,
          ...userStyle,
        }}
        step='0.1'
        onBlur={__handleBlur}
        pattern={pattern ? pattern : null}
        placeholder={placeHolder}
        className={`form-control ${className}`}
        onFocus={__handleFocus}
        type={type === undefined ? "text" :  `${type}`}
        value={value}
        min={0}
        max={max}
        maxLength={maxLength}
        onKeyDown={onKeyDown}
      />

      {unit ? (
        <span
          style={{ float: "right", fontSize: 25 }}
          className="pl-2 text-secondary"
        >
          {unit}
        </span>
      ) : null}
    </div>
  );
};
