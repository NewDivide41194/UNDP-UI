import React, { useEffect, useState } from "react";
import { withCookies } from "react-cookie";
import { toast } from "react-toastify";
import { FetchUser, UpdateUser } from "../../../Api/AdminFetch";
import color from "../../../Feature/Config/color";
import font from "../../../Feature/Config/font";
import { checkTokenExist } from "../../../helper/checkAccess";
import { deleteCookie, readCookie } from "../../../helper/cookieUser";
import { UserManagement } from "../components/UserManagement";
import CountryData from "../../../Feature/Config/countries.json";

const AdminDashboard = (props) => {
  const { cookies } = props;
  const [userList, setUserList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(false);
  const user = readCookie(props.cookies);
  const [updateData, setUpdateData] = useState({ userId: null, active: null });
  const countryId = user.country_id;
  const [userTypeId, setUserTypeId] = useState(null);
  const [roleId, setRoleId] = useState(null);
  // const userId = user.user_id;
  // const countryId = user.country_id;
  // const userTypeId = user.user_type_id;
  // const roleId = user.role_id;

  useEffect(() => {
    if (checkTokenExist(user, props.history, props.cookies)) {
      if (user.role_id === 1) {
        getUser();
      } else {
        window.history.go(-1);
      }
    }
  }, []);
  const getUser = async () => {
    const roleId = user.role_id;
    const countryId = user.country_id;
    const userTypeId = user.user_type_id;
    if (checkTokenExist(user, props.history, props.cookies)) {
      await FetchUser(
        {
          roleId,
          countryId,
          userTypeId,
        },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(props.cookies);
              props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            setUserList(data.payload);
            setLoading(false);
          }
        },
        { token: user.token }
      );
    }
  };

  const _handleSwitch = (e, checked) => {

    setIsDisabled(true);
    const id = e.target.id;
    const updateList = userList;
    const i = updateList.findIndex(v => v.user_id === parseInt(id));
    const updateData = { userId: id, countryId: updateList[i].country_id, active: checked ? 0 : 1 };

    const roleId = user.role_id;
    updateList[i].active = checked ? 0 : 1;
    setUserList(updateList);

    UpdateUser(
      { roleId },
      updateData,
      (err, dt) => {
        if (err) {
          toast(err.toString(), { type: "error" });
          updateList[i].active = checked ? 1 : 0;
          setUserList(updateList);
          setIsDisabled(false);
        } else {
          getUser()
            .then(() => toast("Updated!", { type: "success" }))
            .then(() => setIsDisabled(false));
        }
      },
      { token: user.token }
    );
  };

  // console.log(isDisabled);
  return (
    <div
      className="py-2 pl-2"
      style={{
        fontSize: window.innerWidth < 470 ? font.heading2 : font.heading1,
        fontWeight: 350,
        color: color.primaryColor,
      }}
    >
      <UserManagement
        userList={userList}
        countryId={countryId}
        _handleSwitch={_handleSwitch}
        roleId={roleId}
        isDisabled={isDisabled}
      />
    </div >
  );
};

export default withCookies(AdminDashboard);
