const ItemList =({list,setList})=>{
    return(
       <div>
             {
                Object.keys(list).map((item)=>(
                    <div key={item} > 
                        <input
                            type='checkbox'
                            id={item}
                            checked = {list[item]}
                            onChange={()=>setList({...list, [item] : !list[item]})}
                        />
                        <label htmlFor={item}>{item}</label>
                    </div>
                ))
            }
       </div>
    )
}
export default ItemList