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
import {SiAddthis} from 'react-icons/si'
import {AiOutlinePlus} from 'react-icons/ai'

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
import Divider from '@material-ui/core/Divider';
import { CIcon } from "@coreui/icons-react";
import axios from "axios";
import { isConnected } from "../Functions/isConnected";
import Footer from '../Footer'
import Home from '../pages/Home'
 class Dashbord extends Component {
  constructor(props) {
    super(props);
    this.getBadge = this.getBadge.bind(this);
    this.getOffres = this.getOffres.bind(this);
    this.deleteOffres = this.deleteOffres.bind(this);
    this.handleModal = this.handleModal.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeLibelle = this.handleChangeLibelle.bind(this);
    this.handleChangeLieu = this.handleChangeLieu.bind(this);
    this.handleChangeSelectAutorite = this.handleChangeSelectAutorite.bind(this);
    this.getAutorite = this.getAutorite.bind(this);

    this.handleChange = this.handleChange.bind(this);
    this.getMarches = this.getMarches.bind(this);
    this.getAutorites = this.getAutorites.bind(this);
    this.reload = this.reload.bind(this);
    this.handleFile = this.handleFile.bind(this);
    this.handleUdate = this.handleUdate.bind(this);
    this.toggleDetails = this.toggleDetails.bind(this);
    this.logout = this.logout.bind(this);
    this.handleUdateMarche = this.handleUdateMarche.bind(this);
    this.getFavoris = this.getFavoris.bind(this);

    this.state = {
      details: [],
      selectedFile: null,
      large: false,
      libelle: "",
      offres: [],
      isLoading: false,
      idItem: null,
      detailsOffre: [],
      marches: [],
      autorites: [],
      marcheSelected: "",
      autoriteSelected: "",
      selectedDay: null,
      lieu: "",
      voirDetails: false,
      confirmation: false,
      autorit: [],
      favoris: [],
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
    this.getMarches();
    this.getAutorites();
    this.getAutorite();
    this.getFavoris();
  }

  async getFavoris(){
    try {
      this.setState({ isLoading: true });
      const res = await fetch("https://mpublics.herokuapp.com/api/favoris", {
        headers: {
          Accept: "Application/json",
        },
      });
      const data1 = await res.json();

      this.setState({ favoris: data1.map((x) => ({ ...x })), isLoading: false });
      console.error(this.state.favoris);
      console.error("dfdfdfddddfsdf");
    } catch (err) {
      this.setState({ isLoading: false });
      console.error(err);
    }
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

  async deleteOffres(index, idOffre) {

    try{
      const res = await fetch("https://mpublics.herokuapp.com/api/favoris?offre.id=" + idOffre, {
        method: "GET",
        headers: {
          Accept: "Application/json",
        },
      });
      const data1 = await res.json();

      this.setState({ favoris: data1.map((x) => ({ ...x })), isLoading: false });

      try {
        fetch("https://mpublics.herokuapp.com/api/favoris/" + this.state.favoris[0].id, {
          method: "DELETE",
          headers: {
            Accept: "Application/json",
          },
        }).then((response) => {
          console.log(response);
          console.log("reponse delete favoris");
          //window.location.reload(true);
         
        });
      } catch (e) {
        console.log(e);
      }
      try {
        fetch("https://mpublics.herokuapp.com/api/appel_offres/" + idOffre, {
          method: "DELETE",
          headers: {
            Accept: "Application/json",
          },
        }).then((response) => {
          console.log("appel d'offre deleted ou pas");
          console.log(response);
          window.location.reload(true);
        });
      } catch (e) {
        console.log(e);
      }
        console.log(this.state.favoris);


    }catch(err){
      console.log("faavorisDeleted error");
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

  getAutorite = async () => {
    try {
      const token= localStorage.getItem('token')
      const get=jwt(token)
      const username=get.username
      this.setState({ isLoading: true });
      const response = await fetch("https://mpublics.herokuapp.com/api/autorite_contractantes?user.email="+username, {
        headers: {
          Accept: "Application/json",
        },
      });
      const data = await response.json();
      this.setState({
        autorit: data.map((x) => ({ ...x, adminClicked: false })),
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
    fd.append('limite', this.state.selectedDay);
    fd.append('ref', 'ghfgfh');
    fd.append('ouverture', this.state.selectedDay);
    fd.append('lieu', this.state.lieu);
    fd.append('marche', this.state.marcheSelected);
    fd.append('autorite', this.state.autoriteSelected);

    this.state.detailsOffre.map((offre, index) =>
      axios
        .put("https://mpublics.herokuapp.com/api/appel_offres/" + id, {
          libelle: this.state.libelle !== "" ? this.state.libelle : offre.libelle,
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



  handleUdateMarche = (id) => {
    this.state.detailsOffre.map((offre, index) =>
      axios
        .put("https://mpublics.herokuapp.com/api/appel_offres/" + id, {
          marche: (this.state.marcheSelected!=="" || this.state.marcheSelected!==null) ? this.state.marcheSelected : offre.marche.id,
        }).then((res) => {
          this.reload();
          console.log(res);
        })
    );
  };




  render() {

    const fields = [
      "id",
      "ref",
      "libelle",
      "statut",
      "limite",
      "modifier",
      "supprimer",
      "_details",
    ];

    return (
        isConnected === true && Role!=='ROLE_ABONNE' ?
        <div>
        <NavDashbord/>
        <Divider/>
        <CCol><p></p></CCol>
          {/* <AjouterOffre/>
          <CCol><p></p></CCol> */}
          
          <CRow>
          <CCol xs="2"></CCol>
          <CCol xs="2"></CCol>
          <CCol xs="2"></CCol>
          <CCol xs="2"></CCol>
          <CCol xs="3"><div className="btn_ajout_offre" ><CRow><CCol xs="7"><h4>Ajouter un appel d'offre</h4></CCol><CCol xs="2"><Link to="/ajout-offres"><SiAddthis size="2.2em" color="#1565C0"/></Link></CCol></CRow></div></CCol>
          <CCol xs="1"></CCol>
          </CRow>

          <CRow>
          <CCol xs="2"></CCol>
          <CCol xs="2"></CCol>
          <CCol xs="2"></CCol>
          <CCol xs="2"></CCol>
          <CCol xs="2"><p></p></CCol>
          </CRow>

        <CRow>
          <CCol xs="12" lg="12">
            <CCard>
              <CCardHeader>Liste des appels d'offres</CCardHeader>
              <CCardBody>
                {this.state.isLoading === true ? (
                  <center>
                    <CSpinner color="info" />
                  </center>
                ) : (
                  <CDataTable
                    clickableRows={true}
                    sorter={true}
                    items={this.state.offres}
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
                          <td className="py-2">
                            <CButton
                              color="info"
                              variant="outline"
                              shape="square"
                              size="sm"
                              //onClick={this.handleModal}
                              onClick={() => {
                                this.getDetailsOffres(item.id);
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
                                this.getDetailsOffres(item.id);
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

                      // publication: (item, index) => {
                      //   return <td>{item.publication.slice(0, 10)}</td>;
                      // },

                      limite: (item, index) => {
                        return <td>{item.limite.slice(0, 10)}</td>;
                      },

                      statut: (item, index) => {
                        var date1 = new Date(item.limite.slice(0, 10));
                        var date2 = new Date();

                        var Difference_In_Time =
                          date1.getTime() - date2.getTime();

                        // To calculate the no. of days between two dates
                        var Difference_In_Days =
                          Difference_In_Time / (1000 * 3600 * 24);
                        return (
                          <td>
                            {/* {Difference_In_Days}  jours */}
                            <CBadge
                              color={
                                Difference_In_Days <= 0 ? "danger" : "success"
                              }
                            >
                              {Difference_In_Days <= 0 ? "Expiré" : "En cours"}
                            </CBadge>
                          </td>
                        );
                      },

                      _details: (item, index) => {
                        return (
                          <td className="py-2">
                            <CButton
                              color="primary"
                              variant="outline"
                              shape="square"
                              size="sm"
                              onClick={() => {
                                this.getDetailsOffres(item.id);
                                this.setState({
                                  voirDetails: !this.state.voirDetails,
                                });
                              }}
                            >
                              Details
                            </CButton>
                          </td>
                        );
                      },
                      // details: (item, index) => {
                      //   return (
                      //     <CCollapse show={this.state.details.includes(index)}>
                      //       <CCardBody>
                      //         <CRow>
                      //           <CCol>
                      //             <h6>
                      //               date limite: {item.limite.slice(0, 10)}
                      //             </h6>
                      //           </CCol>
  
                      //           <CCol>
                      //             <h6>
                      //               Autorite contractante:{" "}
                      //               {item.autorite.libelle}
                      //             </h6>
                      //           </CCol>

                      //           <CCol>
                      //             <h6>Type de marché: {item.marche.libelle}</h6>
                      //           </CCol>
                      //         </CRow>
                      //       </CCardBody>
                      //     </CCollapse>
                      //   );
                      // },
                    }}

                  />
                )}

                {this.state.detailsOffre.map((offre) => (
                  <CModal show={this.state.large} size="lg">
                    {/* <CModalHeader closeButton>  */}
                    <CModalHeader>
                      <CModalTitle>
                        Modification de l'appel d'offre N°{offre.id}
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CCardBody>
                        <CRow>
                          <CCol xs="12">
                            <CFormGroup>
                              <p htmlFor="name">id: {offre.id}</p>
                              <CLabel htmlFor="name">Libellé</CLabel>
                              <CInput
                                defaultValue={offre.libelle}
                                //value={this.state.libelle}
                                onChange={this.handleChangeLibelle}
                                name="libelle"
                                id="name"
                                placeholder="Entrez la description de l'offre"
                                required
                              />
                              {/* { (this.state.libelle===null || this.state.libelle==="") && this.state.submit?<p style={{color: "red"}}>Veuillez renseigné un libellé pour l'appel d'offre</p> :null} */}
                            </CFormGroup>
                          </CCol>
                        </CRow>
                        <CRow>
                          <CCol xs="12"></CCol>
                        </CRow>
                        <CRow>
                          {/* <CCol xs="6">
                            <CFormGroup>
                              <CLabel htmlFor="ccmonth">Type de marché</CLabel>
                              <CSelect
                                defaultValue={offre.marche.id}
                                //value={this.state.marcheSelected}
                                onChange={this.handleChangeSelect}
                                custom
                                name="ccmonth"
                                id="ccmonth"
                                required
                              >
                                {this.state.marches.map((marche) => (
                                  <option key={marche.id} value={marche.id}>
                                    {marche.libelle}
                                  </option>
                                ))}
                              </CSelect>
                            </CFormGroup>
                          </CCol> */}
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="ccyear">
                                Autorité contractante
                              </CLabel>

                              {Role==="ROLE_USER" ? <CSelect
                                disabled={true}
                                defaultValue={offre.autorite.id}
                                //value={this.state.autoriteSelected}
                                onChange={this.handleChangeSelectAutorite}
                                custom
                                name="ccyear"
                                id="ccyear"
                              >
                                {this.state.autorit.map((autorite) => (
                                  <option key={autorite.id} value={autorite.id}>
                                    {autorite.libelle}
                                  </option>
                                ))}
                              </CSelect> : <CSelect
                              disabled={true}
                                defaultValue={offre.autorite.id}
                                //value={this.state.autoriteSelected}
                                onChange={this.handleChangeSelectAutorite}
                                custom
                                name="ccyear"
                                id="ccyear"
                              >
                                {this.state.autorites.map((autorite) => (
                                  <option key={autorite.id} value={autorite.id}>
                                    {autorite.libelle}
                                  </option>
                                ))}
                              </CSelect>}


                              {/* { this.state.autoriteSelected==="" && this.state.submit?<p style={{color: "red"}}>Veuillez choisir l'autorité contractante</p> :null} */}
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="ccnumber">
                                Lieu d'acquisition
                              </CLabel>
                              <CInput
                                defaultValue={offre.lieu}
                                //value={this.state.lieu}
                                onChange={this.handleChangeLieu}
                                name="lieu"
                                id="ccnumber"
                                placeholder="Dakar"
                                required
                              />
                              {/* { (this.state.lieu===null || this.state.lieu==="") && this.state.submit?<p style={{color: "red"}}>Veuillez renseigné le lieu d'acquisition de l'appel d'offre</p> :null} */}
                            </CFormGroup>
                          </CCol>
                          <CCol xs="6">
                            <CRow>
                              {/* <CCol xs="6">
                                               <DatePicker
                                          value={this.state.selectedDay}
                                         onChange={this.setSelectedDay}
                                         inputPlaceholder="Date limite"
                                         shouldHighlightWeekends
                                         />
                                         </CCol> */}
                            </CRow>
                          </CCol>
                          <CCol xs="12">
                            <CFormGroup>
                              <CLabel htmlFor="ccnumber">
                                Date limite des candidatures
                              </CLabel>
                              <CInput
                                //value={this.state.selectedDay}
                                defaultValue={offre.limite}
                                onChange={this.handleChange}
                                type="date"
                                id="date-input"
                                name="datelimite"
                                placeholder="date"
                              />
                              {/* {this.state.selectedDay === null && this.state.submit? (
                                          <p style={{ color: "red" }}>
                                            Veuillez définir la date limite
                                          </p>
                                        ) : null} */}
                            </CFormGroup>
                          </CCol>
                          <CCol xs="12"></CCol>

                          {/* <CCol xs="12">
                            <CFormGroup>
                              <input
                                //defaultValue={offre.file}
                                type="file"
                                onChange={this.handleFile}
                                id="file-input"
                                name="file-input"
                              />

                              {this.state.selectedFile === null && this.state.submit? (
                                          <p style={{ color: "red" }}>
                                            Veuillez choisir un fichier
                                          </p>
                                        ) : null}
                            </CFormGroup>
                          </CCol> */}

                          <CCol xs="12">
                            <p></p>
                          </CCol>
                          {/* <CCol xs="12">
                                      { <CButton
                                        //onClick= {()=>{this.handleUpload();this.handleSubmit();}}
                                        //{this.handleUpload,this.handleSubmit} //onClick={this.handleSubmit}
                                        color="info"
                                      >
                                        Publier
                                      </CButton> }
                                    </CCol> */}
                        </CRow>
                      </CCardBody>
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        onClick={() => {
                          this.handleUdate(offre.id);
                          this.handleUdateMarche(offre.id);
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

                {this.state.detailsOffre.map((offre, index) => (
                  <CModal show={this.state.confirmation} size="lg">
                    {/* <CModalHeader closeButton>  */}
                    <CModalHeader>
                      <CModalTitle>
                        Suppression de l'appel d'offre N°{offre.id}
                      </CModalTitle>
                    </CModalHeader>
                    <CModalBody>
                      <CCardBody>
                        <p>
                          Etes-vous sûr de vouloir supprimer l'appel d'offre N°
                          {offre.id}
                        </p>
                      </CCardBody>
                    </CModalBody>
                    <CModalFooter>
                      <CButton
                        onClick={() => {
                          this.deleteOffres(index, offre.id);
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
        <CCol></CCol>
          <CCol><p></p></CCol>
          <CCol><p></p></CCol>
          <CCol><p></p></CCol>
          <CCol><p></p></CCol>
          <CCol><p></p></CCol>
          <CCol><p></p></CCol>
          <CCol><p></p></CCol>
          <CCol><p></p></CCol>
          <CCol><p></p></CCol>
          <CCol><p></p></CCol>


          <CCol><p> </p></CCol>
          <CCol><p> </p></CCol>
          <CCol><p> </p></CCol>
          <CCol><p> </p></CCol>
          <CCol><p> </p></CCol>
          <CCol><p> </p></CCol>
          <CCol><p> </p></CCol>
          <CCol><p> </p></CCol>
          <CCol><p> </p></CCol>
          <CCol><p> </p></CCol>
          <CCol><p> </p></CCol>
          <CCol><p> </p></CCol>

          </CRow>
          <Footer/>
      </div> 
: null
      
    );
  }
}

export default Dashbord;
