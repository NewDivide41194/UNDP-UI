import React from "react";
import { withCookies } from "react-cookie";
import { withRouter } from "react-router";
import EditIcon from "../Images/Edit_icon.png";
import color from '../Config/color'
import { deleteCookie, readCookie } from "../../helper/cookieUser";
import CountryData from "../../Feature/Config/countries.json";

class Sidebar extends React.PureComponent {
  constructor(props){
    super(props)
    this.state={
      hover: false,
    }
  }

  
  handleHover=(select)=>{
    this.setState ({hover: select})
  }
  
  countryName = (code) => {
    return CountryData.filter((v) => v.code === code)[0].name;
  };

  render() {
    const user = readCookie(this.props.cookies);
    const countryId = user.country_id;
    const roleId = user.role_id;
    const windowHeight =window.innerHeight;
    const pathName=window.location.pathname;
    const handleLogout=this.props.handleLogout
    const sidebarOpen=this.props.sidebarOpen;

    // const ReportButton = (props) => {
    //   const { pathName, icon, name } = props;
    //   return (
    //     <div
    //       style={{
    //         cursor: "pointer",
    //         opacity: window.location.pathname === pathName ? 1 : 0.5,
    //       }}
    //       onClick={() => this.props.history.push(pathName)}
    //       className={"my-4"}
    //     >
    //       {icon}
    //       <div style={{ fontSize: 12, fontWeight: 500 }}>{name}</div>
    //     </div>
    //   );
    // };
    if(!sidebarOpen) return (
      <nav
            className="animate-on-change"
            style={{
              background: "#ECF3F9",
              width: 0,
              position: "fixed",
              height: "100vh",
              boxShadow: "1px 1px 3px 0px rgba(166,180,200,1.2)",
            }}
          >

          </nav>
    )
    return (
      // <div>
      // {sidebarOpen && (
          <nav
            className="animate-on-change"
            style={{
              background: "#ECF3F9",
              // transition: "all 0.3s ease-in-out",
              width: 235,
              position: "fixed",
              height: "100vh",
              boxShadow: "1px 1px 3px 0px rgba(166,180,200,1.2)",
            }}
          >
         <div className={`${sidebarOpen ? "sideBar-Open": "sideBar"} text-left p-2`} 
        //  style={{marginTop: windowHeight > 900 ? '312px' : '160px'}}
         > 
         <div className="pl-2">
         <div className="py-4 border-bottom"><div className="pb-2 " style={{
                  color: "#999999"}}>COUNTRY</div>
         <img
                className="px-2"
                src={`/countryflags/${countryId.toLowerCase()}.svg`}
                alt="country flag"
                width={50}
              />
              <span
                className="font-weight-bold"
                title={this.countryName(countryId)}
                style={{
                  color: "#333333",
                  fontSize: "19px",
                  maxWidth: 130,
                  overflow: "hidden",
                  // whiteSpace: "nowrap",
                  textOverflow: "ellipsis",
                }}
              >
                {this.countryName(countryId)}
              </span>
         </div>
         </div>
         <div className="pt-4">
                {
                  sidebarMenu.map((v,k)=>(
                    v.id==="logout" ? 
                    <div className="footer"
                    onMouseEnter={()=>this.handleHover(v.id)} 
                    onMouseLeave={()=>this.handleHover(null)} 
                    onClick={()=>handleLogout()}
                    style={{ 
                      position: 'absolute',
                      left: 5,
                      bottom: 0,
                      width: 225,
                      textAlign: 'center',
                      background: this.state.hover === v.id || pathName === v.link ? color.secondaryColor : '#ECF3F9',
                      borderRadius: this.state.hover === v.id || pathName === v.link ? '6px': '',
                      color: this.state.hover === v.id || pathName === v.link ? '#fff': color.greyColor,
                      cursor: 'pointer'
                    }}>
                      <div className="row border-bottom mx-1"/>
                      <i className={`${v.icon} pr-2 py-3 fa-lg `}  style={{color: this.state.hover === v.id || pathName === v.link  ? '#fff': color.primaryColor}}/>
                      {v.text}
                      
                    </div>
                    
                     : 
                     roleId === 1 ?
                    <div className="p-2 mb-2 d-flex flex-row"
                    onMouseEnter={()=>this.handleHover(v.id)} 
                    onMouseLeave={()=>this.handleHover(null)} 
                    onClick={() => this.props.history.push(v.link)}
                    style={{ 
                      zIndex: 1,
                      background: this.state.hover === v.id || pathName === v.link ? color.secondaryColor : '#ECF3F9',
                      borderRadius: this.state.hover === v.id || pathName === v.link ? '6px': '',
                      color: this.state.hover === v.id || pathName === v.link ? '#fff': color.greyColor,
                      cursor: 'pointer',
                    }}>
                      <div className style={{textAlign:'center',width:"30px"}}>
                      <i className={`${v.icon} fa-lg`}  style={{color: this.state.hover === v.id || pathName === v.link  ? '#fff': color.primaryColor}}/></div>
                      {v.text}
                    </div>
                    :
                    (
                      v.id!=='user' &&
                      <div className="p-2 mb-2 d-flex flex-row"
                    onMouseEnter={()=>this.handleHover(v.id)} 
                    onMouseLeave={()=>this.handleHover(null)} 
                    onClick={() => this.props.history.push(v.link)}
                    style={{ 
                      zIndex: 1,
                      background: this.state.hover === v.id || pathName === v.link ? color.secondaryColor : '#ECF3F9',
                      borderRadius: this.state.hover === v.id || pathName === v.link ? '6px': '',
                      color: this.state.hover === v.id || pathName === v.link ? '#fff': color.greyColor,
                      cursor: 'pointer',
                    }}>
                      <div className style={{textAlign:'center',width:"30px"}}>
                      <i className={`${v.icon} fa-lg`}  style={{color: this.state.hover === v.id || pathName === v.link  ? '#fff': color.primaryColor}}/></div>
                      {v.text}
                    </div>
                    )
                  ))
                }
                </div>
            </div>

          </nav>
          // <nav
          //   style={{
          //     background: "#E1E1E1",
          //     width: 70,
          //     position: "fixed",
          //     height: "100vh",
          //     zIndex: 100,
          //   }}
          // >
          //   <ReportButton
          //     pathName={"/edit"}
          //     icon={
          //       <img
          //         alt=""
          //         className="bg-dark p-2"
          //         src={EditIcon}
          //         style={{ borderRadius: 8, width: 41, height: 41 }}
          //       />
          //     }
          //     name={"Edit"}
          //   />
          //   <ReportButton
          //     pathName={"/sdg_mapping_survey"}
          //     icon={
          //       <i
          //         className="fas fa-chart-line text-white bg-dark px-2"
          //         style={{
          //           fontSize: 25,
          //           borderRadius: 8,
          //           height: 41,
          //           width: 41,
          //           paddingTop: 9,
          //         }}
          //       />
          //     }
          //     name={"Report"}
          //   />
          //  {/* {roleId===1&& <ReportButton
          //     pathName={"/admin_dashboard"}
          //     icon={
          //       <i
          //         className="fas fa-users-cog text-white bg-dark px-2"
          //         style={{
          //           fontSize: 21,
          //           borderRadius: 8,
          //           height: 41,
          //           width: 41,
          //           paddingTop: 11,
          //         }}
          //       />
          //     }
          //     name={"Users"}
          //   />} */}
          // </nav>
        // )}
      // </div>
    );
  }
}
export default withRouter(withCookies(Sidebar));

const sidebarMenu=[
  {id: 'home', text: 'Home', icon: "fa fa-home", link: "/landing_page"},
  {id: 'survey', text: 'Digital Maturity Assessment', icon: "fas fa-list-alt", link: '/digital_maturity_accessment'},
  {id: 'survey_report', text: 'Digital Maturity Overview', icon: "fas fa-chart-line", link: '/digital_landScape_survey'},
  {id: 'sdg',text: 'SDG Based Mapping', icon: "fas fa-map-marked-alt", link: '/edit'},
  {id: 'report',text: 'SDG Overview', icon: "fas fa-chart-pie", link: '/sdg_mapping_survey'},
  {id: 'user',text: 'Manage User Accounts', icon: "fas fa-users", link: '/admin_dashboard'},
  {id: 'logout',text: 'logout', icon: "fas fa-sign-out-alt", link: '/login'}
]
