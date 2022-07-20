import React from 'react'
import color from '../../../../Feature/Config/color';
import font from '../../../../Feature/Config/font'

const ESLevelIndicator = (props) => {
    const {
        quesId,
        keys,
        levels,
        selectedLevel,
        _handleSelectLevel
    } = props;
 
    const Levels = levels.filter(
        v => !((v.option_choice_name).includes('Low') || (v.option_choice_name).includes('High')));
    const Remarks = levels.filter(
        v => (v.option_choice_name).includes('Low') || (v.option_choice_name).includes('High'));
    const SelectedLevel = selectedLevel.length > 0 ? selectedLevel[0].optionChoiceId : null;
    
    return (
        <>
            <div className='d-flex row'>
                {
                    Levels.map((level, k) => (
                        <div
                            className='col text-center py-3'
                            style={{
                                borderTopLeftRadius: k === 0 && 7,
                                borderBottomLeftRadius: k === 0 && 7,
                                borderTopRightRadius: k === (Levels.length - 1) && 7,
                                borderBottomRightRadius: k === (Levels.length - 1) && 7,

                                backgroundColor: SelectedLevel === level.option_choice_id && "rgba(0,107,183,0.3)",
                                border: SelectedLevel === level.option_choice_id ? `1px solid ${color.primaryColor}` : `1px solid ${color.lightGrey}`,
                                cursor: 'pointer'
                            }}
                            onClick={()=>_handleSelectLevel(quesId,keys,level)}
                        >
                            {level.option_choice_name}
                        </div>
                    ))
                }
            </div>
            <div className='d-flex row justify-content-between my-2'>
                {
                    Remarks.map((remark, k) => (
                        <div key={k} style={{ fontSize: font.labels }}>
                            {remark.option_choice_name}
                        </div>
                    ))
                }
            </div>
        </>
    )
}

export default ESLevelIndicator;