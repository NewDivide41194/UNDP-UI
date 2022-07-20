import React, { Fragment, useState} from "react";
import Global from "../../../Feature/Images/TGG_Icon_Color_18.png";
import Principle from "../../../Feature/Images/PDD-UpdatedLogo-1.png";
import { ESButton } from "../../Questionnaire/components/tools/ES_Button";
import { ESInput } from "../../Questionnaire/components/tools/ES_Inputs";
import { ESDropDown } from "../../Questionnaire/components/tools/ES_DropDown";
import color from "../../../Feature/Config/color";
import "../../../App.css";
import Radio from "@material-ui/core/Radio";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import { withStyles } from "@material-ui/core/styles";
import { lightBlue } from "@material-ui/core/colors";
import CountrySelector from "../../../Feature/Tools/countrySelector";
import { withRouter } from "react-router";

const UserRegister = (props) => {
  const {
    handleSubmit,
    username,
    email,
    password,
    handlePwdChange,
    handleEmailChange,
    handleView,
    visible,
    err,
    isDisabled,
    errStyle,
    handleUserNameChange,
    ministryOption,
    responsibilityOption,
    countryOption,
    _handleSelectorSelect,
    selectedCountry,
    selectedMinistry,
    selectedResponsibility,
    accType,
    setAccType,
    // handleRegister,
  } = props;

  const WhiteRadio = withStyles({
    root: {
      color: "black",
      "&$checked": {
        color: "black",
      },
    },
    checked: {},
  })((props) => <Radio color="default" {...props} size="small" />);
  return (
    <div className="container">
      <div className="row justify-content-center">
        <form
          className="col-lg-5 col-md-8 col-sm-10 shadow bg-white p-4 text-secondary"
          style={{
           // position: "relative",
           //top: '50%',
           transform: "translateY(10%)",
            borderRadius: "8px",
            // backgroundImage: 'linear-gradient(to left bottom, rgba(255, 255, 255, 1) 0%,  rgba(227, 227, 227, 1) 100% ),linear-gradient(rgba(255, 255, 255, 1), rgba(0, 0, 0, 1))'
          }}
        >
          <h2>Create a new account</h2>
          {/* <div className="row justify-content-between my-4">
                        <img
                            src={Principle}
                            style={{
                                width: 180,
                                height: 42,
                                position: "absolute",
                                left: 25,
                                top: 22,
                            }}
                        />
                        <img
                            src={Global}
                            style={{
                                width: 75,
                                height: 75,
                                position: "absolute",
                                right: 25,
                                top: 0,
                            }}
                        />
                    </div> */}

          <div
            className="row justify-content-between py-3 px-4"
            style={{
              // backgroundImage: "linear-gradient(to right, #1A66B9 , #257DDE)",
              background: color.register1,
              margin: "30px -23px 0px -23px",
            }}
          >
            <div className="font-weight-bold mr-2" style={{ marginTop: 7 }}>
              Select Account Type:{" "}
            </div>
            <div className="d-flex flex-nowrap col p-0 justify-content-around">
              <FormControlLabel
                size="small"
                value="1"
                className="m-0"
                control={
                  <WhiteRadio
                    onChange={() => setAccType(1)}
                    checked={accType === 1 ? true : false}
                  />
                }
                label={
                  <span
                    style={{
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                    Government User
                  </span>
                }
              />
              <FormControlLabel
                size="small"
                value="2"
                className="m-0"
                control={
                  <WhiteRadio
                    onChange={() => setAccType(2)}
                    checked={accType === 2 ? true : false}
                  />
                }
                label={
                  <span
                    style={{
                      fontSize: "13px",
                      whiteSpace: "nowrap",
                      fontWeight: "bold",
                    }}
                  >
                    UNDP Staff
                  </span>
                }
              />
            </div>
          </div>
          <div className="text-left pt-3">
            <h6>Email Address</h6>
            {err.eMailErr === undefined ? null : (
              <div
                className="d-flex flex-row justify-content-end"
                style={{ ...errStyle }}
              >{`*${err.eMailErr}`}</div>
            )}
            <ESInput
              height={"55px"}
            //   style={{ paddingLeft: 30 }}
            //   inputIcon={"mt-2 fas fa-envelope"}
              disabled={isDisabled}
              required={true}
              id={"REmail"}
              className="infoPlaceholder"
              placeHolder={"mary@meliwi.net"}
              value={email}
              onChange={(e) => handleEmailChange(e)}
            />
            <div className="pt-3">
              <h6>User Name</h6>
              {err.userNameErr === undefined ? null : (
                <div
                  className="d-flex flex-row justify-content-end"
                  style={{ ...errStyle }}
                >{`*${err.userNameErr}`}</div>
              )}
              <ESInput
                height={"55px"}
                className="infoPlaceholder"
                // style={{ paddingLeft: 30 }}
                // inputIcon={"mt-2 fas fa-user"}
                disabled={isDisabled}
                required={true}
                id={"RUserName"}
                placeHolder={"mary"}
                value={username}
                onChange={(e) => handleUserNameChange(e)}
              />
            </div>
            <div className="pt-3">
              <h6>Password</h6>
              {err.passwordErr === undefined ? null : (
                <div
                  className="d-flex flex-row justify-content-end"
                  style={{ ...errStyle }}
                >{`*${err.passwordErr}`}</div>
              )}
              <ESInput
              className="infoPlaceholder"
                height={"55px"}
                    // style={{ paddingLeft: 30 }}
                    // inputIcon={"mt-2 fas fa-lock"}
                disabled={isDisabled}
                required={true}
                id={"Rpassword"}
                type={visible ? "text" : "password"}
                placeHolder={"password"}
                value={password}
                onChange={(e) => handlePwdChange(e)}
              />
              <span
                style={{
                  float: "right",
                  position: "relative",
                  marginTop: "-55px",
                  fontSize: "18px",
                  marginRight: "20px",
                  cursor: "pointer",
                }}
                onClick={handleView}
              >
                <i
                  className={`fa fa-eye${
                    visible ? "-slash" : ""
                  } `}
                  style={{ paddingTop: 18.5 }}
                />
              </span>
            </div>
          </div>
          <div className="form-group text-center m-0 ">
            {accType === 2 ? (
              <div className="pt-3 text-left pb-3">
                <h6 style={err.ministryErr && { color: "red" }}>
                  Based in which UNDP Office?
                </h6>
                <ESDropDown
                  name={"office"}
                  placeholder={"Type or Select an Option"}
                  options={ministryOption}
                  _handleSelect={_handleSelectorSelect}
                  selectedOption={selectedMinistry}
                  isRegister
                />
              </div>
            ) : (
              <Fragment>
                <div className="pb-3">
                  <div className="pt-3 text-left">
                    <h6 style={err.CountryErr && { color: "red" }}>
                      Please select your country
                    </h6>
                    {/* <ESDropDown
                                            name={'country'}
                                            placeholder={'Select Country'}
                                            options={countryOption}
                                            _handleSelect={_handleSelectorSelect}
                                            selectedOption={selectedCountry}
                                            isRegister
                                        /> */}
                    <CountrySelector
                      name={"country"}
                      placeholder={"Select Country"}
                      CountryList={countryOption}
                      changeHandler={_handleSelectorSelect}
                      selectedOption={selectedCountry}
                      isRegister
                    />
                  </div>
                  <div className="pt-3 text-left">
                    <h6 style={err.ministryErr && { color: "red" }}>
                      Please indicate the government Ministry that you represent
                    </h6>
                    <ESDropDown
                      name={"ministry"}
                      placeholder={"Type or Select an Option"}
                      options={ministryOption}
                      _handleSelect={_handleSelectorSelect}
                      selectedOption={selectedMinistry}
                      isRegister
                      className="infoPlaceholder"
                      // disabled={IsLoading ? true : false}
                    />
                  </div>
                  {selectedMinistry.label==="Others"?
                  <div className="pt-3 text-left">
                  <h6 style={err.responsibleSectorIdErr && { color: "red" }}>
                    If Others, please indicate your main area of
                    responsibilities
                  </h6>
                  <ESDropDown
                    name={"responsibility"}
                    placeholder={"Type or Select an Option"}
                    options={responsibilityOption}
                    _handleSelect={_handleSelectorSelect}
                    selectedOption={selectedResponsibility}
                    isRegister
                  />
                  </div>:null
                  }
                  
                  
                </div>
              </Fragment>
            )}

            {/* <hr
                            className="my-4"
                            style={{
                                // color: '#000',
                                backgroundColor: color.lightGrey,
                                height: "0.1px",
                                border: "none",
                            }}
                        /> */}

            <ESButton
              disabled={isDisabled}
              text={"Register"}
              type={"submit"}
              id={"Register"}
              style={{
                  background:color.secondaryColor
                // backgroundImage: "linear-gradient(to right, #1A66B9 , #257DDE)",
              }}
              onClick={handleSubmit}
              rightIcon={
                isDisabled ? (
                  <i className="fas fa-spinner fa-spin ml-2"></i>
                ) : (
                //   <i className="fa fa-sign-in-alt pl-2" />
                ""
                )
              }
            />
            <h6 className="pt-4">
              Have an account?{" "}
              <span
                style={{ color: color.secondaryColor, cursor: "pointer" }}
                onClick={() => props.history.push("/")}
              >
                Log in here
              </span>
            </h6>
            {/* <hr style={{
              color: '#dadde1',
              backgroundColor: '#dadde1',
              height: .5,
              borderColor: '#dadde1'
            }} /> */}
            {/* <div className="row justify-content-center pt-3"> */}

            {/* <ESButton
                text={"Create New Account"}
                id={"Create New Account"}
                customColor={'#089425'}
                onClick={() => handleRegister()}
                style={{}}
              /> */}
            {/* </div> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default withRouter(UserRegister);
