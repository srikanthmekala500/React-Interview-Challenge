import React, { useCallback, useEffect, useRef, useState } from 'react'
import '../Infinite_Scrolling/.css'
const Infinite_Scrolling = () => {
const loadref = useRef()
const [images,setImages]=useState([])

const [page ,setPage] =useState(2)
const [loading ,setLoading]=useState(false)
//generic funation
const fetachimgeas = async(index)=>{
        try {
            const url =  `https://jsonplaceholder.typicode.com/photos?_page=${index}&_limit=9`
            const res = await fetch(url)
            const data = await res.json()
            return data
        } catch (error) {
                console.log(error)
        }
}
const featchfirstpage = async()=>{
    const data = await fetachimgeas(1)
    setImages(data)
}

const getData = useCallback( async()=>{
    if(loading)
        return <h1 style={{color:'blue'}}>loading...</h1>

    setLoading(true)
    const data = await fetachimgeas(page)
    setImages((previmages)=>[...previmages, ...data])
    //settimeout funtion for visablity prps
    setTimeout(()=>{
        setLoading(false)
    },[3000])
    setPage((prev)=> prev + 1)
},[page,loading ])



//main logic 
useEffect(()=>{
    const observer = new IntersectionObserver((entries)=>{
            const target = entries[0]
    })
    //observe is the method
    //mount stage 
    if(loadref.current){
        observer.observe(loadref.current)
        getData()
    }

    //unmount stage 
    return ()=>{
       if(loadref.current){
        observer.unobserve(loadref.current)
       }
    }

},[getData])


useEffect(()=>{
    featchfirstpage()
},[])

console.log(images)
  return (
    <div>
        {
            images?.map((image,index)=>(
                <img
                key={index}
                alt={image.title}
                    src={image.thumbnailUrl}
                /> 
            ))
        }
        <div
            ref={loadref}
        ></div>
    </div>
  )
}

export default Infinite_Scrolling