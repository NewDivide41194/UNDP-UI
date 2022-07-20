import React, { useState } from "react";
import color from "../../../Feature/Config/color";
import { ESButton } from "../../Questionnaire/components/tools/ES_Button";
import UNDPDropdown from "./dropdown";
import ViewEditModal from "./viewEditModal";
import ProgressBar from "./progressBar";
import Checkbox from "../Component/checkbox";
import COLORWHEEL from "../../../Feature/Images/colorWheel.png";
import font from "../../../Feature/Config/font";
import Spinner from "../../../Feature/Images/Spinner.gif";
import "../../../App.css";
import { AddNewRow } from "./addNewRowModal";
import { updatePandPTitle } from "../../../Api/FetchEdit";
import { toast } from "react-toastify";
import AlertDialog from "../../../Feature/Tools/alertDialog";
import back from '../../../Feature/Images/back.jpg'

const EditTable = (props) => {
  const [modalData, setModalData] = useState(null);
  const [addRow, setAddRow] = useState(null);

  const [ministryIndex, setMinistryIndex] = useState(0);
  const windowWidth = window.innerWidth;
  const [editTitle, setEditTitle] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [PPID, setPPID] = useState(null);

  const {
    view,
    recordData,
    suggestions,
    _UploadFile,
    sdgId,
    SDG_list,
    _handleSDGSelect,
    _handleSectorSelect,
    _handleCheckThemes,
    _handleExpand,
    targetLoading,
    expandId,
    _handleCollapse,
    _handleTextChange,
    updateRecordData,
    updateSuggestion,
    _handlecheckSuggestion,
    _handleModalText,
    _handleDisplaySwitch,
    sectorOption,
    alignOption,
    statusUpdateOption,
    ministry,
    _handleAddSheet,
    _handleAutoSave,
    setNewRecord,
    _handleCreateRow,
    _handleDiscardNewRow,
    _handleSaveChanges,
    _handleDiscardP_and_P,
    _handleGoToEditMenu,
    fetchEditRecordData,
    user,
    isEnabled,
  } = props;

  const _handleSheetClick = (e) => {
    editTitle || setMinistryIndex(parseInt(e.target.id));
  };

  const _handleCancelEdit = (e) => {
    setNewTitle("");
    setPPID(null);
    setEditTitle(null);
  };

  const _handleTitleChange = ({ e, id }) => {
    setNewTitle(e.target.value);
    if (!e.target.id) {
      _handleModalText({
        id: id,
        text: e.target.value,
        ministryIndex: ministryIndex,
        header: "p_and_p_title",
      });
    }
    // setEditTitle({...editTitle,text:e.target.value})
  };
  const _handleEditTitle = (e) => {
    setPPID(e.target.id);
    if (e.target.id) {
      editTitle ||
        setEditTitle(
          modalData.data.content.find((x) => x.ppId === parseInt(e.target.id))
        );
      setNewTitle(
        modalData.data.content.find((x) => x.ppId === parseInt(e.target.id))
          .title
      );
    } else {
      setEditTitle({
        title: null,
      });
      setNewTitle("");
    }
  };

  const _handleAddNewRow = (e) => {
    console.log("e",e)
    setAddRow({ id: e.target.id });
    const keyVal = [
      { key: "sdgId", value: e.target.id.split(".").shift() },
      { key: "targetId", value: e.target.id.split(".").pop() },
    ];
    setNewRecord({ keyVal });
  };

  const _handleUpdateTitle = () => {
    updatePandPTitle(
      { id: PPID, title: newTitle },
      (err, data) => {
        if (err) {
          return;
        }
        toast(data.message, { type: "success" });
        const obj = { ...modalData };
        obj.data.content[ministryIndex].title = newTitle;
        setModalData(obj);
        _handleCancelEdit();
      },
      {
        token: user.token,
      }
    );
  };
  const handleModalClick = ({ header, data }) => {
    let policyAndProgrammes;
    if (header === "Policy and Programmes") {
      if (data.digitalDevelopment.policyAndProgrammes.length === 0) {
        // const event ={target:{id: data.id}}
        // _handleAddSheet(event)
        // const row = recordData.find(v=> v.id === data.id).digitalDevelopment.policyAndProgrammes
        // policyAndProgrammes=row;
      } else {
        policyAndProgrammes = data.digitalDevelopment.policyAndProgrammes;
      }
    }
    _handleCancelEdit();
    setMinistryIndex(0);
    const modalData_ = {
      id: data.id,
      sectorId: data.detailView1.sectorId,
      readOnly: header === "National/Strategic Plan" ? true : false,
      header: header,
      data: {
        // editable: isEdit,
        content:
          header === "Policy and Programmes"
            ? policyAndProgrammes
            : header === "Technology, Systems and Platforms"
            ? data.digitalDevelopment.technologySystemsAndPlatforms
            : data.nationalStrategicPlan,
      },
    };
    setModalData(modalData_);
  };
  const collapseData = recordData.reduce(
    function (p, c) {
      var id = [c.sdgId, c.sdgTargetNo].join("|");

      if (expandId === undefined) {
        if (p.temp.indexOf(id) === -1) {
          p.out.push(c);
          p.temp.push(id);
        }
        return p;
      } else {
        if (p.temp.indexOf(id) === -1 || id === expandId) {
          p.out.push(c);
          p.temp.push(id);
        }
        return p;
      }
    },
    {
      temp: [],
      out: [],
    }
  ).out;

  const obtained = (index) => {
    const policyAndProgrammes =
      collapseData[index].digitalDevelopment.policyAndProgrammes;
    // console.log("policy",policyAndProgrammes)
    const technologySystemsAndPlatforms =
      collapseData[index].digitalDevelopment.technologySystemsAndPlatforms;
    const asArray1 = Object.entries(collapseData[index].detailView1);
    const asArray2 = Object.entries(collapseData[index].detailView2);
    const asArray3 = Object.entries(collapseData[index].detailView2.themes);

    const Record1 = asArray1.filter(
      ([key, value]) => value !== null && value !== ""
    ).length;
    const Record2 = asArray2.filter(
      ([key, value]) => value !== null && key === "overall"
    ).length;
    const Record3 = asArray3.filter(
      ([key, value]) => value !== 0 && value !== null
    ).length;

    const policy = policyAndProgrammes.filter(
      (value) =>
        (value.text !== null &&
          (value.text ? value.text.trim() !== "" : value.text !== "")) ||
        (value.ministry !== null &&
          (value.ministry
            ? value.ministry.trim() !== ""
            : value.ministry !== "")) ||
        (value.fileName !== null && value.fileName !== "")
    );
    const policyRecord = policy.length > 0 ? 1 : 0;
    const themes = Record3 >= 1 && 1;

    const technology =
      technologySystemsAndPlatforms === null ||
      technologySystemsAndPlatforms.trim() === ""
        ? 0
        : 1;

    const recordCount = policyRecord + technology + Record1 + Record2 + themes;
    return recordCount;
  };
  const totalRocordField = 8;
  const percent = (index) => obtained(index) + "/" + totalRocordField;
  const progress = (index) => (obtained(index) * 100) / totalRocordField;

  const Header = Title.map((i, k) => (
    <thead key={k} style={{ background: color.primaryColor }}>
      <tr style={{ width: "100%" }} className="red">
        <th
          className="align-middle text-light"
          rowSpan="3"
          colSpan="3"
          style={{ maxWidth: "20%" }}
        >
          <img
            alt=""
            src={COLORWHEEL}
            style={{
              width: "40px",
              height: "40px",
            }}
          />
          <br />
          <div className="pt-2">{i.column1}</div>
        </th>
        <th
          className="align-middle text-light"
          rowSpan="3"
          style={{ maxWidth: "15%" }}
        >
          {i.column2}
        </th>
        <th
          className="align-middle text-light"
          rowSpan="3"
          style={{ maxWidth: "15%", minWidth: 90 }}
        >
          {i.column3}
        </th>
        <th
          className="align-middle text-light"
          colSpan="2"
          style={{ maxWidth: "15%" }}
        >
          {i.column4}
        </th>
        <th
          style={{ background: color.secondaryColor, width: "40%" }}
          colSpan={view ? "4" : "6"}
        >
          <DisplaySwitchPanel _handleDisplaySwitch={_handleDisplaySwitch} />
        </th>
      </tr>
      <tr className="red">
        <th rowSpan="3" className="align-middle text-light">
          {i.column5}
        </th>
        <th rowSpan="3" className="align-middle text-light">
          {i.column6}
        </th>
        {view ? (
          <React.Fragment>
            <th
              className="align-middle text-light"
              style={{ background: color.secondaryColor }}
            >
              {detailOneHeader.column2}
            </th>

            <th
              className="align-middle text-light"
              style={{ background: color.secondaryColor }}
            >
              {detailOneHeader.column3}
            </th>
            <th
              className="align-middle text-light"
              style={{ background: color.secondaryColor /*minWidth: 150*/ }}
            >
              {detailOneHeader.column4}
            </th>
            <th
              className="align-middle text-light"
              style={{ background: color.secondaryColor }}
            >
              {detailOneHeader.column5}
            </th>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <th
              className="align-middle text-light"
              rowSpan="2"
              style={{ background: color.secondaryColor /*width: "800px"*/ }}
            >
              {detailTwoHeader.column2}
            </th>
            <th
              className="align-middle text-light"
              colSpan="5"
              style={{ background: color.secondaryColor }}
            >
              {detailTwoHeader.column3}
            </th>
          </React.Fragment>
        )}
      </tr>
      {!view && (
        <tr style={{ background: color.secondaryColor }}>
          <th className="align-middle text-light">{detailTwoHeader.column4}</th>
          <th className="align-middle text-light">{detailTwoHeader.column5}</th>
          <th className="align-middle text-light">{detailTwoHeader.column6}</th>
          <th className="align-middle text-light">{detailTwoHeader.column7}</th>
          <th className="align-middle text-light">{detailTwoHeader.column8}</th>
        </tr>
      )}
    </thead>
  ));

  const isExpand = collapseData
    .map((v) => v.sdgId + "|" + v.sdgTargetNo === expandId)
    .findIndex((v, i) => v === true);

  var noIconIndexs = [];
  var array = collapseData.map(
    (v) => v.sdgId + "|" + v.sdgTargetNo === expandId
  );
  var element = true;
  var idx = array.indexOf(element);
  while (idx !== -1) {
    noIconIndexs.push(idx);
    idx = array.indexOf(element, idx + 1);
  }

  const SDGTarget = ({ recordData, sdgId, sdgTargetNo }) => {
    return (
      <div>
        <span
          title={
            recordData.filter(
              (a) => a.sdgId + "." + a.sdgTargetNo == sdgId + "." + sdgTargetNo
            )[0].relevantPoliciesAndDevelopmentPlan
          }
          style={{ cursor: "default", fontWeight: "bold" }}
        >
          {sdgId + "." + sdgTargetNo}
        </span>
        <span
          style={{
            fontSize: 10,
            borderRadius: 3,
            padding: 3,
            background: "rgba(0, 107, 183, 0.2)",
            cursor: "pointer",
          }}
          className="ml-2"
          id={sdgId + "." + sdgTargetNo}
          header={"Add New Row"}
          // data={reco}
          data-toggle={"modal"}
          data-target={"#add_row_modal_1"}
          data-dismiss={"modal"}
          onClick={_handleAddNewRow}
        >
          Add New
        </span>
      </div>
    );
  };

  const Body =
    collapseData &&
    collapseData.map((v, k) => (
      <tr className="text-left" key={k}>
        <td style={{ color: color.primaryColor, textAlign: "center" }}>
          {k === isExpand ? (
            <i
              className="far fa-minus-square"
              id={v.sdgId + "|" + v.sdgTargetNo}
              onClick={_handleCollapse}
              style={{ cursor: "pointer" }}
            />
          ) : v.sdgId + "|" + v.sdgTargetNo === expandId ? null : (
            <i
              className="far fa-plus-square"
              id={v.sdgId + "|" + v.sdgTargetNo}
              onClick={_handleExpand}
              style={{ cursor: "pointer" }}
            />
          )}
        </td>
        <td style={{ color: color.primaryColor, minWidth: 90 }}>
          {k === isExpand ? (
            <SDGTarget
              recordData={recordData}
              sdgId={v.sdgId}
              sdgTargetNo={v.sdgTargetNo}
            />
          ) : v.sdgId + "|" + v.sdgTargetNo === expandId ? null : (
            <SDGTarget
              recordData={recordData}
              sdgId={v.sdgId}
              sdgTargetNo={v.sdgTargetNo}
            />
          )}
        </td>

        <td></td>
        <td style={{ minWidth: 135, width: "15%" }}>
          <UNDPDropdown
            id={v.id}
            name={"sector"}
            selectedIndex={v.detailView1.sectorId - 1}
            editedRecord={{ ...v, view: view }}
            options={sectorOption}
            handleSelect={_handleSectorSelect}
          />
        </td>
        <td style={{ minWidth: 135, width: "9%" }}>
          <ESButton
            id={Title[0]["column3"]}
            header={Title[0]["column3"]}
            data={v}
            editable={false}
            text={"View"}
            dataToggle={"modal"}
            dataTarget={"#view_edit_modal"}
            dataDismiss={"modal"}
            onClick={handleModalClick}
            small
          />
        </td>
        <td style={{ minWidth: 135, width: "9%" }}>
          <ESButton
            id={Title[0]["column5"]}
            customColor={color.secondaryColor}
            header={Title[0]["column5"]}
            data={v}
            editable={true}
            text={"Edit"}
            dataToggle={"modal"}
            dataTarget={"#view_edit_modal"}
            dataDismiss={"modal"}
            dataBackdrop={"static"}
            dataKeyboard={"false"}
            onClick={handleModalClick}
            small
          />
        </td>
        <td style={{ minWidth: 135, width: "9%" }}>
          <ESButton
            id={Title[0]["column6"]}
            customColor={color.secondaryColor}
            header={Title[0]["column6"]}
            data={v}
            editable={true}
            text={"Edit"}
            dataToggle={"modal"}
            dataTarget={"#view_edit_modal"}
            dataDismiss={"modal"}
            onClick={handleModalClick}
            small
          />
        </td>

        {view ? (
          <React.Fragment>
            <td style={{ minWidth: 125, width: "12%" }}>
              <textarea
                style={{ fontSize: 14 }}
                id={"primary:" + v.id}
                title={
                  updateRecordData
                    .filter((d) => d.id === v.id)
                    .map((a) => a.detailView1.ictComponent)[0] ||
                  v.detailView1.ictComponent ||
                  ""
                }
                className="form-control"
                style={{ fontSize: font.graphLabels }}
                name={v.id}
                onBlur={_handleAutoSave}
                value={
                  updateRecordData
                    .filter((d) => d.id === v.id)
                    .map((a) => a.detailView1.ictComponent)[0] ||
                  v.detailView1.ictComponent ||
                  ""
                }
                onChange={(e) => _handleTextChange(e, "primary")}
              />
            </td>
            <td style={{ minWidth: 125, width: "12%" }}>
              <textarea
                style={{ fontSize: 14 }}
                id={"secondary:" + v.id}
                className="form-control"
                // type="text"
                title={
                  updateRecordData
                    .filter((d) => d.id === v.id)
                    .map((a) => a.detailView1.secondaryICT)[0] ||
                  v.detailView1.secondaryICT ||
                  ""
                }
                name={v.id}
                onBlur={_handleAutoSave}
                value={
                  updateRecordData
                    .filter((d) => d.id === v.id)
                    .map((a) => a.detailView1.secondaryICT)[0] ||
                  v.detailView1.secondaryICT ||
                  ""
                }
                onChange={(e) => _handleTextChange(e, "secondary")}
              />
            </td>
            <td style={{ minWidth: 135, width: "15%" }}>
              <UNDPDropdown
                id={v.id}
                name={"status_update"}
                selectedIndex={v.detailView1.statusUpdateId - 1}
                options={statusUpdateOption}
                editedRecord={{ ...v, view: view }}
                handleSelect={_handleSectorSelect}
              />
            </td>
            <td>
              <ProgressBar percent={percent(k)} progress={progress(k)} />
            </td>
          </React.Fragment>
        ) : (
          <React.Fragment>
            <td style={{ minWidth: 135, width: "15%" }}>
              <UNDPDropdown
                id={v.id}
                name={"align"}
                options={alignOption}
                selectedIndex={v.detailView2.overall - 1}
                editedRecord={{ ...v, view: view }}
                handleSelect={_handleSectorSelect}
              />
            </td>
            {Object.entries(v.detailView2.themes).map(([key, val]) => (
              <td
                key={key}
                style={{ position: "relative", top: "3%", textAlign: "center" }}
              >
                <label>
                  <Checkbox
                    id={v.id}
                    name={key}
                    checked={val === 1 ? true : false}
                    onChange={(e) => _handleCheckThemes(e)}
                  />
                </label>
              </td>
            ))}
          </React.Fragment>
        )}
      </tr>
    ));
  return (
    <div
      className={`${
        windowWidth > 1199 && windowWidth < 1269
          ? "table-responsive"
          : "table-responsive-xl"
      }`}
    >
    <a className="float-left" href="#"  onClick={()=>_handleGoToEditMenu()} style={{cursor: 'pointer'}}><i className="fa fa-arrow-left pr-2"></i>Back to Edit Menu</a>   
    <div className="pt-4">
      <ESButton
        style={{ width: 230 }}
        text={"Save Changes"}
        onClick={_handleSaveChanges}
        disabled={!isEnabled}
        customColor={color.green}
        leftIcon={<i className="fas fa-save pr-2" />}
      />
    </div>
   
      <table className="table table-bordered table-sm w-100">
        {Header}
        {targetLoading ? (
          <tbody style={{ height: 190 }}>
            <div
              style={{
                left:
                  windowWidth <= 811
                    ? `${windowWidth / 2 - 100 + "px"}`
                    : `${windowWidth / 2 - 130 + "px"}`,
                position: "absolute",
              }}
            >
              <img alt="" src={Spinner} />
            </div>
          </tbody>
        ) : (
          <tbody>{Body}</tbody>
        )}
      </table>
      {addRow && (
        <AddNewRow
          data={addRow}
          _handleCreateRow={_handleCreateRow}
          setNewRecord={setNewRecord}
          _handleDiscardNewRow={_handleDiscardNewRow}
        />
      )}
      {modalData && recordData && (
        <ViewEditModal
          sdgId={sdgId}
          _handlecheckSuggestion={_handlecheckSuggestion}
          recordData={recordData}
          suggestions={suggestions}
          updateSuggestion={updateSuggestion}
          modalData={modalData}
          _handleModalText={_handleModalText}
          _UploadFile={_UploadFile}
          ministry={ministry}
          ministryIndex={ministryIndex}
          _handleSheetClick={_handleSheetClick}
          _handleAddSheet={_handleAddSheet}
          _handleSaveChanges={_handleSaveChanges}
          _handleDiscardP_and_P={_handleDiscardP_and_P}
          _handleEditTitle={_handleEditTitle}
          _handleCancelEdit={_handleCancelEdit}
          editTitle={editTitle}
          _handleTitleChange={_handleTitleChange}
          newTitle={newTitle}
          _handleUpdateTitle={_handleUpdateTitle}
          fetchEditRecordData={fetchEditRecordData}
          updateRecordData={updateRecordData}
          isEnabled={isEnabled}
        />
      )}
    </div>
  );
};
export default EditTable;

const DisplaySwitchPanel = (props) => {
  const { _handleDisplaySwitch } = props;
  return (
    <div
      className="mx-auto d-flex justify-content-between flex-nowrap my-1 text-white"
      style={{
        backgroundColor: color.secondaryColor,
        fontSize: font.graphLabels,
        borderRadius: 5,
        width: 270,
      }}
    >
      <div className="mr-1" style={{ whiteSpace: "nowrap" }}>
        <i
          className="fas fa-desktop float-left mr-2"
          style={{ fontSize: 19 }}
        />
        Edit Dashboard Display
      </div>
      <div className="">
        Page{" "}
        <span
          className="font-weight-bold"
          style={{ fontSize: font.extraSmall, marginRight: 1.7 }}
        >
          1
        </span>
        <label className="switch" onChange={_handleDisplaySwitch}>
          <input type="checkbox" />
          <span className="slider round"></span>
        </label>
        <span
          className="font-weight-bold"
          style={{ fontSize: font.extraSmall, marginLeft: 1.7 }}
        >
          2
        </span>
      </div>
    </div>
  );
};

const Title = [
  {
    column1: "SDG Targets",
    column2: "Sub-Sector",
    column3: "National/Strategic Plan",
    column4: "Digital Development",
    column5: "Policy and Programmes",
    column6: "Technology, Systems and Platforms",
  },
];
const detailOneHeader = {
  column1: "Display On Dashboard",
  column2: "Digital/ICT Solutions - National",
  column3: "Digital/ICT Solutions - Regional/Municipal/Local",
  column4: "Status Update",
  column5: "Completed Fields",
};

const detailTwoHeader = {
  column1: "DETAILED VIEW 2",
  column2: "Overall",
  column3: "Themes",
  column4: "People",
  column5: "Planet",
  column6: "Prosperity",
  column7: "Peace",
  column8: "Partnership",
};
