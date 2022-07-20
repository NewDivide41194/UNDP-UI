import React from "react";
import * as Colors from "../config/Color.config";
import { Link } from "react-router-dom";

export const EverCommLink = (props) => {
  const {
    style,
    className,
    text,
    fontSize,
    color,
    to,
    withTopBorder,
    bold,
    pathName,
  } = props;
  const defaultStyle = {
    color: color
      ? color
      : pathName === window.location.pathname
      ? Colors.MoonLight
      : "white",
    fontSize: `${fontSize === undefined ? "14px" : `${fontSize}`}`,
    fontWeight: `${bold === undefined ? "normal" : "bold"}`,
    textDecoration: "none",
    borderTop: `${
      withTopBorder === undefined ? "none" : `1px solid ${Colors.Gray}`
    }`,
  };
  const userStyle = style === undefined ? {} : style;
  return (
    <Link
      to={to}
      style={{ ...defaultStyle, ...userStyle }}
      className={className}
    >
      {text === undefined ? null : text}
    </Link>
  );
};

export const ESNavigator = (props) => {
  const { pathData } = props;
  return pathData.map((v, k) => (
    <EverCommLink
    key={k}
      pathName={v.pathName}
      to={v.linkTo}
      text={v.title + `${pathData.lastIndexOf(v)===0?" > ":""}`}
      color={Colors.Gray}
      fontSize={"16px"}
    />
  ));
};
