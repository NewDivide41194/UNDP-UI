import React from "react";
import { Link } from "react-router-dom";
import color from "../../../Feature/Config/color";
import font from "../../../Feature/Config/font";
import { UserTable } from "./userTable";
import CountryData from "../../../Feature/Config/countries.json";
import UNDP_userTable from "./UNDP_userTable";

export const UserManagement = (props) => {

  const { userList, _handleSwitch, countryId  , isDisabled } = props;
//console.log(countryId);
  const countryName = (code) => {
    // console.log(code);
    return CountryData.filter((v) => v.code === code)[0].name;
  };
  const columns = [
    { title: "Name", field: "name", width: "80%" },
    { title: "e-mail", field: "email", width: "50%" },
    {
      title: "Country",
      width: "50%",
      render: (rowData) =>
        rowData.country_id ? (
          <div>
            <img
              src={"/countryflags/" + rowData.country_id.toLowerCase() + ".svg"}
              alt="country flag"
              width={20}
              className="pr-1 pb-1"
            />
            {countryName(rowData.country_id)}
          </div>
        ) : null,
    },
    {
      title: "Ministry",
      field: "ministry",
      width: "50%",
    },
    {
      title: "Account Type",
      field: "type",
      width: "50%",
    },
    {
      field: "role",
      title: "Role",
      width: "20%",
    },
    {
      field: "active",
      title: "Active",
      width: "20%",
      render: (rowData) => (
        <Switch
          id={rowData.user_id}
          checked={rowData.active}
          _handleSwitch={_handleSwitch}
          isDisabled={isDisabled}
        />
      ),
    },
    // {
    //   field:"",
    //   title:"",
    //   render:(rowData)=>(
    //     <Link><i className="fa fa-edit"/>edit</Link>
    //   )
    // }
  ];

  const options = {
    sorting: true,
    pageSize: 10,
    padding: "dense",
    rowStyle: (rowData) => ({
      fontSize: 14,
      color: color.textColor,
      backgroundColor: rowData.tableData.id % 2 === 0 ? "#eee" : "#FFF",
    }),
    headerStyle: {
      backgroundColor: color.primaryColor,
      color: "#ffffff",
      fontWeight: "bold",
    },
  };

  return (
    <div className="px-5">
      <div className="d-flex flex-row justify-content-between text-left pb-3">
        User Management
        {/* {countryId ? (
          <div>
            <img
              src={
                "/countryflags/" + countryId.toLowerCase() + ".svg"
              }
              alt="country flag"
              width={40}
              className="mr-2 pb-1"
            />
            {countryName(countryId)}
          </div>
        ) : null} */}
      </div>
      {/* <UserTable columns={columns} data={userList} options={options} /> */}
      <UNDP_userTable data={userList} _handleSwitch={_handleSwitch} isDisabled={isDisabled} />
    </div>
  );
};

const Switch = (props) => {
  const { _handleSwitch, id, checked, isDisabled } = props;
  return (
    <div className="custom-control custom-switch">
      <input
        type="checkbox"
        className="custom-control-input"
        id={id}
        onChange={(e) => _handleSwitch(e, checked)}
        checked={checked}
        disabled={isDisabled}
      />
      <label
        className="custom-control-label"
        htmlFor={id}
        style={{ cursor: "pointer" }}
      ></label>
    </div>
  );
};
