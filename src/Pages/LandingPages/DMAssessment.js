import React, {useEffect} from 'react'
import { withCookies } from 'react-cookie'
import ega from '../../Feature/Images/Questionnaire/ega.png'
import { checkTokenExist } from '../../helper/checkAccess'
import { readCookie } from '../../helper/cookieUser'
import { ESButton } from '../Questionnaire/components/tools/ES_Button'

const DMAssessment = (props) => {
    const user = readCookie(props.cookies)
    useEffect(()=>{
        checkTokenExist(user, props.history, props.cookies)
    })
    return (
        <div className='container' style={{ height: window.innerWidth < 400 ? '95vh' : '85vh', marginTop: window.innerWidth <= 582 ? 180 : 80 }}>
        <div className='row justify-content-center '>
            <div className=' col-11 p-0'
                style={{
                    // border: '1px solid #44546A',
                    position: 'absolute',
                    transform: "translateY(-50%)",
                    top: "56%",
                }} >
                    <p className='text-left'>
                        <img src={ega} width='20%' height='20%' className='float-right' />
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus imperdiet, nulla et dictum interdum, nisi lorem egestas odio,
                        vitae scelerisque enim ligula venenatis dolor. Maecenas nisl est, ultrices nec congue eget, auctor vitae massa. Fusce luctus vestibulum
                        augue ut aliquet. Mauris ante ligula, facilisis sed ornare eu, lobortis in odio. Praesent convallis urna a lacus interdum ut hendrerit
                        risus congue. Nunc sagittis dictum nisi, sed ullamcorper ipsum dignissim ac. In at libero sed nunc venenatis imperdiet sed ornare turpis.
                        Donec vitae dui eget tellus gravida venenatis. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras
                        ac leo purus. Mauris quis diam velit. Integer fringilla congue eros non fermentum. Sed dapibus pulvinar nibh tempor porta. Cras ac leo purus.
                        Mauris quis diam velit.
                    </p>
                    <div className='col-5 float-right'>
                        <ESButton
                            text={"NEXT"}
                            rounded
                            onClick={() => props.history.push('/digital_maturity_accessment')}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default withCookies(DMAssessment)