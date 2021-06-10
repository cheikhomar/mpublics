import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';
import {isConnected} from './Functions/isConnected'
import {Role} from './Functions/getRole'

export class Boutton extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.state = {clicked: false};
  }

  handleClick() {
    this.setState({clicked: !this.state.clicked});
    if(isConnected){
      localStorage.clear();
      window.location.reload(true);
    }
  }

  render() {
    return ( 
      <Link to={isConnected ? "/" : "connection"}>
        <button className='btn' onClick={this.handleClick}>{isConnected ? "SE DECONNECTER" : "CONNEXION"}</button>
      </Link>
    );
  }
}
