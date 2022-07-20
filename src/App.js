import React, { useEffect, useState } from 'react';
import './App.css';
import Report from './Pages/Report/Container/reportContainer';
import Edit from './Pages/Edit/Container/editContainer'
import Nav from './Feature/Tools/nav';
import Sidebar from './Feature/Tools/sidebar';
import { Switch, Route, Redirect, withRouter } from 'react-router-dom';
import DigitalDevelopment from './Pages/DigitalDevelopment/Container/DigitalDevelopment';
import QuestionContainer from './Pages/Questionnaire/container/QuestionContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import LoginContainer from './Pages/Login/container/loginContainer';
import EvalutionResult from './Pages/Questionnaire/components/EvalutionResult'
import LandingPage from './Pages/LandingPages/landingPage';
import DMAssessment from './Pages/LandingPages/DMAssessment';
import SDGMappingSurvey from './Pages/LandingPages/SDGMappingSurvey';
import RegisterContainer from './Pages/Register/container/registerContainer'
import AdminDashboard from './Pages/Admin/container/AdminDashboard';
import ErrorPage from './Pages/ErrorPage/errorPage';
import SurveyReport from './Pages/DMAReport/container/SurveyReport';
import StartPage from './Pages/LandingPages/startPage';
import MFA from '../src/Feature/Images/MFA estonia.png';
import PDD from '../src/Feature/Images/PDD-UpdatedLogo-1.png';
import TGG from '../src/Feature/Images/TGG_Icon_Color_18.png';
import color from './Feature/Config/color';
import { withCookies } from "react-cookie";
import { deleteCookie, readCookie } from "./helper/cookieUser";
import EditContainer_v2 from './Pages/Edit_v2/Container/editContainer_v2';

const App = (props) => {

  const [windowWidth, setWindowWidth] = useState(window.innerWidth)
  const [sidebarOpen, setSideOpen] = useState(false)
  const pathName = window.location.pathname
  const user = readCookie(props.cookies);
  const reportWindowSize = (e) => {
    setWindowWidth(e.target.innerWidth)
  }

  const handleLogout = () => {
    props.history.push("/login")
    setSideOpen(false)
  };

  const handleViewSidebar = () => {
    setSideOpen(!sidebarOpen)
    localStorage.setItem('sidebarOpen', !sidebarOpen)
  }
  window.addEventListener('resize', reportWindowSize);

  useEffect(() => {
    if (pathName === "/login" || pathName === "/register" || pathName === "/" || pathName === "/sdg_mapping_survey" || pathName === "/sdg_targets_and_DigitalDevelopment" ){
      document.getElementsByClassName('body-background-color')[0].style.background = '#EDF2F8';
    }else if(pathName === "/landing_page" || pathName === "/startPage"){
      document.getElementsByClassName('body-background-color')[0].style.background = '#fff';
    }else {
      document.getElementsByClassName('body-background-color')[0].style.background = '#ffffff';
    }
    // #f3f3f3
      
  }, [pathName])
  return (
    <div className="App" >
      {
        (pathName === "/login" ||
          pathName === "/register" ||
          pathName === "/" ||
          pathName === "/landing_page" ||
          pathName === "/startPage" ||
          pathName === '/sdg_survey' ||
          pathName === '/digital_assessment') &&
        <Nav windowWidth={windowWidth} pathName={pathName} />
      }
      <div className={`btn-group`} style={{position:'absolute',top:17,right:17,zIndex:1}}>
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
                    onClick={()=>handleLogout()}
                    style={{ cursor: 'pointer'}}
                  >
                    <i className="fas fa-sign-out-alt" aria-hidden="true" style={{fontSize : 21, color: color.greyColor}}></i>
                    <div className="pl-2">Log Out</div> 
                  </div>
                </div>
              </div>
      <div
        className='d-flex flex-row'
        style={{
          // marginTop: (!(pathName === "/login" || 
          //               pathName === "/register" || 
          //               pathName === "/" || 
          //               pathName === "/landing_page"  || 
          //               pathName === '/sdg_survey' || 
          //               pathName === '/digital_assessment')) && 
          //               (windowWidth < 300 ? 136 : windowWidth < 446 ? 96 : windowWidth<483 ? 73.54 : windowWidth < 561 ? 108 : 73.54) , 
          // overflow: 'hidden' 
        }}
      >
        {
          !(pathName === "/login" || pathName === "/register" || pathName === "/" || pathName === '/landing_page' || pathName === '/startPage') &&
          // <div className='' style={{ width: windowWidth > 992 && 70 }}>
          <div className='animate-on-change'  style={{ zIndex: 30, transition: "left 0.3s ease-in-out", width: sidebarOpen ? 225 : 0 }}>
            <img 
              src={sidebarOpen ?'/Vector.svg':(window.location.pathname==="/edit" ? (window.innerWidth <= 925 ? 'GroupBlack.svg' : 'Group.svg') : (window.innerWidth<766 || window.location.pathname!=="/digital_maturity_accessment" )? 'GroupBlack.svg':'Group.svg')} 
              className= 'pt-2' onClick={() => handleViewSidebar()} style={{ position: (window.location.pathname==="/digital_maturity_accessment"&&!sidebarOpen)? 'absolute':'fixed', zIndex: 1, top:window.innerWidth<766?"15px":"32px", cursor: 'pointer', left: sidebarOpen ? '192px' : '25px' }}/>
            {/* <i className={`${sidebarOpen ? 'fa fa-times' : 'fa fa-bars' } fa-lg p-2`} onClick={() => handleViewSidebar()} style={{ position: window.location.pathname==="/digital_maturity_accessment"? 'absolute':'fixed', zIndex: 1, top:window.innerWidth<766?"15px":"32px", cursor: 'pointer', left: sidebarOpen ? '192px' : '18px' }}></i> */}
            <Sidebar windowWidth={windowWidth} handleLogout={()=>handleLogout()} sidebarOpen={sidebarOpen} />
          </div>
        }
        <div
          className='col mt-0'
          style={{ 
            display: 'flex',
            flexDirection: 'column',
            // minHeight: window.innerHeight - 73.5,
            marginTop: (pathName === "/login" || pathName === "/" || pathName === "/register") ? (windowWidth > 583 ? 73.5 : 150.5) : '1rem',
            paddingLeft: sidebarOpen&&pathName === "/sdg_targets_and_DigitalDevelopment" ? 220 : 0
            // height: (pathName === "/login" || pathName === "/"  || pathName === "/register" ) && '100vh' 
          }}
        >
          <Switch>
            <Route exact path='/edit' component={EditContainer_v2} />
            
            <Route exact path='/sdg_mapping_survey' component={Report} />
            <Route exact path='/admin_dashboard' component={AdminDashboard} />
            {/* <Route exact path='/edit' component={Edit} /> */}
            <Route exact path='/sdg_targets_and_DigitalDevelopment' component={DigitalDevelopment} />
            <Route exact path='/digital_maturity_accessment' component={QuestionContainer} />
            <Route exact path='/digital_maturity_accessment/surveySummary' component={EvalutionResult} />
            <Route exact path='/digital_landScape_survey' component={SurveyReport} />
            <Route exact path='/login' render={()=><LoginContainer {...props}/>} />
            <Redirect to='/login' from='/' component={LoginContainer} exact />

            <Route exact path='/register' component={RegisterContainer} />

            <Route exact path='/landing_page' component={LandingPage} />
            <Route exact='/startPage' component={StartPage} />
            <Route exact path='/digital_assessment' component={DMAssessment} />
            <Route exact path='/sdg_survey' component={SDGMappingSurvey} />
            
            <Route
              path="*"
              component={() => <ErrorPage ErrorInfo={"Page Not Found!"} />}
            />
          </Switch>
        </div>

      </div>
      <ToastContainer autoClose={4000} position="bottom-left" limit={1} />
      {
        (pathName === "/startPage" || pathName === '/landing_page' || pathName ==='/digital_maturity_accessment') ?
          <footer className="text-right pr-5" style={{background:pathName ==='/digital_maturity_accessment'&&'rgb(230, 230, 230)'}}>
            <img alt="" src={MFA} style={{ width: 200 }} />
          </footer>
          : (pathName === "/" || pathName === '/login' || pathName === '/register') &&
          <footer className="text-right mr-4 "
            style={pathName === "/" || pathName === '/login' ?
              { position: 'absolute', bottom: windowWidth > 583 ? 10 : -120, right: 0 }
              : { position: window.innerHeight >= 984 ? 'absolute' : 'relative', bottom: window.innerHeight >= 984 ? 10 : -100, right: 0 }}>
            <img alt="" src={PDD} className='mt-1 mx-1' style={{ width: 155 }} />
            <img alt="" src={TGG} className='mx-1' style={{ width: 60 }} />
          </footer>
      }

    </div>
  );
}

export default withCookies(withRouter(App));