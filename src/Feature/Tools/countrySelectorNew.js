import color from "../Config/color";

export function ModifiedFlag(props) {
  const { _handleClick, name, code, countryFocused } = props;
  const windowWidth = window.innerWidth;

  return (
    <div
      style={{
        cursor: "pointer",
        width: windowWidth<1360? "200px":"250px",
        height: windowWidth<1360? "190px":"200px",
        backgroundColor: color.white,
        borderRadius: 10,
        textAlign: "center",
        color: color.textColor,
        boxShadow: "1px 1px 10px gray",
        opacity: countryFocused === "" ? 1 : countryFocused === code ? 1 : 0.5,
      }}
      onClick={(e) => _handleClick(e, code)}
    >
      <img
        style={{
          height: windowWidth<1360? "150px": "168px",
          width: windowWidth<1360? "200px":"250px",
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
        src={`/countryflags/${code}.svg`}
      />
      <h6 className="pt-1">{name}</h6>
    </div>
  );
}

export const CountrySelectorNew = (props) => {
  const windowWidth = window.innerWidth;
  const { CountryList,countryFocused,setCountryFocused } = props;
  const _handleClick = (e, code) => {
    // console.log(code);
    setCountryFocused(code);
  };
  return (
   
      <div style={{paddingTop:windowWidth>=1110? "12rem" :"20rem"}} className="d-flex justify-content-around flex-wrap ">
        {CountryList.map((c) => {
          return (
            <div className="p-2">
            <ModifiedFlag
              _handleClick={_handleClick}
              size={10}
              code={c.value.toLowerCase()}
              name={c.label}
              countryFocused={countryFocused}
            />
            </div>
          );
        })}
      </div>
    
  );
};
export default CountrySelectorNew;
