import React, { useEffect, useState } from 'react'
import '../SelectableGrid/.css'
const Selectable_Grid = () => {
    const [twoDmatrix,setTwoDmatrix]=useState([])//100cells
    const [start ,setStart]=useState([])
    const [end ,setEnd]=useState([])

    const prepareTwoDmatrix = ()=>{
            const matrix = []
            for(let i = 0 ; i <= 9 ;i++){ //rows
                for(let j = 0 ; j <= 9; j++){ //cols
                    const obj ={
                        pos:[i,j],//rows ,cols
                        iscolor:false
                    }
                    matrix.push(obj)
                }
            }
            setTwoDmatrix(matrix)
            console.log(twoDmatrix)
    }


    useEffect(()=>{
        prepareTwoDmatrix()
    },[])

    const handledrag =(e,pos)=>{
            setStart(pos)
    }


     const handldragover =(e,pos)=>{
        setEnd(pos)
     }

     
     const fillcolour =(startPos,endPos)=>{
            const [stratRow,startCol]=startPos
            const [endRow,endCol] =endPos
            const selectedmatrixgrid =[]
            for(let i = stratRow;i<=endRow;i++){
                for(let j = startCol;j<=endCol;j++){
                    selectedmatrixgrid.push([i,j].join(''))
                }
            }
            let copymax = [...twoDmatrix];
                copymax = copymax.map((item)=>{
                const {pos} =item
                const stringPos = pos.join('')

                if(selectedmatrixgrid.includes(stringPos)){
                    item.iscolor = true
                }
                console.log(item)
                return item

            })
            setTwoDmatrix(copymax)
        }

     useEffect(()=>{
        if (start.length > 1 && end.length > 1){
            fillcolour(start,end)
        }
     },[start,end])
    return (
    <div> 
        <div className='grid'>
            <div className='board'>
                    {
                        twoDmatrix?.map((item)=> (
                            <div 
                                className={
                                    `cell ${item.isColor && 'selected-cell'}`
                                }
                            // className={`cell${item.iscolor && 'selected-cell'}`}
                            key={item}
                                draggable
                                onDrag={(e)=>handledrag(e,item.pos)}
                                onDragOver={(e)=>handldragover(e,item.pos)}
                            >   
                                {item.pos}
                            </div>
                        ))
                    }
            </div>
        </div>
    </div>
  )
}

export default Selectable_Grid