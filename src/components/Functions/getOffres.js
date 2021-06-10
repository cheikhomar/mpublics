import React from 'react'
import { API_BASE_URL } from '../pages/config'



export const getOffres =async ()=>{
  
    const res= await fetch(API_BASE_URL+"appel_offres",
    {
      headers: {
          Accept: 'Application/json'
      }});
    const dateDelai= new Date()
    const data1 = await res.json();
    data1.map(x => ({...x,delai:0}) )
    const enCours= data1.filter(offre=>dateDelai.getTime()<new Date(offre.limite).getTime())
    const expire= data1.filter(offre=>dateDelai.getTime()>=new Date(offre.limite).getTime())

    
     const offresEnCours= enCours.map((offre) =>({...offre, delai:Math.abs((this.state.dateDelai - new Date(offre.limite))/(1000*60*60*24))} ))
   
   
    offresEnCours= offresEnCours.map((offre) =>({...offre, delai:(Math.round(offre.delai * 1 ) / 1)+1}))
  
    return offresEnCours
}

