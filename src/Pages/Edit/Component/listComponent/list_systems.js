import React, { useEffect, useState } from 'react'
import color from '../../../../Feature/Config/color';
import BarChart from '../../../../Feature/Graphs/barChart';
import GuagueChart from '../../../../Feature/Graphs/guagueChart';
import { ESInput } from '../../../Questionnaire/components/tools/ES_Inputs';
import { ESButton } from '../../../Questionnaire/components/tools/ES_Button'
import UNDPDropdown from '../dropdown';
import Description from './description';
import { AgeGroup_list1, GMainstreaming_list, Level_list, NoOfPeople_list } from './optionLists';

const List_systems = (props) => {
    const [slideVal, setSlideVal] = useState([20, 37])
    const [projIndex, setProjIndex] = useState(0)
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
    } = props;

    const barChartData = 
    updateRecordData.length > 0 &&
        AgeGroup_list1.map(v=> (
            {
                label: v.label,
                value: updateRecordData[0].systemProjects[projIndex].ageGroup.findIndex(v1=> v1.age_group_id===v.id && v1.active === 1) < 0 ? 0 : 1
            }
        ));

    const StatusUpdate_list =
        targetOptions &&
        targetOptions.status_update.map((v, k) => (
            {
                statusUpdateId: v.status_update_id,
                value: v.status_update,
                label: v.status_update,
            }
        ));

    const 
    
    Suggestion_list =
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

    const selectedSuggestion =
        (Suggestion_list && updateRecordData.length > 0) &&
        Suggestion_list.reduce((r, c) => {
            const R = [...r]
            const index = updateRecordData[0].systemProjects[projIndex].suggestionAns
                .findIndex(v => v.suggestion_id === c.suggestionId && v.active === 1)
            if (index >= 0) R.push(c)

            return R
        }, []);

    const AgeGroup_list = targetOptions &&
    targetOptions.ageGroup.map(v1 => (
        {
            label: v1.age_group_name,
            value: v1.age_group_name,
            ageGroupId: v1.age_group_id
        }
    ));

    const selectedAgeGroup =
        (AgeGroup_list && updateRecordData.length > 0) &&
        AgeGroup_list.reduce((r, c) => {
            const R = [...r]
            const index = updateRecordData[0].systemProjects[projIndex].ageGroup
                .findIndex(v =>v.active === 1 && v.age_group_id === c.ageGroupId)
                // console.log('index ', index, )
            if (index >= 0) R.push(c)

            return R
        }, []);

    const handleSlideChange = (event, newValue) => {
        setSlideVal(newValue)
    }

    const statusUpdateIndex = StatusUpdate_list.findIndex(v => v.statusUpdateId === updateRecordData[0].systemProjects[projIndex].status_update_id)
    const levelIndex = Level_list.findIndex(v => v.level_id === updateRecordData[0].systemProjects[projIndex].proj_level_id)
    const noOfPplIndex = NoOfPeople_list.findIndex(v => v.id === updateRecordData[0].systemProjects[projIndex].number_of_people_id)
    const genderIndex = GMainstreaming_list.findIndex(v => v.id === updateRecordData[0].systemProjects[projIndex].gender_id)

    useEffect(() => {
        BreakLabel()
    }, [window.innerWidth, updateRecordData[0].status_update_id, levelIndex])

    const BreakLabel = () => {
        const legends = document.querySelectorAll("text.segment-value")
        const title = document.querySelectorAll("text.current-value")

        for (let t of title) {
            t.innerHTML = ''
        }

        for (let d of legends) {
            const legendName = d.innerHTML
            console.log('legnd name ', legendName)
            d.style.fontWeight = 'normal'
            if (legendName === 'Project Conceptualisation') {
                console.log('Project Conceptualisation')
                if (window.innerWidth < 700) {
                    d.setAttribute('transform', 'rotate(0) translate(-110, -30)')
                } else d.setAttribute('transform', 'rotate(0) translate(-125, -30)')

                a(d)
            }
            else if (legendName === 'Budget Allocation') {
                if (window.innerWidth < 700) {
                    d.setAttribute('transform', 'rotate(0) translate(-90, -90)')
                } else d.setAttribute('transform', 'rotate(0) translate(-90, -100)')

                a(d)
            }
            else if (legendName === 'Project Implementation') {
                if (window.innerWidth < 700) {
                    d.setAttribute('transform', 'rotate(0) translate(0, -100)')
                } else d.setAttribute('transform', 'rotate(0) translate(0, -120)')

                a(d)
            }
            else if (legendName === 'Performance Monitoring') {
                if (window.innerWidth < 700) {
                    d.setAttribute('transform', 'rotate(0) translate(90, -90)')
                } else d.setAttribute('transform', 'rotate(0) translate(90, -100)')

                a(d)
            }
            else if (legendName === 'Evaluation and Citizens Feedback') {
                if (window.innerWidth < 700) {
                    d.setAttribute('transform', 'rotate(0) translate(105, -45)')
                } else d.setAttribute('transform', 'rotate(0) translate(120, -45)')

                a(d)
            }
        }
    }

    const a = (d, textWidth, lineHeight) => {
        //var x = 0;
        console.log('in a method')
        var y = lineHeight || 15;
        var width = textWidth || 50;

        var element = d
        var text = element.innerHTML;

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
                line = words[n] + '';
            } else {
                line = testLine;
            }
        }

        element.innerHTML += '<tspan x="0" dy="' + y + '">' + line + '</tspan>';
        document.getElementById("PROCESSING").remove();
    }
 
    return (
        <div className="row py-2">
            {/* <div className="col-lg-3 text-left col-md-6 col-sm-6">
                <div className="font-weight-bold" style={{ color: color.greyColor }}>
                    DIGITAL TECHNOLOGY, SYSTEMS AND PLATFORMS
                </div>
                <div className='my-2'>
                    <UNDPDropdown
                        name={'suggestion_selector'}
                        options={Suggestion_list}
                        defaultValues={selectedSuggestion}
                        handleSelect={handleSectorSelect}
                        isMulti
                        notClearable
                        checkboxOption={true}
                    />
                </div>
                {(updateRecordData[0].suggestionAns.findIndex(v => v.sector_id === null && v.active === 1)) >= 0 &&
                    <Input
                        id={'others'}
                        title={'Others'}
                        onChange={_handleInputChange}
                        value={updateRecordData[0].others}
                    />
                }

            </div> */}
            <div className="col-lg-6 text-left col-md-6 col-sm-6">
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
            <div className="col-lg-6 text-left col-md-6 col-sm-6">
                <div className="font-weight-bold" style={{ color: color.greyColor }}>
                    <i
                        className="fas fa-external-link-alt text-primary pr-2"
                        style={{
                            cursor: 'pointer'
                        }}
                    />
                    MILESTONES
                    <i
                        className="fa fa-info-circle px-1"
                        style={{ cursor: 'pointer' }}
                    />
                </div>
                {/* <div className=" pl-0 my-1">
                   <ESButton
                    onClick={()=>console.log("addnew")}
                    leftIcon={
                    <i
                      className="fas fa-plus-circle mr-1"
                      style={{ 
                        color:  color.white, 
                      }}
                    ></i>
                  }
                    text={"ADD NEW PROJECT"}/>
                </div> */}
                <Sheet
                    projIndex={projIndex}
                    _handleSheetClick={(index) => setProjIndex(index)}
                    _handleAddNewProj={_handleAddNewProj}
                    systemProjects={updateRecordData[0].systemProjects}
                />
                <div
                    className='px-2'
                    style={{
                        border: '2px solid #dee2e6',
                        borderRadius: '0px 0px 5px 5px',
                        borderTop: '3px solid' + color.primaryColor
                    }}
                >
                    <div className='my-2'>
                        <div /*className="font-weight-bold" style={{ color: color.greyColor }} */>
                            Type/Category
                        </div>
                        <div className='my-2'>
                            <UNDPDropdown
                                name={'suggestion_selector'}
                                options={Suggestion_list}
                                defaultValues={selectedSuggestion}
                                handleSelect={handleSectorSelect}
                                isMulti
                                notClearable
                                checkboxOption={true}
                                projIndex={projIndex}
                            />
                        </div>
                        {(updateRecordData[0].systemProjects[projIndex].suggestionAns.findIndex(v => v.sector_id === null && v.active === 1)) >= 0 &&
                            <Input
                                id={'others'}
                                title={'Others'}
                                onChange={(e)=>_handleInputChange(e,projIndex)}
                                value={updateRecordData[0].systemProjects[projIndex].others}
                            />
                        }
                    </div>
                    <div className='my-2'>
                        <Input
                            id={'proj_title'}
                            title={'PROJECT TITLE, IF ANY'}
                            placeholder={'Please indicate'}
                            onChange={(e) => _handleInputChange(e,projIndex)}
                            value={updateRecordData[0].systemProjects[projIndex].proj_title}
                        />
                        <Selector
                            name={'projLevel_selector'}
                            title={'LEVEL OF PROJECT Project Implementation'}
                            options={Level_list}
                            selectedIndex={levelIndex}
                            handleSelect={handleSectorSelect}
                            projIndex={projIndex}
                        />
                        {
                            levelIndex === 0 &&
                            <>
                                <Selector
                                    name={'statusUpdt_selector'}
                                    title={'CURRENT PHASE OF PROJECT'}
                                    selectedIndex={statusUpdateIndex}
                                    options={StatusUpdate_list}
                                    handleSelect={handleSectorSelect}
                                    projIndex={projIndex}
                                    notClearable={false}
                                />
                                <div className="col p-0 d-flex justify-content-center">
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
                            </>
                        }
                        <Input
                            id={'location'}
                            title={'LOCATION/AREA OF PROJECT'}
                            placeholder={'Please indicate'}
                            onChange={(e) => _handleInputChange(e,projIndex)}
                            value={updateRecordData[0].systemProjects[projIndex].location}
                        />
                        <Selector
                            name={"noOfPpl_selector"}
                            title={'OUTREACH OF PROJECT : NUMBER OF PEOPLE'}
                            selectedIndex={noOfPplIndex}
                            options={NoOfPeople_list}
                            handleSelect={handleSectorSelect}
                            projIndex={projIndex}
                        />
                        <Selector
                            name={'ageGroup_selector'}
                            title={'OUTREACH OF PROJECT : AGE GROUP'}
                            isMulti
                            checkboxOption
                            options={AgeGroup_list}
                            defaultValues={selectedAgeGroup}
                            handleSelect={handleSectorSelect}
                            projIndex={projIndex}
                        />
                        <div className='my-2 d-flex align-items-end' style={{ width: '100%' }}>
                            <BarChart
                                id={"AgeforSystem"}
                                windowWidth={window.innerWidth}
                                parentId={'ageGroup_selector'}
                                data={barChartData}
                            />
                        </div>
                        <Selector
                            name={"gender_selector"}
                            title={'OUTREACH OF PROJECT : GENDER MAINSTREAMING'}
                            selectedIndex={genderIndex}
                            options={GMainstreaming_list}
                            handleSelect={handleSectorSelect}
                            projIndex={projIndex}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default List_systems;

const Selector = (props) => {
    const { notClearable=true,title, options, handleSelect, selectedIndex, isMulti, name, checkboxOption, projIndex , defaultValues} = props;
    return (
        <div id={name} className='py-2'>
            {title}
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
        </div>
    )
}

const Input = (props) => {
    const { id, title, placeholder, onChange, value } = props;
    return (
        <div className='py-2'>
            <span className='' >
                {title}
            </span>
            <ESInput
                id={id}
                placeHolder={placeholder}
                value={value ? value : ''}
                onChange={onChange}
            />
        </div>
    )
}

const Sheet = (props) => {
    const { projIndex, _handleSheetClick, _handleAddNewProj, systemProjects } = props;
    return (
        <div
            className="d-flex flex-row pt-3 "
        >
            {systemProjects.map((v, k) => (
                <React.Fragment key={k}>
                    <span
                        className="mr-1 px-2 py-1"
                        id={k}
                        style={{
                            borderRadius: "5px 5px 0 0",
                            background:
                                projIndex === k ? color.primaryColor : color.lightGrey,
                            color: projIndex === k ? "#fff" : color.greyColor,
                            cursor: "pointer",
                        }}
                    >
                        <a id={k} herf="#" onClick={() => _handleSheetClick(k)}>
                            {`Proj ${k + 1}`}
                        </a>
                    </span>
                    {k + 1 === systemProjects.length && (
                        <span 
                           // title="Add New Project" 
                            className="p-1" style={{ color: color.green, cursor: "pointer" }} 
                            onClick={() => _handleAddNewProj()}
                        >
                            <i
                                className="fa fa-plus-circle" 
                            />
                            <span className="font-weight-bold ml-1" style={{ color: color.greyColor }}>Add New Project</span>
                        </span>
                    )}
                </React.Fragment>
            ))}
        </div>
    )
}

const instruction = 'Please indicate relevant technologies and capabilities, that are specific to this SDG target. This may include IT systems or transactions platforms in use; digitalisation of data and management; broadband and connectivity infrastructure'
