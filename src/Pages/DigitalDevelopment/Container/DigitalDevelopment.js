import React from "react";
import HeatMap from "../../../Feature/Graphs/heatmap";
import DetailModal from "../../Report/Component/detailModal";
import font from "../../../Feature/Config/font";
import Spinner from "../../../Feature/Images/Spinner.gif";
import Colors from "../../../Feature/Config/color";
import { toast } from "react-toastify";
import "../../../App.css";
import {
  DownloadFile,
  FetchHeatmapData,
  FetchTargetDetailData,
} from "../../../Api/dataFetch";
import { deleteCookie, readCookie } from "../../../helper/cookieUser";
import { withCookies } from "react-cookie";
import { checkTokenExist } from "../../../helper/checkAccess";
import io from "socket.io-client";
import * as API from "../../../Api/url";

var socket_noti;
class DigitalDevelopment extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      heatMapData: [],
      targetDetailData: {},
      ministriesData: [],
      user: readCookie(this.props.cookies),
      countryId: null,
      userId: null,
      isUpdate: true,
      ministry: null,
      ppIndex: 0,
      // scroll: null,
    };
    socket_noti = io(API.LastUpdateNoti, { transports: ["websocket"] });
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    if (
      checkTokenExist(this.state.user, this.props.history, this.props.cookies)
    ) {
      this.setState(
        {
          userId: this.state.user.user_id,
          countryId: this.state.user.country_id,
          ministry: this.state.user.ministry,
        },
        () => this.getHeatmapData()
      );
    }
    socket_noti.on("updateInfo", (msg) => {
      // console.log('msg', msg)
      if (msg.isLastUpdateInfo) {
        // if (this.state.user.user_id && this.state.user.country_id) {
        this.getHeatmapData();
        // }
      }
    });
  }

  componentWillUnmount() {
    // socket_noti.off("updateInfo");
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector('body').classList.remove("modal-open");
      const list = document.querySelectorAll('.modal-backdrop')
      for (let i = 0; i < list.length; i++) {
        list[i].style.display = 'none'
      }
    }
  }
  // scroll=(direction)=>{
  //   let far = document.getElementById("image-container").width()/2*direction;
  //   let pos = document.getElementById("image-container").scrollLeft() + far;
  //   document.getElementById("image-container").animate( { scrollLeft: pos }, 1000)
  // }

  getHeatmapData = () => {
    const { user, userId } = this.state;
    this.setState({ isUpdate: true });

    if (checkTokenExist(user, this.props.history, this.props.cookies)) {
      FetchHeatmapData(
        {
          userId,
        },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(this.props.cookies);
              this.props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            this.setState({ heatMapData: data.payload });
            this.setState({ isUpdate: false });
          }
        },
        { token: user.token }
      );
    }
  };

  getTargetDetailData = ({ clickedData }) => {
    const { user, userId } = this.state;
    this.setState({
      targetDetailData: {}
    })
    if (checkTokenExist(user, this.props.history, this.props.cookies)) {
      FetchTargetDetailData(
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(this.props.cookies);
              this.props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            // const target_name=data.payload.data[0].target_name
            const Data = data.payload.data;
            const targetDetailData = {
              ...Data,
              aligned: clickedData.aligned,
              target_name: data.payload.target_name,
              sector_name: clickedData.sector_name,
              sdg_title: clickedData.sdg_title,
              sdg_id: clickedData.sdg_id,
              ssa_id: clickedData.ssaId,
            };
            const ministriesData = data.payload.ministries;

            this.setState({ ministriesData, targetDetailData, ppIndex: 0 });

            // this.setState({ targetDetailData });
          }
        },
        {
          /* target_name: clickedData.target_name, */ sdgId: clickedData.sdg_id,
          targetId: clickedData.sdg_target_id,
          sectorId: clickedData.sector_id,
          countryId: this.state.countryId,
          userId: userId,
          ssaId: clickedData.ssaId,
        },
        { token: user.token }
      );
    }
  };

  _handleTabChange = (e) => {
    const clickedIndex = parseInt(e.target.id);
    this.setState({ ppIndex: clickedIndex });
  };

  _handleFileDownload = (fileName) => {
    const { user, userId } = this.state;
    if (checkTokenExist(user, this.props.history, this.props.cookies)) {
      DownloadFile(
        {
          userId,
          fileName,
        },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(this.props.cookies);
              this.props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            window.open(data.payload);
          }
        },
        { token: user.token }
      );
    }
  }; 

  render() {
    // console.log(this.state.targetDetailData, this.state.heatMapData);
    return (
      <div className=''>
        <div
          className="d-flex flex-row flex-wrap justify-content-between pt-4"
          style={{ paddingLeft: window.innerWidth <= 991 || 80 }}
        >
          <div
            className="d-flex flex-col py-1"
            style={{ fontSize: 17, fontWeight: 500, whiteSpace: "nowrap" }}
          >
            View all Detailed Records
          </div>

          {/* <div className='d-flex flex-col col justify-content-center px-1 btn my-1 text-muted' style={{ whiteSpace: 'nowrap', fontSize: font.regular, fontWeight: 500, }}>
                        <span className=' ml-2 mr-1'>Overall</span>
                        <label className="switch">
                            <input type="checkbox" />
                            <span className="slider round"></span>
                        </label>
                        <span className='ml-1 '>Digital Development</span>
                    </div> */}

          <DigitalDevelopmentLegends
            id={"mchart_leg"}
            aligned_data={aligned_data}
          />
        </div>
        <div
          className="text-left text-muted"
          style={{
            fontSize: 17,
            fontWeight: 500,
            whiteSpace: "nowrap",
            paddingLeft: window.innerWidth <= 991 || 80,
          }}
        >
          (Click to Expand)
        </div>
       
        {this.state.heatMapData.length > 0 && this.state.isUpdate === false ? (
            <HeatMap
              data={this.state.heatMapData}
              getTargetDetailData={this.getTargetDetailData}
            />
        ) : (
          <div style={{ marginTop: "20%" }}>
            <img alt="spinner" src={Spinner} style={{ width: 120 }} />
            <br />
            Updating . . .
          </div>
        )}
        <DetailModal
          _handleFileDownload={this._handleFileDownload}
          ministry={this.state.ministry}
          linkGroups={linkGroups}
          targetDetailData={this.state.targetDetailData}
          ministriesData={this.state.ministriesData}
          _handleTabChange={this._handleTabChange}
          ppIndex={this.state.ppIndex}
        />
      </div>
    );
  }
}
export const DigitalDevelopmentLegends = (props) => {
  const { aligned_data, id } = props;
  return (
    <div
      id={id}
      className={`d-flex flex-col mt-4 ${window.innerWidth <= 601 || window.innerWidth <= 991
        ? "col-12"
        : "justify-content-end"
        }  p-0 mb-2`}
      style={{ fontSize: font.regular, fontWeight: 500}}
    >
      <div
        className={`d-flex flex-row ${window.innerWidth > 1100 || id === "sbar_leg"
          ? "flex-wrap bg-white"
          : "flex-nowrap bg-white"
          } justify-content-between my-1`}
      >
        {aligned_data.map((v, k) => (
          <div key={k} className="px-2 py-1" style={{ whiteSpace: "nowrap" }}>
            <span
              className="mr-2"
              style={{
                height: 10,
                width: 10,
                backgroundColor: Colors["Align" + (k + 1)],
                display: "inline-block",
                border: "1px solid #c6c6c6",
              }}
            ></span>
            {v.name}
          </div>
        ))}
      </div>
    </div>
  );
};

const aligned_data = [
  { name: "SDG Aligned", color: "#30cfb9" },
  { name: "In Progress", color: "#f9d478" },
  { name: "Not Aligned", color: "#ef2348" },
  { name: "Not Relevant", color: "#ffffff" },
];

const linkGroups = [
  {
    title: "Budget Speech. 2020 - 2021",
    link: "https://socialintegration.govmu.org/Documents/ann",
  },
  {
    title: "Voluntary National Review of Mauritius 2019",
    link: "https://sustainabledevelopment.un.org/content/docu",
  },
  {
    title: "Budget Speech. 2020 - 2021",
    link: "https://socialintegration.govmu.org/Documents/ann",
  },
  {
    title: "Voluntary National Review of Mauritius 2019",
    link: "https://sustainabledevelopment.un.org/content/docu",
  },
  {
    title: "Budget Speech. 2020 - 2021",
    link: "https://socialintegration.govmu.org/Documents/ann",
  },
  {
    title: "Voluntary National Review of Mauritius 2019",
    link: "https://sustainabledevelopment.un.org/content/docu",
  },
];
export default withCookies(DigitalDevelopment);

/// heatmap's old color //
//   fullyALigned: '#00D748',
//   partiallyAlgined: '#f5b85e',
//   notAligned: '#f0424d'
