import React, { Fragment } from 'react'
import color from '../../Feature/Config/color'
import { ESButton } from '../Questionnaire/components/tools/ES_Button'

const StartPage=(props)=>{
    const windowWidth = window.innerWidth;
    return(
    <Fragment>
        <div className='d-flex flex-row flex-wrap justify-content-center align-items-center' style={{marginTop: windowWidth < 768 ? 135 : 70, minHeight: '75vh',background: 'repeating-linear-gradient(#E7EFFD, #E7EFFD 52%, #fff 48%, #fff 100%)'}}>
            <div className={`${windowWidth< 996 && 'pt-4'} px-5`}>
                <span className="text-left">
                    <h3 style={{ color: '#0265b5' }}>
                    {" "}
                    Welcome to UNDP's Digital Readiness Assessment{" "}
                    </h3>
                    <p >
                    Proin tortor, sapien aenean fusce accumsan scelerisque elit. Semper
                    nibh ullamcorper leo amet vivamus. Blandit risus purus quam nunc non
                    facibus nec vel auctor. Urna viverra congue in vitae tortor quam
                    egesta. Ipsum pulvinar.
                    </p>
                </span>
                <h6 className="text-left pt-4">Please Select a tool to start</h6>
            </div>
            
            <div className="col col-12 col-sm-12 col-lg-6 col-md-6 col-xl-6 pb-2">  
                <div
                    className="container p-0 bg-white text-center shadow"
                    style={{
                        border: `1px solid #E5E5E5`,
                        maxWidth: 600,
                        borderRadius: 10,
                       // marginTop: (windowWidth >= 756 && windowWidth < 1100 ) ?'-6%' : (windowWidth<1100 && windowWidth < 1660) ? '-40%': windowWidth > 1660 ? '-30%' : ''
                        // marginTop: (windowWidth >= 674 &&windowWidth < 768 )? '35%' : (windowWidth >=530  &&windowWidth < 674 ) ? '50%':(windowWidth >=480  &&windowWidth < 530 ) ? '60%': (windowWidth >=410 && windowWidth <480) ? '80%': windowWidth < 410 ? '110%' : '2%'
                    }}
                    >
                    <div className="py-2 fa-3x text-center" style={{color: color.primaryColor}}><i className="fas fa-code-branch"/></div>
                    <h5>Digital Maturity Assessment</h5>
                    <div className="px-5 py-3 text-left text-muted">
                       The Digital Maturity Assessment aims to facilitate the creation and implementation of digital transformation roadmaps, equipping government with a vision of how to lead digital transformation in a sustainable way and create impact for the whole of society. <strong className="text-primary">Learn more.</strong>
                    </div>
                    <div className="col mb-4">
                        <ESButton
                            text={"START ASSESSMENT"}
                            rounded
                            fontSize={15}
                            onClick={() => props.history.push('/digital_maturity_accessment')}
                        />
                    </div>
                </div>
            </div>
            <div className="col col-12 col-sm-12 col-lg-6 col-md-6 col-xl-6 ">
                <div
                    className="container p-0 bg-white text-center shadow"
                    style={{
                        border: `1px solid #E5E5E5`,
                        maxWidth: 600,
                        borderRadius: 10,
                        // marginTop: (windowWidth >= 756 && windowWidth < 1100 ) ?'-6%' : windowWidth > 1660 ? '-30%' : ''
                    }}
                    >
                    <div className="py-2 fa-3x text-center" style={{color: color.primaryColor}}><i className="far fa-map"/></div>
                    <h5>SDG Mapping Survey</h5>
                    <div className="px-5 py-3 text-left text-muted">
                      The Sustainable Development Goals framework offers a systematic and integrated approach towards planning for digital development, given that SDGs and their corresponding targets take into account all 3 dimensions of economic, social and environmental development. <strong className="text-primary">Learn more.</strong>
                    </div>
                    <div className="col mb-4">
                        <ESButton
                            text={"START SURVEY"}
                            rounded
                            fontSize={15}
                            onClick={() => props.history.push('/edit')}
                        />
                    </div>
                </div>
            </div>
        </div>
    </Fragment>
    )
}
export default StartPage