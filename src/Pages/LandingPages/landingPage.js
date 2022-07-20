import React, { Fragment, useEffect, useState } from "react";
import { withCookies } from "react-cookie";
import color from "../../Feature/Config/color";
import font from "../../Feature/Config/font";
import CountrySelector from "../../Feature/Tools/countrySelectorNew";
import { checkTokenExist } from "../../helper/checkAccess";
import { readCookie, writeCookie } from "../../helper/cookieUser";
import { ESButton } from "../Questionnaire/components/tools/ES_Button";
import CountryData from "../../Feature/Config/countries.json";
import DescriptionPage from "./descriptionPage";
import "../../App.css";

const LandingPage = (props) => {
  const user = readCookie(props.cookies);
  //const countryId = user.country_id;
  const windowWidth = window.innerWidth;

  const [countryFocused, setCountryFocused] = useState("");
  const [selectedSite, setSelectedSite] = useState(0);
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    checkTokenExist(user, props.history, props.cookies);
  });

  const countryFilter = CountryData.filter(
    (v) =>
      v.code == "MU" ||
      v.code == "KG" ||
      v.code == "TZ" ||
      v.code == "TL" ||
      v.code == "MM"
  );
  const CountryList = countryFilter.map((v) => {
    return { label: v.name, value: v.code };
  });

  const _changeCountryHandler = (value) => {
    const cookieData = { ...user };
    cookieData.country_id = value.toUpperCase();
    writeCookie(props.cookies, cookieData);
    setSelectedCountry(value);
    props.history.push("/startPage");
  };

  return (
    // <div
    //   className="pt-4 px-5"
    //   style={{marginTop: windowWidth < 768 ? 135 : 70, minHeight: '78vh',background: 'repeating-linear-gradient(#D7DEFF, #D7DEFF 52%, #F3F3F3 48%, #F3F3F3 100%)'}}
    //   // style={{ marginTop: windowWidth < 600 ? 135 : 80, minHeight: "80vh" }}
    // >
    //   <span className="text-left">
    //     <h3 style={{ color: color.secondaryColor }}>
    //       {" "}
    //       Welcome to UNDP's Digital Readiness Assessment{" "}
    //     </h3>
    //     <p>
    //       Proin tortor, sapien aenean fusce accumsan scelerisque elit. Semper
    //       nibh ullamcorper leo amet vivamus. Blandit risus purus quam nunc non
    //       facibus nec vel auctor. Urna viverra congue in vitae tortor quam
    //       egesta. Ipsum pulvinar.
    //     </p>
    //   </span>
    <Fragment>
      <div
        className="d-flex flex-column flex-wrap justify-content-center align-items-center"
        style={{
          marginTop: windowWidth < 768 ? 135 : 70,
          minHeight: "78vh",
          background:
          'repeating-linear-gradient(#E7EFFD, #E7EFFD 52%, #fff 48%, #fff 100%)',
        }}
      >
        <div
          className={`${windowWidth < 1618 && "pl-5"} text-left`}
          style={{ position: "absolute", top: "15%" }}
        >
          <h3 style={{ color: '#0265b5'}}>
            Welcome to UNDP's Digital Readiness Assessment
          </h3>
          <div className="d-flex flex-row flex-wrap py-2">
            Proin tortor, sapien aenean fusce accumsan scelerisque elit. Semper
            nibh ullamcorper leo amet vivamus. Blandit risus purus quam nunc non
            facibus nec vel auctor. Urna viverra congue in vitae tortor quam
            egesta. Ipsum pulvinar.
          </div>
          <h6 className="mt-4" style={{ color: color.textColor }}>
            Please select a country to start
          </h6>
        </div>
        <CountrySelector
          id={"landing_country_selector"}
          CountryList={CountryList}
          // changeHandler={()=>_changeCountryHandler(selectedCountry)}
          selectedOption={selectedCountry}
          countryFocused={countryFocused}
          setCountryFocused={setCountryFocused}
        />
        <div className="mt-5 text-center">
          <ESButton
            onClick={() => _changeCountryHandler(countryFocused)}
            disabled={countryFocused === "" ? true : false}
            text="Continue"
            block={false}
          />
        </div>
      </div>
    </Fragment>
  );
  // return (
  //   <div className='d-flex flex-row flex-wrap justify-content-center align-items-center' style={{marginTop:  windowWidth < 600 ? 135 : 80, minHeight: '87vh' }}>
  //     <div className="col col-12 col-sm-12 col-lg-5 col-md-6 col-xl-4 py-2 ">
  //       <div
  //         className="container p-0 bg-white "
  //         style={{
  //           border: `1px solid #E5E5E5`,
  //           // position: 'relative',
  //           // top: windowWidth > 971 && '50%',
  //           // left: windowWidth > 971 && '50%',
  //           // transform: windowWidth > 971 && 'translate(-50%, -50%)',
  //           maxWidth: 450,
  //           borderRadius: 5,
  //         }}
  //       >
  //         <div
  //           className="p-4"
  //           style={{
  //             backgroundColor: color.primaryColor,
  //             borderTopLeftRadius: 5,
  //             borderTopRightRadius: 5,
  //           }}
  //         >
  //           <p
  //             className="text-left my-0 ml-2 text-white"
  //             style={{ fontSize: font.heading2 }}
  //           >
  //             Start
  //           </p>
  //         </div>
  //         <div className="pt-5 px-3 text-left">
  //           <CountrySelector
  //             id={'landing_country_selector'}
  //             name={'country'}
  //             placeholder={'Select Country'}
  //             CountryList={CountryList}
  //             changeHandler={_changeCountryHandler}
  //             selectedOption={selectedCountry}
  //           />
  //         </div>
  //         <div className="col py-4 px-3" style={{ color: "#44546A" }}>
  //           <div className="d-flex flex-wrap flex-row justify-content-center">
  //             <div
  //               className="d-flex flex-col col-12 my-3 p-1"
  //               style={{ borderRadius: 6 }}
  //             >
  //               <ESButton
  //                 textBlack
  //                 style={{
  //                   textAlign: "left",
  //                   backgroundColor: (selectedSite === 0 && selectedCountry) ? color.primaryColor : "#F5F5F5",
  //                   color: (selectedSite === 0 && selectedCountry) ? color.white : color.black,
  //                   fontSize: windowWidth <= 462 ? font.body : font.large,
  //                   minHeight: 60,
  //                 }}
  //                 text={"Digital Maturity Assessment"}
  //                 disabled={selectedCountry ? false : true}
  //                 leftIcon={
  //                   <i
  //                     className="far fa-clipboard px-3 mr-1"
  //                     style={{
  //                       fontSize: 24,
  //                       color:  (selectedSite === 0 && selectedCountry) ? color.white : color.secondaryColor,
  //                     }}
  //                   ></i>
  //                 }
  //                 onClick={() => setSelectedSite(0)}
  //               />
  //             </div>
  //             <div
  //               className="d-flex flex-col col-12 my-4 p-1"
  //               style={{ borderRadius: 6 }}
  //             >
  //               <ESButton
  //                 textBlack
  //                 style={{
  //                   textAlign: "left",
  //                   backgroundColor: (selectedSite === 1 && selectedCountry) ? color.primaryColor : "#F5F5F5",
  //                   color: (selectedSite === 1 && selectedCountry) ? color.white : color.black,
  //                   fontSize: windowWidth <= 462 ? font.body : font.large,
  //                   minHeight: 60,
  //                 }}
  //                 text={"SDG Mapping Survey"}
  //                 disabled={selectedCountry ? false : true}
  //                 leftIcon={
  //                   <i
  //                     className="far fa-map pl-3 mr-1"
  //                     style={{
  //                       fontSize: font.heading2,
  //                       paddingRight: 14,
  //                       color:  (selectedSite === 1 && selectedCountry) ? color.white : color.secondaryColor,
  //                     }}
  //                   ></i>
  //                 }
  //                 onClick={() => setSelectedSite(1)}
  //               />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </div>
  //     <div
  //       className='col col-12 col-sm-12 col-md-10 col-lg-8 col-xl-8 py-2 '
  //       // style={{ height: windowWidth > 811 && (windowWidth < 400 ? '95vh' : '85vh'), }}
  //     >
  //       <DescriptionPage selectedSite={selectedSite} selectedCountry={selectedCountry} />
  //     </div>
  //   </div>
  // );
};

export default withCookies(LandingPage);
