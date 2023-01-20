import React, {useState , useEffect} from "react";
import axios from "axios";

 type advice = {
  slip : {
    id : number ,
    advice : string
  } 
}


const http = axios.create(
    {
        baseURL: "https://api.adviceslip.com"
    }
)

 const api = {
    getAdvice : async (): Promise<advice> => {
        let response = await http.get<advice>("/advice")
        return response.data
},
    getAdviceById : async (slip_id : number): Promise<advice> => {
        let response = await http.get<advice>(`/${slip_id}`)
        return response.data
}
}
const initialState = {
   slip : {
    id : 0 ,
    advice : ""
   } 
}

 export function AdviceGenerator(){
const [advice , setAdvice] = useState<advice>(initialState)

useEffect(

    ()=>{
     api.getAdvice().then((result)=>{
        console.log(result.slip.advice)
        setAdvice(result)
     }).catch(
         (error)=>{
             return error;
         }
     )
    },[] )
    console.log(advice);

    function changeAdvice(){
        
            api.getAdvice().then((result)=>{
               console.log(result.slip.advice)
               setAdvice(result)
            }).catch(
                (error)=>{
                    return error;
                }
            )
        
    }
    

    return(
       <>
        <h1>
           {advice.slip.advice}
        </h1>
        <h3>{advice.slip.id}</h3>
        {/* <button onClick={}></button> */}
       </>
    )
 }