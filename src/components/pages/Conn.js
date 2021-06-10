import React, { Component } from "react";
import { AiFillDelete, AiFillEdit } from "react-icons/ai";
import { Link } from 'react-router-dom';
import NavDashbord from '../NavDashbord'
import {Role} from '../Functions/getRole'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import AjouterOffre from './AjouterOffre';
import jwt from 'jwt-decode'

import {
  CSpinner,
  CBadge,
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CDataTable,
  CRow,
  CButton,
  CCarBody,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from "@coreui/react";

import {
  CCardFooter,
  CCollapse,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
  CFade,
  CForm,
  CFormGroup,
  CFormText,
  CValidFeedback,
  CInvalidFeedback,
  CTextarea,
  CInput,
  CInputFile,
  CInputCheckbox,
  CInputRadio,
  CInputGroup,
  CInputGroupAppend,
  CInputGroupPrepend,
  CDropdown,
  CInputGroupText,
  CLabel,
  CSelect,
  CSwitch,
  CAlert,
} from "@coreui/react";

import { CIcon } from "@coreui/icons-react";
import axios from "axios";
import { isConnected } from "../Functions/isConnected";
import Footer from '../Footer'
import Home from '../pages/Home'

 class Conn extends Component {
  constructor(props) {
      super(props);
      this.state={
       email:"",
       password:""
      }
      this.handleChangeEmail= this.handleChangeEmail.bind(this);
      this.handleChangePassword = this.handleChangePassword.bind(this);
      }

  handleChangeEmail=(event)=>{
    this.setState({email:event.target.value});
  }

  handleChangePassword=(event)=>{
    this.setState({password:event.target.value});
  }
     
  render() {
    return (
        <Grid container>
        <Grid item xs={12}>
        <div>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>Connexion</CCardHeader>
              <CCardBody>
              <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="name">Email</CLabel>

                      <CInput
                        value={this.state.email}
                        onChange={this.handleChangeEmail}
                        name="email"
                        id="email"
                        placeholder="Adresse Email"
                        required
                      />

                    {/* { (this.state.email===null || this.state.email==="") && this.state.submit?<p style={{color: "red"}}>Veuillez renseigné un libellé pour l'appel d'offre</p> :null} */}
                    </CFormGroup>
                  </CCol>
                </CRow>

                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="name">Mot de passe</CLabel>

                      <CInput
                        value={this.state.password}
                        onChange={this.handleChangePassword}
                        name="email"
                        id="email"
                        placeholder="Adresse Email"
                        required
                      />

                    {/* { (this.state.email===null || this.state.email==="") && this.state.submit?<p style={{color: "red"}}>Veuillez renseigné un libellé pour l'appel d'offre</p> :null} */}
                    </CFormGroup>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </div> 

        </Grid>

      </Grid>
      
    );
  }
}

export default Conn;
