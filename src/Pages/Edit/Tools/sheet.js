import React from 'react';
import color from '../../../Feature/Config/color'

export const Sheets = (props) => {
    const {
      policyData,
      _handleSheetClick,
      ministryIndex,
      _handleAddSheet,
      id,
      _handleEditTitle,
      editTitle,
    } = props;
  
    const defaultStyle = {
      borderRadius: "5px 5px 0 0",
    };
    const addIconStyle = { color: color.green, cursor: "pointer" };
  
    return (
      <div
        className="d-flex flex-row pt-3"
        style={{ borderBottom: "3px solid" + color.primaryColor }}
      >
        {policyData.map((v, k) => (
          <React.Fragment key={k}>
            <span
              className="mr-1 px-2 py-1"
              id={k}
              style={{
                ...defaultStyle,
                background:
                  ministryIndex === k ? color.primaryColor : color.lightGrey,
                color: ministryIndex === k ? "#fff" : color.greyColor,
                cursor:
                  editTitle && editTitle.id !== v.id
                    ? "not-allowed"
                    : "pointer",
              }}
            >
              <a id={k} herf="#" onClick={(e) => _handleSheetClick(e)}>
                {v.title || `P&P ${k + 1}`}
              </a>
              {ministryIndex === k && (
                <i
                  id={v.id}
                  className="pl-1 fa fa-cog"
                  onClick={(e) => _handleEditTitle(e)}
                />
              )}
            </span>
            {k + 1 === policyData.length && (
              <span className="p-1" style={addIconStyle}>
                <i
                  id={id}
                  className="fa fa-plus-circle"
                  onClick={(e) => _handleAddSheet(e)}
                />
              </span>
            )}
          </React.Fragment>
        ))}
      </div>
    );
  };