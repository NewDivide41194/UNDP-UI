import React from "react";
import Select, { components } from "react-select";
import '../../App.css'

export function CountryFlag(props) {
    console.log(props)
    return (
        // <span
        //     className={"flag-icon flag-icon-" + props.code}
        //     style={{ fontSize: props.size || "60px", display: 'inline-block' }}
        // > //style={{ width: "40px", height: '40px', padding: 4 }}>
        <span className='ml-2' style={props.isRegister ? { width: "50px", height: '50px', padding: 11, } : { width: "40px", height: '40px', padding: 2, marginRight: 5 }}>
            <img src={process.env.PUBLIC_URL + `/countryflags/${props.code}.svg`}
            />
        </span>
    );
}

export const CountryFlagSelectOption = props => {
    return (
        <components.Option {...props}>
            {/* console.log("props",props); */}
            <div style={{ display: "flex", textAlign: "left", fontSize: '16px', padding: '2px', }}>
                <CountryFlag size={10} code={props.value.toLowerCase()} />
                {props.label}
            </div>
        </components.Option>
    );
};

export const CountryFlagValueContainer = ({ children, ...props }) => {
    const code = (props.hasValue && props.getValue()[0].value) || false;
    const isRegister = props.selectProps.isRegister ? true : false;

    return (
        <div style={{ display: "flex", flexGrow: 1 }}>
            {(code && <CountryFlag code={code.toLowerCase()} isRegister={isRegister} />) || null}
            <components.ValueContainer {...props}>
                {children}
            </components.ValueContainer>
        </div>
    );
};

const styles = {
    valueContainer: (base) => {
        const height = "100%";
        return { ...base, height, };
    },
    control: (styles) => ({
        ...styles,
        backgroundColor: "#f3f3f3",
        border: 0,
        boxShadow: "none",
        fontSize: '25px',
        cursor: 'pointer'
    }),
    singleValue: (styles) => ({
        ...styles,
        fontWeight: "normal",
        color: "#000",
    }),
};

const customStyles = {
    control: provided => ({
        ...provided,
        height: 55,
        minHeight: 55,
        border: `2px solid #d3d3d3`,
        borderRadius: 5,
        cursor:"pointer"
    }),
    option: (provided, state) => ({
        ...provided,
        color: state.isSelected ? "white" : "black",
        fontWeight: state.isSelected && "bold",
        padding: 10,
    })
};

const CountrySelector = (props) => {
    const { CountryList, SelectedCountry, changeHandler, placeholder, isRegister, name, id } = props
    return (
        <Select
            id={id}
            classNamePrefix="react-select"
            placeholder={placeholder && placeholder}
            styles={isRegister ? customStyles : styles}
            options={CountryList}
            value={SelectedCountry}
            onChange={e => isRegister ? changeHandler({ e: e, name: name }) : changeHandler(e)}
            components={{
                Option: CountryFlagSelectOption,
                ValueContainer: CountryFlagValueContainer
            }}
            isClearable={isRegister && true}
            isRegister={isRegister ? true : false}
        />
    )
}
export default CountrySelector;