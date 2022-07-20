import React, { useEffect, useState } from 'react'

const ScrollToTop = () => {
    const [yAxis, setYaxis] = useState(0)

    const _handleTop = () => {
        window.scrollTo({ top: 0, left: 0, behavior: 'smooth' })
    }
    
    const handleScroll = () =>{
        setYaxis(window.pageYOffset);
    }
    
    useEffect(() => {
        
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    })

    return (
        <div className='row justify-content-end' >
            {yAxis !== 0 &&
                <div className='position-fixed' style={{ zIndex: 3, paddingRight: 25, marginTop: window.innerHeight - 145, cursor: 'pointer' }} onClick={()=>_handleTop()}>
                    <i className="fa fa-3x fa-arrow-circle-up" style={{ color: "rgba(77, 148, 230, 0.7)" }} aria-hidden="true"></i>
                </div>
            }

        </div>
    )
}

export default ScrollToTop