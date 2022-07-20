import React from 'react';
import * as Color from '../config/Color.config';

export const ESTextfield =props=>{
    const {
        style,
        className,
        placeHolder,
        required,
        type,
        id,
        width,
        onChange,
        value,
        disabled,
      } = props;
    
      const defaultStyle = {
        width: width === undefined ? "100%" : width,
        padding: 20,
        fontSize: 14,
        maxHeight: "150px",
        boxShadow: "none",
        shapeOutline: "none",
        outline: "none",
        border: `2px solid ${Color.SecondaryColor}`,
        borderRadius: 5
      };
      const userStyle = style === undefined ? {} : style;
    
      const _handleFocus = () => {
        document.getElementById(
          id
        ).style.border = `2px solid ${Color.PrimaryColor}`;
      };
      const _handleBlur = () => {
        document.getElementById(id).style.border = `2px solid ${Color.SecondaryColor}`;
      };
    
      return (
        <textarea
        disabled={disabled} 
        id={id}
        required={required}
        onChange={onChange}
        style={{
            ...defaultStyle,
                ...userStyle
            }}
            placeholder={placeHolder}
            className={`form-control form-rounded ${className}`}
            onFocus={_handleFocus}
            onBlur={_handleBlur}
            type={type === undefined ? "text" : `${type}`}
            value={value}
        >
        </textarea>
      );
    };
    



