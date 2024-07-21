import React, { useState } from 'react'
import '../Star-rating/.css'
const Star_rating = () => {
    const [rating,setRating]=useState(0)
    const [hover,setHover] =useState(0)

  return (
    <div className='App'> 
        <div>
                {
                    [1,2,3,4,5].map((num)=>(
                              <button
                                onClick={()=>setRating(num) }
                                onMouseOver={()=>setHover(num)}
                                onMouseLeave={()=>setHover(num)}
                                                                       
                              > 
                                    <span className={`star ${num <=((rating && hover) || hover)? 'on':'off'}`} >&#9733;</span>
                            </button>
                    ))
                }
        </div>
    </div>
  )
}

export default Star_rating