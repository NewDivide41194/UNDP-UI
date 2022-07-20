import one from "../../../Feature/Images/SDG Icons/1.png";
import two from "../../../Feature/Images/SDG Icons/2.png";
import three from "../../../Feature/Images/SDG Icons/3.png";
import four from "../../../Feature/Images/SDG Icons/4.png";
import five from "../../../Feature/Images/SDG Icons/5.png";
import six from "../../../Feature/Images/SDG Icons/6.png";
import seven from "../../../Feature/Images/SDG Icons/7.png";
import eight from "../../../Feature/Images/SDG Icons/8.png";
import nine from "../../../Feature/Images/SDG Icons/9.png";
import ten from "../../../Feature/Images/SDG Icons/10.png";
import eleven from "../../../Feature/Images/SDG Icons/11.png";
import twelve from "../../../Feature/Images/SDG Icons/12.png";
import thirteen from "../../../Feature/Images/SDG Icons/13.png";
import fourteen from "../../../Feature/Images/SDG Icons/14.png";
import fivtheen from "../../../Feature/Images/SDG Icons/15.png";
import sixteen from "../../../Feature/Images/SDG Icons/16.png";
import seventeen from "../../../Feature/Images/SDG Icons/17.png";
import color from "../../../Feature/Config/color";
import { ESButton } from "../../Questionnaire/components/tools/ES_Button";
import List_goals from "../Component/listComponent/list_goals";
import { useEffect, useState } from "react";
import { TargetDataFetch, UpdateTargetFetch } from "../../../Api/FetchEdit";
import { checkTokenExist } from "../../../helper/checkAccess";
import { withCookies } from "react-cookie";
import { deleteCookie, readCookie } from "../../../helper/cookieUser";
import { toast } from "react-toastify";
import * as API from "../../../Api/url";
import io from "socket.io-client";
import Spinner from "../../../Feature/Images/Spinner.gif";
import List_systems from "../Component/listComponent/list_systems";
import Policy from "../Component/listComponent/policy";
import Linkage from "../Component/listComponent/linkage";
import { DownloadFile, FetchReport } from "../../../Api/dataFetch";
import List_review from "../Component/listComponent/list_review";

const ListView = (props) => {
  // const { menuTab,
  //   sdgId,
  //   handleSDGSelect,
  //   relatedTargets,
  //   targets,
  // } = props;
  const { menuTab,
    sdgId,
    handleSDGSelect,
    relatedTargets,
    targets,
    _handleCreateRow,
    setNewRecord,
    _handleDiscardNewRow,
    fetchTarget
  } = props;
  const user = readCookie(props.cookies)
  const [inputSelect, setInputSelect] = useState(null)
  const [recordId, setRecordId] = useState(null)
  const [radarData, setRadarData] = useState(null)
  const [targetOptions, setTargetOptions] = useState([])
  const [recordData, setRecordData] = useState([])
  const [updateRecordData, setUpdateRecordData] = useState([])
  const [isEnabled, setIsEnabled] = useState(false)
  const [viewEditChoices, setViewEditChoices] = useState(false)
  const [themesEdit, SetThemesEdit] = useState(false)
  const [removeRecords, setRemoveRecords] = useState([])
  const [selectTarget, setSelectTarget] = useState([])
  const [priorityUpdates, setPriorityUpdates] = useState([])

  useEffect(() => {
    if (targets.length > 0) {
      setSelectTarget(targets[0].sdg_id + '.' + targets[0].sdg_target_id)
      setRecordId(targets[0].id)
      fetchTargetData(targets[0].id)
    }
  }, [targets])

  useEffect(() => {
    fetchRadarData()
  }, [])

  const handleTargetSelect = ({ e }) => {
    fetchTargetData(e.recordId)
    setSelectTarget((e.label).substr(7))
    setRecordId(e.recordId)
  }

  const _handleEditView = (item) => {
    if (item === 0) {
      setViewEditChoices(!viewEditChoices)
    } else {
      SetThemesEdit(!themesEdit)
    }
  }

  const handleSDGSelect_ = ({ e }) => {
    setUpdateRecordData([]);
    setRecordData([]);
    handleSDGSelect({ e });
  }

  const handleSectorSelect = ({ e, name, projIndex }) => {
    setIsEnabled(true);
    let updateData_;

    if (name === 'sector_selector') {
      updateData_ = [
        {
          ...updateRecordData[0],
          sector_id: e ? e.id : null,
          sector_name: e ? e.value : null,
          suggestionAns: recordData[0].suggestionAns
        }
      ];
      if (!e) {
        // when clear selector
        //remove new option from priorityUpdates
        const i = priorityUpdates.findIndex(v => v.sectorId === null)
        if (i > -1) {
          const newArr = [...priorityUpdates]
          newArr.splice(i, 1)
          setPriorityUpdates(newArr)
        }
      } else if (e.value && e.id === undefined) {
        //when create new 
        const newOption = {
          sectorId: null, sectorName: e.value, countryId: user.country_id
        }
        priorityUpdates.push(newOption)
      } else {
        //when select from list
        const i = priorityUpdates.findIndex(v => v.sectorId === null)
        if (i > -1) {
          const newArr = [...priorityUpdates]
          newArr.splice(i, 1)
          setPriorityUpdates(newArr)
        }
      }

    } else if (name === 'pillar_selector') {
      updateData_ = [
        {
          ...updateRecordData[0],
          partnerships: e.find(v => v.value === 'partnerships') ? 1 : 0,
          people: e.find(v => v.value === 'people') ? 1 : 0,
          planet: e.find(v => v.value === 'planet') ? 1 : 0,
          prosperity: e.find(v => v.value === 'prosperity') ? 1 : 0,
          peace: e.find(v => v.value === 'peace') ? 1 : 0,
        }
      ];
    } else if(name==="statusUpdt_selector" && !e) { // remove Current Phase of Project from the selector
      var systemProjects = [...updateRecordData[0].systemProjects]
      systemProjects[projIndex]["status_update_id"] = null;
      updateData_ = [
        {
          ...updateRecordData[0],
          systemProjects: systemProjects
        }
      ]
    } else if (name === 'statusUpdt_selector' || name === 'projLevel_selector' || name === 'noOfPpl_selector' || name === 'gender_selector') {
      const key =
        name === 'statusUpdt_selector'
          ? 'status_update_id'
          : name === 'projLevel_selector'
            ? 'proj_level_id'
            : name === 'noOfPpl_selector'
              ? 'number_of_people_id'
              : 'gender_id';

      const value =
        name === 'statusUpdt_selector'
          ? (e ? e.statusUpdateId : null) 
          : name === 'projLevel_selector'
            ? (e ? e.level_id : null)
            : name === 'noOfPpl_selector'
              ? (e ? e.id : null)
              : (e ? e.id : null);

      var systemProjects = [...updateRecordData[0].systemProjects]
      systemProjects[projIndex][key] = value;

      updateData_ = [
        {
          ...updateRecordData[0],
          systemProjects: systemProjects
        }
      ]
    } else if (name === 'suggestion_selector') {
      let suggestionAns;
      let systemProjects;
      if (e.length === 0) {
        suggestionAns = updateRecordData[0].systemProjects[projIndex].suggestionAns.map(v => (
          {
            ...v,
            active: 0
          }
        ))
      } else {
        let checkedArr = []
        for (let i = 0; i < e.length; i++) {
          const index = updateRecordData[0].systemProjects[projIndex].suggestionAns.findIndex(v => v.suggestion_id === e[i].suggestionId)
          if (index > -1) {
            checkedArr.push({
              ...updateRecordData[0].systemProjects[projIndex].suggestionAns[index],
              active: 1
            })
          } else {
            checkedArr.push({
              active: 1,
              record_id: recordId,
              sector_id: e[i].sectorId,
              suggestion_id: e[i].suggestionId
            })
          }
        }
        const others = [...updateRecordData[0].systemProjects[projIndex].suggestionAns
          .filter(d => (d.sector_id !== updateRecordData[0].sector_id && d.sector_id !== null))];
        const ids = new Set(checkedArr.map(d => d.suggestion_id));
        const uncheckedArr =
          [...updateRecordData[0].systemProjects[projIndex].suggestionAns
            .filter(d => (!ids.has(d.suggestion_id) && (d.sector_id === updateRecordData[0].sector_id || d.sector_id === null)))
          ]
            .map(v => (
              {
                ...v,
                active: 0
              }
            ));

        suggestionAns = [...checkedArr, ...uncheckedArr, ...others]

      }
      const newArr = [...updateRecordData[0].systemProjects]
      newArr[projIndex].suggestionAns = suggestionAns
      systemProjects = newArr

      updateData_ = [
        {
          ...updateRecordData[0],
          systemProjects: systemProjects
        }
      ]

    } else if (name === 'align' || name === 'external_link' || name === 'internal_link'){
      const key = name === 'align' ? 'aligned_id' : name;
      const value = e ? e.id : null
      const newObj = {...updateRecordData[0]}
      newObj[key] = value
      updateData_ = [
        {
          ...newObj
        }
      ];
    } else if(name === "ageGroup_selector"){
      let ageGroupAns;
      // console.log('select data ', e, projIndex)
      if (e.length === 0) {
        ageGroupAns = updateRecordData[0].systemProjects[projIndex].ageGroup.map(v => (
          {
            ...v,
            active: 0
          }
        ))
      }else {
        let checkedArr = []
        for (let i = 0; i < e.length; i++) {
          const index = updateRecordData[0].systemProjects[projIndex].ageGroup.findIndex(v => v.age_group_id === e[i].ageGroupId)
          if (index > -1) {
            checkedArr.push({
              ...updateRecordData[0].systemProjects[projIndex].ageGroup[index],
              active: 1
            })
          } else {
            checkedArr.push({
              active: 1,
              record_id: recordId,
              age_group_id: e[i].ageGroupId
            })
          }
        }
        const ids = new Set(checkedArr.map(d => d.age_group_id));
        const uncheckedArr =
          [...updateRecordData[0].systemProjects[projIndex].ageGroup
            .filter(d => (!ids.has(d.age_group_id) ))
          ]
            .map(v => (
              {
                ...v,
                active: 0
              }
            ));

        ageGroupAns = [...checkedArr, ...uncheckedArr]
      }
      const newArr = [...updateRecordData]
      newArr[0].systemProjects[projIndex].ageGroup = ageGroupAns

      updateData_ = [
          ...newArr
      ]
    }
    setUpdateRecordData(updateData_)
  }

  const _handleModalText = ({ text, header, ministryIndex }) => {

    const Text = text.replace(/\s*$/, "")
    setIsEnabled(true);
    const obj = [{ ...updateRecordData[0] }]
    if (header === "ministry") {
      obj[0].policies[ministryIndex].ministry = Text;
    } else if (header === "p_and_p_title") {
      obj[0].policies[ministryIndex].title = text;
    } else if (header === 'policies') {
      obj[0][header][ministryIndex].policy_and_programme = Text;
    } else if (header === 'technology_system_and_platform' || header === 'national_strategic_plan') {
      obj[0][header] = Text;
    }

    setUpdateRecordData(obj)
  }

  const handleInputChange = (e, projIndex) => {
    setIsEnabled(true);
    const key = e.target.id;
    const value = e.target.value;

    const systemProjects = [...updateRecordData[0].systemProjects]
    systemProjects[projIndex][key] = value;

    const updateData_ = [
      {
        ...updateRecordData[0],
        systemProjects: systemProjects
      }
    ]
    setUpdateRecordData(updateData_)
  }

  const fetchTargetData = (recordId) => {

    if (
      checkTokenExist(user, props.history, props.cookies)
    ) {
      const countryId = user.country_id;
      TargetDataFetch(
        {
          recordId,
          countryId
        },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(this.props.cookies);
              props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            setTargetOptions(data.payload.targetOptions)
            setRecordData(data.payload.targetData)
            setUpdateRecordData(data.payload.targetData)
          }
        },
        { token: user.token }
      );
    }

  }

  const fetchRadarData = () => {
    if (checkTokenExist(user, props.history, props.cookies)) {
      const userId = user.user_id;
      const countryId = user.country_id;
      FetchReport(
        { countryId, userId },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(props.cookies);
              props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            const DigitalDevelopmentThemes = data.payload
              ? data.payload.DigitalDevelopmentThemes
              : [];
            const total = 376;
            const radarData = DigitalDevelopmentThemes && [
              [
                {
                  area: "People",
                  value: Math.floor((DigitalDevelopmentThemes.people / total) * 100),
                },
                {
                  area: "Planet",
                  value: Math.floor((DigitalDevelopmentThemes.planet / total) * 100),
                },
                {
                  area: "Prosperity",
                  value: Math.floor((DigitalDevelopmentThemes.prosperity / total) * 100),
                },
                {
                  area: "Peace",
                  value: Math.floor((DigitalDevelopmentThemes.peace / total) * 100),
                },
                {
                  area: "Partnerships",
                  value: Math.floor(
                    (DigitalDevelopmentThemes.partnerships / total) * 100
                  ),
                },
              ],
            ];
            setRadarData(radarData)
          }
        },
        { token: user.token }
      );
    }
  };

  const imageName = () => {
    return sdgId === 1
      ? one
      : sdgId === 2
        ? two
        : sdgId === 3
          ? three
          : sdgId === 4
            ? four
            : sdgId === 5
              ? five
              : sdgId === 6
                ? six
                : sdgId === 7
                  ? seven
                  : sdgId === 8
                    ? eight
                    : sdgId === 9
                      ? nine
                      : sdgId === 10
                        ? ten
                        : sdgId === 11
                          ? eleven
                          : sdgId === 12
                            ? twelve
                            : sdgId === 13
                              ? thirteen
                              : sdgId === 14
                                ? fourteen
                                : sdgId === 15
                                  ? fivtheen
                                  : sdgId === 16
                                    ? sixteen
                                    : seventeen;
  };

  const handleSaveChanges = async () => {
    let fileList = [];
    for (let data of updateRecordData) {
      const lists = data.policies.map(
        (v) => v.file
      );
      for (let list of lists) {
        if (list) {
          fileList.push(list);
        }
      }
    }
    if (checkTokenExist(user, props.history, props.cookies)) {
      const userId = user.user_id;
      const countryId = user.country_id;
      const updateRecordData_ = [{
        ...updateRecordData[0],
        removeRecords: removeRecords,
        priorityUpdates: priorityUpdates
      }]

      await UpdateTargetFetch(
        { userId, countryId, recordId },
        updateRecordData_,
        fileList,
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(props.cookies);
              props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            setIsEnabled(false);
            setRecordData(updateRecordData)
            setRemoveRecords([])
            setPriorityUpdates([])
            toast(data.message, { type: "success" });
            const socket_noti = io(API.LastUpdateNoti, {
              transports: ["websocket"],
            });
            socket_noti.emit("save changes", { isLastUpdateInfo: true });
            fetchTargetData(recordId);
            fetchTarget(sdgId);
          }
        },
        { token: user.token }
      );
    }
  };
  // console.log("recordData",recordData)

  const _UploadFile = (e, ministryIndex) => {
    setIsEnabled(true)
    const obj = [...updateRecordData];
    let fileAns = e.target.files[0];
    let fileName = fileAns !== undefined ? fileAns.name : null;
    obj[0].policies[ministryIndex].file = fileAns;
    obj[0].policies[ministryIndex].file_name = fileName;
    setUpdateRecordData(obj)
  };

  var realatedTargetsGroup =
    relatedTargets && updateRecordData.length > 0 &&
    (relatedTargets.filter(v => v.sector_id === updateRecordData[0].sector_id)).reduce(function (targets, org) {
      (targets[org.sdg_id] = targets[org.sdg_id] || []).push(org);
      return targets;
    }, []);

  const _handleAddSheet = (e) => {
    const ID = parseInt(e.target.id);

    const newPloicy = {
      file_name: null,
      ministry: null,
      policy_and_programme: null,
      ssa_id: recordId,
      title: null,
    };
    const newArr = [...updateRecordData]
    newArr[0].policies.push(newPloicy)
    setUpdateRecordData(newArr)
  };

  const _handleAddNewProj = () => {
    const newProj = {
      others: null,
      proj_id: null,
      record_id: recordId,
      status_update_id: null,
      suggestionAns: []
    };
    const newArr = [...updateRecordData]
    newArr[0].systemProjects.push(newProj)
    setUpdateRecordData(newArr)
  }

  const _handleCancel = () => {
    const techDescription = recordData[0].technology_system_and_platform
    const updateData_ = [{
      ...updateRecordData[0],
      technology_system_and_platform: techDescription
    }]
    setUpdateRecordData(updateData_)
    setIsEnabled(false)
  }

  const _CancelFile = (ministryIndex) => {
    const obj = [...recordData];
    obj[0].policies[ministryIndex].file_name = "";
    setRecordData(obj)
    setUpdateRecordData(obj)
    setIsEnabled(true)
  }

  const _RemoveTarget = (id, label) => {
    let confirmAction = window.confirm(`Do you want to delete ${label}?`);
    if (confirmAction) {
      setIsEnabled(true)
      const newArr = [...removeRecords]
      newArr.push(id)
      setRemoveRecords(newArr);
      if (recordId === id) {
        const nextRecordId = targets.filter(v => !newArr.includes(v.id))[0].id
        setRecordId(nextRecordId)
      }
    } else {
      alert("Canceled");
    }
  }

  const _RemoveThemes = (id, sectorName) => {
    let confirmAction = window.confirm(`Do you want to delete ${sectorName}?`);
    if (confirmAction) {
      setIsEnabled(true)
      const newArr = [...priorityUpdates]
      const removePriority = {
        sectorId: id,
        sectorName: sectorName,
        countryId: user.country_id
      }
      newArr.push(removePriority);
      setPriorityUpdates(newArr);

      const index = updateRecordData.findIndex(v => v.sector_id === id)
      if (index >= 0) {
        const newArr = [...updateRecordData]
        newArr[index].sector_id = null;
        newArr[index].sector_name = null;
        setUpdateRecordData(newArr)
      }
    } else {
      alert("Canceled");
    }
  }

  const _handleCheckGaps = (e) => {
    setIsEnabled(true)
    const { id, name, checked } = e.target
    const index = updateRecordData[0][name].findIndex(v => v.id === parseInt(id))
    if (index >= 0) {
      const obj = [{ ...updateRecordData[0] }]
      obj[0][name][index].active = checked ? 1 : 0;
      setUpdateRecordData(obj)
    } else {
      const newData = {
        id: parseInt(id),
        ssa_id: recordId,
        active: checked ? 1 : 0
      }
      const obj = [{ ...updateRecordData[0] }]
      obj[0][name].push(newData)
      setUpdateRecordData(obj)
    }
  }

 const _handleFileDownload = (fileName) => {
    const userId = user.user_id
    if (checkTokenExist(user, props.history, props.cookies)) {
      DownloadFile(
        {
          userId,
          fileName,
        },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(props.cookies);
              props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            window.open(data.payload);
          }
        },
        { token: user.token }
      );
    }
  }; 

  return (
    <div className="col bg-white" style={{ borderRadius: 10 }}>
      <div className='row justify-content-end p-3'>
        <ESButton
          text={"Save"}
          disabled={!isEnabled}
          style={{ width: 230 }}
          customColor={color.green}
          onClick={handleSaveChanges}
        />
      </div>
      {
        updateRecordData.length > 0 ?
          // 1===1 ?
          menuTab === 1 ?
            <List_goals
              sdgId={sdgId}
              imageName={imageName}
              isEnabled={isEnabled}
              handleSDGSelect_={handleSDGSelect_}
              handleEditChoices={_handleEditView}
              handleTargetSelect={handleTargetSelect}
              viewEditChoices={viewEditChoices}
              themesEdit={themesEdit}
              targets={targets}
              recordId={recordId}
              targetOptions={targetOptions}
              updateRecordData={updateRecordData}
              radarData={radarData}
              handleSectorSelect={handleSectorSelect}
              realatedTargetsGroup={realatedTargetsGroup}
              _RemoveTarget={_RemoveTarget}
              _handleCreateRow={_handleCreateRow}
              setNewRecord={setNewRecord}
              _handleDiscardNewRow={_handleDiscardNewRow}
              removeRecords={removeRecords}
              selectTarget={selectTarget}
              priorityUpdates={priorityUpdates}
              removeThemes={_RemoveThemes}
            />
            // <List_goals
            //   sdgId={sdgId}
            //   imageName={imageName}
            //   isEnabled={isEnabled}
            //   handleSDGSelect_={handleSDGSelect_}
            //   handleEditChoices={_handleEditView}
            //   handleTargetSelect={handleTargetSelect}
            //   viewEditChoices={viewEditChoices}
            //   targets={targets}
            //   recordId={recordId}
            //   targetOptions={targetOptions}
            //   updateRecordData={updateRecordData}
            //   radarData={radarData}
            //   handleSectorSelect={handleSectorSelect}
            //   realatedTargetsGroup={realatedTargetsGroup}
            // />
            : menuTab === 2 ?
              <Policy
                recordData={recordData}
                updateRecordData={updateRecordData}
                recordId={recordId}
                isEnabled={isEnabled}
                _handleCancel={_handleCancel}
                _handleSaveChanges={handleSaveChanges}
                _handleModalText={_handleModalText}
                _handleAddSheet={_handleAddSheet}
                _UploadFile={_UploadFile}
                _CancelFile={_CancelFile}
                setUpdateRecordData={(dt) => setUpdateRecordData(dt)}
              />
              : menuTab === 3 ?
                <List_systems
                  recordData={recordData}
                  updateRecordData={updateRecordData}
                  targetOptions={targetOptions}
                  isEnabled={isEnabled}
                  handleSectorSelect={handleSectorSelect}
                  _handleModalText={_handleModalText}
                  _handleCancel={_handleCancel}
                  _handleSaveChanges={handleSaveChanges}
                  _handleInputChange={handleInputChange}
                  _handleAddNewProj={_handleAddNewProj}
                />
                : menuTab === 4 ?
                  <Linkage
                    isEnabled={isEnabled}
                    updateRecordData={updateRecordData}
                    targetOptions={targetOptions}
                    _handleModalText={_handleModalText}
                    _handleCancel={_handleCancel}
                    _handleSaveChanges={handleSaveChanges}
                    _handleCheckGaps={_handleCheckGaps}
                    _handleSectorSelect={handleSectorSelect}
                  />
                  :
                  <List_review
                    sdgId={sdgId}
                    updateRecordData={updateRecordData}
                    targetOptions={targetOptions}
                    handleSectorSelect={handleSectorSelect}
                    _handleFileDownload={_handleFileDownload}
                  />
          :
          <img className=' m-auto' src={Spinner} alt="Loading" width={120} />
      }

    </div>
  );
};

export default withCookies(ListView);
