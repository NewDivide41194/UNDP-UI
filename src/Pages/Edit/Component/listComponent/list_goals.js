import React, { useState } from 'react'
import color from '../../../../Feature/Config/color';
import { SDG_list } from "../sdgList";
import UNDPDropdown from '../dropdown';
import RadarChart from '../../../../Feature/Graphs/radarChart';
import { ESDropDown } from '../../../Questionnaire/components/tools/ES_DropDown';
import Scrollbars from "react-custom-scrollbars";
import { AddNewRow } from '../addNewRowModal';

const List_goals = (props) => {
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
    } = props;
    const [addRow, setAddRow] = useState(null);

    const _handleAddNewRow = (e) => {
        setAddRow({ id: e.target.id });
        const keyVal = [
            { key: "sdgId", value: e.target.id.split(".").shift() },
            { key: "targetId", value: e.target.id.split(".").pop() },
        ];
        setNewRecord({ keyVal });
    };

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
        targetOptions &&
        targetOptions.sector.map((v, k) => (
            {
                id: v.sector_id,
                value: v.sector_name,
                label: v.sector_name,
                color: color.sectorColor[k],
            }
        ));
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
        <>

            <div className="row py-2">
                <div className="col-lg-4 text-left col-sm-6">
                    <div className="font-weight-bold" style={{ color: color.greyColor }}>
                        SUSTAINABLE DEVELOPMENT GOAL
                    </div>
                    <div className='my-2'>
                        <UNDPDropdown
                            notClearable
                            disabled={isEnabled}
                            selectedIndex={sdgId - 1}
                            options={SDG_list}
                            handleSelect={handleSDGSelect_}
                        />
                        <img src={imageName()} width={180} />
                    </div>
                </div>
                <div className={`col-lg-3 text-left col-sm-6`}>

                    <div className="row justify-content-between font-weight-bold mx-auto" style={{ color: color.greyColor }}>
                        TARGET
                    </div>
                    <div className='my-2'>
                        <UNDPDropdown
                            notClearable
                            disabled={isEnabled}
                            selectedIndex={targets.findIndex(v => v.id === recordId)}
                            options={Target_list}
                            handleSelect={handleTargetSelect}
                        />
                        <div
                            className="my-2 p-2 rounded"
                            style={{
                                background: color.sdgColors[sdgId - 1],
                                color: "#fff",
                            }}
                        >
                            {updateRecordData[0].target_name}
                        </div>
                    </div>
                    <div className="row justify-content-between mx-1 my-1">
                        <div className="text-left text-primary">
                            <a href="#" onClick={() => handleEditChoices(0)}>
                                <i className="fas fa-edit mr-1"></i>
                                Edit Choices
                            </a>
                        </div>

                        <div
                            id={selectTarget}
                            className="text-primary"
                            onClick={_handleAddNewRow}
                            data-toggle={"modal"}
                            data-target={"#add_row_modal_1"}
                            data-dismiss={"modal"}
                            data-backdrop="static"
                            data-keyboard="false"
                            style={{ cursor: 'pointer' }}
                        >
                            <i className="fas fa-plus-circle pt-1 pl-1 mr-1">
                                {/* Add New  */}
                            </i>Add New Target
                        </div>
                    </div>

                    {
                        targets && viewEditChoices &&
                        <div style={{ cursor: 'pointer' }} >
                            <Scrollbars style={{ height: '200px' }}>
                                {
                                    targets.filter(d => !removeRecords.includes(d.id))
                                        .map((v, k) => (

                                            <ul key={k} className="list-group mt-2">
                                                <li className="list-group-item py-1" key={k} id={v.sdg_id + '.' + v.sdg_target_id}>
                                                    {'Target ' + v.sdg_id + '.' + v.sdg_target_id}
                                                    <i className="fa fa-trash float-right ml-2" onClick={() => _RemoveTarget(v.id, 'Target ' + v.sdg_id + '.' + v.sdg_target_id)}></i>
                                                </li>

                                            </ul>

                                        ))
                                }

                            </Scrollbars>
                        </div>
                    }
                    {addRow && (
                        <AddNewRow
                            data={addRow}
                            _handleCreateRow={_handleCreateRow}
                            setNewRecord={setNewRecord}
                            _handleDiscardNewRow={_handleDiscardNewRow}
                        />
                    )}
                </div>
                <div className={`col-lg-2 text-left col-sm-6`}>
                    <div className="font-weight-bold" style={{ color: color.greyColor }}>
                        PRIORITY THEMES
                    </div>
                    <div className='my-2'>
                        <UNDPDropdown
                            name={'sector_selector'}
                            //disabled={isEnabled}
                            options={Sector_list}
                            createId={Sector_list.id}
                            selectedIndex={Sector_list.findIndex(v => v.id === updateRecordData[0].sector_id)}
                            handleSelect={handleSectorSelect}
                            isRegister
                        />
                    </div>
                    <div className="row justify-content-between mx-1 my-1">
                        <a href="#" onClick={() => handleEditChoices(1)}>
                            <i className="fas fa-edit mr-1"></i>
                            Edit Choices
                        </a>
                        {/* <div className="text-primary">{Sector_list.length} options in list</div> */}
                    </div>

                    {
                        targetOptions && themesEdit &&
                        <div style={{ cursor: 'pointer' }} >
                            <Scrollbars style={{ height: '200px' }}>
                                {
                                    Sector_list.filter(d => !(priorityUpdates.map(v => v.sectorId)).includes(d.id))
                                        .map((v, k) => (

                                            <ul key={k} className="list-group mt-2">
                                                <li className="list-group-item py-1" key={k} >
                                                    {v.label}
                                                    <i className="fa fa-trash float-right ml-2" onClick={() => removeThemes(v.id, v.value)}></i>
                                                </li>

                                            </ul>

                                        ))
                                }

                            </Scrollbars>
                        </div>
                    }
                </div>
                <div className={`col-lg-3 text-left col-sm-6`}>
                    <div className="font-weight-bold" style={{ color: color.greyColor }}>
                        PILLAR
                    </div>
                    <div className='my-2'>
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
                        {
                            radarData &&
                            <RadarChart windowWidth={window.innerWidth} svgId={'pillar_selector'} data={radarData} />
                        }
                    </div>
                </div>
            </div>
            <div className={`text-left py-2`}>
                <span className="font-weight-bold" style={{ color: color.greyColor }}>
                    RELATED TARGET (S)
                </span>
                <hr />
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
        </>
    )
}

export default List_goals;

const Pillar_list = [
    { label: 'People', value: "people" },
    { label: 'Planet', value: "planet" },
    { label: 'Partnerships', value: "partnerships" },
    { label: 'Peace', value: "peace" },
    { label: 'Prosperity', value: "prosperity" },
]