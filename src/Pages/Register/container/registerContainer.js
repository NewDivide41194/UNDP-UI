import React, { useState, useEffect } from "react";
import { RegisterFormValidation } from "../../../helper/formValidation"
import { withRouter } from "react-router";
import { deleteCookie } from "../../../helper/cookieUser";
import { withCookies } from "react-cookie";
import UserRegister from "../components/register";
import { GetRegisterOptions } from "../../../Api/register";
import { toast } from "react-toastify";
import { RegisterFetch } from '../../../Api/register'
import CountryData from "../../../Feature/Config/countries.json";
import Mauritius from '../../../Feature/Images/Countries/mauritius.jpg'
import Kyrgyzstan from '../../../Feature/Images/Countries/kyrgyzstan.png'
import Timor from '../../../Feature/Images/Countries/timor.png'
import Tanzania from '../../../Feature/Images/Countries/tanzania.jpg'

const RegisterContainer = (props) => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setpassword] = useState("");
    const [ministries, setMinistries] = useState([]);
    const [responsibilities, setResponsibilities] = useState([]);
    const [visible, setVisible] = useState(false);
    const [err, setErr] = useState({});
    const [isDisabled, setIsDisabled] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState("");
    const [selectedMinistry, setSelectedMinistry] = useState("")
    const [selectedResponsibility, setSelectedResponsibility] = useState("")
    const [accType, setAccType] = useState(1)
    // const alert = useAlert();
    const countryFilter=CountryData.filter(v=>v.code == "MU" || v.code == "KG" || v.code == "TZ" || v.code == "TL" || v.code == 'MM')
    const CountryList = countryFilter.map((v) => {
        return { label: v.name, value: v.code };
    });

    const errStyle = {
        color: "red",
        fontSize: 12,
        marginTop: "-20px",
    };

    useEffect(() => {
        if (document.querySelector('.modal-backdrop')) {
            document.querySelector(".modal-backdrop").style.display = 'none'
        }
        fetchRegisterOptions();
    }, []);

    useEffect(() => {
        setSelectedMinistry('')
    }, [accType])

    const fetchRegisterOptions = () => {
        GetRegisterOptions((error, data) => {
            if (error) {
                toast(error.toString(), { type: "error" });
            } else {
                setMinistries(data.payload.ministries);
                setResponsibilities(data.payload.responsibilities)
            }
        })
    }

    const ministryOption = ministries && ministries.map((v, k) => {
        return {
            id: v.ministries_id,
            value: v.ministry_name,
            label: v.ministry_name,
        };
    });

    const responsibilityOption = responsibilities && responsibilities.map((v, k) => {
        return {
            id: v.sector_id,
            value: v.sector_name,
            label: v.sector_name,
        };
    });

    const _handleSubmit = (e) => {
        e.preventDefault();
        const data = {
            username,
            email,
            password,
            accType,
            roleId: 2,
            ministry: selectedMinistry && selectedMinistry.value,
            countryId: (selectedCountry && accType === 1) ? selectedCountry.value : null,
            responsibleSectorId: (selectedResponsibility && accType === 1) ? selectedResponsibility.id : null
        };
         const ValidatedErr = RegisterFormValidation(data);
         console.log(ValidatedErr, 'ValidatedErr')
        setErr(ValidatedErr);
        if (ValidatedErr.eMailErr) {
            document.getElementById("REmail").focus();
        } else if (ValidatedErr.passwordErr) {
            document.getElementById("Rpassword").focus();
        } else if (Object.keys(ValidatedErr).length === 0) {
            setIsDisabled(true);
            RegisterFetch(
                data,
                (err, result) => {
                    if (err) {
                        toast(err.toString(), { type: "error" });
                        setIsDisabled(false);
                    } else {
                        // console.log(result)
                        toast(result.message.toString(), { type: "success" });
                        props.history.push("/login");
                    }

                }
            );
        }
    };

    const _handleSelectorSelect = ({ e, name }) => {
        const e_ = e ? e : []
        setErr({});
        if (name === 'country') {
            setSelectedCountry(e_);
        } else if (name === 'responsibility') {
            setSelectedResponsibility(e_)
        } else {
            setSelectedMinistry(e_)
        }
    }

    const _handleUserNameChange = (e) => {
        setUsername(e.target.value);
        setErr({});
    }
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


    // console.log("user->", responsibilityOption)
    return (
        <UserRegister
            username={username}
            email={email}
            password={password}
            visible={visible}
            err={err}
            errStyle={errStyle}
            isDisabled={isDisabled}

            handleUserNameChange={_handleUserNameChange}
            handleEmailChange={_handleEmailChange}
            handlePwdChange={_handlePwdChange}
            handleView={_handleView}
            handleSubmit={_handleSubmit}

            ministryOption={ministryOption}
            responsibilityOption={responsibilityOption}
            countryOption={CountryList}
            _handleSelectorSelect={_handleSelectorSelect}
            selectedCountry={selectedCountry}
            selectedMinistry={selectedMinistry}
            selectedResponsibility={selectedResponsibility}
            setAccType={setAccType}
            accType={accType}
        />
    );
}

export default withCookies(withRouter(RegisterContainer));

// const CountryList = [
//     {
//         id: "MU",
//         value: "MU",
//         label: <div><img className='mr-2' src={Mauritius} height="20px" width="30px" />Mauritius</div>,
//     },
//     {
//         id: "KG",
//         value: "KG",
//         label: <div><img className='mr-2' src={Kyrgyzstan} height="20px" width="30px" />Kyrgyzstan</div>,
//     },
//     {
//         id: "TL",
//         value: "TL",
//         label: <div><img className='mr-2' src={Timor} height="20px" width="30px" />Timor Leste</div>,
//     },
//     {
//         id: "TZ",
//         value: "TZ",
//         label: <div><img className='mr-2' src={Tanzania} height="20px" width="30px" />Tanzania</div>,
//     }
// ];