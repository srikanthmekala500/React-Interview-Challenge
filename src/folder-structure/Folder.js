import React, { useState } from 'react'
import '../folder-structure/folders.css'
const Folder = ({file}) => {
   const [expand,setExpand]=useState(false)
  return (
    <div>
        <div
            onClick={()=>{
                setExpand(!expand)
            }}
            >
            {
                file.isFolder ? (
                    <button
                        className={
                            expand ? 'expand':''
                        }
                    >
                        {'>'}
                    </button>
                ):null
            }
            {file.name}
        </div>
            {
                file.isFolder && expand &&
                file.children.map((exp)=>{
                       return <div style={{paddingLeft:'20px'}}> 
                                 <Folder file={exp}/>
                             </div>
                })
            }
    </div>
  )
}

export default Folder