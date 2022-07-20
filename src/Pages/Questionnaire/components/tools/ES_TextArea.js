import React from "react";
import Color from "../../../../Feature/Config/color";

export const ESTextArea = (props) => {
  const {
    style,
    className,
    placeHolder,
    disabled,
    required,
    id,
    height,
    width,
    onChange,
    value,
    maxLength,
    pattern,
    myRef,
    background,
    fontStyle
  } = props;
  const defaultStyle = {
    width: width === undefined ? "100%" : width,
    fontSize: 14,
    height: height,
    boxShadow: "none",
    shapeOutline: "none",
    outline: "none",
    backgroundColor: background && background,
    fontStyle: fontStyle&& fontStyle,
    marginBottom: '2px',
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
    document.getElementById(
      id
    ).style.border = `2px solid ${Color.lightGrey}`;
  };

  return (
    <textarea
    title={value}
      ref={myRef}
      autoComplete="off"
      // spellCheck="false"
      id={id}
      disabled={disabled}
      required={required}
      onChange={onChange}
      style={{
        ...defaultStyle,
        ...userStyle,
      }}
      pattern={pattern?pattern:null}
      placeholder={placeHolder}
      className={`form-control form-rounded ${className}`}
      onFocus={__handleFocus}
      onBlur={__handleBlur}
      value={value}
      maxLength={maxLength}
    />
    
  );
};
