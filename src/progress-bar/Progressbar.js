import React from 'react'

const Progressbar = ({progress,color}) => {
    
    const styleobject = {
            width :`${progress}%`,
            backgroundColor : color || 'red',
            height : 30,
            borderRadius:20
    }

  return (
        <div className='container'>
            <div className='progress-bar'>
                    <div style={styleobject}>
                        {`${progress} %`}
                    </div>
            </div>
        </div>
  )
}

export default Progressbar