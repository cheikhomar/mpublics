// import React, { useState } from 'react';
// import { Button } from './Button';
// import { Link, useHistory } from 'react-router-dom';
// import './Navbar.css';
// import Dropdown from './Dropdown';
// import Media from "react-bootstrap/Media";

// function NavDashbord() {
//   const [click, setClick] = useState(false);
//   const [dropdown, setDropdown] = useState(false);

//   const handleClick = () => setClick(!click);
//   const closeMobileMenu = () => setClick(false);

//   let history = useHistory();

//   function registerPath() {
//     closeMobileMenu();
//     history.push("/");
//   }

//   const onMouseEnter = () => {
//     if (window.innerWidth < 960) {
//       setDropdown(false);
//     } else {
//       setDropdown(true);
//     }
//   };

// const logout = ()=>{
//   localStorage.clear();
//   window.location.reload(true);
// }

//   const onMouseLeave = () => {
//     if (window.innerWidth < 960) {
//       setDropdown(false);
//     } else {
//       setDropdown(false);
//     }
//   };

//   return (
//     <>
//       <nav className='navbar'>
        
//         <div className="navbar-logo">
//         <Media>
//         <img
//           width={64}
//           height={64}
//           className="mr-3"
//           src="https://datastandard.blob.core.windows.net/botimg/5a04c6f7b93255412c784a4e.png"
//           alt=""
//         />
//           </Media>
//           </div>
//         <div className='menu-icon' onClick={handleClick}>
//           <i className={click ? 'fas fa-times' : 'fas fa-bars'} />
//         </div>
//         <ul className={click ? 'nav-menu active' : 'nav-menu'}>
//           <li className='nav-item'>
//             <Link to='/dashbord' className='nav-links' onClick={registerPath}>
//               APPELS D'OFFRES
//             </Link>
//           </li>
//           <li className='nav-item'>
//             <Link to='/' className='nav-links' onClick={registerPath}>
//               ACCUEIL
//             </Link>
//           </li>
//         </ul>
//         {/* <Button /> */}
//         <Link to="/">
//         <button className='btn' onClick={logout}>SE DECONNECTER</button>
//         </Link>
//       </nav>
//     </>
//   );
// }

// export default NavDashbord;


import React, { useState } from 'react'
import { Navbar,Nav,NavDropdown,Form,FormControl,Button } from 'react-bootstrap'
import './Button.css'
import {Boutton} from './Button'
import './Navbar.css';
import logo from '../images/sn_l.png'
import {isConnected} from './Functions/isConnected'
import {Role} from './Functions/getRole'
//import {Deconnexion} from './Deconnexion'
import { Link } from 'react-router-dom';
import Media from "react-bootstrap/Media";



function NavDashbord(props) {
    const [state, setstate] = useState(true);

    const handleState=()=>{
        setstate(!state);
    }

    const [show, setShow] = useState(false);

    const showDropdown = ()=>{       
        setShow(true);
    }

    const hideDropdown = ()=>{
        setShow(false);
    } 
     
 const logout = ()=>{   
   localStorage.clear();
   //window.location.reload(true);
 }
	
		return (
			<Navbar bg="white" expand="lg" style={{padding:'0'}}>
               	<Navbar.Brand href="/" className="content_logo"><Media>
        <img
          width={170}
          height={70}
          className="mr-3"
          src="https://www.gainde2000.com/wp-content/uploads/2017/11/logo_Gainde.png"
          alt=""
        />
          </Media>
				   {/* <div className="logo_text">
					   <div><h6 className="portail">PORTAIL DES MARCHÉS PUBLICS</h6></div>
					   <div className="bar_couleurs">
						   <div className="vert_bar"></div>
						   <div className="jaune_bar">
							   <i className="fas fa-star etoile" ></i>
							</div>
							<div className="rouge_bar"></div>
						</div>
					   <div><h6 className="portail" style={{marginTop:"3%"}}>RÉPUBLIQUE DU SÉNÉGAL</h6></div>
					</div> */}
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
  				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link href="/dashbord" className="menu-item" >APPELS D'OFFRES</Nav.Link>
						{Role ==="ROLE_ADMIN" ? <Nav.Link href="/liste-utilisateurs" className="menu-item" >UTILISATEURS</Nav.Link> : null}
						<Form inline>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						{/* {isConnected===true && Role==='ROLE_ABONNE'?<Deconnexion/>: */}
						
						        <Link to="/">
                                   <button className='btn'>RETOUR</button>
                                </Link>

						<div className="width_space"></div>
						<div className="width_space"></div>

						 {/*}*/}
					</Form>  
					</Nav>
				</Navbar.Collapse>
			</Navbar>
		)
	}

export default NavDashbord;