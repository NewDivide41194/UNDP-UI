import React from 'react'
import color from '../../../Feature/Config/color';
import goals from '../../../Feature/Images/Edit Menu Icons/goals.png'
import linkages from '../../../Feature/Images/Edit Menu Icons/linkages.png'
import policies from '../../../Feature/Images/Edit Menu Icons/policies.png'
import review from '../../../Feature/Images/Edit Menu Icons/review.png'
import systems from '../../../Feature/Images/Edit Menu Icons/systems.png'

const MenuBar = (props) => {
    const { sectionId, _handleSectionClick,listData } = props;
    const windowWidth = window.innerWidth;
   
    return (
        <div
            className='d-flex row align-items-center justify-content-center my-2'
            style={{
                color: color.primaryColor
            }}
        >
            <div
                className={
                    `d-flex flex-wrap 
                     ${windowWidth < 1188 ? 'col-lg-8' : windowWidth < 1600 ? 'col-lg-6' : 'col-lg-5'} 
                     col-md-9 justify-content-around p-0`
                }
            >
                {
                    listData.map((v, k) =>
                        <div
                            key={k}
                            className='col-2 py-1 m-1'
                            onClick={() => _handleSectionClick({sectionId:v.id})}
                            style={{
                                borderRadius: 10,
                                minWidth: 103,
                                maxWidth: 110,
                                cursor: 'pointer',
                                boxShadow: sectionId !== v.id
                                    ? '-6px -6px 10px rgba(255, 255, 255, 0.8),6px 6px 10px rgba(0, 0, 0, 0.15)'
                                    : ' inset -6px -6px 10px rgba(255, 255, 255, 0.8), inset 6px 6px 10px rgba(0, 0, 0, 0.05)'
                            }}
                        >
                            <img src={v.imgSrc} width='50' height='50' /><br />
                            {v.label}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

const tabs = [
    {
        text: 'Goals/Targets',
        img: goals
    },
    {
        text: 'Policies',
        img: policies
    },
    {
        text: 'Systems',
        img: systems
    },
    {
        text: 'Linkages',
        img: linkages
    },
    {
        text: 'Review',
        img: review
    },
]

export default MenuBar;