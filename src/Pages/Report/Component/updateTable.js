import moment from "moment";
import React from "react";
import color from "../../../Feature/Config/color";
import font from "../../../Feature/Config/font";
import icon from "../../../Feature/Images/Icon material-update.png";
import { NoData } from "../Container/reportContainer";

const UpdateTable = (props) => {
  const { userUpdate, updateFile, windowWidth } = props;
 // console.log(userUpdate);
  // maxHeight:'500px', minHeight: '470px', maxWidth: '380px', minWidth: '350px',
  return (
    <div
      className="bg-white w-100"
      style={{
        boxShadow: "0 2px 5px 0 rgba(166,180,200,1.2)",
        maxWidth: windowWidth === 1920 ? 530 : windowWidth <= 1366 ? 350 : 410,
        borderRadius: "4px",
        fontSize: font.regular,
      }}
    >
      <div
        className="d-flex justify-content-start text-white py-2 px-3 "
        style={{
          margin: "auto",
          verticalAlign: "middle",
          borderTopLeftRadius: "4px",
          borderTopRightRadius: "4px",
          backgroundImage: "linear-gradient(to right, #1A66B9 , #257DDE)",
          height: "55px",
          fontSize: font.heading12,
        }}
      >
        <img
          className="mt-2 mr-2"
          src={icon}
          alt=""
          style={{ width: "25px", height: "25px" }}
        />
        Last Updated
      </div>

      <div className="mx-4 my-1">
        <table
          className="col-lg-12 mx-auto text-left pb-3 p-0"
          style={{
            borderSpacing: windowWidth === 1920 ? "0 17px" : "0 13px",
            borderCollapse: "unset",
          }}
        >
          <div
            className="my-2 px-0 text-left"
            style={{ color: color.greyColor, fontSize: font.labels }}
          >
            <div className="pt-1 text-secondary">
              <span className="text-secondary text-decoration-none font-weight-bold">
                Time/Date
              </span>
              :{" "}
              {userUpdate &&
                moment(userUpdate.last_modified_date).format(
                  "DD-MMM-yyyy HH:mm"
                )}
            </div>
            <div className="py-1 text-secondary">
              <span className="text-secondary text-decoration-none font-weight-bold">
                User Name
              </span>{" "}
              : {userUpdate && userUpdate.user_name}
            </div>
          </div>
          <div
            className="dropdown-divider my-2"
            style={{ border: "1px solid #D2D3D3", boxSizing: "border-box" }}
          ></div>
          <div
            className="my-1 text-secondary font-weight-bold"
            style={{ fontSize: font.labels }}
          >
            Latest Upload(s)
          </div>
          <tbody>
            {updateFile.length != 0 ? (
              updateFile.map((v, k) => (
                <tr
                  key={k}
                  style={{
                    backgroundColor: color.secondaryColor,
                    fontSize: font.labels,
                    color: "#ffffff",
                  }}
                >
                  <td className="py-1 pl-2" style={{ borderRadius: 5 }}>
                    {v.file_name}
                  </td>
                </tr>
              ))
            ) : (
              <NoData />
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default UpdateTable;
// const Info = [{ Date: '20-Jan-2020 14:30', UserName: 'Harry Manson' }]
// const UpdateData = [
//   { Text: "Data Protection Office Annual Report" },
//   { Text: "Digital Government Transformation Strategy 2018-2022" },
//   { Text: "Mauritius AI Strategy" },
//   {
//     Text: "Communique - Postgraduate Scholarship Scheme in Digital Technologies 2020",
//   },
//   {
//     Text: "National Audit Office Report of the Director Audit on the Accounts of the Government for the Financial Year 2018-19",
//   },
// ];
