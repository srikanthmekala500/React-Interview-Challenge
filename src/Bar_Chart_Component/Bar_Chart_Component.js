import React, { useEffect, useState } from 'react'
import '../Bar_Chart_Component/.css'
const Bar_Chart_Component = () => {
    const [frenq,setFrenq]=useState(undefined)
    const [yaxis,setYaxis]=useState([])
    const  fetchnumber = async ()=>{
                const url = 'https://www.random.org/integers/?num=200&min=1&max=10&col=1&base=10&format=plain&rnd=new'
                const res = await fetch(url)
                let data = await res.text()
                data = data.split('\n').filter(Boolean)
                 // data.split('\n') means data conveted to "array" from 
                 //filter(Boolean) means its retun true so its remove the all emty plces in array 
                const map ={}
                data?.forEach(item => {
                        if(map[item]){
                            map[item]= map[item]+1
                        }else{
                            map[item]=1
                        }
                });
                // map forech means creat a obj with 1 is cming 24 like  
                setFrenq(map)
            }

            //preparig y axix 
            useEffect(()=>{
                if(frenq){
                    const max = Math.max(...Object.values(frenq))
                    console.log('max',max)
                    const maxval = Math.ceil(max/10)*10
                    console.log(maxval)
                    // mazx = 28
                    //maxval = 30 math.ceil work like this
                    const arr = []
                    for(let i =(maxval/10) ;i>=0 ; i--){
                        // i =(maxval/10) ;i>=0 ; i-- mean 30/10 3 next iteration 2 ,1,0
                        arr.push(i*10)
                        //3*10 =30 same like 20 ,10 0
                    }
                    setYaxis(arr)
                }
            },[frenq])

            useEffect(()=>{
                fetchnumber()
            },[])
  return (
    <div className='App'> 
        <div className='container'>
            <div className='box'>
                <div className='box-y-axis'
                    style={{ height:`${yaxis && yaxis[0]}%`}}
                >
                    {
                        yaxis?.map((val,idx)=>(
                            <div key={idx}> 
                                    <span>{val}</span>
                            </div>
                        ))
                    }
                
                    
                </div>
                {
                    frenq && Object.entries(frenq) ?.map(( [ key, val])=>(
                        <div className='box-X-axis'>
                                <div                       className='graph'
                                     style={{height:`${val} % `}}
                                     > {}
                                </div>
                                <div className='index'> 
                                {key}
                                </div>
                        </div>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Bar_Chart_Component