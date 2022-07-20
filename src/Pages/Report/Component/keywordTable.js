import React, { useEffect } from "react";
import Scrollbars from "react-custom-scrollbars";
import color from "../../../Feature/Config/color";
import font from "../../../Feature/Config/font";
import '../../../App.css'

const KeywordTable = (props) => {
  const { data, windowWidth } = props;
  return (
    // <div
    //   id="keywordTable"
    //   className="bg-white w-100"
    //   style={{
    //     boxShadow: "0 2px 5px 0 rgba(166,180,200,1.2)",
    //     maxWidth: windowWidth === 1920 ? 530 : windowWidth <= 1366 ? 350 : 410,
    //     borderRadius: "4px",
    //     // fontSize: font.regular,
    //   }}
    // >
    //   <div
    //     className="d-flex justify-content-start text-white py-2 px-3 "
    //     style={{
    //       margin: "auto",
    //       verticalAlign: "middle",
    //       borderTopLeftRadius: "4px",
    //       borderTopRightRadius: "4px",
    //       backgroundImage: "linear-gradient(to right, #1A66B9 , #257DDE)",
    //       height: "55px",
    //       fontSize: font.heading12,
    //     }}
    //   >
    //     <i
    //       className="fas fa-chart-pie py-2 pr-2"
    //       style={{ color: color.lightGrey }}
    //     ></i>
    //     Keywords
    //   </div>

    //   <div className="mx-4 my-0 text-secondary">
    //     <table
    //       className="col-lg-12 mx-auto text-left pb-2 p-0"
    //       style={{
    //         borderSpacing: windowWidth === 1920 ? "0 17px" : "0 13px",
    //         borderCollapse: "unset",
    //       }}
    //     >
    //       <thead>
    //         <tr
    //           className="text-muted"
    //           style={{ fontSize: font.body, whiteSpace: "nowrap" }}
    //         >
    //           <th className="py-0"></th>
    //           <th className="py-0 text-center">
    //           Total Count
    //           </th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {data.map((v, k) => (
    //           <tr
    //             key={k}
    //             style={{ backgroundColor: "#f2f2f2",color:color.greyColor  }}
    //           >
    //             <td
    //               className="py-1 pl-2 "
    //               style={{ borderTopLeftRadius: 5, borderBottomLeftRadius: 5 }}
    //             >
    //               {v.label}
    //             </td>
    //             <td
    //               className="text-center py-1"
    //               style={{
    //                 borderTopRightRadius: 5,
    //                 borderBottomRightRadius: 5,
    //                 //  fontWeight: "bold"
    //               }}
    //             >
    //               {v.count===null?0:v.count}
    //             </td>
    //           </tr>
    //         ))}
    //       </tbody>
    //     </table>
    //   </div>
    // </div>
    <div
      id="keywordTable"
      className=""
      style={{
        height: 280
      }}
    >
      {/* <div
        className='d-flex w-100'
        style={{
        }}
      >
        <div className='col-8 font-weight-bold p-0 '>
          Keywords
        </div>
        <div className='col-4 font-weight-bold pl-0 pr-4 text-right '>
          Total Count
        </div>
      </div> */}
      <Scrollbars
        className="p-0 m-0 custom-scroll"
        style={{ maxHeight: '250px' }}
        autoHeight
        autoHeightMax={250}
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
            style={{ backgroundColor: 'rgba(0, 0, 0, 0.3)', borderRadius: 10, width: 3.5 }}
            className="thumb-vertical"
          />
        )}
      >
        <div className='mt-3'>
          {data.length > 0 ?
            data.map((v, k) => (
              <div
                key={k}
                className='d-flex align-items-center w-100 py-2'
                style={{
                  borderRadius: 6,
                  backgroundColor: k%2 === 0 ?'#ECF3F9' : '#fff'
                  // color.keywordsColors[k]
                }}
              >
                <div className='col-8 p-0 ml-2 '>
                  {v.keyword}
                </div>
                <div className='col-4 p-0 text-center ml-2'>
                  {v.totalCount === null ? 0 : v.totalCount}
                </div>
              </div>
            ))
            :
            <div className="text-secondary text-center my-5 py-5"> No Keywords Found.</div>
          }
        </div>
      </Scrollbars>
    </div>
  );
};
export default KeywordTable;

// const KeywordData = [
//     { label: 'Information Management System', count: '33' },
//     { label: 'Youth Employment Programme', count: '14' },
//     { label: 'Social Integration', count: '14' },
//     { label: 'Data Collection', count: '18' },
//     { label: 'Real-Time Monitoring', count: '12' }
// ]
