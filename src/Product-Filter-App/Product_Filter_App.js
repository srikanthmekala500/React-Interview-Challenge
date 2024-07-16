import React, { useEffect, useState } from 'react'
import { items } from './items'
import '../Product-Filter-App/.css'
const Product_Filter_App = () => {
    const filters  = ["Bags",'Watches',"Sports","Sunglasses"]
    const [filterdata,setFilterdata] =useState(items)
    const [activefilter,setActivefilter]=useState([])
    
    const handlefilterdata =(e)=>{
        const category = e.target.id
         //logic
        if(activefilter.includes(category)){//toggele fasle
            const filter = activefilter.filter((ele)=>ele !== category)
             setActivefilter(filter)
        }else{//toggele true
            setActivefilter([...activefilter,category])
         }
         console.log(activefilter)
        
    }

    const filterproduct =()=>{
        if(activefilter.length){
           const tempitems = items.filter((items)=>activefilter.includes(items.category))
           setFilterdata(tempitems)
        }else{
            setFilterdata(items)
        }
    }

    useEffect(()=>{
        filterproduct()
    },[activefilter])
  return (
    <div>
        <div className='filter'
            onClick={handlefilterdata}        
        >
                {
                    filters.map((items,idx)=>{
                            return <button 
                                className={activefilter.includes(items) ? 'selected':''}
                                key={idx}
                                id={items}
                            >
                            {items}
                            </button>
                    })
                }
        </div>
        <div className='product-list'>
                    {
                        filterdata.map((items,idx)=>{
                                return<div className='items' key={idx}> 
                                        <p>{items.name}</p>
                                        <p className='category'>{items.category}</p>
                                </div>
                        })
                    }
        </div>
    </div>
  )
}

export default Product_Filter_App