import React from "react";
import Global from "../../../Feature/Images/TGG_Icon_Color_18.png";
import Principle from "../../../Feature/Images/PDD-UpdatedLogo-1.png";
import { ESButton } from "../../Questionnaire/components/tools/ES_Button";
import { ESInput } from "../../Questionnaire/components/tools/ES_Inputs";
import color from "../../../Feature/Config/color";

const UserLogin = (props) => {
  const {
    handleSubmit,
    email,
    password,
    handlePwdChange,
    handleEmailChange,
    handleView,
    visible,
    err,
    isDisabled,
    errStyle,
    handleRegister,
  } = props;
  return (
    <div className="container">
      <div className="row justify-content-center">
        <form
          className="col-lg-4 col-md-8 col-sm-10 shadow p-4 px-5 bg-white"
          style={{
            position: "absolute",
            top: "40%",
            transform: "translateY(30%)",
            borderRadius: "15px",
          }}
        >
          <h2>Log in to your account </h2>
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

          <div className="form-group text-center m-0 text-secondary">
            <div className="pt-4 text-left pb-4">
              <h6>Email Address</h6>
              <ESInput
                height={"55px"}
                style={err.eMailErr === undefined ? null : errStyle}
                // inputIcon={"mt-2 fas fa-envelope"}
                disabled={isDisabled}
                required={true}
                id={"Email"}
                className="infoPlaceholder"
                placeHolder={"email@domain.com"}
                value={email}
                onChange={(e) => handleEmailChange(e)}
              />
              {err.eMailErr === undefined ? null : (
                <div
                  // className="d-flex flex-row justify-content-end"
                  style={{ ...errStyle }}
                >{`${err.eMailErr}`}</div>
              )}
              <div className="pt-3">
                <h6>Password</h6>
                <ESInput
                  height={"55px"}
                  style={err.passwordErr === undefined ? null :errStyle}
                  // inputIcon={"mt-2 fas fa-lock"}
                  disabled={isDisabled}
                  required={true}
                  className="infoPlaceholder"
                  id={"password"}
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
                    } text-secondary`}
                    style={{ paddingTop: 18.5 }}
                  />
                </span>
                {err.passwordErr === undefined ? null : (
                  <div
                    // className="d-flex flex-row justify-content-end"
                    style={{ ...errStyle }}
                  >{`${err.passwordErr}`}</div>
                )}
              </div>
            </div>
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
              style={{background:color.secondaryColor}}
              disabled={isDisabled}
              text={"Log in"}
              type={"submit"}
              id={"Login"}
              customColor={"linear-gradient(45deg, #006BB7, #0089EA"}
              onClick={handleSubmit}
              rightIcon={
                isDisabled && <i className="fas fa-spinner fa-spin ml-2"></i>
              }
            />
            <h6 className="pt-4">
              Don't have an account?{" "}
              <span
                style={{ color: color.secondaryColor, cursor: "pointer" }}
                onClick={() => handleRegister()}
              >
                Register here
              </span>
            </h6>
            {/* <ESButton
              text={"CREATE NEW ACCOUNT"}
              id={"Create New Account"}
              customColor={"linear-gradient(45deg, #0FB700, #13EA00"}
              onClick={() => handleRegister()}
            /> */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogin;
