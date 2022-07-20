import React, { useEffect } from 'react'
import color from '../../../Feature/Config/color'
import UNDPDropdown from '../../Edit/Component/dropdown'
import { ESInput } from '../../Questionnaire/components/tools/ES_Inputs';
import { Level_list, LinkageType, LinkList } from '../../Edit/Component/listComponent/optionLists';
import GuagueChart from '../../../Feature/Graphs/guagueChart';
import Description from '../../Edit/Component/listComponent/description';
import '../../../App.css'

const ProjectLog = (props) => {
    const {
        isEnabled,
        targetOptions,
        updateRecordData,
        projIndex,
        handleSectorSelect,
        _handleInputChange,
        _handleModalText,
        _handleCancel,
        _handleSaveChanges
    } = props;

    const Suggestion_list =
        targetOptions &&
        ((targetOptions.suggestion.filter(v => (
            ((v.sector_id === updateRecordData[0].sector_id || v.sector_id === null) && v.suggestion_name !== null)

        ))).map(v1 => (
            {
                label: v1.suggestion_name,
                value: v1.suggestion_name,
                suggestionId: v1.suggestion_id,
                sectorId: v1.sector_id
            }
        )));

    // console.log(Suggestion_list, projIndex, targetOptions)
    const selectedSuggestion =
        (Suggestion_list && updateRecordData.length > 0) &&
        Suggestion_list.reduce((r, c) => {
            const R = [...r]
            const index = updateRecordData[0].systemProjects[projIndex].suggestionAns
                .findIndex(v => v.suggestion_id === c.suggestionId && v.active === 1)
            if (index >= 0) R.push(c)

            return R
        }, []);

    const StatusUpdate_list =
        targetOptions &&
        targetOptions.status_update.map((v, k) => (
            {
                statusUpdateId: v.status_update_id,
                value: v.status_update,
                label: v.status_update,
            }
        ));

    const statusUpdateIndex = StatusUpdate_list.findIndex(v => v.statusUpdateId === updateRecordData[0].systemProjects[projIndex].status_update_id)
    const levelIndex = Level_list.findIndex(v => v.level_id === updateRecordData[0].systemProjects[projIndex].proj_level_id)

    useEffect(() => {
        BreakLabel()
    }, [window.innerWidth, updateRecordData[0].status_update_id, levelIndex,])

    const BreakLabel = () => {
        const legends = document.querySelectorAll("text.segment-value")
        const title = document.querySelectorAll("text.current-value")

        for (let t of title) {
            t.setAttribute('transform', ' translate(0, -30)')
            const textWidth = 300
            const lineHeight = 20

            a({d:t, textWidth:textWidth, lineHeight:lineHeight, innerHTML: t.innerHTML})
        }

     
            for (let d of legends) {
                const legendName = d.innerHTML
                d.style.fontWeight = 'normal'
                if (legendName === 'Project Conceptualisation') {
                    d.setAttribute('transform', 'rotate(0) translate(-125, -40)')
                    a({d:d, innerHTML:'Project Conceptua- lisation'})
                }
                else if (legendName === 'Budget Allocation') {
                    d.setAttribute('transform', 'rotate(0) translate(-90, -100)')
                    a({d:d, innerHTML:'Budget Allocation'})
                }
                else if (legendName === 'Project Implementation') {
                    d.setAttribute('transform', 'rotate(0) translate(0, -125)')
                    a({d:d, innerHTML:'Project Implementation'})
                }
                else if (legendName === 'Performance Monitoring') {
                    d.setAttribute('transform', 'rotate(0) translate(90, -100)')
                    a({d:d, innerHTML:'Performance Monitoring'})
                }
                else if (legendName === 'Evaluation and Citizens Feedback') {
                    d.setAttribute('transform', 'rotate(0) translate(120, -55)')
                    a({d:d, innerHTML:'Evaluation and Citizens Feedback'})
                }
            }

    }

    const a = ({d,textWidth,lineHeight,innerHTML }) => {
        //var x = 0;
        var y = lineHeight || 15;
        var width = textWidth || 50;

        var element = d
        var text = innerHTML;
 
        /* split the words into array */
        var words = text.split(' ');
        var line = '';

        /* Make a tspan for testing */
        element.innerHTML = '<tspan id="PROCESSING">busy</tspan>';

        for (var n = 0; n < words.length; n++) {
            var testLine = line + words[n] + ' ';
            var testElem = document.getElementById('PROCESSING');
            /*  Add line in testElement */
            testElem.innerHTML = testLine;
            /* Messure textElement */
            var metrics = testElem.getBoundingClientRect();
            const testWidth = metrics.width;

            if (testWidth > width && n > 0) {
                element.innerHTML += '<tspan x="0" dy="' + y + '">' + line + '</tspan>';
                line = words[n] + ' ';
            } else {
                line = testLine;
            }
        }

        element.innerHTML += '<tspan x="0" dy="' + y + '">' + line + '</tspan>';
        document.getElementById("PROCESSING").remove();
    }

    const showProjLog=(projIndex)=> {
        var div = document.getElementById(`project_log_${projIndex + 1}`);
        if (div.clientHeight) {
           div.style.display = 'none'
        } else {
            div.style.display = 'block'
        }
        BreakLabel()
    }

    return (
        <div 
            id={`parent_pl_${projIndex + 1}`} 
            className='w-100 my-1' 
            style={{ border: `1px solid #007bff`, borderRadius: 5, fontSize: 16 }}
        >
            <div
                className='d-flex flex-row w-100 align-items-center justify-content-between'
                title='Collapse Project Log'
                onClick={()=> showProjLog(projIndex)}
                style={{ background: '#ECF3F9', color: '#19486A', borderTopLeftRadius: 5, borderTopRightRadius: 5, cursor: 'pointer' }}
            >
                <h6 className='py-2 px-3 m-0'> # PROJECT LOG</h6>

                <div className=' py-2 px-3' style={{ borderLeft: `1px solid #007bff` }}>{projIndex + 1}
                <i className="fa fa-caret-down ml-2 text-muted" aria-hidden="true"></i>
                </div>
            </div>
            <div id={`project_log_${projIndex + 1}`} style={{ display: 'none' }}>
                <div className='my-3' >
                    <div className='d-flex m-1'>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{2}</div>
                        Please type or select the type/category of technologies in use
                    </div>
                    <div className='col-12  m-1'>
                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                            <UNDPDropdown
                                name={'suggestion_selector'}
                                options={Suggestion_list}
                                defaultValues={selectedSuggestion}
                                handleSelect={handleSectorSelect}
                                isMulti
                                notClearable
                                isCreateable={true}
                                checkboxOption={true}
                                projIndex={projIndex}
                            />
                        </div>
                    </div>
                </div>

                <div className='my-3'>
                    <div className='d-flex m-1 '>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{3}</div>
                        Please indicate the project title, if any
                    </div>
                    <div className='col-12  m-1'>
                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                            <Input
                                id={'proj_title'}
                                title={'proj_title'}
                                onChange={(e) => _handleInputChange(e, projIndex)}
                                value={updateRecordData[0].systemProjects[projIndex].proj_title}
                            />
                        </div>
                    </div>
                </div>

                <div className='my-3'>
                    <div className='d-flex m-1 '>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{4}</div>
                        Please indicate the level of project Implementation
                    </div>
                    <div className='col-12  m-1'>
                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                            <Selector
                                name={'projLevel_selector'}
                                title={'LEVEL OF PROJECT Project Implementation'}
                                options={Level_list}
                                selectedIndex={levelIndex}
                                handleSelect={handleSectorSelect}
                                projIndex={projIndex}
                            />
                        </div>
                    </div>
                </div>

                {
                    levelIndex === 0 ?
                        <div className='my-3'>
                            <div className='d-flex m-1 '>
                                <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{5}</div>
                                Please indicate the current phase of project.
                            </div>
                            <div className='col-12  m-1'>
                                <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                    <Selector
                                        name={'statusUpdt_selector'}
                                        title={'CURRENT PHASE OF PROJECT'}
                                        selectedIndex={statusUpdateIndex}
                                        options={StatusUpdate_list}
                                        handleSelect={handleSectorSelect}
                                        projIndex={projIndex}
                                        notClearable={false}
                                    />
                                     <GuagueChart
                                        id={"systemGuage"}
                                        guagueTitle={''}
                                        value={
                                            statusUpdateIndex === 0 ? 100 : statusUpdateIndex === 1 ? 300 :
                                                statusUpdateIndex === 2 ? 500 : statusUpdateIndex === 3 ? 700 :
                                                    statusUpdateIndex === 4 ? 900 : 0
                                        }
                                        guagueSize={{
                                            width: window.innerWidth < 700 ? 190 : 220,
                                            height: window.innerWidth < 700 ? 130 : 160
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                        : ''
                }

                {
                    levelIndex === 1 ?
                        <div className='my-3'>
                            <div className='d-flex m-1 '>
                                <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{5}</div>
                                Please indicate the location/area of project.
                            </div>
                            <div className='col-12  m-1'>
                                <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                    <Input
                                        id={'location'}
                                        title={'LOCATION/AREA OF PROJECT'}
                                        placeholder={'Please indicate'}
                                        onChange={(e) => _handleInputChange(e, projIndex)}
                                        value={updateRecordData[0].systemProjects[projIndex].location}
                                    />
                                </div>
                            </div>
                        </div>
                        : ''
                }

                <div className='my-3'>
                    <div className='d-flex m-1'>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{6}</div>
                        Are there any means for data exchange within the user Ministry/Department?
                    </div>
                    <div className='col-12  m-1'>
                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                            <UNDPDropdown
                                name={'internalLink'}
                                projIndex={projIndex}
                                options={LinkList}
                                handleSelect={handleSectorSelect}
                                selectedIndex={LinkList.findIndex(v => v.id === updateRecordData[0].systemProjects[projIndex].internalLink)}
                            />
                        </div>
                    </div>
                </div>

                {
                    updateRecordData[0].systemProjects[projIndex].internalLink ?
                        <div className='my-3'>
                            <div className='d-flex m-1 '>
                                <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{7}</div>
                                If Yes,please describe the approach
                            </div>
                            <div className='col-12  m-1'>
                                <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                    <UNDPDropdown
                                        name={'internalLinkType'}
                                        projIndex={projIndex}
                                        options={LinkageType}
                                        handleSelect={handleSectorSelect}
                                        selectedIndex={LinkageType.findIndex(v => v.id === updateRecordData[0].systemProjects[projIndex].internalLinkType)}
                                        notClearable
                                    />
                                    <Description
                                        title={'DESCRIPTION'}
                                        header={'DESCRIPTION'}
                                        projIndex={projIndex}
                                        editorHeader={"internalYesDesc"}
                                        editorValue={updateRecordData[0].systemProjects[projIndex].internalYesDesc}
                                        //editorValue={'- The Ministry of Social Integration and Economic Empowerment (MSIEE) has a computerised system, the Social Integration Management Information System (SIMIS), implemented in 2016.\n- It keeps records of potential beneficiaries from the Social Register of Mauritius (SRM) forms. Proxy Means Test (PMT) is performed to determine eligibility and updates records of existing beneficiaries. After PMT processing, the eligible and non eligible cases are pushed to the SIMIS database for payment of subsistence allowance. ,\n- The Social Integrated Management Information System (SIMIS) has been enhanced to cater for the payment of Child Allowance (CA). Phase 1 of the CA Module has already been implemented and it allows MSIEE to push eligible children to educational institutions in Mauritius and Rodrigues for school attendance. Phase 2 of the CA Module allows users to perform additional functions within the CA module namely school transfers, manage payment scenarios such arrears, repayment, overpayment, write off and freeze payment.,\n- The Integration Management Information System (IMIS) is expected to be fully operational by end of September 2020.,\n- There are plans to establish an  E Social Security System. Currently audits of the Ministry of Social Security, National Solidarity and Environment and Sustainable Development show that there was overpayment of pensions, estimated at some Rs 114 million as at 30 June 2019. These overpayments were due to factors at times beyond the control of the Ministry, such as absence of timely and/or complete information regarding ‘Departures of beneficiaries overseas’, ‘Death of beneficiaries whether locally or overseas’, ‘Remarriage of Widows, ‘Inmates confined for whatever reasons’, and also due to ‘Errors in Systems or otherwise’.\n- Thus, a new functionality has been developed at the Passport and Immigration Office by the service provider, in order to enlarge the search criteria so that more reliable information could be obtained in respect of existing beneficiaries.\n- In addition, for new clients, the Ministry is currently working with the PIO and the Info highway Team to access travel movements’ details from PIO archive database concerning data prior to the year 2009. It is making provision for funds in the forthcoming budget 2020 2021 to procure an integrated e Social Security System to address the issues of discrepancies and monthly reconciliation of the pay sheets.'}
                                        isEnabled={isEnabled}
                                        _handleModalText={_handleModalText}
                                        _handleCancel={_handleCancel}
                                        _handleSaveChanges={_handleSaveChanges}
                                    />
                                </div>
                            </div>
                        </div>
                        : ''
                }

                {
                    updateRecordData[0].systemProjects[projIndex].internalLink === 0 ?
                        <div className='my-3'>
                            <div className='d-flex m-1 '>
                                <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{7}</div>
                                If No, please indicate the type of linkage(s) required
                            </div>
                            <div className='col-12  m-1'>
                                <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                    <Description
                                        title={'DESCRIPTION'}
                                        header={'DESCRIPTION'}
                                        editorHeader={"internalNoDesc"}
                                        projIndex={projIndex}
                                        editorValue={updateRecordData[0].systemProjects[projIndex].internalNoDesc}
                                        //editorValue={'- The Ministry of Social Integration and Economic Empowerment (MSIEE) has a computerised system, the Social Integration Management Information System (SIMIS), implemented in 2016.\n- It keeps records of potential beneficiaries from the Social Register of Mauritius (SRM) forms. Proxy Means Test (PMT) is performed to determine eligibility and updates records of existing beneficiaries. After PMT processing, the eligible and non eligible cases are pushed to the SIMIS database for payment of subsistence allowance. ,\n- The Social Integrated Management Information System (SIMIS) has been enhanced to cater for the payment of Child Allowance (CA). Phase 1 of the CA Module has already been implemented and it allows MSIEE to push eligible children to educational institutions in Mauritius and Rodrigues for school attendance. Phase 2 of the CA Module allows users to perform additional functions within the CA module namely school transfers, manage payment scenarios such arrears, repayment, overpayment, write off and freeze payment.,\n- The Integration Management Information System (IMIS) is expected to be fully operational by end of September 2020.,\n- There are plans to establish an  E Social Security System. Currently audits of the Ministry of Social Security, National Solidarity and Environment and Sustainable Development show that there was overpayment of pensions, estimated at some Rs 114 million as at 30 June 2019. These overpayments were due to factors at times beyond the control of the Ministry, such as absence of timely and/or complete information regarding ‘Departures of beneficiaries overseas’, ‘Death of beneficiaries whether locally or overseas’, ‘Remarriage of Widows, ‘Inmates confined for whatever reasons’, and also due to ‘Errors in Systems or otherwise’.\n- Thus, a new functionality has been developed at the Passport and Immigration Office by the service provider, in order to enlarge the search criteria so that more reliable information could be obtained in respect of existing beneficiaries.\n- In addition, for new clients, the Ministry is currently working with the PIO and the Info highway Team to access travel movements’ details from PIO archive database concerning data prior to the year 2009. It is making provision for funds in the forthcoming budget 2020 2021 to procure an integrated e Social Security System to address the issues of discrepancies and monthly reconciliation of the pay sheets.'}
                                        isEnabled={isEnabled}
                                        _handleModalText={_handleModalText}
                                        _handleCancel={_handleCancel}
                                        _handleSaveChanges={_handleSaveChanges}
                                    />
                                </div>
                            </div>
                        </div>
                        : ''
                }

                <div className='my-3'>
                    <div className='d-flex m-1'>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{8}</div>
                        Please indicate if there is data exchange or systems linkages with other Ministry/external Agencies
                    </div>
                    <div className='col-12  m-1'>
                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                            <UNDPDropdown
                                name={'externalLink'}
                                projIndex={projIndex}
                                options={LinkList}
                                handleSelect={handleSectorSelect}
                                selectedIndex={LinkList.findIndex(v => v.id === updateRecordData[0].systemProjects[projIndex].externalLink)}
                            />
                        </div>
                    </div>
                </div>

                {
                    updateRecordData[0].systemProjects[projIndex].externalLink === 1 ?
                        <div className='my-3'>
                            <div className='d-flex m-1 '>
                                <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{9}</div>
                                If Yes,please describe the approach
                            </div>
                            <div className='col-12  m-1'>
                                <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                    <UNDPDropdown
                                        name={'externalLinkType'}
                                        options={LinkageType}
                                        projIndex={projIndex}
                                        selectedIndex={LinkageType.findIndex(v => v.id === updateRecordData[0].systemProjects[projIndex].externalLinkType)}
                                        handleSelect={handleSectorSelect}
                                        notClearable
                                    />
                                    <Description
                                        title={'DESCRIPTION'}
                                        header={'DESCRIPTION'}
                                        editorHeader={"externalYesDesc"}
                                        projIndex={projIndex}
                                        editorValue={updateRecordData[0].systemProjects[projIndex].externalYesDesc}
                                        //editorValue={'- The Ministry of Social Integration and Economic Empowerment (MSIEE) has a computerised system, the Social Integration Management Information System (SIMIS), implemented in 2016.\n- It keeps records of potential beneficiaries from the Social Register of Mauritius (SRM) forms. Proxy Means Test (PMT) is performed to determine eligibility and updates records of existing beneficiaries. After PMT processing, the eligible and non eligible cases are pushed to the SIMIS database for payment of subsistence allowance. ,\n- The Social Integrated Management Information System (SIMIS) has been enhanced to cater for the payment of Child Allowance (CA). Phase 1 of the CA Module has already been implemented and it allows MSIEE to push eligible children to educational institutions in Mauritius and Rodrigues for school attendance. Phase 2 of the CA Module allows users to perform additional functions within the CA module namely school transfers, manage payment scenarios such arrears, repayment, overpayment, write off and freeze payment.,\n- The Integration Management Information System (IMIS) is expected to be fully operational by end of September 2020.,\n- There are plans to establish an  E Social Security System. Currently audits of the Ministry of Social Security, National Solidarity and Environment and Sustainable Development show that there was overpayment of pensions, estimated at some Rs 114 million as at 30 June 2019. These overpayments were due to factors at times beyond the control of the Ministry, such as absence of timely and/or complete information regarding ‘Departures of beneficiaries overseas’, ‘Death of beneficiaries whether locally or overseas’, ‘Remarriage of Widows, ‘Inmates confined for whatever reasons’, and also due to ‘Errors in Systems or otherwise’.\n- Thus, a new functionality has been developed at the Passport and Immigration Office by the service provider, in order to enlarge the search criteria so that more reliable information could be obtained in respect of existing beneficiaries.\n- In addition, for new clients, the Ministry is currently working with the PIO and the Info highway Team to access travel movements’ details from PIO archive database concerning data prior to the year 2009. It is making provision for funds in the forthcoming budget 2020 2021 to procure an integrated e Social Security System to address the issues of discrepancies and monthly reconciliation of the pay sheets.'}
                                        isEnabled={isEnabled}
                                        _handleModalText={_handleModalText}
                                        _handleCancel={_handleCancel}
                                        _handleSaveChanges={_handleSaveChanges}
                                    />
                                </div>
                            </div>
                        </div>
                        : ''
                }

                {
                    updateRecordData[0].systemProjects[projIndex].externalLink === 0 ?
                        <div className='my-3'>
                            <div className='d-flex m-1 '>
                                <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{9}</div>
                                If No, please indicate the type of linkage(s) required
                            </div>
                            <div className='col-12  m-1'>
                                <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                    <Description
                                        title={'DESCRIPTION'}
                                        header={'DESCRIPTION'}
                                        editorHeader={"externalNoDesc"}
                                        projIndex={projIndex}
                                        editorValue={updateRecordData[0].systemProjects[projIndex].externalNoDesc}
                                        //editorValue={'- The Ministry of Social Integration and Economic Empowerment (MSIEE) has a computerised system, the Social Integration Management Information System (SIMIS), implemented in 2016.\n- It keeps records of potential beneficiaries from the Social Register of Mauritius (SRM) forms. Proxy Means Test (PMT) is performed to determine eligibility and updates records of existing beneficiaries. After PMT processing, the eligible and non eligible cases are pushed to the SIMIS database for payment of subsistence allowance. ,\n- The Social Integrated Management Information System (SIMIS) has been enhanced to cater for the payment of Child Allowance (CA). Phase 1 of the CA Module has already been implemented and it allows MSIEE to push eligible children to educational institutions in Mauritius and Rodrigues for school attendance. Phase 2 of the CA Module allows users to perform additional functions within the CA module namely school transfers, manage payment scenarios such arrears, repayment, overpayment, write off and freeze payment.,\n- The Integration Management Information System (IMIS) is expected to be fully operational by end of September 2020.,\n- There are plans to establish an  E Social Security System. Currently audits of the Ministry of Social Security, National Solidarity and Environment and Sustainable Development show that there was overpayment of pensions, estimated at some Rs 114 million as at 30 June 2019. These overpayments were due to factors at times beyond the control of the Ministry, such as absence of timely and/or complete information regarding ‘Departures of beneficiaries overseas’, ‘Death of beneficiaries whether locally or overseas’, ‘Remarriage of Widows, ‘Inmates confined for whatever reasons’, and also due to ‘Errors in Systems or otherwise’.\n- Thus, a new functionality has been developed at the Passport and Immigration Office by the service provider, in order to enlarge the search criteria so that more reliable information could be obtained in respect of existing beneficiaries.\n- In addition, for new clients, the Ministry is currently working with the PIO and the Info highway Team to access travel movements’ details from PIO archive database concerning data prior to the year 2009. It is making provision for funds in the forthcoming budget 2020 2021 to procure an integrated e Social Security System to address the issues of discrepancies and monthly reconciliation of the pay sheets.'}
                                        isEnabled={isEnabled}
                                        _handleModalText={_handleModalText}
                                        _handleCancel={_handleCancel}
                                        _handleSaveChanges={_handleSaveChanges}
                                    />
                                </div>
                            </div>
                        </div>
                        : ''
                }
            </div>
        </div>
    )
}

const Input = (props) => {
    const { id, title, placeholder, onChange, value } = props;
    return (
        <ESInput
            id={id}
            placeHolder={placeholder}
            value={value ? value : ''}
            onChange={onChange}
        />
    )
}

const Selector = (props) => {
    const { notClearable = true, title, options, handleSelect, selectedIndex, isMulti, name, checkboxOption, projIndex, defaultValues } = props;
    return (
        <UNDPDropdown
            name={name}
            // notClearable={notClearable}
            selectedIndex={selectedIndex}
            options={options}
            defaultValues={defaultValues ? defaultValues : null}
            handleSelect={handleSelect}
            isMulti={isMulti}
            checkboxOption={checkboxOption ? true : false}
            projIndex={projIndex}
        />
    )
}

export default ProjectLog