import React, { Component } from 'react'
import color from '../../../Feature/Config/color';
import { SDG_list } from "./sdgList";
import UNDPDropdown from '../../Edit/Component/dropdown';
import RadarChart from '../../../Feature/Graphs/radarChart';
import { withRouter } from 'react-router';

class Goals_target extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addRow: null
        }
    }

    _handleAddNewRow = (e) => {
        this.setState({ addRow: { id: e.target.id } });
        const keyVal = [
            { key: "sdgId", value: e.target.id.split(".").shift() },
            { key: "targetId", value: e.target.id.split(".").pop() },
        ];
        this.props.setNewRecord({ keyVal });
    };

    render() {
        const { sdgId,
            imageName,
            isEnabled,
            handleSDGSelect_,
            targets,
            recordId,
            handleTargetSelect,
            targetOptions,
            updateRecordData,
            radarData,
            handleSectorSelect,
            realatedTargetsGroup,
            handleEditChoices,
            viewEditChoices,
            _handleInput,
            _RemoveTarget,
            _handleCreateRow,
            setNewRecord,
            _handleDiscardNewRow,
            removeRecords,
            selectTarget,
            themesEdit,
            priorityUpdates,
            removeThemes
        } = this.props;
        const Target_list =
            targets &&
            targets.map((v, k) => (
                {
                    recordId: v.id,
                    label: 'Target ' + v.sdg_id + '.' + v.sdg_target_id,
                    value: v.sdg_id + '.' + v.sdg_target_id + '_' + k,
                    color: color.sdgColors[sdgId - 1]
                }
            ));
        const Sector_list =
            Object.keys(targetOptions).length > 0 ?
                targetOptions.sector.map((v, k) => (
                    {
                        id: v.sector_id,
                        value: v.sector_name,
                        label: v.sector_name,
                        color: color.sectorColor[k],
                    }
                )) : [];
        const selected_pillars =
            updateRecordData.length > 0 &&
            Pillar_list.reduce((r, c) => {
                const R = [...r]
                if (updateRecordData[0].people === 1 && c.value === 'people') {
                    R.push(c)
                } else if (updateRecordData[0].partnerships === 1 && c.value === 'partnerships') {
                    R.push(c)
                } else if (updateRecordData[0].planet === 1 && c.value === 'planet') {
                    R.push(c)
                } else if (updateRecordData[0].prosperity === 1 && c.value === 'prosperity') {
                    R.push(c)
                } else if (updateRecordData[0].peace === 1 && c.value === 'peace') {
                    R.push(c)
                }
                return R

            }, [])
        return (
            <div className='px-2 ms-1'>
                <div
                    className="boxx w-100 text-left shadow d-flex flex-row flex-fill flex-wrap w-100 p-3 mt-4 mb-3 bg-white"
                    style={{ borderRadius: 10, fontSize: 16 }}>
                    <div className='d-flex'>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{1}</div>
                        Select one of the 17 Sustainable Development Goals to start:
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                            <UNDPDropdown
                                notClearable
                                disabled={isEnabled}
                                selectedIndex={sdgId - 1}
                                options={SDG_list}
                                handleSelect={handleSDGSelect_}
                                imageOption={true}
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="boxx shadow text-left d-flex flex-row flex-fill flex-wrap w-100 p-3 mt-4 mb-3 bg-white"
                    style={{ borderRadius: 10, fontSize: 16 }}>
                    <div className='d-flex'>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{2}</div>
                        Select the one of the corresponding SDG Targets
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                            <UNDPDropdown
                                notClearable
                                disabled={isEnabled}
                                selectedIndex={targets.findIndex(v => v.id === recordId)}
                                options={Target_list}
                                handleSelect={handleTargetSelect}
                            />
                        </div>
                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                            <div
                                className="my-2 p-2 rounded"
                                style={{
                                    background: color.sdgColors[sdgId - 1],
                                    color: "#fff",
                                }}
                            >
                                {updateRecordData[0]?.target_name}
                            </div>
                        </div>
                    </div>
                </div>

                <div
                    className="boxx text-left shadow d-flex flex-row flex-fill flex-wrap w-100 p-3 mt-4 mb-3 bg-white"
                    style={{ borderRadius: 10, fontSize: 16 }}>
                    <div className='d-flex'>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{3}</div>
                        Select the Priority theme
                        <br /><br />
                        Priority Theme(s) are sectors/clusters of investment under which the planning in the country is structured or priority areas of economic and social development for the country.
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                            <UNDPDropdown
                                name={'sector_selector'}
                                //disabled={isEnabled}
                                options={Sector_list}
                                createId={Sector_list?.id}
                                selectedIndex={Sector_list?.findIndex(v => v.id === updateRecordData[0]?.sector_id)}
                                handleSelect={handleSectorSelect}
                                isRegister
                            />
                        </div>
                    </div>
                </div>

                <div
                    className="boxx text-left shadow d-flex flex-row flex-fill flex-wrap w-100 p-3 mt-4 mb-3 bg-white"
                    style={{ borderRadius: 10, fontSize: 16 }}>
                    <div className='d-flex'>
                        <div className="p-2 d-flex align-items-center justify-content-center  mr-2" style={{ width: 25, height: 25, fontSize: "10px", border: `2px solid ${color.lightGrey}`, borderRadius: "50%" }}>{4}</div>
                        Indicate one or more Pillars that the SDG target has an impact on  
                    </div>
                    <div className='col-12 pt-3'>
                        <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                            <UNDPDropdown
                                id={'pillar_selector'}
                                name={'pillar_selector'}
                                //disabled={isEnabled}
                                options={Pillar_list}
                                defaultValues={selected_pillars}
                                handleSelect={handleSectorSelect}
                                isMulti
                                notClearable
                                checkboxOption={true}
                            />
                        </div>
                        {
                            radarData &&
                            <div className="col-lg-6 col-md-6 col-sm-8 col-xs-12">
                                <RadarChart windowWidth={window.innerWidth} svgId={'pillar_selector'} data={radarData} />
                            </div>
                        }
                    </div>
                </div>

                <div
                    className="boxx text-left shadow d-flex flex-row flex-fill flex-wrap w-100 p-3 mt-4 mb-3 bg-white"
                    style={{ borderRadius: 10, fontSize: 16 }}>
                    <div className='d-flex'>
                        RELATED TARGET (S)
                    </div>
                    <div className="col-11 px-0">
                        <div className="d-flex flex-row flex-wrap">
                            {realatedTargetsGroup &&
                                realatedTargetsGroup.map((v, k) => (
                                    <div key={k} className="p-1">
                                        {v.map((x, y) => (
                                            <div
                                                key={y}
                                                className="p-2 border my-1 rounded"
                                                style={{
                                                    background: color.sdgColors[x.sdg_id - 1],
                                                    color: "#fff",
                                                }}
                                            >
                                                Target {x.sdg_id + "." + x.sdg_target_id}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Goals_target)

const Pillar_list = [
    { label: 'People', value: "people" },
    { label: 'Planet', value: "planet" },
    { label: 'Partnerships', value: "partnerships" },
    { label: 'Peace', value: "peace" },
    { label: 'Prosperity', value: "prosperity" },
]