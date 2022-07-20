import React, { Component } from 'react'
import { withRouter } from 'react-router';
import color from '../../../Feature/Config/color';
import Description from '../../Edit/Component/listComponent/description';

class Policies extends Component {
    constructor(props) {
        super(props);
        this.state = {

        }
    }

    render() {
        const {
            recordData,
            recordId,
            updateRecordData,
            isEnabled,
            _handleModalText,
            _handleCancel,
            _handleSaveChanges,
            _UploadFile,
            _CancelFile
        } = this.props;
        return (
            <div className='px-2 ms-1'>
                <div
                    className="boxx w-100 text-left shadow d-flex flex-row flex-fill flex-wrap w-100 p-3 mt-4 mb-3 bg-white"
                    style={{ borderRadius: 10, fontSize: 16 }}>
                    <div className='d-flex'>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{1}</div>
                        Please indicate the national priorities or strategies in metting the specific SDG target under the 2030 Agenda for Sustainable Development. This may include relevant milestones and proposed steps, as reflected within the Voluntary National Reviews
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-12">
                            <Description
                                recordId={recordId}
                                recordData={recordData}
                                title={'NATIONAL PRIORITIES​'}
                                instruction={instructions.national_inst}
                                header={'National Strategies/Priorities'}
                                editorHeader={'national_strategic_plan'}
                                editorValue={updateRecordData[0]?.national_strategic_plan}
                                isEnabled={isEnabled}
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
                    <div className='d-flex'>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{2}</div>
                        Briefly describe relevant policies and programmes in improving access, adoption, and effective use of digital technologies, that are specific to this SDG target.
                        <br />
                        This may include key statistics; legislations; budget funding priorities; subsidies and grants available; Ministry/user department plans or sectoral plans; major international/regional aggrements
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="col-lg-7 col-md-7 col-sm-8 col-xs-12">
                            <Description
                                recordData={recordData}
                                title={'DIGITAL POLICIES AND PROGRAMMES'}
                                instruction={instructions.digitalPolicy_inst}
                                header={'Digital Policies And Programmes'}
                                editorHeader={'policies'}
                                editorValue={updateRecordData[0].policies}
                                ministryIndex={0}
                                // editTitle={editTitle}
                                // newTitle={newTitle}
                                // recordId={recordId}
                                // PPID={PPID}
                                isEnabled={isEnabled}
                                _CancelFile={_CancelFile}
                                _handleModalText={_handleModalText}
                                _handleCancel={_handleCancel}
                                _handleSaveChanges={_handleSaveChanges}
                                _UploadFile={_UploadFile}
                            />
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}

export default withRouter(Policies)

const instructions = {
    national_inst: 'Please indicate the National priorities or strategies in meeting the specific SDG target under the 2030 Agenda for Sustainable Development. This may include relevant milestones and proposed steps, as reflected within the  Voluntary National Reviews',
    digitalPolicy_inst: 'Please indicate relevant policies and programmes in improving access, adoption, and effective use of digital technologies, that are specific to this SDG target.​This may include key statistics; legislations; budget funding priorities; subsidies and grants available; Ministry/user department plans or sectoral plans; major international/regional agreements'
}