import React from "react";
import { Scrollbars } from "react-custom-scrollbars";
import sdg1 from "../../../Feature/Images/SDG Icons/1.png";
import sdg2 from "../../../Feature/Images/SDG Icons/2.png";
import sdg3 from "../../../Feature/Images/SDG Icons/3.png";
import sdg4 from "../../../Feature/Images/SDG Icons/4.png";
import sdg5 from "../../../Feature/Images/SDG Icons/5.png";
import sdg6 from "../../../Feature/Images/SDG Icons/6.png";
import sdg7 from "../../../Feature/Images/SDG Icons/7.png";
import sdg8 from "../../../Feature/Images/SDG Icons/8.png";
import sdg9 from "../../../Feature/Images/SDG Icons/9.png";
import sdg10 from "../../../Feature/Images/SDG Icons/10.png";
import sdg11 from "../../../Feature/Images/SDG Icons/11.png";
import sdg12 from "../../../Feature/Images/SDG Icons/12.png";
import sdg13 from "../../../Feature/Images/SDG Icons/13.png";
import sdg14 from "../../../Feature/Images/SDG Icons/14.png";
import sdg15 from "../../../Feature/Images/SDG Icons/15.png";
import sdg16 from "../../../Feature/Images/SDG Icons/16.png";
import sdg17 from "../../../Feature/Images/SDG Icons/17.png";
import TextEditor from "./textEditor";
import Spinner from "../../../Feature/Images/Spinner.gif";
import { DownloadFile } from "../../../Api/dataFetch";
import color from "../../../Feature/Config/color";

class DetailModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imgSrc: null,
    };
    this.scrollbar = React.createRef(null);
    this.nationalParaSB = React.createRef(null);
    this.policyParaSB = React.createRef(null);
    this.techParaSB = React.createRef(null);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.targetDetailData !== this.props.targetDetailData) {
      const sdgId = this.props.targetDetailData.sdg_id;

      this.setState({
        imgSrc:
          sdgId === 1
            ? sdg1
            : sdgId === 2
              ? sdg2
              : sdgId === 3
                ? sdg3
                : sdgId === 4
                  ? sdg4
                  : sdgId === 5
                    ? sdg5
                    : sdgId === 6
                      ? sdg6
                      : sdgId === 7
                        ? sdg7
                        : sdgId === 8
                          ? sdg8
                          : sdgId === 9
                            ? sdg9
                            : sdgId === 10
                              ? sdg10
                              : sdgId === 11
                                ? sdg11
                                : sdgId === 12
                                  ? sdg12
                                  : sdgId === 13
                                    ? sdg13
                                    : sdgId === 14
                                      ? sdg14
                                      : sdgId === 15
                                        ? sdg15
                                        : sdgId === 16
                                          ? sdg16
                                          : sdgId === 17 && sdg17,
      });
    }
  }

  render() {
    const { targetDetailData, ministriesData, ppIndex } = this.props;
    // const NewlineText = (text) => {
    //   // const text =
    //   //   targetDetailData["National/Strategic Plan"] &&
    //   //   targetDetailData["National/Strategic Plan"];
    //   return text.split("/n").map((str) => <li>{str}</li>);
    // console.log(ministriesData);
    // };
    // console.log(ministriesData, 'minst')
    return (
      <div
        className="modal fade"
        id="dataDetailModal"
        tabIndex="-1"
        aria-labelledby="dataDetailModalLabel"
        aria-hidden="false"
      >
        <div
          className="modal-dialog modal-lg"
          style={{
            maxWidth: 660,
            position: "absolute",
            top: 20,
            bottom: 0,
            left: 10,
            zIndex: 1050,
          }}
        >
          {
            Object.keys(targetDetailData).length === 0 ?
              <div
                className="modal-content"
                style={{ border: "none", boxShadow: "2px 3px 8px #343434" }}
              >
                <div
                  className="modal-header text-white py-2 px-3"
                  style={{
                    backgroundImage: "linear-gradient(to right, #1A66B9 , #257EDF)",
                  }}
                >
                  <p className="m-0 text-left">
                    <span style={{ fontSize: 13, color: 'transparent' }}>
                      By 2030, ensure that all girls and boys have access to quality early childhood development,
                      care and pre-primary education so that they are ready for primary education
                    </span>
                  </p>
                </div>
                <div className="modal-body my-5" style={{}}>
                  <img className='mt-5' alt="spinner" src={Spinner} style={{ width: 120 }} />
                  <br />
                  Loading . . .
                </div>
              </div>
              :
              <div
                className="modal-content"
                style={{ border: "none", boxShadow: "2px 3px 8px #343434" }}
              >
                <div
                  className="modal-header text-white py-2 px-3"
                  style={{
                    backgroundImage: "linear-gradient(to right, #1A66B9 , #257EDF)",
                  }}
                >
                  <p className="m-0 text-left">
                    <img
                      src={this.state.imgSrc}
                      align="left"
                      alt="img"
                      className="img-responsive p-0 mr-2 bg-light"
                      style={{ width: "45px", height: "45px", borderRadius: "5px" }}
                    />
                    <span style={{ fontSize: 13 }}>
                      {targetDetailData.target_name}
                    </span>
                  </p>
                  <i
                    className="fa fa-times bg-white text-primary my-2"
                    data-dismiss="modal"
                    aria-hidden="true"
                    style={{
                      fontSize: 11,
                      padding: "4px 5.3px 4px 5.3px",
                      borderRadius: "50%",
                      cursor: "pointer",
                    }}
                  ></i>
                </div>

                <div className="modal-body p-0 text-left">
                  <div
                    className="d-flex flex-row justify-content-between py-2 px-3"
                    style={{ fontSize: 13, backgroundColor: "#EEEEEE" }}
                  >
                    <div>
                      <span style={{ fontWeight: "bold" }}>Pillar/Sectors : </span>
                      &nbsp;{targetDetailData.sector_name}
                    </div>
                    <div>
                      <span style={{ fontWeight: "bold" }}>
                        Digital Development :{" "}
                      </span>
                      &nbsp;
                      {targetDetailData.aligned == null
                        ? "Not Relevant"
                        : targetDetailData.aligned}
                    </div>
                  </div>
                  <div
                    className="d-flex flex-wrap px-3 py-2"
                    style={{ fontSize: 13, color: "#6C757D" }}
                  >
                    <div className="d-flex flex-nowrap mr-4">
                      <input
                        className="mr-2 mt-1"
                        checked={targetDetailData.people === 1 ? true : false}
                        type="checkbox"
                        id="People"
                        name="People"
                        value="People"
                        readOnly
                      />
                      <label className="m-0" htmlFor="People">
                        People
                      </label>
                    </div>
                    <div className="d-flex flex-nowrap mr-4">
                      <input
                        className="mr-2 mt-1"
                        checked={targetDetailData.planet === 1 ? true : false}
                        type="checkbox"
                        id="Planet"
                        name="Planet"
                        value="Planet"
                        readOnly
                      />
                      <label className="m-0" htmlFor="Planet">
                        Planet
                      </label>
                    </div>
                    <div className="d-flex flex-nowrap mr-4">
                      <input
                        className="mr-2 mt-1"
                        checked={targetDetailData.prosperity === 1 ? true : false}
                        type="checkbox"
                        id="Prosperity "
                        name="Prosperity "
                        value="Prosperity"
                        readOnly
                      />
                      <label className="m-0" htmlFor="Prosperity ">
                        Prosperity
                      </label>
                    </div>
                    <div className="d-flex flex-nowrap mr-4">
                      <input
                        className="mr-2 mt-1"
                        checked={targetDetailData.peace === 1 ? true : false}
                        type="checkbox"
                        id="Peace"
                        name="Peace"
                        value="Peace"
                        readOnly
                      />
                      <label className="m-0" htmlFor="Peace">
                        Peace
                      </label>
                    </div>
                    <div className="d-flex flex-nowrap mr-4">
                      <input
                        className="mr-2 mt-1"
                        checked={targetDetailData.partnerships === 1 ? true : false}
                        type="checkbox"
                        id="Partnerships "
                        name="Partnerships "
                        value="Partnerships"
                        readOnly
                      />
                      <label className="m-0" htmlFor="Partnerships ">
                        Partnerships
                      </label>
                    </div>
                  </div>
                  <hr className="m-0" />
                  <div className="my-2 mx-3" style={{ fontSize: 13 }}>
                    <div className="pb-2" style={{ borderRadius: 12 }}>
                      <div
                        className="text-white font-weight-bold px-2 py-1"
                        style={{
                          backgroundColor: "#1A65B8",
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          border: "1px solid #738d99",
                          borderBottom: "none",
                        }}
                      >
                        National/Strategic Plan
                      </div>

                      <div
                        className="px-2 py-1"
                        style={{
                          borderBottomLeftRadius: 5,
                          borderBottomRightRadius: 5,
                          border: "1px solid #738d99",
                          borderTop: "none",
                        }}
                      >
                        {/* {targetDetailData["national_strategic_plan"] ? (
                      <Scrollbars
                        className="scroll"
                        style={{
                          height: 150,
                        }}
                        renderTrackHorizontal={(props) => (
                          <div
                            {...props}
                            style={{ display: "none", overflowX: "hidden" }}
                            className="track-horizontal"
                          />
                        )}
                        ref={this.nationalParaSB}
                      >            
                        {NewlineText(targetDetailData['national_strategic_plan'])}                         
                      </Scrollbars>
                    ) : (
                      <div className="text-center">....</div>
                    )} */}
                        {targetDetailData.national_strategic_plan ? (
                          <TextEditor
                            value={targetDetailData.national_strategic_plan}
                          />
                        ) : (
                          <div className="text-center">....</div>
                        )}
                      </div>
                    </div>
                    <div className="pb-2" style={{ borderRadius: 12 }}>
                      <div
                        className="text-white font-weight-bold px-2 py-1"
                        style={{
                          backgroundColor: "#1A65B8",
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          border: "1px solid #738d99",
                          borderBottom: "none",
                        }}
                      >
                        Digital Policy and Programme
                      </div>

                      <div
                        className="px-2 py-1"
                        style={{
                          borderBottomLeftRadius: 5,
                          borderBottomRightRadius: 5,
                          border: "1px solid #738d99",
                          borderTop: "none",
                        }}
                      >
                        {/* {targetDetailData.digital_policy_and_programme ? (
                      <TextEditor
                        value={targetDetailData.digital_policy_and_programme}
                      />
                    ) : (
                      <div className="text-center">....</div>
                    )} */}
                        <div className="d-flex flex-row flex-wrap">
                          {ministriesData.map((v, i) => (
                            <span
                              key={i}
                              id={i}
                              onClick={(e) => this.props._handleTabChange(e)}
                              style={{
                                background:
                                  ppIndex === i ? color.lightGrey : "none",
                                color:
                                  ppIndex === i ? color.textColor : color.greyColor,
                                cursor: "pointer",
                              }}
                              className="p-1 rounded"
                            >
                              {v.title || "P&P " + (i + 1)}
                            </span>
                          ))}
                        </div>

                        {ministriesData.length > 0 && (
                          <TextEditor
                            value={ministriesData[ppIndex].policy_and_programme}
                          />
                        )}
                      </div>
                    </div>
                    <div className="" style={{ borderRadius: 12 }}>
                      <div
                        className="text-white font-weight-bold px-2 py-1"
                        style={{
                          backgroundColor: "#1A65B8",
                          borderTopLeftRadius: 5,
                          borderTopRightRadius: 5,
                          border: "1px solid #738d99",
                          borderBottom: "none",
                        }}
                      >
                        Technology, System and Platform
                      </div>

                      <div
                        className="px-2 py-1"
                        style={{
                          borderBottomLeftRadius: 5,
                          borderBottomRightRadius: 5,
                          border: "1px solid #738d99",
                          borderTop: "none",
                        }}
                      >
                        {/* {targetDetailData["technology_system_and_platform"] ? (
                      targetDetailData["technology_system_and_platform"].match(
                        /\w+/g
                      ).length <= 130 ? (
                        NewlineText(targetDetailData["technology_system_and_platform"])
                      ) : (
                        <Scrollbars
                          className="scroll"
                          style={{ height: 150 }}
                          renderTrackHorizontal={(props) => (
                            <div
                              {...props}
                              style={{ display: "none", overflowX: "hidden" }}
                              className="track-horizontal"
                            />
                          )}
                          ref={this.techParaSB}
                        >
                          {NewlineText(targetDetailData["technology_system_and_platform"])}
                        </Scrollbars>
                      )
                    ) : (
                      <div className="text-center">....</div>
                    )} */}
                        {targetDetailData.technology_system_and_platform ? (
                          <TextEditor
                            value={targetDetailData.technology_system_and_platform}
                          />
                        ) : (
                          <div className="text-center">....</div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                <hr className="m-0" />
                <Scrollbars
                  className="scroll"
                  style={{
                    height: 90,
                    // this.props.ministriesData.length > 2
                    //   ? 165
                    //   : 90 * this.props.ministriesData.length,
                  }}
                  renderTrackHorizontal={(props) => (
                    <div
                      {...props}
                      style={{ display: "none", overflowX: "hidden" }}
                      className="track-horizontal"
                    />
                  )}
                  ref={this.scrollbar}
                >
                  <div className="my-2 mx-3">
                    {/* {this.props.ministriesData.length > 0 &&
                  this.props.ministriesData.map((v, k) => (
                    <div key={k} className="pb-2 w-100">
                      <div
                        className="d-flex flex-row justify-content-between text-white px-2 py-1"
                        style={{ backgroundColor: "#1A65B8" }}
                      >
                        <div className="text-left" style={{ fontSize: 13 }}>
                          {v.ministry_name}
                        </div>

                        <i
                          className="fas fa-external-link-alt text-white pt-1"
                          style={{ fontSize: 13 }}
                        ></i>
                      </div>
                      <div
                        className="d-flex flex-row py-1"
                        style={{ fontSize: 12 }}
                      >
                        <div
                          className="col-6 text-left float-left"
                          style={{
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          <span className="text-muted font-weight-bold">
                            LINK
                          </span>
                          <br />
                          <a href={v.link}>{v.link}</a>
                        </div>
                        <div
                          className="col-6 text-left float-left"
                          style={{ borderLeft: "1px solid #BFBFBF" }}
                        >
                          <span className="text-muted font-weight-bold">
                            REVIEWED FILE
                          </span>
                          <br />
                          <span>Download</span>
                          <i
                            className="fa fa-download text-primary pl-2"
                            aria-hidden="true"
                          ></i>
                        </div>
                      </div>
                    </div>
                  ))} */}

                    {ministriesData.length > 0 &&
                      ministriesData.map((Mdata, k) =>
                        Mdata.ministry ? (
                          <Ministry
                            key={k}
                            ministryName={Mdata.ministry}
                            fileName={Mdata.file_name}
                            _handleFileDownload={this.props._handleFileDownload}
                          />
                        ) : null
                      )}
                  </div>
                </Scrollbars>

              </div>
          }

        </div>
      </div>
    );
  }
}

export default DetailModal;

const Ministry = (props) => {
  const { ministryName, fileName, _handleFileDownload } = props;

  return (
    <div className="pb-2 w-100">
      <div
        className="d-flex flex-row justify-content-between text-white px-2 py-1"
        style={{ backgroundColor: "#1A65B8" }}
      >
        <div className="text-left" style={{ fontSize: 13 }}>
          {ministryName}
        </div>

        <i
          className="fas fa-external-link-alt text-white pt-1"
          style={{ fontSize: 13 }}
        ></i>
      </div>
      <div className="d-flex flex-row py-1" style={{ fontSize: 12 }}>
        <div
          className="col-6 text-left float-left"
          style={{
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
          }}
        >
          <span className="text-muted font-weight-bold">LINK</span>
          <br />
          {/* <a href={v.link}>{v.link}</a> */}
        </div>
        {fileName && (
          <div
            className="col-6 text-left float-left"
            style={{ borderLeft: "1px solid #BFBFBF" }}
          >
            <span className="text-muted font-weight-bold">REVIEWED FILE</span>
            <br />
            <span>Download</span>
            <i
              className="fa fa-download text-primary pl-2"
              style={{ cursor: "pointer" }}
              onClick={() => _handleFileDownload(fileName)}
              aria-hidden="true"
            ></i>
          </div>
        )}
      </div>
    </div>
  );
};
