import React, { useState, Fragment } from "react";
import color from "../../../../Feature/Config/color"
import UNDPDropdown from '../dropdown'
import Description from "./description";

const Linkage = (props) => {
    const [internalId, setInternalId] = useState(2);
    const [externalId, setExternalId] = useState(2);

    const {
        isEnabled,
        updateRecordData,
        targetOptions,
        _handleModalText,
        _handleCancel,
        _handleSaveChanges,
        _handleCheckGaps,
        _handleSectorSelect
    } = props;

    const CheckBox = (props) => {
        const { key, name, id, label, active, onChange } = props;
        return (
            <div key={key}>
                <label>
                    <input
                        type="checkbox"
                        onChange={(e) => onChange(e)}
                        id={id}
                        name={name}
                        checked={active === 1 ? true : false}
                        style={{
                            marginRight: 6,
                            display: "inline-block",
                            border: "1px solid red",
                            cursor: 'pointer'
                        }}
                    />
                    {label}
                </label>
            </div>
        );
    };

    return (
        <div className="row py-2 justify-content-center">
            <div className="col-lg-4 text-left">
                <div className="my-3">
                    <div className="font-weight-bold" style={{ color: color.greyColor }}>
                        LINK WITHIN MINISTRY/DEPARTMENT
                    </div>
                    <UNDPDropdown
                        name={'internal_link'}
                        options={LinkList}
                        handleSelect={_handleSectorSelect}
                        selectedIndex={LinkList.findIndex(v => v.id === updateRecordData[0].internal_link)}
                        
                    />
                </div>
                {
                    updateRecordData[0].internal_link === 1 &&
                    <div>
                        <div className="my-3">
                            <div className="font-weight-bold" style={{ color: color.greyColor }}>
                                TYPE OF LINKAGE
                            </div>
                            <UNDPDropdown
                                name={'TYPE OF LINKAGE'}
                                options={LinkageType}
                                handleSelect={() => console.log('LinkageType')}
                                notClearable
                            />
                        </div>
                        <div className="mb-3 text-left">
                            <Description
                                title={'DESCRIPTION'}
                                header={'DESCRIPTION'}
                                editorHeader={"Additional Details: Internal Linkages"}
                                editorValue={''}
                                //editorValue={'- The Ministry of Social Integration and Economic Empowerment (MSIEE) has a computerised system, the Social Integration Management Information System (SIMIS), implemented in 2016.\n- It keeps records of potential beneficiaries from the Social Register of Mauritius (SRM) forms. Proxy Means Test (PMT) is performed to determine eligibility and updates records of existing beneficiaries. After PMT processing, the eligible and non eligible cases are pushed to the SIMIS database for payment of subsistence allowance. ,\n- The Social Integrated Management Information System (SIMIS) has been enhanced to cater for the payment of Child Allowance (CA). Phase 1 of the CA Module has already been implemented and it allows MSIEE to push eligible children to educational institutions in Mauritius and Rodrigues for school attendance. Phase 2 of the CA Module allows users to perform additional functions within the CA module namely school transfers, manage payment scenarios such arrears, repayment, overpayment, write off and freeze payment.,\n- The Integration Management Information System (IMIS) is expected to be fully operational by end of September 2020.,\n- There are plans to establish an  E Social Security System. Currently audits of the Ministry of Social Security, National Solidarity and Environment and Sustainable Development show that there was overpayment of pensions, estimated at some Rs 114 million as at 30 June 2019. These overpayments were due to factors at times beyond the control of the Ministry, such as absence of timely and/or complete information regarding ‘Departures of beneficiaries overseas’, ‘Death of beneficiaries whether locally or overseas’, ‘Remarriage of Widows, ‘Inmates confined for whatever reasons’, and also due to ‘Errors in Systems or otherwise’.\n- Thus, a new functionality has been developed at the Passport and Immigration Office by the service provider, in order to enlarge the search criteria so that more reliable information could be obtained in respect of existing beneficiaries.\n- In addition, for new clients, the Ministry is currently working with the PIO and the Info highway Team to access travel movements’ details from PIO archive database concerning data prior to the year 2009. It is making provision for funds in the forthcoming budget 2020 2021 to procure an integrated e Social Security System to address the issues of discrepancies and monthly reconciliation of the pay sheets.'}
                                isEnabled={isEnabled}
                                _handleModalText={_handleModalText}
                                _handleCancel={_handleCancel}
                                _handleSaveChanges={_handleSaveChanges}
                            />
                        </div>
                    </div>
                }

            </div>

            <div className="col-lg-4 text-left">
                <div className="my-3">
                    <div className="font-weight-bold" style={{ color: color.greyColor }}>
                        LINK TO OTHER MINISTRIES OR EXTERNAL AGENCIES
                    </div>
                    <UNDPDropdown
                        name={'external_link'}
                        options={LinkList}
                        handleSelect={_handleSectorSelect}
                        selectedIndex={LinkList.findIndex(v => v.id === updateRecordData[0].external_link)}
                        
                    />
                </div>
                {
                    updateRecordData[0].external_link === 1 &&
                    <div>
                        <div className="my-3">
                            <div className="font-weight-bold" style={{ color: color.greyColor }}>
                                TYPE OF LINKAGE
                            </div>
                            <UNDPDropdown
                                name={'TYPE OF LINKAGE'}
                                options={LinkageType}
                                handleSelect={() => console.log('LinkageType')}
                                notClearable
                            />
                        </div>
                        <div className="mb-3 text-left">
                            <Description
                                title={'DESCRIPTION'}
                                header={'DESCRIPTION'}
                                editorHeader={"Additional Details: External Linkages"}
                                editorValue={''}
                                //editorValue={'- The Ministry of Social Integration and Economic Empowerment (MSIEE) has a computerised system, the Social Integration Management Information System (SIMIS), implemented in 2016.\n- It keeps records of potential beneficiaries from the Social Register of Mauritius (SRM) forms. Proxy Means Test (PMT) is performed to determine eligibility and updates records of existing beneficiaries. After PMT processing, the eligible and non eligible cases are pushed to the SIMIS database for payment of subsistence allowance. ,\n- The Social Integrated Management Information System (SIMIS) has been enhanced to cater for the payment of Child Allowance (CA). Phase 1 of the CA Module has already been implemented and it allows MSIEE to push eligible children to educational institutions in Mauritius and Rodrigues for school attendance. Phase 2 of the CA Module allows users to perform additional functions within the CA module namely school transfers, manage payment scenarios such arrears, repayment, overpayment, write off and freeze payment.,\n- The Integration Management Information System (IMIS) is expected to be fully operational by end of September 2020.,\n- There are plans to establish an  E Social Security System. Currently audits of the Ministry of Social Security, National Solidarity and Environment and Sustainable Development show that there was overpayment of pensions, estimated at some Rs 114 million as at 30 June 2019. These overpayments were due to factors at times beyond the control of the Ministry, such as absence of timely and/or complete information regarding ‘Departures of beneficiaries overseas’, ‘Death of beneficiaries whether locally or overseas’, ‘Remarriage of Widows, ‘Inmates confined for whatever reasons’, and also due to ‘Errors in Systems or otherwise’.\n- Thus, a new functionality has been developed at the Passport and Immigration Office by the service provider, in order to enlarge the search criteria so that more reliable information could be obtained in respect of existing beneficiaries.\n- In addition, for new clients, the Ministry is currently working with the PIO and the Info highway Team to access travel movements’ details from PIO archive database concerning data prior to the year 2009. It is making provision for funds in the forthcoming budget 2020 2021 to procure an integrated e Social Security System to address the issues of discrepancies and monthly reconciliation of the pay sheets.\n'}
                                isEnabled={isEnabled}
                                _handleModalText={_handleModalText}
                                _handleCancel={_handleCancel}
                                _handleSaveChanges={_handleSaveChanges}
                            />
                        </div>
                    </div>
                }
            </div>

            <div className="col-lg-4 text-left">
                <div className="my-3">
                    <div className="font-weight-bold" style={{ color: color.greyColor }}>
                        GAPS IDENTIFIED
                    </div>
                </div>
                <div className="text-left">
                    <div className="font-weight-bold my-2" >Resources and Infrastructure</div>
                    {
                        targetOptions.resource.map((v, k) =>
                            <CheckBox
                                key={k}
                                name={'resource'}
                                id={v.resource_id}
                                label={v.option_name}
                                active={
                                    updateRecordData[0].resource.length > 0
                                        ? (updateRecordData[0].resource.find(dt => dt.id === v.resource_id) ?
                                            updateRecordData[0].resource.find(dt => dt.id === v.resource_id).active
                                            : null)
                                        : null
                                }
                                onChange={_handleCheckGaps}
                            />
                        )
                    }
                </div>
                <div className="text-left">
                    <div className="font-weight-bold my-2" >Planning and Coordination</div>
                    {
                        targetOptions.planning.map((v, k) =>
                            <CheckBox
                                key={k}
                                name={'planning'}
                                id={v.plannig_id}
                                label={v.option_name}
                                active={
                                    updateRecordData[0].planning.length > 0
                                        ? (updateRecordData[0].planning.find(dt => dt.id === v.plannig_id) ?
                                            updateRecordData[0].planning.find(dt => dt.id === v.plannig_id).active
                                            : null)
                                        : null
                                }
                                onChange={_handleCheckGaps}
                            />
                        )
                    }
                </div>
                <div className="text-left">
                    <div className="font-weight-bold my-2" >User Experience</div>
                    {
                        targetOptions.user.map((v, k) =>
                            <CheckBox
                                key={k}
                                name={'user_experience'}
                                id={v.user_experience_id}
                                label={v.option_name}
                                active={
                                    updateRecordData[0].user_experience.length > 0
                                        ? (updateRecordData[0].user_experience.find(dt => dt.id === v.user_experience_id) ?
                                            updateRecordData[0].user_experience.find(dt => dt.id === v.user_experience_id).active
                                            : null)
                                        : null
                                }
                                onChange={_handleCheckGaps}
                            />
                        )
                    }
                </div>
            </div>
        </div>
    )

}
export default Linkage

const LinkageData = [
    { linkId: 1, title: 'LINK WITHIN MINISTRY/DEPARTMENT', descriptionHeader: 'Additional Details: Internal Linkages', editorValue: '- The Ministry of Social Integration and Economic Empowerment (MSIEE) has a computerised system, the Social Integration Management Information System (SIMIS), implemented in 2016.\n- It keeps records of potential beneficiaries from the Social Register of Mauritius (SRM) forms. Proxy Means Test (PMT) is performed to determine eligibility and updates records of existing beneficiaries. After PMT processing, the eligible and non eligible cases are pushed to the SIMIS database for payment of subsistence allowance. ,\n- The Social Integrated Management Information System (SIMIS) has been enhanced to cater for the payment of Child Allowance (CA). Phase 1 of the CA Module has already been implemented and it allows MSIEE to push eligible children to educational institutions in Mauritius and Rodrigues for school attendance. Phase 2 of the CA Module allows users to perform additional functions within the CA module namely school transfers, manage payment scenarios such arrears, repayment, overpayment, write off and freeze payment.,\n- The Integration Management Information System (IMIS) is expected to be fully operational by end of September 2020.,\n- There are plans to establish an  E Social Security System. Currently audits of the Ministry of Social Security, National Solidarity and Environment and Sustainable Development show that there was overpayment of pensions, estimated at some Rs 114 million as at 30 June 2019. These overpayments were due to factors at times beyond the control of the Ministry, such as absence of timely and/or complete information regarding ‘Departures of beneficiaries overseas’, ‘Death of beneficiaries whether locally or overseas’, ‘Remarriage of Widows, ‘Inmates confined for whatever reasons’, and also due to ‘Errors in Systems or otherwise’.\n- Thus, a new functionality has been developed at the Passport and Immigration Office by the service provider, in order to enlarge the search criteria so that more reliable information could be obtained in respect of existing beneficiaries.\n- In addition, for new clients, the Ministry is currently working with the PIO and the Info highway Team to access travel movements’ details from PIO archive database concerning data prior to the year 2009. It is making provision for funds in the forthcoming budget 2020 2021 to procure an integrated e Social Security System to address the issues of discrepancies and monthly reconciliation of the pay sheets.\n' },
    { linkId: 2, title: 'LINK TO OTHER MINISTRIES OR EXTERNAL AGENCIES', descriptionHeader: 'Additional Details: External Linkages', editorValue: '- The Ministry of Social Integration and Economic Empowerment (MSIEE) has a computerised system, the Social Integration Management Information System (SIMIS), implemented in 2016.\n- It keeps records of potential beneficiaries from the Social Register of Mauritius (SRM) forms. Proxy Means Test (PMT) is performed to determine eligibility and updates records of existing beneficiaries. After PMT processing, the eligible and non eligible cases are pushed to the SIMIS database for payment of subsistence allowance. ,\n- The Social Integrated Management Information System (SIMIS) has been enhanced to cater for the payment of Child Allowance (CA). Phase 1 of the CA Module has already been implemented and it allows MSIEE to push eligible children to educational institutions in Mauritius and Rodrigues for school attendance. Phase 2 of the CA Module allows users to perform additional functions within the CA module namely school transfers, manage payment scenarios such arrears, repayment, overpayment, write off and freeze payment.,\n- The Integration Management Information System (IMIS) is expected to be fully operational by end of September 2020.,\n- There are plans to establish an  E Social Security System. Currently audits of the Ministry of Social Security, National Solidarity and Environment and Sustainable Development show that there was overpayment of pensions, estimated at some Rs 114 million as at 30 June 2019. These overpayments were due to factors at times beyond the control of the Ministry, such as absence of timely and/or complete information regarding ‘Departures of beneficiaries overseas’, ‘Death of beneficiaries whether locally or overseas’, ‘Remarriage of Widows, ‘Inmates confined for whatever reasons’, and also due to ‘Errors in Systems or otherwise’.\n- Thus, a new functionality has been developed at the Passport and Immigration Office by the service provider, in order to enlarge the search criteria so that more reliable information could be obtained in respect of existing beneficiaries.\n- In addition, for new clients, the Ministry is currently working with the PIO and the Info highway Team to access travel movements’ details from PIO archive database concerning data prior to the year 2009. It is making provision for funds in the forthcoming budget 2020 2021 to procure an integrated e Social Security System to address the issues of discrepancies and monthly reconciliation of the pay sheets.\n' }
]

const LinkList = [
    { id: 1, value: 'yes', label: 'Yes', color: '#006BB7' },
    { id: 0, value: 'no', label: 'No', color: '#d3d3d3' },
]

const LinkageType = [
    { value: 'Data sharing', label: 'Data sharing', linkage_id: 1, color: '#d3d3d3' },
    { value: 'Systems', label: 'Systems', linkage_id: 2, color: '#d3d3d3' }

]
const GapList = [
    { value: 'GapList1', label: 'GapList1', linkage_id: 1 },
]
const GapTextData = [
    {
        id: 'resource',
        title: 'Resources and Infrastructure',
        text: 'Availability of devices\nIncomplete data\nPoor connectivity or internet coverage\nPoor system security'
    },
    {
        id: 'planning',
        title: 'Planning and Coordination',
        text: 'Inadequate budget and sustainable financing\nLack of monitoring and evaluation mechanisms\nLack of formal project management structure\nLack of technical or advisory expertise\nLow stakeholder participation\nPoor compatibility with legacy systems\nPoor cost-effectiveness\nProcurement and contractual delays\nSupporting policies, standards and legislation not in place'
    },
    {
        id: 'user',
        title: 'User Experience',
        text: 'Inefficient Administrative Processes and Service delivery\nPoor system performance\nPoor ease of use\nPoor levels of adoption and uptake\nOptions for secure data or information exchange unavailable\nUser privacy and trust concerns'
    }
]