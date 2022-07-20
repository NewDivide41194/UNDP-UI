import React from 'react'
import { withRouter } from 'react-router'
import { ESButton } from '../Questionnaire/components/tools/ES_Button'
import color from '../../Feature/Config/color'
import font from '../../Feature/Config/font'
import estonia from '../../Feature/Images/MFA estonia.png'
import ega from '../../Feature/Images/Questionnaire/ega.png'
import DMA from '../../Feature/Images/Preview/DMA.PNG'
import SDG from '../../Feature/Images/Preview/EditMenu.png'

const DescriptionPage = (props) => {
    const { selectedSite, selectedCountry } = props;
    const windowWidth = window.innerWidth;
    return (
        <React.Fragment>
            {selectedCountry ?
                <div 
                    className='container py-3 bg-white' 
                    style={{ 
                        borderRadius: 5, 
                        // position: 'relative', 
                        // top: windowWidth > 767 && '50%', 
                        // left: windowWidth > 767 && '50%', 
                        height:  windowWidth > 1220 && 435,
                        // transform: windowWidth > 767 && 'translate(-50%, -50%)'
                    }}
                >
                    <div className='row justify-content-start justify-content-between m-1 align-items-center'>
                        <div className=''>
                            <ESButton
                                rightIcon={<i className="fa fa-arrow-circle-right ml-1" aria-hidden="true"></i>}
                                text={DescriptionData[selectedSite].btnText}
                                onClick={() => props.history.push(DescriptionData[selectedSite].goTo)}
                            />
                        </div>
                        <img 
                            src={DescriptionData[selectedSite].logoSrc} 
                            style={{ minWidth: DescriptionData[selectedSite].logoSrc === estonia ? 150 : 100}} 
                            width= {DescriptionData[selectedSite].logoSrc === estonia ? '20%':'15%'} 
                            height={DescriptionData[selectedSite].logoSrc === estonia ? '20%':'15%'}
                        />
                    </div>
                    <div className='row d-flex flex-wrap justify-content-center my-3'>
                        <div className={`col-xl-7 col-lg-7 col-md-7 col-sm-10 ${windowWidth > 767 && 'border-right'} `}>
                            <div className='my-1 text-left' style={{ fontSize: font.labels, color: color.primaryColor }}>Description :</div>
                            <div className=' p-0'
                                style={{
                                    fontSize: windowWidth < 1220 ? '10' : font.extraSmall,
                                    textAlign: 'justify',
                                }} >
                                {
                                    selectedSite === 0 ?
                                    <p>
                                        {DescriptionData[selectedSite].description1}<br/><br/>
                                        {DescriptionData[selectedSite].description2}
                                    </p>
                                    :
                                    <p>
                                        {DescriptionData[selectedSite].description1}<br/><br/>
                                        {DescriptionData[selectedSite].description2}<br/>
                                        {DescriptionData[selectedSite].description3}<br/>
                                        {DescriptionData[selectedSite].description4}<br/><br/>
                                        {DescriptionData[selectedSite].description5}
                                    </p>
                                }
                                
                            </div>
                        </div>
                        <div className='col-xl-5 col-lg-5 col-md-5 col-sm-10 pr-0'>
                            <div className='my-1 text-left' style={{ fontSize: font.labels, color: color.primaryColor }}>Preview :</div>
                            <div className='col-11 p-0' >
                                <img src={DescriptionData[selectedSite].previewSrc} style={{ width: '100%' }} />
                            </div>
                        </div>
                    </div>
                </div>
                :
                <div 
                    className='container bg-white' 
                    style={{
                        // position: 'relative',
                        // top: windowWidth > 767 && '50%',
                        // left: windowWidth > 767 && '50%', 
                        // transform: windowWidth > 767 && 'translate(-50%, -50%)',
                        color: color.greyColor,
                        fontSize: font.body,
                        height: 435,
                        borderRadius: 5
                    }}
                >
                    <span style={{ top: '45%', position: 'relative'}}>Please select a country to start.</span>
                </div>}
        </React.Fragment>
    )
}

const DescriptionData = [
    {
        btnText: 'Go To Digital Maturity Assessment',
        description1: 'This survey is a part of the Digital Maturity Assessment methodology developed by the e-Governance Academy. There are 11 sections and will consist of both closed and open-ended responses.The Digital Maturity Assessment aims to facilitate the creation and implementation of digital transformation roadmaps, equipping governments with a vision of how to lead digital transformation in a sustainable way and create impact for the whole of society.Components of the assessment includes development of legislation and regulations for e-government implementation.',
        description2: 'It further examines the different building blocks of e-government architecture frameworks - including interoperability principles and solutions, cybersecurity, digital identity, digital document management, digitization of the databases, use of mobile applications and other electronic government services.Expected outcomes of the assessment include facilitatation of advisory to governments on e-government organization structure, sustainable financing models and large-scale ICT project management, as well as data management and collection and public communication strategies.',
        logoSrc: ega,
        previewSrc: DMA,
        goTo: '/digital_maturity_accessment'
    },
    {
        btnText: 'Go To SDG Mapping Survey',
        description1: ' The Sustainable Development Goals framework offers a systematic and integrated approach towards planning for digital development, given that SDGs and their corresponding targets take into account all three dimensions of economic, social and environmental development.The SDG Mapping Survey tool aims to provide decision-makers with timely information on the following:',
        description2: ' 1. Digital solutions/initiatives in use; Data on in-country digital development;',
        description3: ' 2. Supporting government policies or legislature; and relevant sectoral or industry plans supporting the implementation of these digital tools;',
        description4: ' 3. The Sustainable Development Goals, its corresponding targets and national priorities.It further provides a quick overview of cross-sector linkages, that would support countries in identifying gaps and progress in digital infrastructure or processes.',
        description5: ' The SDG Mapping Survey is expected to function as a self-reporting tool for Government representatives, local Authorities and subject matter experts. Information from the integrated assessment would further allow development partners to provide prompt technical advisory and recommendations on digital development.',
        logoSrc: estonia,
        previewSrc: SDG,
        goTo: '/edit'
    }
]

export default withRouter(DescriptionPage)