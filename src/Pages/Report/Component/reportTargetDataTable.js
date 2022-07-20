import React, { useEffect, useState, useRef } from "react";
import one from "../../../Feature/Images/SDG Icons/1.png";
import two from "../../../Feature/Images/SDG Icons/2.png";
import three from "../../../Feature/Images/SDG Icons/3.png";
import four from "../../../Feature/Images/SDG Icons/4.png";
import five from "../../../Feature/Images/SDG Icons/5.png";
import six from "../../../Feature/Images/SDG Icons/6.png";
import seven from "../../../Feature/Images/SDG Icons/7.png";
import eight from "../../../Feature/Images/SDG Icons/8.png";
import nine from "../../../Feature/Images/SDG Icons/9.png";
import ten from "../../../Feature/Images/SDG Icons/10.png";
import eleven from "../../../Feature/Images/SDG Icons/11.png";
import twelve from "../../../Feature/Images/SDG Icons/12.png";
import thirteen from "../../../Feature/Images/SDG Icons/13.png";
import fourteen from "../../../Feature/Images/SDG Icons/14.png";
import fivtheen from "../../../Feature/Images/SDG Icons/15.png";
import sixteen from "../../../Feature/Images/SDG Icons/16.png";
import seventeen from "../../../Feature/Images/SDG Icons/17.png";
import font from "../../../Feature/Config/font";
import { Scrollbars } from "react-custom-scrollbars";
import { NoData } from "../Container/reportContainer";
import color from "../../../Feature/Config/color";
import './../../../App.css'

const ReportTargetDataTable = (props) => {
  const [header, setHeader] = useState(null);
  const [body, setBody] = useState(null);
  const scrollbar = useRef();
  const { solutionData, windowWidth } = props;
  //console.log("..", Object.keys(solutionData).length);
  useEffect(() => {
    const header = columns.map((v, k) => (
      <th
        className={`text-secondary ${v === "LINK TO SECTORS"
          ? "w-25"
          : v === "SDGs" && "w-50 text-center pr-5 "
          }`}
        key={k}
        style={{ border: "none" }}
      >
        {v}
      </th>
    ));

    const defaultStyle = {
      verticalAlign: "middle",
      border: "none",
      fontSize: font.regular,
      width: "450px",
      boxShadow: "0 3px 7px 0 rgba(166,180,200,1.2)",
    };
    var ictComponentData = [];

    for (let index = 1; index <= Object.keys(solutionData).length; index++) {
      const result = solutionData[index].reduce((r, c, i) => {
        const R = [...r];
        if (i == 0) {
          R.push({
            sdg_id: c.sdg_id,
            sectors: c.sector_id ? 1 : 0,
            ict_components: [],
          });
          if (c.ict_component) {
            R[0].ict_components.push(c.ict_component);
          }
          if (c.proj_title) {
            R[0].ict_components.push(c.proj_title);
          }
        } else {
          R[0].sectors = c.sector_id ? R[0].sectors + 1 : R[0].sectors
          if (
            c.ict_component &&
            !R[0].ict_components.includes(c.ict_component)
          ) {
            R[0].ict_components.push(c.ict_component);
          }
          if (
            c.proj_title &&
            !R[0].ict_components.includes(c.proj_title)
          ) {
            R[0].ict_components.push(c.proj_title);
          }
        }
        return R;
      }, []);
      //  console.log(result[0])
      ictComponentData.push(...result);
    }

    const body = ictComponentData.length > 0 ? ictComponentData.map((v, k) => {
      const sdgIcon =
        v.sdg_id === 1
          ? one
          : v.sdg_id === 2
            ? two
            : v.sdg_id === 3
              ? three
              : v.sdg_id === 4
                ? four
                : v.sdg_id === 5
                  ? five
                  : v.sdg_id === 6
                    ? six
                    : v.sdg_id === 7
                      ? seven
                      : v.sdg_id === 8
                        ? eight
                        : v.sdg_id === 9
                          ? nine
                          : v.sdg_id === 10
                            ? ten
                            : v.sdg_id === 11
                              ? eleven
                              : v.sdg_id === 12
                                ? twelve
                                : v.sdg_id === 13
                                  ? thirteen
                                  : v.sdg_id === 14
                                    ? fourteen
                                    : v.sdg_id === 15
                                      ? fivtheen
                                      : v.sdg_id === 16
                                        ? sixteen
                                        : seventeen;
     
      return (
        v.sector_id !== null ?

          <tr
            className="py-3 text-secondary"
            key={Math.random(1, 100)}
            style={{ borderRadius: "10px", ...defaultStyle, width: "100%" }}
          >
            <td className="pr-2" style={{ backgroundColor: "transparent" }}>
              <img
                src={sdgIcon}
                align="left"
                alt="img"
                className="img-responsive"
                style={{ width: "100px", height: "100px", borderRadius: "10px" }}
              />
            </td>
            <td
              title={v.ict_components.join()}
              className={` text-left bg-white ${(v.ict_components.join()).trim() === "" ? 'pl-0' : 'pl-2'}`}
              style={{
                width: '62%',
                height: 100,
                borderTopLeftRadius: 6,
                borderBottomLeftRadius: 6,
                padding: (v.ict_components.join()).trim() === "" ? "0px 0px 0px 0px" : "6px 2px 6px 2px",
                lineHeight: 1.5,
              }}
            >
              <Scrollbars
                autoHeight
                autoHeightMin={100}
                autoHeightMax={100}
                renderTrackHorizontal={(props) => (
                  <div
                    {...props}
                    style={{ display: "none" }}
                    className="track-horizontal"
                  />
                )}
                renderThumbVertical={(props) => (
                  <div
                    {...props}
                    style={{ backgroundColor: '#e2e3e2', borderRadius: 5, width: 3.5 }}
                    className="thumb-vertical"
                  />
                )}
              >
                {(v.ict_components.join()).trim() === "" ?
                  <div className=" text-center" style={{ height: 100, paddingTop: 40 }}>
                    <i className="fa fa-exclamation-triangle pr-2" />
                    No Data
                  </div>
                  :
                  <>
                    {v.ict_components.map((v, k) =>
                      <span
                        key={k}
                        className="px-1 mx-1 mb-1"
                        style={{
                          border: `1px solid ${color.primaryColor}`,
                          borderRadius: 5,
                          display: 'inline-block'
                        }}
                      >
                        {v}
                      </span>
                    )}
                  </>
                }
              </Scrollbars>
            </td>
            <td
              className="bg-white py-1 w-25 border-left font-weight-bolder"
              style={{ borderTopRightRadius: 6, borderBottomRightRadius: 6 }}
            >
              {v.sectors}
            </td>
          </tr> : <NoData />
      );
    })
      :
      (
        <div
          className="d-flex flex-wrap  w-100"
        >
          <NoDataForTable />
        </div>
      );
    setHeader(header);
    setBody(body);
  }, [windowWidth, solutionData, document.getElementById('sankeyside')]);

  return (
    <div
      className={`table-responsive-xl ${windowWidth <= 998 || windowWidth >= 995 ? "pl-0" : "pl-3"
        } `}
      // style={{ borderRight: windowWidth > 992 && "1px solid #BFBFBF" }}
    >
      <table
        key="1"
        className="col-12"
        style={{
          borderCollapse: "separate",
          borderSpacing: "0px 10px",
          display: "flex",
          flexFlow: "column",
          minWidth: 430,
          // tableLayout: 'fixed'
        }}
      >
        <thead className="table-borderless ">
          <tr
            className=""
            style={{ width: "100%", display: "table", tableLayout: "fixed" }}
          >
            {header}
          </tr>
        </thead>
        <Scrollbars
          className="custom-paddingLeft"
          autoHeight
          autoHeightMin={windowWidth < 768 ? 450 : document.getElementById('sankeyside') ? document.getElementById('sankeyside').offsetHeight -90 : 500}
          autoHeightMax={windowWidth < 768 ? 450 : document.getElementById('sankeyside') ? document.getElementById('sankeyside').offsetHeight -90 : 500}
          ref={scrollbar}
        >
          <tbody>{body}</tbody>
        </Scrollbars>
      </table>
    </div>
  );
};

const columns = [" ", "SDGs", "LINK TO SECTORS"];

export default ReportTargetDataTable;

export const NoDataForTable = () => {
  return (
    <div className="bg-secondary text-light p-3 my-4 rounded text-center data " style={{
      padding: '5px',
      textAlign: 'center',
      position: 'absolute',
      left: 0,
      right: 0,
      top: 0
    }}>
      <i className="fa fa-exclamation-triangle pr-2" />
      No Data
    </div>
  );
};