import React, { useState } from 'react';
import ItemList from './Iistiem'

const TransferList = () => {
    const [listA, setListA] = useState({
        HTML: false,
        CSS: false,
        JavaScript: false,
        TypeScript: false,
    });
    const [listB, setListB] = useState({
        React: false,
        Angular: false,
        Vue: false,
        Svelte: false,
    });

    const hasNoSelectedItem = (list) => {
        for (let key in list) {
            if (list[key] === true) {
                return false;
            }
        }
        return true;
    };

    const transferCheckedItems = (from, setFrom, to, setTo) => {
        const transferFrom = { ...from };
        const transferTo = { ...to };
        for (let key in from) {
            if (from[key]) {
                transferTo[key] = from[key];
                delete transferFrom[key];
            }
        }
        setTo(transferTo);
        setFrom(transferFrom);
    };
// const Transfercheckeditem = (from,setFrom, to ,setTo)=>{
//     const transferFrom = {...from} ,transferto = {...to}
//         // const transferFrom = {...from}
//         // const transferto = {...to}
//         for( let key in transferFrom){
//             transferto[key] =transferFrom[key]
//             delete transferFrom[key]
//         }
//         setTo(transferto)
//         setFrom(transferFrom)
// }
    return (
        <div className='container'>
           
              <ItemList list={listA} setList={setListA} />    
            
            <div className='button'>
                <button
                    disabled={Object.keys(listB).length === 0}
                    onClick={() => {
                        setListA({ ...listA, ...listB });
                        setListB({});
                    }}
                >
                    {'<<'}
                </button>

                <button
                    disabled={hasNoSelectedItem(listB)}
                    onClick={() => transferCheckedItems(listB, setListB, listA, setListA)}
                >
                    {'<'}
                </button>

                <button
                    disabled={hasNoSelectedItem(listA)}
                    onClick={() => transferCheckedItems(listA, setListA, listB, setListB)}
                >
                    {'>'}
                </button>
                <button
                    disabled={Object.keys(listA).length === 0}
                    onClick={() => {
                        setListB({ ...listB, ...listA });
                        setListA({});
                    }}
                >
                    {'>>'}
                </button>
            </div>
            <ItemList list={listB} setList={setListB} />
        </div>
    );
};

export default TransferList;
