import React, { Component } from 'react'
import { withCookies } from 'react-cookie';
import { deleteCookie, readCookie } from '../../../helper/cookieUser';
import EditSidebar from '../Component/editSidebar';
import CountryData from "../../../Feature/Config/countries.json";
import { ESButton } from '../../Questionnaire/components/tools/ES_Button';
import Goals_target from '../Component/goals_target';
import { checkTokenExist } from '../../../helper/checkAccess';
import { withRouter } from 'react-router';
import { AddNewData, InsertSuggestionFetch, RecordFetch, RelatedTargetFetch, TargetDataFetch, TargetFetch, UpdateRecordFetch, UpdateTargetFetch } from '../../../Api/FetchEdit';
import { toast } from 'react-toastify';
import { DownloadFile, FetchReport } from '../../../Api/dataFetch';
import * as API from "../../../Api/url";
import io from "socket.io-client";
import Spinner from "../../../Feature/Images/Spinner.gif";
import PropTypes from "prop-types";

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
import color from '../../../Feature/Config/color';
import Scrollbars from 'react-custom-scrollbars';
import Policies from '../Component/policies';
import AlertDialog from '../../../Feature/Tools/alertDialog';
import Systems from '../Component/systems';
import Review from '../Component/review';

class EditContainer_v2 extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: readCookie(props.cookies),
            userId: null,
            countryId: readCookie(props.cookies)?.country_id,
            sectionId: 1,
            sdgId: 1,
            ministry: null,
            inputSelect: null,
            recordId: null,
            radarData: null,
            targetOptions: {},
            recordData: [],
            updateRecordData: [],
            isEnabled: false,
            viewEditChoices: false,
            themesEdit: false,
            removeRecords: [],
            selectTarget: [],
            priorityUpdates: [],
            relatedTargets: null,
            targets: [],
            sectorData: null,
            alignData: null,
            statusUpdateData: null,
            suggestions: null,
            loading: false,
            targetLoading: true,
            saving: SavingState.NOT_SAVED,
            updateSuggestion: [],
            newRecord: {
                sdgId: null,
                targetId: null,
                nationalStrategicPlan: null,
            },
            showDialog: false,
            newSuggestionOption: []
        }
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
                    this.fetchRadarData()
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

    componentDidUpdate(prevProps, prevState) {
        if (prevState.targets !== this.state.targets) {
            if (this.state.targets.length > 0) {
                this.setState({
                    selectTarget: this.state.targets[0].sdg_id + '.' + this.state.targets[0].sdg_target_id,
                    recordId: this.state.targets[0].id
                })
                this.fetchTargetData(this.state.targets[0].id)
            }
        }
    }

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
        if (this.state.isEnabled) {
            this.setState({ showDialog: true });
        }
        if (!this.state.isEnabled || this.state.showDialog) {
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

    countryName = (code) => {
        // console.log(code);
        return CountryData.filter((v) => v.code === code)[0].name;
    };

    _handleSectionClick = ({
        sectionId
    }) => {
        this.setState({
            sectionId
        })
    };

    handleTargetSelect = ({ e }) => {
        this.fetchTargetData(e.recordId)
        this.setState({
            selectTarget: (e.label).substr(7),
            recordId: e.recordId
        })
    }

    _handleEditView = (item) => {
        if (item === 0) {
            this.setState({
                viewEditChoices: !this.state.viewEditChoices
            })
        } else {
            this.setState({
                themesEdit: !this.state.themesEdit
            })
        }
    }

    handleSDGSelect_ = ({ e }) => {
        this.setState({
            updateRecordData: [],
            recordData: [],

        })
        this.handleSDGSelect({ e });
    }

    handleSectorSelect = async({ e, name, projIndex }) => {

        this.setState({ isEnabled: true })
        let updateData_;

        if (name === 'sector_selector') {
            updateData_ = [
                {
                    ...this.state.updateRecordData[0],
                    sector_id: e ? e.id : null,
                    sector_name: e ? e.value : null,
                    suggestionAns: this.state.recordData[0].suggestionAns
                }
            ];
            if (!e) {
                // when clear selector
                //remove new option from priorityUpdates
                const i = this.state.priorityUpdates.findIndex(v => v.sectorId === null)
                if (i > -1) {
                    const newArr = [...this.state.priorityUpdates]
                    newArr.splice(i, 1)
                    this.setState({ priorityUpdates: newArr })
                }
            } else if (e.value && e.id === undefined) {
                //when create new 
                const newOption = {
                    sectorId: null, sectorName: e.value, countryId: this.state.user.country_id
                }
                this.state.priorityUpdates.push(newOption)
            } else {
                //when select from list
                const i = this.state.priorityUpdates.findIndex(v => v.sectorId === null)
                if (i > -1) {
                    const newArr = [...this.state.priorityUpdates]
                    newArr.splice(i, 1)
                    this.setState({ priorityUpdates: newArr })
                }
            }

        } else if (name === 'pillar_selector') {
            updateData_ = [
                {
                    ...this.state.updateRecordData[0],
                    partnerships: e.find(v => v.value === 'partnerships') ? 1 : 0,
                    people: e.find(v => v.value === 'people') ? 1 : 0,
                    planet: e.find(v => v.value === 'planet') ? 1 : 0,
                    prosperity: e.find(v => v.value === 'prosperity') ? 1 : 0,
                    peace: e.find(v => v.value === 'peace') ? 1 : 0,
                }
            ];
        } else if (name === "statusUpdt_selector" && !e) { // remove Current Phase of Project from the selector
            var systemProjects = [...this.state.updateRecordData[0].systemProjects]
            systemProjects[projIndex]["status_update_id"] = null;
            updateData_ = [
                {
                    ...this.state.updateRecordData[0],
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

            var systemProjects = [...this.state.updateRecordData[0].systemProjects]
            systemProjects[projIndex][key] = value;

            updateData_ = [
                {
                    ...this.state.updateRecordData[0],
                    systemProjects: systemProjects
                }
            ]
        } else if (name === 'suggestion_selector') {
            let suggestionAns;
            let systemProjects;
            if (e.length === 0) {
                suggestionAns = this.state.updateRecordData[0].systemProjects[projIndex].suggestionAns.map(v => (
                    {
                        ...v,
                        active: 0
                    }
                ))
            } else {
                let checkedArr = []
                for (let i = 0; i < e.length; i++) {
                    const index = this.state.updateRecordData[0].systemProjects[projIndex].suggestionAns.findIndex(v => v.suggestion_id === e[i].suggestionId)
                    if (index > -1) {
                        checkedArr.push({
                            ...this.state.updateRecordData[0].systemProjects[projIndex].suggestionAns[index],
                            active: 1
                        })
                    }else if(e[i].value && e[i].suggestionId === undefined){
                      const resData = await this.insertSuggestion(e[i].value)
                      console.log(this.state.targetOptions)
                      const newObj = {...this.state.targetOptions}
                      newObj.suggestion = resData.suggestion;
                      this.setState({
                          targetOptions: newObj
                        },()=> {
                        const newOption = resData.suggestion.find(v=> v.suggestion_name === e[i].value)
                        checkedArr.push({
                          active: 1,
                          record_id: this.state.recordId,
                          sector_id: newOption.sector_id,
                          suggestion_id: newOption.suggestion_id
                      })
                      })
                     
                    } else {
                        checkedArr.push({
                            active: 1,
                            record_id: this.state.recordId,
                            sector_id: e[i].sectorId,
                            suggestion_id: e[i].suggestionId
                        })
                    }
                }
               
                const others = [...this.state.updateRecordData[0].systemProjects[projIndex].suggestionAns
                    .filter(d => (d.sector_id !== this.state.updateRecordData[0].sector_id && d.sector_id !== null))];
                const ids = new Set(checkedArr.map(d => d.suggestion_id));
                const uncheckedArr =
                    [...this.state.updateRecordData[0].systemProjects[projIndex].suggestionAns
                        .filter(d => (!ids.has(d.suggestion_id) && (d.sector_id === this.state.updateRecordData[0].sector_id || d.sector_id === null)))
                    ]
                        .map(v => (
                            {
                                ...v,
                                active: 0
                            }
                        ));

                suggestionAns = [...checkedArr, ...uncheckedArr, ...others]

            }
            const newArr = [...this.state.updateRecordData[0].systemProjects]
            newArr[projIndex].suggestionAns = suggestionAns
            systemProjects = newArr

            updateData_ = [
                {
                    ...this.state.updateRecordData[0],
                    systemProjects: systemProjects
                }
            ]

        } else if (name === 'align') {
            const key = name === 'align' ? 'aligned_id' : name;
            const value = e ? e.id : null
            const newObj = { ...this.state.updateRecordData[0] }
            newObj[key] = value
            updateData_ = [
                {
                    ...newObj
                }
            ];
        } else if(name === 'externalLink' || name === 'internalLink' || name === 'externalLinkType' || name === 'internalLinkType') {
            const key = name;
            const value = e ? e.id : null
            const newObj = { ...this.state.updateRecordData[0] }
            newObj.systemProjects[projIndex][key] = value
            updateData_ = [
                {
                    ...newObj
                }
            ];
        } else if (name === "ageGroup_selector") {
            let ageGroupAns;
            // console.log('select data ', e, projIndex)
            if (e.length === 0) {
                ageGroupAns = this.state.updateRecordData[0].systemProjects[projIndex].ageGroup.map(v => (
                    {
                        ...v,
                        active: 0
                    }
                ))
            } else {
                let checkedArr = []
                for (let i = 0; i < e.length; i++) {
                    const index = this.state.updateRecordData[0].systemProjects[projIndex].ageGroup.findIndex(v => v.age_group_id === e[i].ageGroupId)
                    if (index > -1) {
                        checkedArr.push({
                            ...this.state.updateRecordData[0].systemProjects[projIndex].ageGroup[index],
                            active: 1
                        })
                    } else {
                        checkedArr.push({
                            active: 1,
                            record_id: this.state.recordId,
                            age_group_id: e[i].ageGroupId
                        })
                    }
                }
                const ids = new Set(checkedArr.map(d => d.age_group_id));
                const uncheckedArr =
                    [...this.state.updateRecordData[0].systemProjects[projIndex].ageGroup
                        .filter(d => (!ids.has(d.age_group_id)))
                    ]
                        .map(v => (
                            {
                                ...v,
                                active: 0
                            }
                        ));

                ageGroupAns = [...checkedArr, ...uncheckedArr]
            }
            const newArr = [...this.state.updateRecordData]
            newArr[0].systemProjects[projIndex].ageGroup = ageGroupAns

            updateData_ = [
                ...newArr
            ]
        }
        this.setState({ updateRecordData: updateData_ })
    }

    insertSuggestion = async(newData) => {
        const data_ = {
            name: newData
        }
        if (
            checkTokenExist(this.state.user, this.props.history, this.props.cookies)
        ) {
        

     return await InsertSuggestionFetch(
            data_,
            (error, data) => {
                if (error) {
                    if (error.toString().includes("expired")) {
                        toast("Login Expired!", { type: "error" });
                        deleteCookie(this.props.cookies);
                        this.props.history.push("/login");
                    } else toast(error.toString(), { type: "error" });
                } else {
                    return data.payload
                }
            },
            { token: this.state.user.token }
        )
        }

    }

    _handleModalText = ({ text, header, ministryIndex, projIndex }) => {
        const Text = text.replace(/\s*$/, "")
        this.setState({ isEnabled: true })
        const obj = [{ ...this.state.updateRecordData[0] }]
        if (header === "ministry") {
            obj[0].policies[ministryIndex].ministry = Text;
        } else if (header === "p_and_p_title") {
            obj[0].policies[ministryIndex].title = text;
        } else if (header === 'policies') {
            obj[0][header][ministryIndex].policy_and_programme = Text;
        } else if (header === 'technology_system_and_platform' || header === 'national_strategic_plan') {
            obj[0][header] = Text;
        } else if(header.includes('Desc')){
            obj[0].systemProjects[projIndex][header] = Text;
        }

        this.setState({ updateRecordData: obj })
    }

    handleInputChange = (e, projIndex) => {
        this.setState({ isEnabled: true })
        const key = e.target.id;
        const value = e.target.value;

        const systemProjects = [...this.state.updateRecordData[0].systemProjects]
        systemProjects[projIndex][key] = value;

        const updateData_ = [
            {
                ...this.state.updateRecordData[0],
                systemProjects: systemProjects
            }
        ]
        this.setState({ updateRecordData: updateData_ })
    }

    fetchTargetData = (recordId) => {

        if (
            checkTokenExist(this.state.user, this.props.history, this.props.cookies)
        ) {
            const countryId = this.state.user.country_id;
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
                            this.props.history.push("/login");
                        } else toast(error.toString(), { type: "error" });
                    } else {
                        this.setState({
                            targetOptions: data.payload.targetOptions,
                            recordData: data.payload.targetData,
                            updateRecordData: data.payload.targetData
                        })
                    }
                },
                { token: this.state.user.token }
            );
        }

    }

    fetchRadarData = () => {
        if (checkTokenExist(this.state.user, this.props.history, this.props.cookies)) {
            const userId = this.state.user.user_id;
            const countryId = this.state.user.country_id;
            FetchReport(
                { countryId, userId },
                (error, data) => {
                    if (error) {
                        if (error.toString().includes("expired")) {
                            toast("Login Expired!", { type: "error" });
                            deleteCookie(this.props.cookies);
                            this.props.history.push("/login");
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
                        this.setState({ radarData })
                    }
                },
                { token: this.state.user.token }
            );
        }
    };

    imageName = () => {
        return this.state.sdgId === 1
            ? one
            : this.state.sdgId === 2
                ? two
                : this.state.sdgId === 3
                    ? three
                    : this.state.sdgId === 4
                        ? four
                        : this.state.sdgId === 5
                            ? five
                            : this.state.sdgId === 6
                                ? six
                                : this.state.sdgId === 7
                                    ? seven
                                    : this.state.sdgId === 8
                                        ? eight
                                        : this.state.sdgId === 9
                                            ? nine
                                            : this.state.sdgId === 10
                                                ? ten
                                                : this.state.sdgId === 11
                                                    ? eleven
                                                    : this.state.sdgId === 12
                                                        ? twelve
                                                        : this.state.sdgId === 13
                                                            ? thirteen
                                                            : this.state.sdgId === 14
                                                                ? fourteen
                                                                : this.state.sdgId === 15
                                                                    ? fivtheen
                                                                    : this.state.sdgId === 16
                                                                        ? sixteen
                                                                        : seventeen;
    };

    handleSaveChanges = async () => {
        let fileList = [];
        for (let data of this.state.updateRecordData) {
            const lists = data.policies.map(
                (v) => v.file
            );
            for (let list of lists) {
                if (list) {
                    fileList.push(list);
                }
            }
        }
        if (checkTokenExist(this.state.user, this.props.history, this.props.cookies)) {
            const userId = this.state.user.user_id;
            const countryId = this.state.user.country_id;
            const recordId = this.state.recordId;
            const updateRecordData_ = [{
                ...this.state.updateRecordData[0],
                removeRecords: this.state.removeRecords,
                priorityUpdates: this.state.priorityUpdates
            }]
            await UpdateTargetFetch(
                { userId, countryId, recordId },
                updateRecordData_,
                fileList,
                (error, data) => {
                    if (error) {
                        if (error.toString().includes("expired")) {
                            toast("Login Expired!", { type: "error" });
                            deleteCookie(this.props.cookies);
                            this.props.history.push("/login");
                        } else toast(error.toString(), { type: "error" });
                    } else {
                        this.setState({
                            isEnabled: false,
                            recordData: this.state.updateRecordData,
                            removeRecords: [],
                            priorityUpdates: []
                        })
                        toast(data.message, { type: "success" });
                        const socket_noti = io(API.LastUpdateNoti, {
                            transports: ["websocket"],
                        });
                        socket_noti.emit("save changes", { isLastUpdateInfo: true });
                        this.fetchTargetData(recordId);
                        this.fetchTarget(this.state.sdgId);
                    }
                },
                { token: this.state.user.token }
            );
        }
    };
    // console.log("recordData",recordData)

    _UploadFile = (e, ministryIndex) => {
        this.setState({ isEnabled: true })
        const obj = [...this.state.updateRecordData];
        let fileAns = e.target.files[0];
        let fileName = fileAns !== undefined ? fileAns.name : null;
        obj[0].policies[ministryIndex].file = fileAns;
        obj[0].policies[ministryIndex].file_name = fileName;
        this.setState({ updateRecordData: obj })
    };

    _handleAddSheet = (e) => {
        const ID = parseInt(e.target.id);

        const newPloicy = {
            file_name: null,
            ministry: null,
            policy_and_programme: null,
            ssa_id: this.state.recordId,
            title: null,
        };
        const newArr = [...this.state.updateRecordData]
        newArr[0].policies.push(newPloicy)
        this.setState({ updateRecordData: newArr })
    };

    _handleAddNewProj = () => {
        const newProj = {
            // others: null,
            // proj_id: null,
            // record_id: this.state.recordId,
            // status_update_id: null,
            // suggestionAns: []

            externalLink: null,
            externalLinkType: null,
            externalNoDesc: null,
            externalYesDesc: null,
            internalLink: null,
            internalLinkType: null,
            internalNoDesc: null,
            internalYesDesc: null,
            location: null,
            others: null,
            proj_id: null,
            proj_level_id: null,
            proj_title: null,
            record_id: this.state.recordId,
            status_update_id: null,
            suggestionAns: []
        };
        const newArr = [...this.state.updateRecordData]
        newArr[0].systemProjects.push(newProj)
        this.setState({ 
            updateRecordData: newArr 
        },()=>{
            const parentDiv = document.getElementById(`parent_pl_${this.state.updateRecordData[0].systemProjects.length}`);
            const plDiv = document.getElementById(`project_log_${this.state.updateRecordData[0].systemProjects.length}`);
            plDiv.style.display = 'block'
            parentDiv.scrollIntoView({behavior: "smooth", block: "start", inline: "nearest"});
        })
    }

    _handleCancel = () => {
        const techDescription = this.state.recordData[0].technology_system_and_platform
        const updateData_ = [{
            ...this.state.updateRecordData[0],
            technology_system_and_platform: techDescription
        }]
        this.setState({
            updateRecordData: updateData_,
            isEnabled: false
        })
    }

    _CancelFile = (ministryIndex) => {
        const obj = [...this.state.recordData];
        obj[0].policies[ministryIndex].file_name = "";
        this.setState({
            recordData: obj,
            updateRecordData: obj,
            isEnabled: true
        })
    }

    _RemoveTarget = (id, label) => {
        let confirmAction = window.confirm(`Do you want to delete ${label}?`);
        if (confirmAction) {
            this.setState({ isEnabled: true })
            const newArr = [...this.state.removeRecords]
            newArr.push(id)
            this.setState({ removeRecords: newArr })
            if (this.state.recordId === id) {
                const nextRecordId = this.state.targets.filter(v => !newArr.includes(v.id))[0].id
                this.setState({
                    recordId: nextRecordId
                })
            }
        } else {
            alert("Canceled");
        }
    }

    _RemoveThemes = (id, sectorName) => {
        let confirmAction = window.confirm(`Do you want to delete ${sectorName}?`);
        if (confirmAction) {
            this.setState({ isEnabled: true })
            const newArr = [...this.state.priorityUpdates]
            const removePriority = {
                sectorId: id,
                sectorName: sectorName,
                countryId: this.state.user.country_id
            }
            newArr.push(removePriority);
            this.setState({ priorityUpdates: newArr })

            const index = this.state.updateRecordData.findIndex(v => v.sector_id === id)
            if (index >= 0) {
                const newArr = [...this.state.updateRecordData]
                newArr[index].sector_id = null;
                newArr[index].sector_name = null;
                this.setState({ updateRecordData: newArr })
            }
        } else {
            alert("Canceled");
        }
    }

    _handleCheckGaps = (e) => {
        this.setState({ isEnabled: true })
        const { id, name, checked } = e.target
        const index = this.state.updateRecordData[0][name].findIndex(v => v.id === parseInt(id))
        if (index >= 0) {
            const obj = [{ ...this.state.updateRecordData[0] }]
            obj[0][name][index].active = checked ? 1 : 0;
            this.setState({ updateRecordData: obj })
        } else {
            const newData = {
                id: parseInt(id),
                ssa_id: this.state.recordId,
                active: checked ? 1 : 0
            }
            const obj = [{ ...this.state.updateRecordData[0] }]
            obj[0][name].push(newData)
            this.setState({ updateRecordData: obj })
        }
    }

    _handleFileDownload = (fileName) => {
        const userId = this.state.user.user_id
        if (checkTokenExist(this.state.user, this.props.history, this.props.cookies)) {

            DownloadFile(
                {
                    userId,
                    fileName,
                },
                (error, data) => {
                    if (error) {
                        if (error.toString().includes("expired")) {
                            toast("Login Expired!", { type: "error" });
                            deleteCookie(this.props.cookies);
                            this.props.history.push("/login");
                        } else toast(error.toString(), { type: "error" });
                    } else {
                        window.open(data.payload);
                    }
                },
                { token: this.state.user.token }
            );
        }
    };

    handleSDGSelect = ({ e }) => {
        this.setState({ sdgId: e.sdgId, updateSuggestion: [] });
        this.fetchRelatedTarget(e.sdgId);
        this.fetchTarget(e.sdgId)
        this.fetchEditRecordData(e.sdgId);
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

    updateIndex = (ID) =>
        this.state.updateRecordData &&
        this.state.updateRecordData.findIndex((v) => v.id === ID);

    recordIndex = (ID) =>
        this.state.recordData &&
        this.state.recordData.findIndex((v) => v.id === ID);

    isUpdateId = (ID) => {
        const quesIdIndex = this.state.updateRecordData.filter((e) => e.id === ID);
        return quesIdIndex;
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

    _handleSetNewRecord = ({ keyVal }) => {
        let newObj = { ...this.state.newRecord };
        for (let d of keyVal) {
            newObj[d.key] = d.value;
            this.setState({ newRecord: newObj });
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

    render() {
        const { countryId, sectionId, updateRecordData, radarData, relatedTargets, recordId, targetOptions, targets, isEnabled, sdgId, recordData } = this.state;
        var realatedTargetsGroup =
            relatedTargets && updateRecordData.length > 0 &&
            (relatedTargets.filter(v => v.sector_id === updateRecordData[0].sector_id)).reduce(function (targets, org) {
                (targets[org.sdg_id] = targets[org.sdg_id] || []).push(org);
                return targets;
            }, []);

            return (
            <>
                <div className="row" style={{ backgroundImage: "linear-gradient(#FEFEFE, #E6E6E6)" }}>
                    <AlertDialog
                        isOpen={this.state.showDialog}
                        saveMoveToNext={this.save_and_MoveToNext}
                        discardMoveToNext={this.discard_and_MoveToNext}
                        onDiscardClick={this.onDiscardClick}
                    />
                    <div className={`${window.innerWidth <= 925 ? 'col-md-12 mt-5': 'col-md-3'} col-lg-3 col-sm-12`}>
                        <EditSidebar
                            countryId={countryId}
                            countryName={this.countryName(countryId)}
                            _handleSectionClick={this._handleSectionClick}
                            sectionId={sectionId}
                            updateRecordData={updateRecordData}
                        />
                    </div>
                    <div className={`${window.innerWidth <= 925 ? 'col-md-12 pl-4': 'col-md-9 pl-0 mt-5'} col-lg-9 col-sm-12`}>
                        <div className="d-flex flex-row flex-wrap justify-content-end align-items-center my-3 px-2">
                            <div className="col-lg-3 col-md-5 col-sm-5 col-xs-3 col-12">
                                <ESButton
                                    text={"Save Progress"}
                                    disabled={!isEnabled}
                                    onClick={this.handleSaveChanges}
                                />
                            </div>
                        </div>
                        {
                            this.state.updateRecordData.length > 0 ?
                                <Scrollbars
                                    style={{ height: "80vh" }}
                                    renderTrackHorizontal={(props) => (
                                        <div
                                            {...props}
                                            style={{ display: "none", overflowX: "hidden" }}
                                            className="track-horizontal"
                                        />
                                    )}
                                >
                                    {
                                        sectionId === 1 ?
                                            <Goals_target
                                                updateRecordData={updateRecordData}
                                                targetOptions={targetOptions}
                                                targets={targets}
                                                isEnabled={isEnabled}
                                                sdgId={sdgId}
                                                recordId={recordId}
                                                radarData={radarData}
                                                handleSDGSelect_={this.handleSDGSelect_}
                                                handleTargetSelect={this.handleTargetSelect}
                                                handleSectorSelect={this.handleSectorSelect}
                                                realatedTargetsGroup={realatedTargetsGroup}
                                            />
                                            : sectionId === 2 ?
                                                <Policies
                                                    recordData={recordData}
                                                    recordId={recordId}
                                                    updateRecordData={updateRecordData}
                                                    isEnabled={isEnabled}
                                                    _handleModalText={this._handleModalText}
                                                    _handleCancel={this._handleCancel}
                                                    _handleSaveChanges={this._handleSaveChanges}
                                                    _UploadFile={this._UploadFile}
                                                    _CancelFile={this._CancelFile}
                                                />
                                                : sectionId === 3 ?
                                                <Systems
                                                    recordData={recordData}
                                                    recordId={recordId}
                                                    updateRecordData={updateRecordData}
                                                    isEnabled={isEnabled}
                                                    targetOptions={targetOptions}
                                                    _handleModalText={this._handleModalText}
                                                    _handleCancel={this._handleCancel}
                                                    handleSectorSelect={this.handleSectorSelect}
                                                    _handleSaveChanges={this._handleSaveChanges}
                                                    _UploadFile={this._UploadFile}
                                                    _CancelFile={this._CancelFile}
                                                    _handleInputChange={this.handleInputChange}
                                                    _handleAddNewProj={this._handleAddNewProj}
                                                />
                                                : sectionId === 4 ?
                                                <Review 
                                                    targetOptions={targetOptions}
                                                    sdgId={sdgId}
                                                    updateRecordData={updateRecordData}
                                                    handleSectorSelect={this.handleSectorSelect}
                                                    _handleCheckGaps={this._handleCheckGaps}
                                                />
                                                : <></>
                                    }
                                </Scrollbars>
                                :
                                <img className=' m-auto' src={Spinner} alt="Loading" width={120} />
                        }
                    </div>
                </div>

            </>
        )
    }
}

export default withRouter(withCookies(EditContainer_v2))

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