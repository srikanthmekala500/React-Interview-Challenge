import React, { useEffect, useState } from 'react'
import Progressbar from './Progressbar'
import '../progress-bar/progress-bar.css';

const ProgressCounter = () => {

    const [progress,setProgress]=useState(0)

    useEffect(() => {
        const time = setInterval(() => {
          if (progress < 100) {
            setProgress((p) => p + 1);
          }
        }, 30);
    
        return () => {
          clearInterval(time);
        }
      }, [progress])

  return (
    <div> 
        <Progressbar
              progress={progress}
              color={'lightgreen'}
        /> 
          <Progressbar
              progress={progress}
              color={'lightblue'}
        />
        <Progressbar
              progress={progress}
              color={'yellow'}
        />
     </div>
  )
}

export default ProgressCounter