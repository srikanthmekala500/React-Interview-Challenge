import React, { useEffect, useState } from 'react'
import '../CryptoConverter/.css'
const CryptoConverter = () => {
    const arr = ['usd', 'eur', 'gbp', 'cny', 'jpy'];
    // '↑' : '↓'
    const [currency,setCurrency]=useState(0)
    const [selectedcurrency,setSelectedcurrncy] =useState("usd")
    const [convrtcurrency,setConvrtcurrency] =useState()
    const [isup ,setIsup] =useState(true)
    const [diff,setDiff]=useState(0)
    const handleonchange =(e)=>{
        const val =e.target.value;
         setCurrency(val)
    }
    const selectedcurrencyhandle =(e)=>{
        setSelectedcurrncy(e.target.value)
    }

    const fetchcurrency =async ()=>{
            try {
                const url = `https://api.frontendeval.com/fake/crypto/${selectedcurrency}`
                const result = await fetch(url)
                const data =await result.json()
                const val = data.value
                const showcrr = currency* val
                console.log(showcrr)
                setConvrtcurrency(showcrr.toFixed(2))
                //login main
                const prv = window.sessionStorage.getItem('preval')
                const dff = showcrr.toFixed(2)-prv
                setDiff(dff.toFixed(2))
                dff < 0 ? setIsup(false) :setIsup(true)
                window.sessionStorage.setItem('preval',showcrr)

            } catch (error) {
                
            }
    }
    useEffect(()=>{
       let time;
       time = setInterval(()=>{
        fetchcurrency()
       },3000)
       return ()=>{
        clearTimeout(time)
       }
    },[currency,selectedcurrency])

  return (
    <div>
         <div className='wrapper'>
                <input
                    type='number'
                    value={currency}
                    onChange={handleonchange}
                />
                <select
                    name='currency'
                    value={selectedcurrency}
                    onChange={selectedcurrencyhandle}               
                >
                        {
                            arr.map((curr)=>(
                                <option key={curr} value={curr}>{curr.toUpperCase()}</option>
                            ))
                        }
                </select> 
         </div>
         <div className='curr-info'>
                        <div> {convrtcurrency}</div>
                        <div>WUC</div>
                        <div className={ isup ? 'green':'red'}>
                            <span>
                                {isup ? '↑':'↓'}
                            </span>
                            <span>
                                {diff}
                            </span>
                        </div>
         </div>
    </div>
  )
}

export default CryptoConverter