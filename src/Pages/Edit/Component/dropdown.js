import React from "react";
import Select from "react-select";
import { components } from "react-select";
import chroma from "chroma-js";
import color from "../../../Feature/Config/color";
import CreatableSelect from 'react-select/creatable';

import one from "../../../Feature/Images/SDG Icons/1.png";
import two from "../../../Feature/Images/SDG Icons/2.png";
import three from "../../../Feature/Images/SDG Icons/3.png";
import four from "../../../Feature/Images/SDG Icons/4.png";
import five from "../../../Feature/Images/SDG Icons/5.png";
import six from "../../../Feature/Images/SDG Icons/6.png";
import seven from "../../../Feature/Images/SDG Icons/7.png";
import eight from "../../../Feature/Images/SDG Icons/8.png";
import nine from "../../../Feature/Images/SDG Icons/9.png";
import ten from "../../../Feature/Images/SDG Icons/10.png";
import eleven from "../../../Feature/Images/SDG Icons/11.png";
import twelve from "../../../Feature/Images/SDG Icons/12.png";
import thirteen from "../../../Feature/Images/SDG Icons/13.png";
import fourteen from "../../../Feature/Images/SDG Icons/14.png";
import fivtheen from "../../../Feature/Images/SDG Icons/15.png";
import sixteen from "../../../Feature/Images/SDG Icons/16.png";
import seventeen from "../../../Feature/Images/SDG Icons/17.png";

const UNDPDropdown = (props) => {
  const {
    options,
    handleSelect,
    selectedIndex,
    id,
    editedRecord,
    disabled,
    istbHeaderSelector,
    notClearable,
    name,
    isMulti,
    defaultValues,
    checkboxOption,
    projIndex,
    imageOption,
    alignOption,
    isCreateable
  } = props;

  const options_ = options.map((v) =>
    v.alignId
      ? {
        ...v,
        color: color["Align" + v.alignId],
      }
      : v.statusUpdateId
        ? {
          ...v,
          color: color["StauesUpdate" + v.statusUpdateId],
        }
        : v
  );
  const dot = (color = "#ccc") => ({
    alignItems: "center",
    display: "flex",

    ":before": {
      backgroundColor: color,
      borderRadius: 10,
      content: '" "',
      display: "block",
      marginRight: 8,
      marginTop: 3,
      height: 8,
      width: 8,
      textAlign: "right",
      padding: "5px",
    },
  });

  const customStyles1 = {
    control: (styles) => ({ ...styles, backgroundColor: "white" }),
    option: (styles, { data, isSelected, isFocused }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        color: isSelected ? "white" : "black",
        cursor: "pointer",
        fontWeight: isSelected && "bold",
        padding: 10,
        backgroundColor: isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : null,

      };
    },
    input: (styles) => ({ ...styles, ...dot() }),
    placeholder: (styles) => ({ ...styles, ...dot() }),
    singleValue: (styles, { data }) => ({
      ...styles,
      fontWeight: "bold",
      ...dot(data.color),
    }),
  };

  const customStyles2 = {
    valueContainer: (provided, state) => ({
      ...provided,
      // cursor:disabled?"no-drop":"pointer",

      opacity: disabled && 0.2,
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      overflow: "hidden",
      display: "initial",
      textAlign: "right",
    }),
    dropdownIndicator: (base) => ({
      ...base,
      color: "white",
    }),
    control: (styles, { data, isSelected, isFocused }) => ({
      ...styles,
      backgroundColor: "#006bb7",
      border: 0,
      boxShadow: "none",
      textAlign: "right",
      ":before": { content: '"View: Goal "' },
    }),
    option: (styles, { data, isSelected, isFocused }) => {
      const color = chroma(data.color);
      return {
        ...styles,
        color: isSelected ? "white" : "black",
        fontWeight: isSelected && "bold",
        padding: 10,
        backgroundColor: isSelected
          ? data.color
          : isFocused
            ? color.alpha(0.1).css()
            : null,
        textAlign: "left",
      };
    },
    input: (styles) => ({ ...styles }),
    placeholder: (styles) => ({ ...styles, color: "white" }),
    singleValue: (styles, { data }) => ({
      ...styles,
      fontWeight: "normal",
      // ...dot(data.color),
      color: "white",
    }),
  };
  // options_[selectedIndex ? selectedIndex : 0]

  const MultiSelectStyle = {
    option: (styles, {  isSelected, isFocused }) => {
      return {
        ...styles,
        color: isSelected ? "white" : "black",
        cursor: "pointer",
        fontWeight: isSelected && "bold",
        padding: 10,
        backgroundColor: isSelected
          ? 'rgba(0,107,183,0.5)'
          : isFocused
            ? color.lightGrey
            : null,

      };
    },
  }
  const CheckboxOption = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <div className='d-flex flex-row flex-nowrap align-items-center'>
          <input
            type="checkbox"
            checked={props.isSelected}
            onChange={() => null}
          />{" "}
          <label className='mt-2 ml-2'>{props.label}</label>
          </div>
        </components.Option>
      </div>
    );
  };

 const imageName = (sdgId) => {
    return sdgId === 1
        ? one
        : sdgId === 2
            ? two
            : sdgId === 3
                ? three
                : sdgId === 4
                    ? four
                    : sdgId === 5
                        ? five
                        : sdgId === 6
                            ? six
                            : sdgId === 7
                                ? seven
                                : sdgId === 8
                                    ? eight
                                    : sdgId === 9
                                        ? nine
                                        : sdgId === 10
                                            ? ten
                                            : sdgId === 11
                                                ? eleven
                                                : sdgId === 12
                                                    ? twelve
                                                    : sdgId === 13
                                                        ? thirteen
                                                        : sdgId === 14
                                                            ? fourteen
                                                            : sdgId === 15
                                                                ? fivtheen
                                                                : sdgId === 16
                                                                    ? sixteen
                                                                    : seventeen;
};

  const ImageOption = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <div className='d-flex flex-row flex-nowrap align-items-center'>
          <img
            src={imageName(props.data.sdgId)}
            height={"30"}
            width={"30"}
          />{" "}
          <label className='mt-2 ml-2'>{props.label}</label>
          </div>
        </components.Option>
      </div>
    );
  }

  const AlignOption = (props) => {
    return (
      <div>
        <components.Option {...props}>
          <div className='d-flex flex-row flex-nowrap align-items-center'>
          <div
            style={{ width : 10, height: 10, borderRadius: '50%', background: props.data.color}}
          />{" "}
          <label className='mt-2 ml-2'>{props.label}</label>
          </div>
        </components.Option>
      </div>
    );
  }

  return (
    (name === 'sector_selector' || isCreateable) ? 
    <CreatableSelect 
    // id={id}
    key={options_[selectedIndex]}
    // defaultValue={options_[selectedIndex]}
    name={name ? name : ''}
    isClearable={notClearable ? false : true}
    isDisabled={disabled}
    closeMenuOnSelect={checkboxOption ? false : true}
    classNamePrefix="react-select"
    hideSelectedOptions={checkboxOption && false}
    options={options_}
    onChange={(e) => handleSelect({ e: e, editedRecord: editedRecord, name: name, projIndex: projIndex })}
    className="Select-container"
    components={checkboxOption && {
      Option: CheckboxOption
    }}
    isMulti={isMulti ? true : false}
    value={isMulti ? defaultValues : options_[selectedIndex]}
    />
    :
    <Select
      id={id}
      key={options_[selectedIndex]}
      name={name ? name : ''}
      isClearable={notClearable ? false : true}
      isDisabled={disabled}
      closeMenuOnSelect={checkboxOption ? false : true}
      hideSelectedOptions={checkboxOption && false}
      //defaultValue={options_[selectedIndex]}
      styles={isMulti ? MultiSelectStyle : (istbHeaderSelector ? customStyles2 : customStyles1)}
      options={options_}
      value={isMulti ? defaultValues : options_[selectedIndex]}
      onChange={(e) => handleSelect({ e: e, editedRecord: editedRecord, name: name, projIndex: projIndex })}
      className="Select-container"
       classNamePrefix="react-select"
      isMulti={isMulti ? true : false}
      components={(checkboxOption || imageOption || alignOption) && {
        Option: checkboxOption ? CheckboxOption : imageOption ? ImageOption : AlignOption
      }}
    />
  );
};

export default UNDPDropdown;
