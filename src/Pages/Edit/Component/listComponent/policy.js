import React, { useState } from "react";
import { withCookies } from "react-cookie";
import { toast } from "react-toastify";
import { updatePandPTitle } from "../../../../Api/FetchEdit";
import { readCookie } from "../../../../helper/cookieUser";
import Description from "./description";

const Policy = (props) => {
  const {
    recordId,
    recordData,
    updateRecordData,
    _handleModalText,
    _handleAddSheet,
    setUpdateRecordData,
    _UploadFile,
    isEnabled,
    _handleCancel,
    _handleSaveChanges,
    _CancelFile
  } = props;
  const [ministryIndex, setMinistryIndex] = useState(0)
  const [editTitle, setEditTitle] = useState(null);
  const [newTitle, setNewTitle] = useState("");
  const [PPID, setPPID] = useState(null);

  const _handleSheetClick = (e) => {
    editTitle || setMinistryIndex(parseInt(e.target.id));
  };

  const _handleEditTitle = (e) => {
    setPPID(e.target.id);
    if (e.target.id) {
      editTitle ||
        setEditTitle(
          updateRecordData[0].policies.find((x) => x.id === parseInt(e.target.id))
        );
      setNewTitle(
        updateRecordData[0].policies.find((x) => x.id === parseInt(e.target.id))
          .title
      );
    } else {
      setEditTitle({
        title: null,
      });
      setNewTitle("");
    }
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
  };

  const _handleUpdateTitle = () => {
    const user = readCookie(props.cookies)
    if (newTitle.trim() === '') {
      toast("Please provide proper PandP title.", { type: "warning" });
    } else {
      updatePandPTitle(
        { id: PPID, title: newTitle },
        (err, data) => {
          if (err) {
            return;
          }
          toast(data.message, { type: "success" });
          const obj = [...updateRecordData];
          obj[0].policies[ministryIndex].title = newTitle.trim();
          setUpdateRecordData(obj);
          _handleCancelEdit();
        },
        {
          token: user.token,
        }
      );
    }
  };

  const _handleCancelEdit = (e) => {
    setNewTitle("");
    setPPID(null);
    setEditTitle(null);
  };

  return (
    <div className="row py-2">
      <div className="col-lg-6 text-left col-md-6 col-sm12">
        <Description
          recordData={recordData}
          title={'NATIONAL PRIORITIES​'}
          instruction={instructions.national_inst}
          header={'National Strategies/Priorities'}
          editorHeader={'national_strategic_plan'}
          editorValue={updateRecordData[0].national_strategic_plan}
          isEnabled={isEnabled}
          _handleModalText={_handleModalText}
          _handleCancel={_handleCancel}
          _handleSaveChanges={_handleSaveChanges}
        />
      </div>
      <div className="col-lg-6 text-left col-md-6 col-sm-12">
        <Description
          recordData={recordData}
          title={'DIGITAL POLICIES AND PROGRAMMES'}
          instruction={instructions.digitalPolicy_inst}
          header={'Digital Policies And Programmes'}
          editorHeader={'policies'}
          editorValue={updateRecordData[0].policies}
          ministryIndex={ministryIndex}
          editTitle={editTitle}
          newTitle={newTitle}
          recordId={recordId}
          PPID={PPID}
          isEnabled={isEnabled}
          _CancelFile={_CancelFile}
          _handleSheetClick={_handleSheetClick}
          _handleEditTitle={_handleEditTitle}
          _handleTitleChange={_handleTitleChange}
          _handleUpdateTitle={_handleUpdateTitle}
          _handleCancelEdit={_handleCancelEdit}
          _handleModalText={_handleModalText}
          _handleAddSheet={_handleAddSheet}
          _handleCancel={_handleCancel}
          _handleSaveChanges={_handleSaveChanges}
          _UploadFile={_UploadFile}
        />
      </div>
    </div>
  )

}
export default withCookies(Policy);

const instructions = {
  national_inst: 'Please indicate the National priorities or strategies in meeting the specific SDG target under the 2030 Agenda for Sustainable Development. This may include relevant milestones and proposed steps, as reflected within the  Voluntary National Reviews',
  digitalPolicy_inst: 'Please indicate relevant policies and programmes in improving access, adoption, and effective use of digital technologies, that are specific to this SDG target.​This may include key statistics; legislations; budget funding priorities; subsidies and grants available; Ministry/user department plans or sectoral plans; major international/regional agreements'
}


