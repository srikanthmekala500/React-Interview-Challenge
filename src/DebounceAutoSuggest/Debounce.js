import React, { useEffect, useState } from 'react'
import '../DebounceAutoSuggest/.css'
import debouceQuery from './utilsimp'
const Debounce = () => {
    const [input,setInput]=useState('')
    const [list ,setList] =useState([])
 
    //input on change 
    const handletochnage = (e)=>{
        setInput(e.target.value)
        console.log(input)
    }
    //Api call
    const initApicall =async ()=>{
        const url = `https://api.frontendeval.com/fake/food/${input}`
            const data = await debouceQuery( `https://api.frontendeval.com/fake/food/${input}`)
            setList(data)
    }
    useEffect(()=>{
        if(input){
            initApicall()
        }
    },[input])

  return (
    <div> 
        <input
            type='text'
            onChange={handletochnage}
            value={input}
        />
        {
            list && list.length > 0 && <div className='list'>
            {
            list && list.map((item ,index)=>{
                    return <div key={index}>
                            {item}
                         </div>
            })
            
            }
</div>
        }
    </div>
  )
}

export default Debounce