const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
const specialCharacterRegx = /[`!#$%^&*()_+\-=[\]{};:"\\|<>/?~]/;
const MobileRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

export const LoginFormValidation = (data) => {
  const err = {};
  const { email, password } = data

  if (email === "") {
    err.eMailErr = "Fill Email Address!";
  } else if (!emailRegex.test(email)) {
    err.eMailErr = "Please enter a valid Email Address";
  }
  if (password === "") {
    err.passwordErr = "Fill Password!";
  }
  return err;
};

export const SurveyValidation = (data) => {
  const err = {};
  const { surveyHeader } = data
  if (surveyHeader === "") {
    err.surveyHeaderErr = "Fill Survey Title!";
  }
  return err;
}

export const RegisterFormValidation = (data) => {
  const err = {};

  const { username, email, password, countryId, ministry, responsibleSectorId, accType } = data;

  if (username === "") {
    err.userNameErr = "Fill User Name!";
  }
  // else if (specialCharacterRegx.test(userName)) {
  //   err.userNameErr = "Not Allow Special Characters";
  // }
  
  if(accType===1){
    if (countryId === ""|| !countryId || countryId === undefined) {
      err.CountryErr = "Choose Country!";
    }
    if(ministry === 'Others'){
      if (responsibleSectorId === "" || !responsibleSectorId || responsibleSectorId === undefined) {
        err.responsibleSectorIdErr = "Fill Responsibilities !";
      }
    }
    
  }
  if (ministry === "" || !ministry || ministry === undefined) {
    err.ministryErr = "Choose Government Ministry!";
  }
  if (email === "") {
    err.eMailErr = "Fill Email Address!";
  } else if (!emailRegex.test(email)) {
    err.eMailErr = "incorret Email Address!";
  }
  if (password === null) {
    // err.eMailErr="Undefined Phone"
    return err
  } else if (password === "") {
    err.passwordErr = "Fill Password!";
  } else if (password.length < 8) {
    err.passwordErr = "Minium 8 Characters"
  }

  return err;
};

export const BuildingFormValidation = (data) => {
  const err = {};
  const { clientCompany, buildingType, buildingName, country, postal, address, comment } = data;

  if (clientCompany === "") {
    err.clientCompanyErr = "Fill Client Company!";
  } else if (specialCharacterRegx.test(clientCompany)) {
    err.clientCompanyErr = "Not Allow Special Characters";
  }
  if (buildingType === "") {
    err.buildingTypeErr = "Building Type Required!";
  }
  if (buildingName === "") {
    err.buildingNameErr = "Fill Building Name!";
  } else if (specialCharacterRegx.test(buildingName)) {
    err.buildingNameErr = "Not Allow Special Characters!";
  }
  if (country === "") {
    err.countryErr = "Select Country!";
  }
  if (postal === "") {
    err.postalErr = "Fill Postal Code!";
  }
  if (address === "") {
    err.addressErr = "Fill Address!";
  }
  if (comment === "") {
    err.commentErr = "Fill Comment!";
  } else if (specialCharacterRegx.test(comment)) {
    err.commentErr = "Not Allow Special Characters!";
  }
  return err;
};

export const AccountSettingValidataion = (data) => {
  const err = {};
  const { Name, Mobile, eMail, Role, currentPassword, newPassword, ReEnterPassword } = data;

  if (Name === "") {
    err.NameErr = "Fill Name!";
  } else if (specialCharacterRegx.test(Name)) {
    err.NameErr = "Not Allow Special Characters!";
  }
  if (Mobile === "") {
    err.MobileErr = "Fill Mobile Number!";
  } else if (!MobileRegex.test(Mobile)) {
    err.MobileErr = "Incorrect Ph No"
  }
  if (eMail === "") {
    err.eMailErr = "Fill Email!";
  } else if (!emailRegex.test(eMail)) {
    err.eMailErr = "incorret Email Address!";
  }
  if (Role === "") {
    err.RoleErr = "Please set your Role!";
  }
  if (currentPassword === "") {
    err.currentPasswordErr = "Create Password!";
  } else if (currentPassword.length < 8) {
    err.currentPasswordErr = "Minimum 8 character!";
  }
  if (newPassword === "") {
    err.newPasswordErr = "create Password!"
  } else if (newPassword.length < 8) {
    err.newPasswordErr = "Minimum 8 character!";
  }
  if (ReEnterPassword === "") {
    err.ReEnterPasswordErr = "create Password!";
  } else if (ReEnterPassword.length < 8) {
    err.ReEnterPasswordErr = "Minimum 8 character!";
  } else if (ReEnterPassword != newPassword) {
    err.ReEnterPasswordErr = "Password doesn't match";
  }
  return err;
}
