import React, { useState } from "react";
import Color from "../../../../Feature/Config/color";
import '../../../../App.css'

export const ESButton = (props) => {
  const {
    text,
    onClick,
    type,
    style,
    small,
    disabled,
    leftIcon,
    rightIcon,
    id,
    noShadow,
    customColor,
    dataToggle,
    dataTarget,
    dataDismiss,
    dataBackdrop,
    dataKeyboard,
    rounded,
    header,
    data,
    textBlack,
    fontSize,
    pressed,
    ministryIndex,
    block,
    outline,
    textColor
  } = props;

  const [isHover, setIsHover] = useState(true);
  const defaultStyle1 = {
    background: customColor || Color.primaryColor,
    borderRadius: rounded && "25px",
  };

  const hoverStyle = {
    ...defaultStyle1,
    background: customColor || Color.primaryColor,
    boxShadow: noShadow
      ? "none"
     
      : "0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)",
  };

  const defaultStyle = isHover || disabled ? defaultStyle1 : hoverStyle;

  const userStyle = style === undefined ? {} : style;

  return (
    <button
      data-dismiss={dataDismiss}
      disabled={disabled}
      data-target={dataTarget}
      data-toggle={dataToggle}
      data-backdrop={dataBackdrop} 
      data-keyboard={dataKeyboard}
      id={id}
      onClick={(id==='Register' || id==='Login')? onClick : (e) => onClick({ id: id, header: header, data: data})}
      type={type === undefined ? "button" : type}
      className={`btn ${outline && outline} ${block===false ? null: 'btn-block form-control'} ${pressed===false ? 'unpressed-btn' : pressed===true && 'pressed-btn'} ${textBlack ? '' : textColor? textColor: 'text-light' }  ${small ? "p-1" : ""}`}
      style={{
        ...defaultStyle,
        ...userStyle,
        outline: "none",
        fontSize: fontSize ? fontSize : '',
        transition: ".5s",
        cursor: disabled ? "not-allowed" : "pointer"
      }}
      onMouseOver={() => setIsHover(false)}
      onMouseLeave={() => setIsHover(true)}
    >
      {leftIcon ? leftIcon : null}
      {text}
      {rightIcon ? rightIcon : null}
    </button>
  );
};
