// import React, { Component } from 'react';
// import { API_BASE_URL } from './config';
// import {isConnected} from '../Functions/isConnected';
// import {Role} from '../Functions/getRole';
// import jwt from 'jwt-decode';

// class favoris extends Component {
//     constructor(props) {
//         super(props);
      
//         this.state = {

//         }
//       }

//       isFavoris = async () =>{
//         if(isConnected===true){
//           if(Role==='ROLE_ABONNE'){
//             this.setState({ isLoading: true });
//             const token= localStorage.getItem('token')
//             const get=jwt(token)
//             const username=get.username
//             let abonne=null
//             try {
//               const response = await fetch(API_BASE_URL+"users?email="+username,
//                 {
//                   headers: {
//                       Accept: 'Application/json',
//                 }});
//               const data = await response.json();
//               const id = data.map(user=>user.id)
            
//               const response1 = await fetch(API_BASE_URL+"abonnes?user_id.id="+id[0],
//               {
//                 headers: {
//                     Accept: 'Application/json',
//               }});
//               abonne = await response1.json();
//             }
//               catch (err) {
//                 this.setState({ isLoading: false });
//                 console.error(err);
//               }
//               const idAbonne= abonne.map(ab=>ab.id)
//               const response2 = await fetch(API_BASE_URL+"favoris?abonne.id="+idAbonne,
//                 {
//                   headers: {
//                       Accept: 'Application/json',
//                   }});
//               const favoris = await response2.json();
              
//               let favorisOffres= favoris.map(x=>x.offre.id)
//               this.setState({offresFav: favoris.map(x=>x.offre.id)});
//               this.setState(prevState => ({
//                 offres: prevState.offres.map((x) => favorisOffres.includes(x.id)?{...x,favoris:true}: x)         
//               })); 
//               this.setState({ isLoading: false });
//           }
//         }
//       }

//     render() {
//         return (
//             <div>
                
//             </div>
//         );
//     }
// }

// export default favoris;
