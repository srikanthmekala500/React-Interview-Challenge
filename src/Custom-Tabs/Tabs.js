import React, { useEffect, useState } from 'react'
import '../Custom-Tabs/.css'
const Tabs = (props) => {
        const [tabsHeaders,setTabsheaders]=useState([])
        const [contentmap,setContentMap]=useState({})
        const [active,setActive] =useState('')
    const {children}=props
    useEffect(()=>{
        const headers = []
        const map = {}
        React.Children.forEach(children,(e)=>{
            if(!React.isValidElement(e))
                return''
            const {title} = e.props
            headers.push(title);
            map[title]= e.props.children
        })
        setTabsheaders(headers)
        setContentMap(map)
        setActive(headers[0])
        console.log(map)
    },[props,children])
    ////button 
    const changeTab =(ele)=>{
        setActive(ele)
    }

  return (
   <div>
         <div>
            {
                tabsHeaders.map((ele)=>{
                    return <button
                        className={
                            active === ele ? 'selected' : ''
                        }
                        key={ele}
                        onClick={()=>changeTab(ele)}
                        >
                        {ele}
                        </button>
                })
            }
         </div>

        <div>
            {
                Object.keys(contentmap).map((key,idx)=>{
                        if(key === active){
                            return<div>
                                {contentmap[key]}
                                </div>
                        }
                })
            }
        </div>
   </div>
  )
}

export default Tabs