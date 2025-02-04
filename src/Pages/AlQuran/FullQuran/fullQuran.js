import React, { useEffect, useState } from 'react'
import { getFullQuran } from '../../../apiServices/apiServices'

const FullQuran = () => {
 
    const [FullQuranResponce, setFullQuranResponce] = useState({})

    useEffect(()=>{
        const fetchFullQuranData= async()=>{
            const responce= await getFullQuran();
            setFullQuranResponce(responce);
        }
        fetchFullQuranData();
    },[])
 
    console.log("FullQuranResponce: ",FullQuranResponce);
    


  return (
    <div>fullQuran</div>
  )
}


export default FullQuran;