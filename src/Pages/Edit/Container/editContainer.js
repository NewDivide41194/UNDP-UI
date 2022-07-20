import React, { Fragment } from "react";
import font from "../../../Feature/Config/font";
import { ESButton } from "../../Questionnaire/components/tools/ES_Button";
import Spinner from "../../../Feature/Images/Spinner.gif";
import "../../../App.css";
import EditTable from "../Component/editTable";
import {
  AddNewData,
  RecordFetch,
  RelatedTargetFetch,
  TargetFetch,
  UpdateRecordFetch,
} from "../../../Api/FetchEdit";
import { SDG_list } from "../Component/sdgList";
import color from "../../../Feature/Config/color";
import UNDP from "../../../Feature/Images/UNDP.svg";
import { withRouter } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteCookie,
  readCookie,
  writeCookie,
} from "../../../helper/cookieUser";
import { withCookies } from "react-cookie";
import { checkTokenExist } from "../../../helper/checkAccess";
import CountrySelector from "../../../Feature/Tools/countrySelector";
import CountryData from "../../../Feature/Config/countries.json";
import * as API from "../../../Api/url";
import io from "socket.io-client";
import AlertDialog from "../../../Feature/Tools/alertDialog";
import { AddNewRow } from "../Component/addNewRowModal";
import UNDPDropdown from "../Component/dropdown";
import PropTypes from "prop-types";
import EditMenu from "../Component/editMenu";
import MenuBar from "../Component/menuBar";
import ListView from "./listViewContainer";
import GridView from "./gridViewContainer";

class Edit extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      DetailView: true,
      isEnabled: false,
      userId: null,
      countryId: null,
      sdgId: 1,
      selectedFile: null,
      targetId: 1,
      recordData: null,
      sectorData: null,
      alignData: null,
      statusUpdateData: null,
      suggestions: null,
      updateSuggestion: [],
      expandId: undefined,
      loading: false,
      targetLoading: true,
      ministry: null,
      updateRecordData: [],
      addNewRecord: [],
      newRecord: {
        sdgId: null,
        targetId: null,
        nationalStrategicPlan: null,
      },
      textValue: "",
      user: readCookie(this.props.cookies),
      countryId: readCookie(this.props.cookies).country_id,
      // countryOptions: ["MU", "TL", "KG", "TZ"],
      // countryValue: "MU",
      CountryList: [],
      SelectedCountry: null,
      showDialog: false,
      saving: SavingState.NOT_SAVED,
      isSkippable: true,
      relatedTargets: null,
      editMode: false,
      view: 1,
      targets:[],
      menuTab: 1
    };
  }

  componentDidMount() {
    this.timer = null;

    this.block = this.props.history.block(this.onBlock);

    if (
      checkTokenExist(this.state.user, this.props.history, this.props.cookies)
    ) {
      this.setState(
        {
          userId: this.state.user.user_id,
          ministry: this.state.user.ministry,
          countryId: this.state.user.country_id,
        },
        () => {
          this.fetchRelatedTarget()
          this.fetchTarget(this.state.sdgId)
        }
              
      );
    }
    window.onbeforeunload = (event) => {
      const e = event || window.event;
      e.preventDefault();
      if (
        this.state.updateRecordData.length > 0 ||
        this.state.updateSuggestion.length > 0
      ) {
        if (e) {
          e.returnValue = "";
        }
        return "";
      }
    };

    // const ENDPOINT = "http://localhost:8181/hrms_noti";
    // const socket_noti = io(ENDPOINT);

    // socket_noti.on('response', (msg) => {
    // console.log('msg', msg)
    // })

    document.addEventListener("keydown", (event) =>
      this._saveChangesWithShotcut(event)
    );
  }
  countryName = (code) => {
    return CountryData.filter((v) => v.code === code)[0].name;
  };

  _saveChangesWithShotcut = (event) => {
    if (event) {
      if (event.ctrlKey && event.which == 83) {
        event.preventDefault();
        if (this.state.isEnabled) {
          this._handleSaveChanges();
          this.setState({ isEnabled: false });
        }

        return false;
      }
    }
  };

  // _changeCountryHandler = (value) => {
  //   const cookieData = { ...this.state.user };
  //   cookieData.country_id = value.value;
  //   writeCookie(this.props.cookies, cookieData);

  //   this.setState({ SelectedCountry: value });
  // };

  _UploadFile = (e, id, ministryIndex) => {
    this.setState({ isEnabled: true });
    const ID = parseInt(id);
    const updateIndex = this.updateIndex(ID);
    const recordIndex = this.recordIndex(ID);

    const obj = { ...this.state.recordData[recordIndex] };

    let fileAns = e.target.files[0];
    let fileName = fileAns !== undefined ? fileAns.name : null;
    obj.digitalDevelopment.policyAndProgrammes[ministryIndex].file = fileAns;
    obj.digitalDevelopment.policyAndProgrammes[ministryIndex].fileName =
      fileName;
    // this.setState(this.state.updateRecordData.concat(obj));
    if (this.isUpdateId(ID).length >= 1) {
      this.state.updateRecordData.splice(updateIndex, 1, obj);
      this.setState({ selectedFile: fileName });
    } else {
      this.setState({
        updateRecordData: [...this.state.updateRecordData, obj],
      });
    }
  };

  fetchRelatedTarget = (sdgId) => {
    const { userId, countryId, user } = this.state;
    const sectorId = sdgId ? sdgId : 1;
    if (checkTokenExist(user, this.props.history, this.props.cookies)) {
      this.setState({ targetLoading: true });

      RelatedTargetFetch(
        {
          userId,
          countryId,
          sectorId,
        },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(this.props.cookies);
              this.props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            this.setState({
              relatedTargets: data.payload,
            });
          }
        },
        { token: user.token }
      );
    }
  };

  fetchTarget = (sdgId) => {
    const { userId, countryId, user } = this.state;
    if (checkTokenExist(user, this.props.history, this.props.cookies)) {
      this.setState({ targetLoading: true });

      TargetFetch(
        {
          userId,
          countryId,
          sdgId,
        },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(this.props.cookies);
              this.props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            this.setState({
              targets: (data.payload).sort(
                (a, b) => a.sdg_target_id - b.sdg_target_id
              ),
            });
          }
        },
        { token: user.token }
      );
    }
  };

  fetchEditRecordData = (SDG_ID) => {
    const { userId, countryId, user } = this.state;
    const sdgId = SDG_ID ? SDG_ID : 1;
    if (checkTokenExist(user, this.props.history, this.props.cookies)) {
      this.setState({ targetLoading: true });

      RecordFetch(
        {
          userId,
          countryId,
          sdgId,
        },
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(this.props.cookies);
              this.props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
          } else {
            this.setState({
              recordData: data.payload.recordData.sort(
                (a, b) => a.sdgTargetNo - b.sdgTargetNo
              ),
              sectorData: data.payload.sector,
              alignData: data.payload.align,
              statusUpdateData: data.payload.statusUpdate,
              suggestions: data.payload.suggestions,
              targetLoading: false,
              loading: false,
            });
            localStorage.setItem(
              "originalRecord",
              JSON.stringify(
                data.payload.recordData.sort(
                  (a, b) => a.sdgTargetNo - b.sdgTargetNo
                )
              )
            );
          }
        },
        { token: user.token }
      );
    }
  };

  _handleGoToEdit = () => {
    // console.log("Hello");
    this.fetchEditRecordData(this.state.sdgId);
    this.setState({ editMode: !this.state.editMode });
  };
  _handleGoToEditMenu = () => {
    this.setState({ editMode: !this.state.editMode });
  };

  _handleSaveChanges = async () => {
    this.setState({ isEnabled: false });
    const { userId, countryId, updateRecordData, updateSuggestion, user } =
      this.state;
    // const fileList = updateRecordData.map(
    //   (v) => v.digitalDevelopment.policyAndProgrammes.map((v1)=> v1.file)
    // );
    let fileList = [];
    for (let data of updateRecordData) {
      const lists = data.digitalDevelopment.policyAndProgrammes.map(
        (v) => v.file
      );
      for (let list of lists) {
        if (list) {
          fileList.push(list);
        }
      }
    }
    const updateData = {
      recordData: updateRecordData,
      suggestions: updateSuggestion,
    };
    if (checkTokenExist(user, this.props.history, this.props.cookies)) {
      await UpdateRecordFetch(
        { userId, countryId },
        updateData,
        fileList,
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(this.props.cookies);
              this.props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
            //this.setState({ isEnabled: false });
          } else {
            toast(data.message, { type: "success" });
            const socket_noti = io(API.LastUpdateNoti, {
              transports: ["websocket"],
            });
            socket_noti.emit("save changes", { isLastUpdateInfo: true });
            // this.fetchEditRecordData(this.state.sdgId)
            //this.setState({ isEnabled: false });
          }
        },
        { token: user.token }
      );
      this.setState({ updateRecordData: [] /* updateSuggestion: [] */ });
    }
  };

  _handleCreateRow = () => {
    const { userId, countryId, user, newRecord } = this.state;
    const data = { ...newRecord };
    if (checkTokenExist(user, this.props.history, this.props.cookies)) {
      AddNewData(
        { userId, countryId },
        data,
        (error, data) => {
          if (error) {
            if (error.toString().includes("expired")) {
              toast("Login Expired!", { type: "error" });
              deleteCookie(this.props.cookies);
              this.props.history.push("/login");
            } else toast(error.toString(), { type: "error" });
            //this.setState({ isDisabled: false });
          } else {
            toast(data.message, { type: "success" });
            this.fetchEditRecordData(this.state.sdgId);
            this.fetchTarget(this.state.sdgId);
          }
        },
        { token: user.token }
      );
      this._handleDiscardNewRow();
    }
  };

  _handleDiscardNewRow = () => {
    const keyVal = [
      { key: "sdgId", value: null },
      { key: "targetId", value: null },
      { key: "nationalStrategicPlan", value: null },
    ];
    this._handleSetNewRecord({ keyVal });
  };

  _handleDiscardP_and_P = ({ id }) => {
    const ID = parseInt(id);
    var original = JSON.parse(localStorage.getItem("originalRecord"));
    const updateIndex = this.updateIndex(ID);
    const recordIndex = this.recordIndex(ID);

    if (updateIndex !== -1) {
      const prev = original.find((v) => v.id === ID).digitalDevelopment
        .policyAndProgrammes;
      const newArr = [...this.state.recordData];
      newArr[recordIndex].digitalDevelopment.policyAndProgrammes = prev;
      this.setState({
        recordData: newArr,
        updateRecordData: [],
      });
    }
  };

  _handleAddSheet = (e) => {
    // this.setState({ isEnabled: true });
    // console.log("check box-->", e.target.id);
    const ID = parseInt(e.target.id);
    // console.log(ID);
    const recordIndex = this.recordIndex(ID);
    const updateIndex = this.updateIndex(ID);

    const obj = { ...this.state.recordData[recordIndex] };
    const newPloicy = {
      fileName: null,
      ministry: null,
      text: null,
      title: null,
    };
    obj.digitalDevelopment.policyAndProgrammes.push(newPloicy);
    if (updateIndex < 0) {
      this.setState({
        updateRecordData: [...this.state.updateRecordData, obj],
      });
    } else {
      const newArr = [...this.state.updateRecordData];
      newArr[updateIndex] = obj;
      this.setState({ updateRecordData: newArr });
    }
  };

  handleSDGSelect = ({ e }) => {
    this.setState({ sdgId: e.sdgId, updateSuggestion: [] });
    this.fetchRelatedTarget(e.sdgId);
    this.fetchTarget(e.sdgId)
    this.fetchEditRecordData(e.sdgId);
  };

  _handleExpand = (e) => {
    const ID = e.target.id;
    this.setState({ expandId: ID });
  };

  _handleCollapse = (e) => {
    this.setState({ expandId: undefined });
  };
  _handleAutoSave = () => {
    let anyUpdated;
    const original = JSON.parse(localStorage.getItem("originalRecord"));
    for (let d of this.state.updateRecordData) {
      const ID = parseInt(d.id);
      const recordId = this.recordIndex(ID);
      const updateId = this.updateIndex(ID);
      const prevData = original.find((v) => v.id === ID);
      if (JSON.stringify(prevData) === JSON.stringify(d)) {
        anyUpdated = false;
        this.state.updateRecordData.splice(updateId, 1);
        this.setState({ isEnabled: false });
      } else {
        anyUpdated = true;
        original[recordId] = d;
        localStorage.setItem("originalRecord", JSON.stringify(original));
      }
    }
    if (anyUpdated && this.state.isEnabled) {
      this.timer = setTimeout(() => {
        this.setState({ saving: SavingState.SAVING });

        // calls API
        this._handleSaveChanges().then(() =>
          this.setState({ saving: SavingState.SAVED })
        );
      }, 500);
    }
  };
  _handleSectorSelect = ({ e, name, editedRecord }) => {
    this.setState({ isEnabled: true });
    clearTimeout(this.timer);
    this.setState({ isEnabled: true, aving: SavingState.NOT_SAVED });
    const ID = parseInt(editedRecord.id);
    const obj = { ...editedRecord };

    if (name === "sector") {
      obj.detailView1.sectorId = e ? e.id : null;
    } else if (name === "status_update") {
      obj.detailView1.statusUpdateId = e ? e.statusUpdateId : null;
    } else if (name === "align") {
      obj.detailView2.overall = e ? e.alignId : null;
    }

    const updateIndex = this.updateIndex(ID);

    if (this.isUpdateId(ID).length >= 1) {
      const newArr = [...this.state.updateRecordData];
      newArr[updateIndex] = obj;
      this.setState({ updateRecordData: newArr }, () => this._handleAutoSave());
    } else {
      this.setState(
        {
          updateRecordData: [...this.state.updateRecordData, obj],
        },
        () => this._handleAutoSave()
      );
    }
  };

  _handleModalText = ({ id, text, header, ministryIndex }) => {
    this.setState({ isEnabled: true });
    const ID = parseInt(id);
    const updateIndex = this.updateIndex(ID);
    const recordIndex = this.recordIndex(ID);
    const obj = { ...this.state.recordData[recordIndex] };

    if (header === "p_and_p_title") {
      obj.digitalDevelopment.policyAndProgrammes[ministryIndex].title = text;
    } else if (header === "ministry") {
      obj.digitalDevelopment.policyAndProgrammes[ministryIndex].ministry = text;
    } else if (header.includes("Policy")) {
      obj.digitalDevelopment.policyAndProgrammes[ministryIndex].text = text;
    } else {
      obj.digitalDevelopment.technologySystemsAndPlatforms = text;
    }

    if (updateIndex < 0) {
      this.setState({
        updateRecordData: [...this.state.updateRecordData, obj],
      });
    } else {
      const newArr = [...this.state.updateRecordData];
      newArr[updateIndex] = obj;
      this.setState({ updateRecordData: newArr });
    }
  };
  _handleCheckThemes = (e) => {
    this.setState({ isEnabled: true });
    // console.log("check box-->", e.target.id);
    const ID = parseInt(e.target.id);

    const recordIndex = this.recordIndex(ID);
    const updateIndex = this.updateIndex(ID);

    const obj = { ...this.state.recordData[recordIndex] };
    obj.detailView2.themes[e.target.name] = e.target.checked ? 1 : 0;
    if (updateIndex < 0) {
      this.setState(
        {
          updateRecordData: [...this.state.updateRecordData, obj],
        },
        () => this._handleAutoSave()
      );
    } else {
      const newArr = [...this.state.updateRecordData];
      newArr[updateIndex] = obj;
      this.setState(
        {
          updateRecordData: newArr,
        },
        () => this._handleAutoSave()
      );
    }
  };

  _handlecheckSuggestion = (e, recordId) => {
    this.setState({ isEnabled: true });
    // console.log("check box-->", e.target.checked);
    const ID = parseInt(e.target.id);
    const suggestionIndex = this.suggestionIndex(ID);
    const updatedSuggestionIndex = this.updatedSuggestionIndex(ID);

    // console.log(suggestionIndex, updatedSuggestionIndex);
    const obj = {
      ...this.state.suggestions[suggestionIndex],
    };
    obj.record_id = recordId;
    obj.suggestion_id = ID;
    obj.active = e.target.checked ? 1 : 0;
    // obj.active={}
    if (updatedSuggestionIndex < 0) {
      this.setState(
        {
          updateSuggestion: [...this.state.updateSuggestion, obj],
        },
        () => this._handleAutoSave()
      );
    } else {
      const newArr = [...this.state.updateSuggestion];
      newArr[updatedSuggestionIndex] = obj;
      this.setState(
        {
          updateSuggestion: newArr,
        },
        () => this._handleAutoSave()
      );
    }
  };

  isUpdateId = (ID) => {
    const quesIdIndex = this.state.updateRecordData.filter((e) => e.id === ID);
    return quesIdIndex;
  };

  updateIndex = (ID) =>
    this.state.updateRecordData &&
    this.state.updateRecordData.findIndex((v) => v.id === ID);
  recordIndex = (ID) =>
    this.state.recordData &&
    this.state.recordData.findIndex((v) => v.id === ID);

  suggestionIndex = (ID) =>
    this.state.suggestions &&
    this.state.suggestions.findIndex((v) => v.suggestion_id === ID);

  updatedSuggestionIndex = (ID) =>
    this.state.updateSuggestion &&
    this.state.updateSuggestion.findIndex((v) => v.suggestion_id === ID);

  _handleLongTextUpdate = (e, fieldName, textData) => {
    const ID = parseInt(e.target.id);
    const recordIndex = this.recordIndex(ID);
    const updateIndex = this.updateIndex(ID);
    const obj = { ...this.state.recordData[recordIndex] };

    obj[fieldName] = textData;

    if (textData === "" || this.isUpdateId(ID).length >= 1) {
      this.state.updateRecordData.splice(updateIndex, 1, obj);
      this.setState({ textValue: textData });
    } else {
      this.setState({
        updateRecordData: [...this.state.updateRecordData, obj],
      });
    }
  };

  _handleTextChange = (e, name) => {
    this.setState({ isEnabled: true });
    const ImportText = e.target.value.replace(/\s+/g, " ").trimStart();
    const ID = parseInt(e.target.name);

    const recordIndex = this.recordIndex(ID);
    const updateIndex = this.updateIndex(ID);
    const obj = { ...this.state.recordData[recordIndex] };

    if (name === "primary") {
      obj.detailView1.ictComponent = ImportText;
    } else {
      obj.detailView1.secondaryICT = ImportText;
    }

    if (ImportText === "" && updateIndex.length > 0) {
      const deleteRow = this.state.updateRecordData.filter((v) => v.id !== ID);
      this.setState({ updateRecordData: deleteRow });
    } else if (this.isUpdateId(ID).length >= 1) {
      // this.state.updateRecordData.splice(updateIndex, 1, obj);
      const tempArr = [...this.state.updateRecordData];
      tempArr.splice(updateIndex, 1, obj);

      this.setState({
        updateRecordData: tempArr,
      });
    } else {
      this.setState({
        updateRecordData: [...this.state.updateRecordData, obj],
      });
    }
    // this._handleAutoSave()
  };

  _handleDisplaySwitch = () => {
    //console.log("hi");
    this.setState({ DetailView: !this.state.DetailView });
  };

  _changeCountryHandler = (value) => {
    this.setState({ SelectedCountry: this.state.CountryList[value] });
  };

  sectorOption = () =>
    this.state.sectorData &&
    this.state.sectorData.map((v, k) => {
      return {
        id: v.sector_id,
        value: v.sector_name,
        label: v.sector_name,
        color: color.sectorColor[k],
      };
    });

  alignOption = () =>
    this.state.alignData &&
    this.state.alignData.map((v, k) => {
      return {
        alignId: v.aligned_id,
        value: v.aligned,
        label: v.aligned,
      };
    });

  statusUpdateOption = () =>
    this.state.statusUpdateData &&
    this.state.statusUpdateData.map((v, k) => {
      return {
        statusUpdateId: v.status_update_id,
        value: v.status_update,
        label: v.status_update,
      };
    });

  componentWillUnmount() {
    this.block && this.block();
    if (document.querySelector(".modal-backdrop")) {
      document.querySelector("body").classList.remove("modal-open");
      const list = document.querySelectorAll(".modal-backdrop");
      for (let i = 0; i < list.length; i++) {
        list[i].style.display = "none";
      }
    }
  }

  onBlock = (tx) => {
    this.navigation = () => this.props.history.push(tx.pathname);
    if (this.state.updateRecordData.length > 0 && !this.state.showDialog) {
      this.setState({ showDialog: true });
    }
    if (this.state.updateRecordData.length === 0 || this.state.showDialog) {
      this.block();
      return true;
    }
    return false;
  };

  onDiscardClick = () => {
    this.setState({ showDialog: false });
  };

  discard_and_MoveToNext = () => {
    //Resume blocking
    this.block && this.block();
    //Redirect to user where they want to go
    this.navigation && this.navigation();
  };

  save_and_MoveToNext = () => {
    //Resume blocking
    this.block && this.block();
    //Redirect to user where they want to go
    this.navigation && this.navigation();
    this._handleSaveChanges();
  };

  _handleSetNewRecord = ({ keyVal }) => {
    let newObj = { ...this.state.newRecord };
    for (let d of keyVal) {
      newObj[d.key] = d.value;
      this.setState({ newRecord: newObj });
    }
  };

  countryName = (code) => {
    return CountryData.filter((v) => v.code === code)[0].name;
  };
  render() {

    return (
      <div
        className="containter px-5 pt-2 "
        id="edit_container"
        style={{
          marginLeft:
            window.innerWidth > 992 &&
            window.innerWidth < 1282 &&
            !this.state.loading &&
            !this.state.targetLoading
              ? 60
              : null,
        }}
      >
        <AlertDialog
          isOpen={this.state.showDialog}
          saveMoveToNext={this.save_and_MoveToNext}
          discardMoveToNext={this.discard_and_MoveToNext}
          onDiscardClick={this.onDiscardClick}
        />
        <MenuBar 
          menuTab={this.state.menuTab}
          setMenuTab={(tab)=>this.setState({menuTab: tab})}
        />
        <div className='text-right mx-1 my-2' style={{color: color.primaryColor}}>
          <span> View As: </span>
          <i 
            className="fa fa-th-list px-1" 
            aria-hidden="true"
            title='List'
            style={{
              opacity: this.state.view === 1 ? 1 : .4,
              cursor: 'pointer'
            }}
            onClick={()=> this.setState({ view : 1})}
          ></i>
          <i 
            className="fa fa-th-large px-1" 
            aria-hidden="true"
            title='Grid'
            style={{
              opacity: this.state.view === 2 ? 1 : .4,
              cursor: 'pointer'
            }}
            onClick={()=> this.setState({ view :2})}
          ></i>
        </div>
        <div className='w-100 mb-3'>
          { this.state.view ===1 ?
          (
            // <ListView
            //     menuTab={this.state.menuTab}
            //     sdgId={this.state.sdgId}
            //     handleSDGSelect={this.handleSDGSelect}
            //     isEnabled={this.state.isEnabled}
            //     relatedTargets={this.state.relatedTargets}
            //     _handleGoToEdit={this._handleGoToEdit}
            //     targets={this.state.targets}
            //     _handleSectorSelect={this._handleSectorSelect}
            //   />
            <ListView
                menuTab={this.state.menuTab}
                sdgId={this.state.sdgId}
                handleSDGSelect={this.handleSDGSelect}
                isEnabled={this.state.isEnabled}
                relatedTargets={this.state.relatedTargets}
                _handleGoToEdit={this._handleGoToEdit}
                targets={this.state.targets}
                _handleSectorSelect={this._handleSectorSelect}
                _handleCreateRow={this._handleCreateRow}
                setNewRecord={this._handleSetNewRecord}
                _handleDiscardNewRow={this._handleDiscardNewRow}
                fetchTarget={this.fetchTarget}
              />
          )
          :
          (
            <GridView />
          )
          }
        </div>
        {/* <div className="w-100 mb-3">
          {this.state.editMode === false ? (
              <EditMenu
                sdgId={this.state.sdgId}
                handleSDGSelect={this.handleSDGSelect}
                isEnabled={this.state.isEnabled}
                relatedTargets={this.state.relatedTargets}
                _handleGoToEdit={this._handleGoToEdit}
              />
          ) : this.state.recordData !== null ? (
            <Fragment>
              <AutoSaveDisplay saving={this.state.saving} />

              <EditTable
                _handleCreateRow={this._handleCreateRow}
                ministry={this.state.ministry}
                view={this.state.DetailView}
                _UploadFile={this._UploadFile}
                recordData={this.state.recordData}
                suggestions={this.state.suggestions}
                sdgId={this.state.sdgId}
                targetLoading={this.state.targetLoading}
                SDG_list={SDG_list}
                _handleSDGSelect={this.handleSDGSelect}
                _handleExpand={this._handleExpand}
                expandId={this.state.expandId}
                _handleCollapse={this._handleCollapse}
                _handleSectorSelect={this._handleSectorSelect}
                _handleCheckThemes={this._handleCheckThemes}
                _handleTextChange={this._handleTextChange}
                updateRecordData={this.state.updateRecordData}
                updateSuggestion={this.state.updateSuggestion}
                setNewRecord={this._handleSetNewRecord}
                _handleModalText={this._handleModalText}
                _handleDisplaySwitch={this._handleDisplaySwitch}
                _handleDigitalDevelopmentUpdate={
                  this._handleDigitalDevelopmentUpdate
                }
                _handlecheckSuggestion={this._handlecheckSuggestion}
                sectorOption={this.sectorOption()}
                alignOption={this.alignOption()}
                statusUpdateOption={this.statusUpdateOption()}
                _handleAddSheet={this._handleAddSheet}
                _handleAutoSave={this._handleAutoSave}
                _handleDiscardNewRow={this._handleDiscardNewRow}
                _handleSaveChanges={this._handleSaveChanges}
                _handleDiscardP_and_P={this._handleDiscardP_and_P}
                fetchEditRecordData={this.fetchEditRecordData}
                _handleGoToEditMenu={this._handleGoToEditMenu}
                user={this.state.user}
                isDiscard={this.state.isDiscard}
                isEnabled={this.state.isEnabled}
              />
            </Fragment>
          ) : (
            <img src={Spinner} alt="Loading" width={120} />
          )}
        </div> */}
      </div>
    );
  }
}
export default withRouter(withCookies(Edit));

const SavingState = Object.freeze({
  NOT_SAVED: 0,
  SAVING: 1,
  SAVED: 2,
});
const AutoSaveDisplay = ({ saving }) => {
  let display;
  switch (saving) {
    case SavingState.SAVING:
      display = <em>saving...</em>;
      break;
    case SavingState.SAVED:
      display = (
        <em>
          <i
            className="fa fa-check-circle pr-1"
            style={{ color: color.green }}
          />
          Saved!
        </em>
      );
      break;
    default:
      display = <div />;
  }
  return <div className="auto-save-display">{display}</div>;
};
AutoSaveDisplay.prototype = {
  saving: PropTypes.oneOf(Object.values(SavingState)),
};
