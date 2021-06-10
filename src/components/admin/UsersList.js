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
 class UsersList extends Component {
  constructor(props) {
    super(props);
    this.getBadge = this.getBadge.bind(this);
    this.getOffres = this.getOffres.bind(this);
    this.deleteOffres = this.deleteOffres.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeLibelle = this.handleChangeLibelle.bind(this);
    this.handleChangeLieu = this.handleChangeLieu.bind(this);
    this.handleChangeSelectAutorite = this.handleChangeSelectAutorite.bind(
      this
    );
    this.handleChange = this.handleChange.bind(this);
    this.getMarches = this.getMarches.bind(this);
    this.getAutorites = this.getAutorites.bind(this);
    this.reload = this.reload.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleUdate = this.handleUdate.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.logout = this.logout.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.deleteUsers = this.deleteUsers.bind(this);

    this.state = {
      details: [],
      selectedFile: null,
      large: false,
      libelle: "",
      offres: [],
      users: [],
      isLoading: false,
      idItem: null,
      detailsOffre: [],
      detailsUser: [],
      marches: [],
      autorites: [],
      marcheSelected: "",
      autoriteSelected: "",
      selectedDay: null,
      lieu: "",
      voirDetails: false,
      confirmation: false,
    };
  }

  getBadge = (statut) => {
    switch (statut) {
      case "en cours":
        return "success";
      case "expire":
        return "danger";
      default:
        return "success";
    }
  };

  componentDidMount() {
    this.getOffres();
    this.getUsers();
    this.getMarches();
    this.getAutorites();
  }

  async getOffres() {
    const token= localStorage.getItem('token')
    const get=jwt(token)
    const username=get.username
    try {
      this.setState({ isLoading: true });
      const res = await fetch(Role==="ROLE_ADMIN" ? "https://mpublics.herokuapp.com/api/appel_offres" :"https://mpublics.herokuapp.com/api/appel_offres?autorite.user.email="+username, {
        headers: {
          Accept: "Application/json",
        },
      });
      const data1 = await res.json();

      this.setState({ offres: data1.map((x) => ({ ...x })), isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
      console.error(err);
    }
  }

  async getUsers() {
    // const token= localStorage.getItem('token')
    // const get=jwt(token)
    // const username=get.username
    try {
      this.setState({ isLoading: true });
      const res = await fetch("https://mpublics.herokuapp.com/api/users", {
        headers: {
          Accept: "Application/json",
        },
      });
      const data1 = await res.json();

      this.setState({ users: data1.map((x) => ({ ...x })), isLoading: false });
    } catch (err) {
      this.setState({ isLoading: false });
      console.error(err);
    }
  }
     
      //const res = await fetch("http://127.0.0.1:8000/api/appel_offres?autorite.user.email="+username, {
 
   logout (){
		localStorage.clear();
	}

  reload() {
    window.location.reload(true);
  }

  async getDetailsOffres(id) {
    this.setState({
      detailsOffre: this.state.offres.filter((offre) => offre.id === id),
    });
  }

  async getDetailsUser(id) {
    this.setState({
      detailsUser: this.state.users.filter((user) => user.id === id),
    });
  }

  async deleteOffres(index, idOffre) {
    try {
      fetch("https://mpublics.herokuapp.com/api/appel_offres/" + idOffre, {
        method: "DELETE",
        headers: {
          Accept: "Application/json",
        },
      }).then((response) => {
        console.log(response);
        window.location.reload(true);
      });
    } catch (e) {
      console.log(e);
    }
    console.log(idOffre);
  }

  async deleteUsers(index, idOffre) {
    try {
      fetch("https://mpublics.herokuapp.com/api/users/" + idOffre, {
        method: "DELETE",
        headers: {
          Accept: "Application/json",
        },
      }).then((response) => {
        console.log(response);
        window.location.reload(true);
      });
    } catch (e) {
      console.log(e);
    }
    console.log(idOffre);
  }

  handleModal() {
    this.setState({ large: !this.state.large });
  }

  handleChangeLieu(event) {
    this.setState({ lieu: event.target.value });
  }

  handleChange(e) {
    console.log(e.target.value);
    this.setState({ selectedDay: e.target.value });
  }

  handleChangeSelect = (event) => {
    console.log(event.target.value);
    this.setState({ marcheSelected: event.target.value });
  };

  handleChangeSelectAutorite = (event) => {
    console.log(event.target.value);
    this.setState({ autoriteSelected: event.target.value });
  };

  getMarches = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch("https://mpublics.herokuapp.com/api/type_marches", {
        headers: {
          Accept: "Application/json",
        },
      });

      const data = await response.json();

      this.setState({ marches: data.map((x) => ({ ...x })) });
    } catch (err) {
      this.setState({ isLoading: false });
      console.error(err);
    }
  };

  handleChangeLibelle(event) {
    this.setState({ libelle: event.target.value });
  }

  getAutorites = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch(
        "https://mpublics.herokuapp.com/api/autorite_contractantes",
        {
          headers: {
            Accept: "Application/json",
          },
        }
      );
      const data = await response.json();
      this.setState({
        autorites: data.map((x) => ({ ...x, adminClicked: false })),
        isLoading: false,
      });
    } catch (err) {
      this.setState({ isLoading: false });
      console.error(err);
    }
  };

  handleFile = (e) => {
    this.setState({ selectedFile: e.target.files[0] });
  };

  toggleDetails = (index) => {
    const position = this.state.details.indexOf(index);
    let newDetails = this.state.details.slice();
    if (position !== -1) {
      newDetails.splice(position, 1);
    } else {
      newDetails = [...this.state.details, index];
    }
    this.setState({ details: newDetails });
  };

  handleUdate = (id) => {
    const fd = new FormData();

    //fd.append('libelle',this.state.libelle !== "" ? this.state.libelle : offre.libelle);
    fd.append('nom', this.state.libelle);
    fd.append('ref', 'ghfgfh');
    fd.append('ouverture', this.state.selectedDay);
    fd.append('lieu', this.state.lieu);
    fd.append('marche', this.state.marcheSelected);
    fd.append('autorite', this.state.autoriteSelected);

    this.state.detailsOffre.map((offre, index) =>
      axios
        .put("https://mpublics.herokuapp.com/api/users/" + id, {
          libelle:this.state.libelle !== "" ? this.state.libelle : offre.libelle,
          //marche: (this.state.marcheSelected!=="" || this.state.marcheSelected!==null) ? this.state.marcheSelected.toString() : offre.marche.id,
          //autorite: (this.state.autoriteSelected!=="" || this.state.autoriteSelected!==null) ? this.state.autoriteSelected : offre.autorite.id,
          lieu: this.state.lieu !== "" ? this.state.lieu : offre.lieu,
          limite:
            this.state.selectedDay !== "" && this.state.selectedDay !== null
              ? this.state.selectedDay
              : offre.limite,
        }).then((res) => {
          this.reload();
          console.log(res);
        })
    );
  };

  render() {
    const fields = [
      "id",
      "nom",
      "prenom",
      "email",
      "roles",
      "modifier",
      "supprimer"
    ];



    return (
        isConnected ===true && Role!=='ROLE_ABONNE' ?
        <div>
        <NavDashbord/>
        <Grid container>
        <Grid item xs={12}>
        <div>
        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>Liste des utilisateurs</CCardHeader>
              <CCardBody>
                {this.state.isLoading === true ? (
                  <center>
                    <CSpinner color="info" />
                  </center>
                ) : (
                  <CDataTable
                    clickableRows={true}
                    sorter={true}
                    items={this.state.users}
                    fields={fields}
                    columnFilter={true}
                    itemsPerPage={10}
                    responsive={true}
                    tableFilter={true}
                    itemsPerPageSelect={true}
                    onRowClick={(item) => {
                      //this.deleteOffres(item.id)
                    }}
                    pagination
                    scopedSlots={{
                      modifier: (item, index) => {
                        return (

                          item.roles==="ROLE_ADMIN" ?  <td></td> : <td className="py-2">
                            <CButton
                              color="info"
                              variant="outline"
                              shape="square"
                              size="sm"
                              //onClick={this.handleModal}
                              onClick={() => {
                                this.getDetailsUser(item.id);
                                this.setState({ large: !this.state.large });
                              }}
                            >
                              Modifier
                            </CButton>
                          </td> 
                        );
                            
                      },
                      supprimer: (item, index) => {
                        return (
                          <td className="py-2">
                            <CButton
                              color="danger"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                this.getDetailsUser(item.id);
                                this.setState({
                                  confirmation: !this.state.confirmation,
                                });
                              }}
                            >
                              Supprimer
                            </CButton>
                          </td>
                        );
                      },
                    }}
                  />
                )}

                {this.state.detailsUser.map((user) => (
                  <CModal show={this.state.large} size="lg">
                    {/* <CModalHeader closeButton>  */}
                    <CModalHeader>
                      <CModalTitle>
                        Modification des informations de l'utilisateur N°{user.id}
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CCardBody>
                        
                      </CCardBody>
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        onClick={() => {
                          this.handleUdate(user.id);
                          //this.reload();
                        }}
                        color="info"
                      >
                        Enregistrer
                      </CButton>{" "}
                      <CButton color="secondary" onClick={this.reload}>
                        Retour
                      </CButton>
                    </CModalFooter>
                  </CModal>
                ))}

                {this.state.detailsOffre.map((offre) => (
                  <CModal show={this.state.voirDetails} size="lg">
                    {/* <CModalHeader closeButton>  */}
                    <CModalHeader closeButton>
                      <CModalTitle>
                        Détails de l'appel d'offre N°{offre.id}
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CCardBody>
                        <CRow>
                          <CCol>
                            <p>
                              <strong>Autorité contractante:</strong>{" "}
                              {offre.autorite.libelle}
                            </p>
                          </CCol>
                          <CCol>
                            <p>
                              <strong>Lieu d'acquisition:</strong>{" "}
                              {offre.lieu}
                            </p>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol>
                            <p>
                              <strong>Type de marché:</strong>{" "}
                              {offre.marche.libelle}
                            </p>
                          </CCol>
                          <CCol>
                            <p>
                              <strong>Date de publication:</strong>{" "}
                              {offre.publication.slice(0,10)}
                            </p>
                          </CCol>
                          {/* <CCol>
                              <p>Date limite:  {offre.limite}</p>
                            </CCol> */}
                        </CRow>
                      </CCardBody>
                    </CModalBody>
                    <CModalFooter>
                      <CButton color="secondary" onClick={this.reload}>
                        Fermer
                      </CButton>
                    </CModalFooter>
                  </CModal>
                ))}

                {this.state.detailsUser.map((user, index) => (
                  <CModal show={this.state.confirmation} size="lg">
                    {/* <CModalHeader closeButton>  */}
                    <CModalHeader>
                      <CModalTitle>
                        Suppression de l'utilisateur N°{user.id}
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CCardBody>
                        <p>
                          Etes-vous sûr de vouloir supprimer l'appel d'offre N°
                          {user.id}
                        </p>
                      </CCardBody>
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        onClick={() => {
                          this.deleteUsers(index, user.id);
                        }}
                        color="danger"
                      >
                        Supprimer
                      </CButton>{" "}
                      <CButton color="secondary" onClick={this.reload}>
                        Annuler
                      </CButton>
                    </CModalFooter>
                  </CModal>
                ))}
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
        <CRow>
        <CCol></CCol>
          </CRow>
      </div> 

        </Grid>
        <Footer/>

      </Grid> </div>: null
    );
  }
}

export default UsersList;
