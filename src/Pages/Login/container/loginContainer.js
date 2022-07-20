import React, { useState, useEffect } from "react";
import UserLogin from "../components/login";
// import { useAlert } from "react-alert";
import { LoginFormValidation } from "../../../helper/formValidation";
import { LoginFetch } from "../../../Api/login";
import { withRouter } from "react-router";
import { deleteCookie, writeCookie } from "../../../helper/cookieUser";
import { withCookies } from "react-cookie";

const LoginContainer = (props) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [visible, setVisible] = useState(false);
  const [err, setErr] = useState({});
  const [isDisabled, setIsDisabled] = useState(false);

  const errStyle = {
    borderColor:"red" ,
    color: "red",
    fontSize: 12,
    // marginTop: "-20px",
  };

  useEffect(() => {
    deleteCookie(props.cookies);
    document.getElementById("Email").focus();
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector(".modal-backdrop").style.display = "none";
    }
  }, []);

  const _handleSubmit = (e) => {
    e.preventDefault();
    const data = { email, password };

    const ValidatedErr = LoginFormValidation(data);
    setErr(ValidatedErr);
    if (ValidatedErr.eMailErr) {
      document.getElementById("Email").focus();
    } else if (ValidatedErr.passwordErr) {
      document.getElementById("password").focus();
    }
    if (Object.keys(ValidatedErr).length === 0) {
      setIsDisabled(true);
      LoginFetch(data, (err, result) => {
        console.log(err);
        if (err) {
          window.alert(err);
          setIsDisabled(false);
        }else if(result.payload[0].status === 0){
          window.alert("Account has not activated by admin")
          setIsDisabled(false);
        }else {
          // console.log('login success')
          const dt = { ...result.payload[0] };
          writeCookie(props.cookies, dt);
          props.history.push("/landing_page");
        }
      });
    }
  };

  const _handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErr({});
  };
  const _handlePwdChange = (e) => {
    setpassword(e.target.value);
    setErr({});
  };
  const _handleView = () => {
    setVisible(!visible);
  };
  const _handleRegister = () => {
    props.history.push("/register");
  };
  
  return (
    <UserLogin
      email={email}
      password={password}
      visible={visible}
      err={err}
      errStyle={errStyle}
      isDisabled={isDisabled}
      handleEmailChange={_handleEmailChange}
      handlePwdChange={_handlePwdChange}
      handleView={_handleView}
      handleSubmit={_handleSubmit}
      handleRegister={_handleRegister}
    />
  );
};

export default withCookies(withRouter(LoginContainer));
