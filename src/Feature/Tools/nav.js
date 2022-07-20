import React from "react";
import color from "../Config/color";
import font from "../Config/font";
import Principle from "../Images/PDD-UpdatedLogo-1.png";
import Global from "../Images/TGG_Icon_Color_18.png";
import UNDP from "../Images/logo.png";
import EditIcon from "../Images/Edit_icon.png";
import MFA from "../Images/MFA estonia.png";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import { withCookies } from "react-cookie";
import { deleteCookie, readCookie } from "../../helper/cookieUser";
import { ESButton } from "../../Pages/Questionnaire/components/tools/ES_Button";

class Nav extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
  }
  resize = () => this.forceUpdate();

  handleLogout = () => {
    deleteCookie(this.props.cookies);
    window.location.href = "/login";
  };

  routeLink = (str) => {
    if (str === "sdg_mapping_survey") {
      var i,
        frags = str.split("_");
      for (i = 0; i < frags.length; i++) {
        frags[i] =
          frags[0] == "sdg"
            ? frags[0].substring(0, 3).toUpperCase()
            : frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
    } else {
      var i,
        frags = str.split("_");
      for (i = 0; i < frags.length; i++) {
        frags[i] = frags[i].charAt(0).toUpperCase() + frags[i].slice(1);
      }
    }
    return frags.join(" ");
  };

  render() {
    const user = readCookie(this.props.cookies);
    const roleId=user&&user.role_id
    const windowWidth = this.props.windowWidth;
    const pathName = this.props.pathName;
    //console.log("pathName",window.location.pathname)
    let path = pathName.replace(/\/+$/, "");
    path = path[0] == "/" ? path.substr(1) : path;
    // console.log("Path->", path)
   
    return (
      <div>
        {
        pathName === "/login" ||
        pathName === "/register" ||
        pathName === "/" ||
        pathName === "/digital_assessment" ||
        pathName === "/sdg_survey" ? (
          <nav
            className="navbar navbar-expand-lg fixed-top justify-content-between"
            style={{
              height: windowWidth <= 582 ? 77 + 73.54 : 73.54,
              backgroundColor:
              (pathName === "/login" || pathName === "/register" || pathName === "/" ) ?
              "#EDF2F8"  : "#fff" ,
            }}
          >
            <a
              className={`navbar-brand ${window.innerWidth < 992 && "pt-0"} ${
                window.innerWidth < 627 && "pl-3"
              }`}
              href="#"
            >
              <div className="float-left pr-3">
                <img alt="" src={UNDP} style={{ width: 30 }} />
              </div>
              <div className='mt-1' style={{ lineHeight: 1.7, color: color.secondaryText }}>
                <div
                  className="font-weight-bold text-nowrap"
                  style={{
                    fontSize: windowWidth < 396 ? font.small : font.labels,
                  }}
                >
                  UNITED NATIONS DEVELOPMENT PROGRAMME
                </div>
                <div
                  className="text-nowrap text-left text-muted"
                  style={{
                    fontSize:
                      windowWidth < 396 ? font.small : font.graphLabels,
                  }}
                >
                  Digital Readiness Assessment
                </div>
              </div>
            </a>
            <a
            className={`navbar-brand ${window.innerWidth < 992 && "pt-0"} ${
              window.innerWidth < 627 && "pl-1"
            }`}
            href="#"
          >
            <img alt="" src={MFA} style={{ width: 200 }} />
          </a>       
          </nav>

        ) : 
        pathName === "/landing_page" ||
        pathName === "/startPage" ? (
          <nav
            className="navbar navbar-expand-lg fixed-top justify-content-between"
            style={{
              height: windowWidth <= 582 ? 77 + 73.54 : 73.54,
              backgroundColor: "#fff",
            }}
          >
            <a
              className={`navbar-brand ${window.innerWidth < 992 && "pt-0"} ${
                window.innerWidth < 627 && "pl-3"
              }`}
              href="#"
            >
              <div className="float-left pr-3">
                <img alt="" src={UNDP} style={{ width: 30 }} />
              </div>
              <div className='mt-1' style={{ lineHeight: 1.7, color: color.secondaryText }}>
                <div
                  className="font-weight-bold text-nowrap"
                  style={{
                    fontSize: windowWidth < 396 ? font.small : font.labels,
                  }}
                >
                  UNITED NATIONS DEVELOPMENT PROGRAMME
                </div>
                <div
                  className="text-nowrap text-left text-muted"
                  style={{
                    fontSize:
                      windowWidth < 396 ? font.small : font.graphLabels,
                  }}
                >
                  Digital Readiness Assessment
                </div>
              </div>
            </a>
            <div className="col-xl-5 col-lg-5 col-md-12 col-12 p-0" style={{}}>
              <div className={`btn-group float-right`}>
                <button
                  className="btn shadow-none"
                  type="button"
                  id="accountMenuBtn"
                  data-toggle="dropdown"
                  aria-haspopup="true"
                  aria-expanded="false"
                >
                  <i className="fas fa-user-circle fa-lg pr-2 text-secondary"></i>
                  <span className="font-weight-bold text-dark mb-5">
                    {user && user.email}
                    <i
                      className="fa fa-caret-down pl-2 pt-1"
                      aria-hidden="true"
                    ></i>
                  </span>
                </button>
                <div
                  className="dropdown-menu"
                  aria-labelledby="accountMenuBtn"
                >
                  <div
                    className="dropdown-item d-flex flex-row"
                    onClick={this.handleLogout}
                    style={{ cursor: 'pointer'}}
                  >
                    <i className="fas fa-sign-out-alt" aria-hidden="true" style={{fontSize : 21, color: color.greyColor}}></i>
                    <div className="pl-2">Log Out</div> 
                  </div>
                </div>
              </div>
            </div>
             
          </nav>

        ) :
        
        (
          <nav
            className="navbar bg-white navbar-expand-lg fixed-top justify-content-between"
            style={{ height: windowWidth < 300 ? 136 : windowWidth < 446 ? 96 : windowWidth<483 ? 73.54 : windowWidth < 561 ? 108 : 73.54 }}
          >
            <div className='d-flex flex-nowrap justify-content-between w-100'>
              <div className="d-flex flex-row flex-wrap" id='nav-btn'>
                <div className='py-1 pr-2' 
                  style={{
                    // opacity : pathName === "/landing_page" ? 1 : 0.5
                  }}
                >
                  <ESButton 
                    onClick={()=> this.props.history.push("/landing_page")} 
                    text={<i className="fa fa-home"/>}  
                    fontSize={ window.innerWidth <= 482 && font.small}
                    style={{ width: 42 }}
                    pressed={
                      pathName === "/landing_page" ? true : false
                    }
                  />
                </div>
                <div className='py-1 pr-2' 
                  style={{
                    // opacity : pathName === "/digital_maturity_accessment" || pathName === "/digital_maturity_accessment/surveySummary" ? 1 : 0.5
                    }}
                >
                  <ESButton 
                    onClick={()=> this.props.history.push("/digital_maturity_accessment")} 
                    text={"Digital Maturity Assessment"}  
                    fontSize={ window.innerWidth <= 482 && font.small}
                    pressed={
                      pathName === "/digital_maturity_accessment" || pathName === "/digital_maturity_accessment/surveySummary" ? true : false
                    }
                  />
                </div>
                <div className="py-1 pr-2" 
                  style={{
                    // opacity : pathName === "/sdg_mapping_survey" || pathName === "/edit" || pathName === "/sdg_targets_and_DigitalDevelopment"? 1 : 0.5
                  }}
                >
                  <ESButton 
                    onClick={()=> this.props.history.push("/edit")} 
                    text={"SDG Mapping Survey"} 
                    fontSize={ window.innerWidth <= 482 && font.small}
                    pressed={
                      pathName === "/sdg_mapping_survey" || pathName === "/edit" || pathName === "/sdg_targets_and_DigitalDevelopment"? true : false
                    }
                  />
                </div>
              </div>
                <button
                  className={`navbar-toggler p-0 `}
                  type="button"
                  style={{ outline: "none" }}
                  data-toggle="collapse"
                  data-target=".navbar-collapse"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <i className="fa fa-bars text-secondary" aria-hidden="true"></i>
              </button>
              {windowWidth > 992 && (
              <div
                className={`collapse navbar-collapse row justify-content-end `}
              >
                <div className="col-xl-5 col-lg-5 col-md-12 col-12 p-0" style={{}}>
                  <div className={`btn-group float-right`}>
                    <button
                      className="btn shadow-none"
                      type="button"
                      id="accountMenuBtn"
                      data-toggle="dropdown"
                      aria-haspopup="true"
                      aria-expanded="false"
                    >
                      <i className="fas fa-user-circle fa-lg pr-2 text-secondary"></i>
                      <span className="font-weight-bold text-dark mb-5">
                        {user && user.email}
                        <i
                          className="fa fa-caret-down pl-2 pt-1"
                          aria-hidden="true"
                        ></i>
                      </span>
                    </button>
                    <div
                      className="dropdown-menu"
                      aria-labelledby="accountMenuBtn"
                    >
                      { roleId === 1 && 
                      <div
                        className="dropdown-item d-flex flex-row"
                        style={{ cursor: 'pointer' }}
                        onClick={() => this.props.history.push("/admin_dashboard")}
                      >
                      <i
                        className="fas fa-users-cog "
                        style={{
                          color: color.greyColor,
                          fontSize: 18,
                          height: 30,
                          width: 30,
                          paddingTop: 9,
                        }}
                      />
                       <div className="pt-1">Users</div> 
                      </div> }
                      <div
                        className="dropdown-item d-flex flex-row"
                        onClick={this.handleLogout}
                        style={{ cursor: 'pointer'}}
                      >
                        <i className="fas fa-sign-out-alt" aria-hidden="true" style={{fontSize : 21, color: color.greyColor}}></i>
                       <div className="pl-2">Log Out</div> 
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) 
            }
            </div>
            {!(windowWidth > 992) && (
              <div
                className="collapse navbar-collapse row justify-content-end"
                id="navbarNavAltMarkup"
                style={{ zIndex: 100 }}
              >
                <div
                  className="bg-white"
                  style={{
                    width: 250,
                    height: 200,
                    borderRadius: 10,
                    boxShadow: "0 2px 5px 0 rgba(166,180,200,1.2)",
                  }}
                >
                  <div className="col-xl-5 col-lg-5 col-md-12 col-12 pl-0">
                    <div className={`'float-right'}`}>
                      <img
                        alt=""
                        src={Principle}
                        style={{ width: "130px", height: "25px" }}
                      />
                      <img
                        alt=""
                        src={Global}
                        style={{ width: "70px", height: "70px" }}
                      />
                    </div>
                  </div>

                  <div className="row justify-content-around mb-2">
                    <div
                      // className="mr-4"
                      data-toggle="collapse"
                      data-target=".navbar-collapse"
                      style={{
                        cursor: "pointer",
                        opacity:
                          window.location.pathname === "/sdg_mapping_survey"
                            ? 1
                            : 0.5,
                      }}
                      onClick={() =>
                        this.props.history.push("/sdg_mapping_survey")
                      }
                    >
                      <i
                        className="fas fa-chart-line text-white bg-dark p-2"
                        style={{
                          fontSize: 25,
                          borderRadius: 8,
                          width: 40,
                          height: 40,
                        }}
                      ></i>
                      <div style={{ fontSize: 12, fontWeight: 500 }}>
                        Report
                      </div>
                    </div>
                    <div
                      data-toggle="collapse"
                      data-target=".navbar-collapse"
                      style={{
                        cursor: "pointer",
                        opacity: window.location.pathname === "/edit" ? 1 : 0.5,
                      }}
                      onClick={() => this.props.history.push("/edit")}
                    >
                      <img
                        alt=""
                        className="bg-dark p-2"
                        src={EditIcon}
                        style={{ borderRadius: 8, width: 40, height: 40 }}
                      ></img>
                      <div
                        className=""
                        style={{ fontSize: 12, fontWeight: 500 }}
                      >
                        Edit
                      </div>
                    </div>
                    {roleId===1&&
                    <div
                      data-toggle="collapse"
                      data-target=".navbar-collapse"
                      style={{
                        cursor: "pointer",
                        opacity:
                          window.location.pathname === "/admin_dashboard" ? 1 : 0.5,
                      }}
                      onClick={() => this.props.history.push("/admin_dashboard")}
                      // className={"my-4"}
                    >
                      <i
                        className="fas fa-users-cog text-white bg-dark p-2"
                        style={{
                          fontSize: 22,
                          borderRadius: 8,
                          width: 40,
                          height: 40
                        }}
                      />
                      <div style={{ fontSize: 12, fontWeight: 500 }}>Users</div>
                    </div>}
                  </div>

                  <div className="dropdown-divider m-0" />
                  <div
                    className="col-xl-5 col-lg-5 col-md-12 col-12"
                    style={{}}
                  >
                    <div className={`btn-group float-right`}>
                      <button
                        className="btn shadow-none"
                        type="button"
                        id="accountMenuBtn"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                      >
                        <i className="fas fa-user-circle fa-lg pr-2 text-secondary"></i>
                        <span className="font-weight-bold text-dark mb-5">
                          {user && user.email}
                          <i
                            className="fa fa-caret-down pl-2 pt-1"
                            aria-hidden="true"
                          ></i>
                        </span>
                      </button>
                      <div className="dropdown-menu dropdown-menu-left">
                        <a
                          data-toggle="collapse"
                          data-target=".navbar-collapse"
                          className="dropdown-item"
                          href="#"
                          onClick={this.handleLogout}
                        >
                          Log Out
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            {/* <ol className="breadcrumb mt-3 p-0 bg-white">
              <li className="breadcrumb-item">
                <a href="/landing_page">Start</a>
              </li>
              {totalRoute.map((v, i) => {
                //console.log(totalRoute.length - 1 == i)
                return (
                  <li
                    className={`breadcrumb-item  ${
                      totalRoute.length - 1 == i ? "active" : ""
                    }`}
                    aria-current="page"
                    key={i}
                  >
                    <Link
                      to={`/${v}`}
                      onClick={
                        totalRoute.length - 1 == i
                          ? (event) => event.preventDefault()
                          : null
                      }
                      style={
                        totalRoute.length - 1 == i
                          ? { color: "grey", cursor: "default" }
                          : {}
                      }
                    >
                      {this.breadCrumbs(v)}
                    </Link>
                  </li>
                );
              })}
            </ol> */}
          </nav>
        )}
      </div>
    );
  }
}
export default withCookies(withRouter(Nav));
