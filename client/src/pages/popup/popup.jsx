import React from 'react'
import { useState, useEffect } from 'react'
function Popup() {

    const [showPopup, setShowPopup] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            setShowPopup(true);
        }, 2000);
        return () => clearTimeout(timer);
    }, [])
    return (
        <>
            {showPopup && (<div className='popup'>
                <span>this is popup</span>
                <button className='popup-close' onClick={() => setShowPopup(false)}>x</button>
            </div>)
            }
        </>
    )
}

export default Popup