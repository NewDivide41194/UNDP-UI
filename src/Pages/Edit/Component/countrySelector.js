import React, { Component } from "react";
import Select, { components } from "react-select";
import countryList from "react-select-country-list";

export function CountryFlag(props) {

    return (
        // <span
        //     className={"flag-icon flag-icon-" + props.code}
        //     style={{ fontSize: props.size || "60px", display: 'inline-block' }}
        // >
        <span style={{ width: "40px", height: '40px', padding: 2 }}>
            <img src={process.env.PUBLIC_URL + `/countryflags/${props.code}.svg`}
            />
        </span>
    );
}

export const CountryFlagSelectOption = props => {

    return (
        <components.Option {...props}>
            <div style={{ display: "flex", alignItems: "center", fontSize: '18px', fontWeight: 'bold', padding: '3px' }}>
                <CountryFlag size={10} code={props.value.toLowerCase()} />
                {props.label}
            </div>
        </components.Option>
    );
};

export const CountryFlagValueContainer = ({ children, ...props }) => {
    const code = (props.hasValue && props.getValue()[0].value) || false;

    return (
        <div style={{ display: "flex", flexGrow: 1 }}>
            {(code && <CountryFlag code={code.toLowerCase()} />) || null}
            <components.ValueContainer {...props}>
                {children}
            </components.ValueContainer>
        </div>
    );
};

const styles = {
    valueContainer: (base, state) => {
        const height = "100%";
        return { ...base, height, };
    },
    control: (styles, { data, isSelected, isFocused }) => ({
        ...styles,
        backgroundColor: "#f3f3f3",
        border: 0,
        boxShadow: "none",
        fontSize: '25px'
    }),
    singleValue: (styles, { data }) => ({
        ...styles,
        fontWeight: "normal",
        color: "#000",
    }),
};

const CountrySelector = (props) => {
    const { CountryList, SelectedCountry, changeHandler } = props

    return (
        <Select
            styles={styles}
            options={CountryList}
            value={SelectedCountry}
            onChange={(e) => changeHandler(e)}
            components={{
                Option: CountryFlagSelectOption,
                ValueContainer: CountryFlagValueContainer
            }}
        />
    )
}
export default CountrySelector;

