import React, { useState } from 'react'
import color from '../../../../Feature/Config/color';
import UNDPDropdown from '../dropdown';

import sdg1 from "../../../../Feature/Images/SDG Icons/1.png";
import sdg2 from "../../../../Feature/Images/SDG Icons/2.png";
import sdg3 from "../../../../Feature/Images/SDG Icons/3.png";
import sdg4 from "../../../../Feature/Images/SDG Icons/4.png";
import sdg5 from "../../../../Feature/Images/SDG Icons/5.png";
import sdg6 from "../../../../Feature/Images/SDG Icons/6.png";
import sdg7 from "../../../../Feature/Images/SDG Icons/7.png";
import sdg8 from "../../../../Feature/Images/SDG Icons/8.png";
import sdg9 from "../../../../Feature/Images/SDG Icons/9.png";
import sdg10 from "../../../../Feature/Images/SDG Icons/10.png";
import sdg11 from "../../../../Feature/Images/SDG Icons/11.png";
import sdg12 from "../../../../Feature/Images/SDG Icons/12.png";
import sdg13 from "../../../../Feature/Images/SDG Icons/13.png";
import sdg14 from "../../../../Feature/Images/SDG Icons/14.png";
import sdg15 from "../../../../Feature/Images/SDG Icons/15.png";
import sdg16 from "../../../../Feature/Images/SDG Icons/16.png";
import sdg17 from "../../../../Feature/Images/SDG Icons/17.png";
import TextEditor from '../../../Report/Component/textEditor';
import Scrollbars from 'react-custom-scrollbars';

const List_review = (props) => {
    const { sdgId, updateRecordData, targetOptions, handleSectorSelect, _handleFileDownload } = props;
    const [ppIndex, setPpIndex] = useState(0);
// console.log(updateRecordData)
    const Align_list =
        targetOptions &&
        targetOptions.align.map((v, k) => (
            {
                id: v.aligned_id,
                value: v.aligned,
                label: v.aligned,
                color: color[`Align${k + 1}`],
            }
        ));

    const imgSrc = sdgId === 1
        ? sdg1
        : sdgId === 2
            ? sdg2
            : sdgId === 3
                ? sdg3
                : sdgId === 4
                    ? sdg4
                    : sdgId === 5
                        ? sdg5
                        : sdgId === 6
                            ? sdg6
                            : sdgId === 7
                                ? sdg7
                                : sdgId === 8
                                    ? sdg8
                                    : sdgId === 9
                                        ? sdg9
                                        : sdgId === 10
                                            ? sdg10
                                            : sdgId === 11
                                                ? sdg11
                                                : sdgId === 12
                                                    ? sdg12
                                                    : sdgId === 13
                                                        ? sdg13
                                                        : sdgId === 14
                                                            ? sdg14
                                                            : sdgId === 15
                                                                ? sdg15
                                                                : sdgId === 16
                                                                    ? sdg16
                                                                    : sdgId === 17 && sdg17
    return (
        <div className='row py-2'>
            <div className='col-xl-3 col-lg-3 col-md-4 col-sm-12 text-left'>
                <div className="font-weight-bold pl-1" style={{ color: color.greyColor }}>
                    Overall
                </div>
                <div className='my-2'>
                    <UNDPDropdown
                        id={'align'}
                        name={'align'}
                        selectedIndex={Align_list.findIndex(v => v.id === updateRecordData[0].aligned_id)}
                        options={Align_list}
                        handleSelect={handleSectorSelect}
                        notClearable={false}
                    />
                </div>
            </div>
            {
                updateRecordData[0].aligned_id !== null &&
                <div className='col-xl-9 col-lg-9 col-md-8 col-sm-12'>
                    <div className="font-weight-bold pl-1 text-left" style={{ color: color.greyColor }}>
                        Review
                    </div>
                    <div
                        className='border my-2'
                        style={{
                            borderRadius: 6,
                            // boxShadow: "2px 3px 5px #343434" 
                        }}>
                        <div
                            className='py-2 px-3'
                            style={{
                                backgroundImage: "linear-gradient(to right, #1A66B9 , #257EDF)",
                                // borderRadius: 6
                                borderTopLeftRadius: 6,
                                borderTopRightRadius: 6
                            }}
                        >
                            <p className="m-0 text-left text-white">
                                <img
                                    src={imgSrc}
                                    align="left"
                                    alt="img"
                                    className="img-responsive p-0 mr-2 bg-light"
                                    style={{ width: "45px", height: "45px", borderRadius: "5px" }}
                                />
                                <span style={{ fontSize: 13 }}>
                                    {updateRecordData[0].target_name}
                                </span>
                            </p>
                        </div>
                        <div
                            className="d-flex flex-row justify-content-between py-2 px-3"
                            style={{ fontSize: 13, backgroundColor: "#EEEEEE" }}
                        >
                            <div>
                                <span style={{ fontWeight: "bold" }}>Pillar/Sectors : </span>
                                &nbsp;{updateRecordData[0].sector_name}
                            </div>
                            <div>
                                <span style={{ fontWeight: "bold" }}>
                                    Digital Development :{" "}
                                </span>
                                &nbsp;
                                {updateRecordData[0].aligned_id == null
                                    ? "Not Relevant"
                                    : Align_list.find(v => v.id === updateRecordData[0].aligned_id).label}
                            </div>

                        </div>
                        <div
                            className="d-flex flex-wrap px-3 py-2"
                            style={{ fontSize: 13, color: "#6C757D" }}
                        >
                            <div className="d-flex flex-nowrap mr-4">
                                <input
                                    className="mr-2 mt-1"
                                    checked={updateRecordData[0].people === 1 ? true : false}
                                    type="checkbox"
                                    id="People"
                                    name="People"
                                    value="People"
                                    readOnly
                                />
                                <label className="m-0" htmlFor="People">
                                    People
                                </label>
                            </div>
                            <div className="d-flex flex-nowrap mr-4">
                                <input
                                    className="mr-2 mt-1"
                                    checked={updateRecordData[0].planet === 1 ? true : false}
                                    type="checkbox"
                                    id="Planet"
                                    name="Planet"
                                    value="Planet"
                                    readOnly
                                />
                                <label className="m-0" htmlFor="Planet">
                                    Planet
                                </label>
                            </div>
                            <div className="d-flex flex-nowrap mr-4">
                                <input
                                    className="mr-2 mt-1"
                                    checked={updateRecordData[0].prosperity === 1 ? true : false}
                                    type="checkbox"
                                    id="Prosperity "
                                    name="Prosperity "
                                    value="Prosperity"
                                    readOnly
                                />
                                <label className="m-0" htmlFor="Prosperity ">
                                    Prosperity
                                </label>
                            </div>
                            <div className="d-flex flex-nowrap mr-4">
                                <input
                                    className="mr-2 mt-1"
                                    checked={updateRecordData[0].peace === 1 ? true : false}
                                    type="checkbox"
                                    id="Peace"
                                    name="Peace"
                                    value="Peace"
                                    readOnly
                                />
                                <label className="m-0" htmlFor="Peace">
                                    Peace
                                </label>
                            </div>
                            <div className="d-flex flex-nowrap mr-4">
                                <input
                                    className="mr-2 mt-1"
                                    checked={updateRecordData[0].partnerships === 1 ? true : false}
                                    type="checkbox"
                                    id="Partnerships "
                                    name="Partnerships "
                                    value="Partnerships"
                                    readOnly
                                />
                                <label className="m-0" htmlFor="Partnerships ">
                                    Partnerships
                                </label>
                            </div>
                        </div>
                        <hr className="m-0" />
                        <div className="my-2 mx-3 text-left" style={{ fontSize: 13 }}>
                            <div className="pb-2" style={{ borderRadius: 12 }}>
                                <div
                                    className="text-white font-weight-bold px-2 py-1"
                                    style={{
                                        backgroundColor: "#1A65B8",
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        border: "1px solid #738d99",
                                        borderBottom: "none",
                                    }}
                                >
                                    National/Strategic Plan
                                </div>

                                <div
                                    className="px-2 py-1"
                                    style={{
                                        borderBottomLeftRadius: 5,
                                        borderBottomRightRadius: 5,
                                        border: "1px solid #738d99",
                                        borderTop: "none",
                                    }}
                                >
                                    {updateRecordData[0].national_strategic_plan ? (
                                        <TextEditor
                                            value={updateRecordData[0].national_strategic_plan}
                                        />
                                    ) : (
                                        <div className="text-center">....</div>
                                    )}
                                </div>
                            </div>
                            <div className="pb-2" style={{ borderRadius: 12 }}>
                                <div
                                    className="text-white font-weight-bold px-2 py-1"
                                    style={{
                                        backgroundColor: "#1A65B8",
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        border: "1px solid #738d99",
                                        borderBottom: "none",
                                    }}
                                >
                                    Digital Policy and Programme
                                </div>

                                <div
                                    className="px-2 py-1"
                                    style={{
                                        borderBottomLeftRadius: 5,
                                        borderBottomRightRadius: 5,
                                        border: "1px solid #738d99",
                                        borderTop: "none",
                                    }}
                                >
                                    <div className="d-flex flex-row flex-wrap">
                                        {updateRecordData[0].policies.map((v, i) => (
                                            <span
                                                key={i}
                                                id={i}
                                                onClick={(e) => setPpIndex(i)}
                                                style={{
                                                    background:
                                                        ppIndex === i ? color.lightGrey : "none",
                                                    color:
                                                        ppIndex === i ? color.textColor : color.greyColor,
                                                    cursor: "pointer",
                                                }}
                                                className="p-1 rounded"
                                            >
                                                {v.title || "P&P " + (i + 1)}
                                            </span>
                                        ))}
                                    </div>

                                    {updateRecordData[0].policies.length > 0 && (
                                        <TextEditor
                                            value={updateRecordData[0].policies[ppIndex].policy_and_programme}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className="" style={{ borderRadius: 12 }}>
                                <div
                                    className="text-white font-weight-bold px-2 py-1"
                                    style={{
                                        backgroundColor: "#1A65B8",
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                        border: "1px solid #738d99",
                                        borderBottom: "none",
                                    }}
                                >
                                    Technology, System and Platform
                                </div>

                                <div
                                    className="px-2 py-1"
                                    style={{
                                        borderBottomLeftRadius: 5,
                                        borderBottomRightRadius: 5,
                                        border: "1px solid #738d99",
                                        borderTop: "none",
                                    }}
                                >
                                    {updateRecordData[0].technology_system_and_platform ? (
                                        <TextEditor
                                            value={updateRecordData[0].technology_system_and_platform}
                                        />
                                    ) : (
                                        <div className="text-center">....</div>
                                    )}
                                </div>
                            </div>
                        </div>
                        <hr className="m-0" />
                        <Scrollbars
                            className="scroll"
                            style={{
                                height: 90,
                            }}
                            renderTrackHorizontal={(props) => (
                                <div
                                    {...props}
                                    style={{ display: "none", overflowX: "hidden" }}
                                    className="track-horizontal"
                                />
                            )}
                        >
                            <div className="my-2 mx-3">
                                {updateRecordData[0].policies.length > 0 &&
                                    updateRecordData[0].policies.map((Mdata, k) =>
                                        Mdata.ministry ? (
                                            <Ministry
                                                key={k}
                                                ministryName={Mdata.ministry}
                                                fileName={Mdata.file_name}
                                                _handleFileDownload={_handleFileDownload}
                                            />
                                        ) : null
                                    )}
                            </div>
                        </Scrollbars>
                    </div>
                </div>
            }
        </div>
    )
}

export default List_review;

const Ministry = (props) => {
    const { ministryName, fileName, _handleFileDownload } = props;

    return (
        <div className="pb-2 w-100">
            <div
                className="d-flex flex-row justify-content-between text-white px-2 py-1"
                style={{ backgroundColor: "#1A65B8" }}
            >
                <div className="text-left" style={{ fontSize: 13 }}>
                    {ministryName}
                </div>

                <i
                    className="fas fa-external-link-alt text-white pt-1"
                    style={{ fontSize: 13 }}
                ></i>
            </div>
            <div className="d-flex flex-row py-1" style={{ fontSize: 12 }}>
                <div
                    className="col-6 text-left float-left"
                    style={{
                        whiteSpace: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                    }}
                >
                    <span className="text-muted font-weight-bold">LINK</span>
                    <br />
                    {/* <a href={v.link}>{v.link}</a> */}
                </div>
                {fileName && (
                    <div
                        className="col-6 text-left float-left"
                        style={{ borderLeft: "1px solid #BFBFBF" }}
                    >
                        <span className="text-muted font-weight-bold">REVIEWED FILE</span>
                        <br />
                        <span>Download</span>
                        <i
                            className="fa fa-download text-primary pl-2"
                            style={{ cursor: "pointer" }}
                            onClick={() => _handleFileDownload(fileName)}
                            aria-hidden="true"
                        ></i>
                    </div>
                )}
            </div>
        </div>
    );
};