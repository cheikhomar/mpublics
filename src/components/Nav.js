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


function Navb() {

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
     
	const logout = ()=> {
		localStorage.clear();
	}
	
		return (
			<Navbar bg="white" expand="lg" fixed="top" style={{padding:'0'}} >
               	<Navbar.Brand href="/" className="content_logo">        <Media>
        <img
          width={170}
          height={70}
          className="mr-3"
          src="https://www.gainde2000.com/wp-content/uploads/2017/11/logo_Gainde.png"
          alt=""
        />
          </Media>
				  
				</Navbar.Brand>
				<Navbar.Toggle aria-controls="basic-navbar-nav" />
  				<Navbar.Collapse id="basic-navbar-nav">
					<Nav className="ml-auto">
						<Nav.Link href="/" className="menu-item" >ACCUEIL</Nav.Link>
						<Nav.Link href="#link" className="menu-item" >ACTUALITE</Nav.Link>
						<NavDropdown title="CONSULTATION" id='consultation' className="basic-nav-dropdown menu-item"  show={show} onMouseEnter={showDropdown} onMouseLeave={hideDropdown} >
							<NavDropdown.Item className='item' href="#action/3.1">PLAN DE PASSATION</NavDropdown.Item>
							<NavDropdown.Item className='item' href="">AVIS GÉNÉRAUX</NavDropdown.Item>
							<NavDropdown.Item className='item' href="appels-doffres">AVIS D'APPEL A CONCURRENCE</NavDropdown.Item>
							<NavDropdown.Item className='item' href="">PROCÉS VERBAL D'OUVERTURE</NavDropdown.Item>
							<NavDropdown.Item className='item' href="">AVIS D'ATTRIBUTION DÉFINITIVE</NavDropdown.Item>
							<NavDropdown.Item className='item' href="">JOURNAL DES MARCHÉS PUBLICS</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">CONTENTIEUX</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.4">LISTE ROUGE</NavDropdown.Item>
						</NavDropdown>
                        <NavDropdown title="OUTILS DE GESTION" className="basic-nav-dropdown menu-item" >
							{/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
						</NavDropdown>
                        <NavDropdown title="ORGANES" className="basic-nav-dropdown menu-item">
							{/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
						</NavDropdown>
                        <NavDropdown title="RAPPORT" className="basic-nav-dropdown menu-item">
							{/* <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
							<NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item> */}
						</NavDropdown>
						<Form inline>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						{/* {isConnected===true && Role==='ROLE_ABONNE'?<Deconnexion/>: */}
						<Boutton/>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						{isConnected && Role!=='ROLE_ABONNE'? <Link to= "/dashbord">
        <button className='btn'>DASHBORD</button>
      </Link> : null}
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						<div className="width_space"></div>
						 {/*}*/}
						<FormControl type="text" placeholder="Rechercher" className="ml-2 " hidden={state}/>
						<Button variant="search" onClick={handleState} className="ml-2 search-icon text-white "><i className='fas fa-search '></i></Button>	
					</Form>  
					</Nav>
				</Navbar.Collapse>         
			</Navbar>
		)
	}

export default Navb;