import React from "react";
import Select from "react-select";
import Color from "../../../../Feature/Config/color";
import CreatableSelect from 'react-select/creatable';

export const ESDropDown = (props) => {

  const {
    options,
    quesId,
    _handleSelect,
    selectedOption,
    disabled,
    notClearable,
    id,
    keys,
    subQuesId,
    isRegister,
    isSDG,
    name,
    placeholder,
    surveySelect
  } = props;

  const AnsSelected = 
    surveySelect && selectedOption.length > 0 ?
      options.filter(v => v.option_choice_id === selectedOption[0].optionChoiceId)
      :
      !isRegister && selectedOption &&
      selectedOption.map((v, k) => ({
        value: v.option_choice_id || v.value || selectedOption[0],
        label: v.option_choice_name || v.label || selectedOption[0],
      }));

  const customStyles = {
    control: provided => ({
      ...provided,
      height: isRegister ? 55 : surveySelect && 40,
      minHeight: isRegister ? 55 : surveySelect && 40,
      border: (isRegister || surveySelect) && `2px solid ${Color.lightGrey}`,
      borderRadius: (isRegister || surveySelect) && 5,
      cursor: "pointer"
    }),
    option: (provided, state) => ({
      ...provided,
      color: state.isSelected ? "white" : "black",
      fontWeight: state.isSelected && "bold",
      padding: 10,

    }),
    menuPortal: base => ({ ...base, zIndex: 9999 })
  };


  return (
    name === 'country' || name === 'responsibility' || name === 'ques_selector' ?
      <Select
        isClearable={notClearable ? false : true}
        placeholder={placeholder && placeholder}
        isDisabled={disabled}
        id={`${id ? id : quesId}`}
        styles={customStyles}
        // defaultValue={selectedOption}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            // primary25: 'hotpink',
            primary: Color.primaryColor,
            // zIndex:999
          },
        })}
        className="w-100"
        classNamePrefix="react-select"
        options={options}
        value={
          isRegister ? selectedOption : selectedOption && selectedOption.length === 0
            ? selectedOption
            : AnsSelected

        }
        onChange={(e) => isRegister ? _handleSelect({ e: e, name: name }) : _handleSelect({ quesId: quesId || id, sectionId: e ? e.value : null, e: e, keys: keys, subQuesId: subQuesId })}
        //value={selectedOption}

      />
      :
      <CreatableSelect
        menuPortalTarget={document.body} 
        styles={customStyles}
        placeholder={placeholder && placeholder}
        isClearable={notClearable ? false : true}
        theme={(theme) => ({
          ...theme,
          colors: {
            ...theme.colors,
            // primary25: 'hotpink',
            primary: Color.primaryColor,
            // zIndex:999
          },
        })}
        className="w-100"
        classNamePrefix="react-select"
        options={options}
        //onInputChange={(e)=>_handleInput({e:e , name: name})}
        onChange={(e) => isRegister  ? _handleSelect({ e: e, name: name })  : _handleSelect({ quesId: quesId || id, sectionId: e.value, e: e, keys: keys, subQuesId: subQuesId }) }
        value={selectedOption}
      />
  );
};
