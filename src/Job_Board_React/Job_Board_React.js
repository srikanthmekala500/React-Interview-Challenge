import React, { useEffect, useState } from 'react'
import '../Job_Board_React/.css'
const Job_Board_React = () => {

const [postID ,setPostID]=useState([])
const [postMetadata,setPostMetadata]=useState([])

//generic function 
  const getData =async (url)=>{
        try {
          const res = await fetch(url)
          const data = await res.json()
          return data
        } catch (error) {
          console.error(error)
        }
  }
//featch jobtile
const jobtiles = (text)=>{
      const arr = text.split(/\((YC [^)]+)\)/)
      if(arr.length>1){
        const part1 =arr[0]
        const part2 =arr[1]
        return `${part1,part2}`
      }
      return'N/A'
}
//featch jobinfo
const jobinfos = (text)=>{
  const arr = text.split(/\((YC [^)]+)\)/)
  if(arr.length > 2){
    return arr[2]
  }
   return'N/A'
}
//data  1000 = 1000 millseconds 
const getformatadata  = (unixTimestamp) =>{
      const data  = new Date(unixTimestamp * 1000)
      const month = (data.getMonth()+1).toString().padStart(2,'0')
      const day = data.getDate().toString().padStart(2,'0')
      const year = data.getFullYear()
      const formtedate = `${day}/${month}/${year}`
     
      return formtedate;
      
}
 
//fetchMetadata
const fetchMetadata =async (ids)=>{
    const apicall = ids.map((id)=>{
      const url =  `https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
      
      return getData(url)
      
    })
    const result = await Promise.all(apicall)
    if(result.length){
        const newarr = result.map((item)=>{
                const obj ={
                    jobTitile :jobtiles(item.title),
                    JobInfo :jobinfos(item.title),
                    date:getformatadata(item.time),
                    url :item.url ? item.url : 
                    `https://news.ycombinator.com/item?id=${item.id}`
                }
                return obj
        })
        let copymetadata = [...postMetadata]
        copymetadata = [...postMetadata,...newarr]
        setPostMetadata(copymetadata)
    }
  }



  const fetchData = async()=>{
      try {
        const url = 'https://hacker-news.firebaseio.com/v0/jobstories.json'
        const data = await getData(url)
        const ids = data.splice(0,9)
        setPostID(data)
        fetchMetadata(ids)
       

      } catch (error) {
        console.log(error)
      }
  }



  useEffect(()=>{
    fetchData()
  },[])
 const handlemore =()=>{
    const copyids = [...postID]
    if(copyids.length > 0){
      const ids = copyids.splice(0,6)
      fetchMetadata(ids)
      setPostID(copyids)
    }
 }

  return (
    <div className='App' >
      <h4>Job Borad</h4>
        <div className='cards'>
              {
                postMetadata.length === 0 ? <div>Loading... </div>
                :  postMetadata.map((post)=>(
                      <a className='card'
                        href={post.url}
                        target='blank'
                        >
                          <div className='company-info'>
                            {post.jobTitile}
                          </div>
                          <div className='haring-info'>
                            {post.JobInfo}
                          </div>
                          <div className='date'>
                            {post.date}
                          </div>
                      </a>
                ))
              }
              
        </div>
        <button onClick={handlemore}>Load More</button>
    </div>
  )
}

export default Job_Board_React