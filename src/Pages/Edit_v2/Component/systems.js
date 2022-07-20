import React, { Component } from 'react'
import color from '../../../Feature/Config/color';
import Description from '../../Edit/Component/listComponent/description';
import { ESButton } from '../../Questionnaire/components/tools/ES_Button';
import ProjectLog from './projectLog';

class Systems extends Component {
    constructor(props) {
        super(props);
        this.state = {}
    }

    render() {
        const {
            recordData,
            updateRecordData,
            targetOptions,
            isEnabled,
            handleSectorSelect,
            _handleModalText,
            _handleCancel,
            _handleInputChange,
            _handleSaveChanges,
            _handleAddNewProj
        } = this.props;
        // console.log(updateRecordData)
        return (
            <div className='px-2 ms-1'>
                <div
                    className="boxx w-100 text-left shadow d-flex flex-row flex-fill flex-wrap w-100 p-3 mt-4 mb-3 bg-white"
                    style={{ borderRadius: 10, fontSize: 16 }}>
                    <div className='d-flex'>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{1}</div>
                        This section is used for gathering information on digital solutions deployed, which may have a direct or indirect impact on achieving the SDG targets.
                        <br /><br />
                        Please describe any IT systems or transactions platforms in use; including frontier and high-end technologies, workplace solutions; or digitalisation of data and its management; building of broadband and connectivity infrastructure, grassroot innovations, or use of digital communications
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                            <Description
                                recordData={recordData}
                                title={'DIGITAL TECHNOLOGY, SYSTEMS AND PLATFORMS'}
                                instruction={instruction}
                                header={'DIGITAL TECHNOLOGY, SYSTEMS AND PLATFORMS'}
                                editorHeader={'technology_system_and_platform'}
                                isEnabled={isEnabled}
                                editorValue={updateRecordData[0].technology_system_and_platform}
                                _handleModalText={_handleModalText}
                                _handleCancel={_handleCancel}
                                _handleSaveChanges={_handleSaveChanges}
                            />
                        </div>
                    </div>
                </div>
                <div
                    className="boxx w-100 text-left shadow d-flex flex-row flex-fill flex-wrap w-100 p-3 mt-4 mb-3 bg-white"
                    style={{ borderRadius: 10, fontSize: 16 }}>
                        <div className='d-flex flex-row w-100'>
                        <button type="button" className="btn btn-outline-primary" onClick={()=> _handleAddNewProj()}>+ Add Project</button>
                        </div>
                        {
                            updateRecordData.length > 0 &&
                            updateRecordData[0].systemProjects.map((data,projIndex)=>
                            <ProjectLog 
                                targetOptions={targetOptions}
                                updateRecordData={updateRecordData}
                                projIndex={projIndex}
                                _handleInputChange={_handleInputChange}
                                handleSectorSelect={handleSectorSelect}
                                isEnabled={isEnabled}
                                _handleModalText={_handleModalText}
                                _handleCancel={_handleCancel}
                                _handleSaveChanges={_handleSaveChanges}
                             /> 
                            )
                        }
                    </div>
            </div>
        )
    }
}

export default Systems

const instruction = 'Please indicate relevant technologies and capabilities, that are specific to this SDG target. This may include IT systems or transactions platforms in use; digitalisation of data and management; broadband and connectivity infrastructure'
