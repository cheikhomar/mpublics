import React, { Component } from "react";
import axios from "axios";
import {Role} from '../Functions/getRole'
import NavDashbord from '../NavDashbord'
import Footer from '../Footer'


import {
  CButton,
  CCard,
  CCardBody,
  CCardFooter,
  CCardHeader,
  CCol,
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
  CRow,
  CSwitch,
} from "@coreui/react";
import jwt from 'jwt-decode'
import { Link } from 'react-router-dom';

export class AjouterOffre extends Component {
  constructor(props) {
    super(props);
    this.setSelectedDay = this.setSelectedDay.bind(this);
    this.state = {
      submit: false,
      selectedFile: null,
      libelle: "",
      lieu: "",
      marches: [],
      autorites: [],
      autorit: [],
      marcheSelected: "16",
      autoriteSelected: "31",
      selectedDay: null,
      curTime: new Date().toLocaleString(),
      files: null,
      ok: false,
      redirect: false,
      random: 0,
    };
    this.handleClickRandom = this.handleClickRandom.bind(this);

    this.handleChangeLieu = this.handleChangeLieu.bind(this);
    this.handleChangeLibelle = this.handleChangeLibelle.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeSelect = this.handleChangeSelect.bind(this);
    this.handleChangeSelectAutorite = this.handleChangeSelectAutorite.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.getAutorite = this.getAutorite.bind(this);
    //this.addOffres = this.addOffres.bind(this);
  }

  handleClickRandom() {
    const min = 10000;
    const max = 99999;
    const rand = min + Math.random() * (max - min);
    this.setState({ random: this.state.random + rand });
  }

  handleChangeSelect= event =>{
    console.log(event.target.value);
    this.setState({ marcheSelected: event.target.value });
  }

  handleChangeSelectAutorite= event =>{
    console.log(event.target.value);
    this.setState({ autoriteSelected: event.target.value });
  }

  handleFile = e=> {
  this.setState({selectedFile: e.target.files[0]})
  }

   handleSubmit(){
    this.setState({submit: true});
    }

  handleUpload = async ()=> {
    const fd = new FormData();
    const token= localStorage.getItem('token')
      const get=jwt(token)
    if(this.state.selectedFile===null || this.state.libelle==="" || this.state.lieu==="" || this.state.selectedDay===""){
console.log("heyyy")
    } else{
      fd.append('file', this.state.selectedFile, this.state.selectedFile.name);
      fd.append('libelle',this.state.libelle);
      fd.append('limite', this.state.selectedDay);
      fd.append('ref', this.state.marcheSelected==="16"?'FOU_'+Math.trunc(this.state.random).toString() : this.state.marcheSelected==="17" ? 'SER_'+ Math.trunc(this.state.random).toString():this.state.marcheSelected==="18" ? 'TRA_'+ Math.trunc(this.state.random).toString() : this.state.marcheSelected==="19" ? 'PIN_'+ Math.trunc(this.state.random).toString():'DEL_'+ Math.trunc(this.state.random).toString());
      fd.append('ouverture', this.state.selectedDay);
      fd.append('lieu', this.state.lieu);
      fd.append('marche', this.state.marcheSelected);
      fd.append('autorite', Role==="ROLE_USER" ? this.state.autorit.map((x) =>x.id) : this.state.autoriteSelected);
      // axios.post('http://127.0.0.1:8000/api/appel_offres/ajout',

      //  {
        
      //   headers: {
      //     Authorization: 'Bearer ' + token //the token is a variable which holds the token
      //   },
      //   fd,
      //  },

      //  )
      // .then(res=>{
      //   console.log(res);
      //   this.setState({ok: !this.state.ok});
      //   alert("Appel d'offre ajouté avec succés");
      //   window.location.reload(true);
      // });

      await fetch('https://mpublics.herokuapp.com/api/appel_offres/ajout', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Authorization': 'Bearer '+token,
        },
        body: fd
        }).then(res=>{
             console.log(res);
             this.setState({ok: !this.state.ok});
             alert("Appel d'offre ajouté avec succés");
             window.location.reload(true);
           })
    }
  }

   handleChange(e) {
    console.log(e.target.value);
    this.setState({selectedDay: e.target.value});
  }

  // handleChangeSelectAutorite(e) {
  //   this.setState({ autoriteSelected: e.target.value });
  // }

  handleChangeLieu = event=> {
    this.setState({ lieu: event.target.value });
  }

  handleChangeLibelle = event=> {
    this.setState({ libelle: event.target.value });
  }

  componentDidMount() {
    this.getMarches();
    this.getAutorites();
    this.getAutorite();
    this.handleClickRandom();
  }

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

  getAutorites = async () => {
    try {
      this.setState({ isLoading: true });
      const response = await fetch("https://mpublics.herokuapp.com/api/autorite_contractantes", {
        headers: {
          Accept: "Application/json",
        },
      });
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

  setSelectedDay = (e) => {
    this.setState({ selectedDay: e });
  };

  render() {
    return (
      <div>
                <NavDashbord/>

        <CRow>
          <CCol xs="12">
            <CCard>
              <CCardHeader>Ajouter un appel d'offre</CCardHeader>
              <CCardBody>
                <CRow>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="name">Objet</CLabel>
                      <CInput
                        maxLength={150}
                        value={this.state.libelle}
                        onChange={this.handleChangeLibelle}
                        name="libelle"
                        id="name"
                        placeholder="Entrez la description de l'offre"
                        required
                      />
                      { (this.state.libelle===null || this.state.libelle==="") && this.state.submit?<p style={{color: "red"}}>Veuillez renseigné un libellé pour l'appel d'offre</p> :null}
                    </CFormGroup>
                  </CCol>
                </CRow>
                <CRow>
                </CRow>
                <CRow>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="ccmonth">Type de marché</CLabel>
                      <CSelect
                        value={this.state.marcheSelected}
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
                      { this.state.marcheSelected==="" && this.state.submit?<p style={{color: "red"}}>Veuillez choisir le type de marché de l'appel d'offre</p> :null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="6">
                    <CFormGroup>
                      <CLabel htmlFor="ccyear">
                          Autorité contractante
                      </CLabel>

                      {Role==='ROLE_USER' ? 
                      <CSelect
                        disabled={true}
                        value={this.state.autoriteSelected}
                        onChange={this.handleChangeSelectAutorite}
                        custom
                        name="ccyear"
                        id="ccyear"
                      >
                        {this.state.autorit.map((autorit) => (
                          <option key={autorit.id} value={autorit.id}>
                            {autorit.libelle}
                          </option>
                        ))}
                      </CSelect> : <CSelect
                        value={this.state.autoriteSelected}
                        onChange={this.handleChangeSelectAutorite}
                        custom
                        name="ccyear"
                        id="ccyear"
                      >
                        {this.state.autorites.map((autorits) => (
                          <option key={autorits.id} value={autorits.id}>
                            {autorits.libelle}
                          </option>
                        ))}
                      </CSelect>}
                      { this.state.autoriteSelected==="" && this.state.submit?<p style={{color: "red"}}>Veuillez choisir l'autorité contractante</p> :null}

                    </CFormGroup>
                  </CCol>
                  <CCol xs="12">
                    <CFormGroup>
                      <CLabel htmlFor="ccnumber">Lieu d'acquisition</CLabel>
                      <CInput
                        value={this.state.lieu}
                        onChange={this.handleChangeLieu}
                        name="lieu"
                        id="ccnumber"
                        placeholder="Dakar"
                        required
                      />
                      { (this.state.lieu===null || this.state.lieu==="") && this.state.submit?<p style={{color: "red"}}>Veuillez renseigné le lieu d'acquisition de l'appel d'offre</p> :null}
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
                        value={this.state.selectedDay}
                        onChange={this.handleChange}
                        type="date"
                        id="date-input"
                        name="datelimite"
                        placeholder="date"
                      />
                      {this.state.selectedDay === null && this.state.submit? (
                        <p style={{ color: "red" }}>
                          Veuillez définir la date limite
                        </p>
                      ) : null}
                    </CFormGroup>
                  </CCol>
                  <CCol xs="12"></CCol>

                  <CCol xs="12">
                  <CFormGroup>
                    <input
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
                  </CCol>
                  <CCol xs="12">
                    <p></p>
                  </CCol>
                  <CCol xs="12">
                    <CButton
                      onClick= {()=>{this.handleUpload(); this.handleSubmit();}}
                      //{this.handleUpload,this.handleSubmit} //onClick={this.handleSubmit}
                      color="info"
                    >
                      Publier
                    </CButton>
                  </CCol>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
          
        </CRow>
        <Footer/>
      </div>
    );
  }
}

export default AjouterOffre;
