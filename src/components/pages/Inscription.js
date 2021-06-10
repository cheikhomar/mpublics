import React from "react";
import "../../App.css";
import "./inscription.css";
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { API_BASE_URL } from './config'
/* import ReCAPTCHA from "react-google-recaptcha";
 */import {Col, Form,Button} from 'react-bootstrap'
import Autocomplete from '@material-ui/lab/Autocomplete';
import PasswordStrengthBar from 'react-password-strength-bar';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { Row } from "react-grid-system";
import Navb from '../Nav';

export default class Inscription extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      confirmPassword:'',
      showPassword: false,
      email:'',
      nom:'',
      prenom:'',
      type:null,
      organisation:'',
      marches:[],
      isLoading: false,
      Role:'',
      validated:false,
      passwordCheck:false,
      abonneCheck:false,
      autCheck:false,
      typeAut:[],
      users:[],
      userCheck:false,
      open:false
    };
     
  }

  componentDidMount() {
    this.getMarches();
  }

  getMarches= async () => {
      
    try {
        this.setState({ isLoading: true });
        const response = await fetch(API_BASE_URL+"type_marches",
          {
            headers: {
                Accept: 'Application/json',
            }});
            
        const data = await response.json();

        const response1 = await fetch(API_BASE_URL+"type_autorites",
          {
            headers: {
                Accept: 'Application/json',
            }});
            
        const data1 = await response1.json();

        const response2 = await fetch(API_BASE_URL+"users",
        {
          headers: {
              Accept: 'Application/json',
          }});
          
      const data2 = await response2.json();
        
        this.setState({ marches:data,isLoading: false,typeAut:data1,users:data2});
        
    } catch (err) {
        this.setState({ isLoading: false });
        console.error(err);
    }  
    

  }

  handleType=(id)=>{
    this.setState({type:id})
  }

  handleEmail= async(e)=>{
    const value = e.target.value;
    await this.setState({email: value});
    
    const user=this.state.users.filter(user=>user.email===this.state.email)
    if(user.length===0){
      await this.setState({userCheck:false})
    }else{
      await this.setState({userCheck:true})
    }  
  }

  handleNom=async (e)=>{
    const re = /^[a-zA-Z][a-zA-Z ïîéëäèç]*$/;
    const value = e.target.value;
    if(value.match(re)){
      await this.setState({[e.target.name]: value});
    }
    else{ 
      await this.setState({[e.target.name]: value.slice(0,-1)});
    }
  }

  handleInput=async (e)=>{
    const value = e.target.value;
    const re = /^[a-zA-Z][a-zA-Z0-9 ïîéëäèç]*$/;
    if(value.match(re)){
      await this.setState({[e.target.name]: value});
    }
    else{
      await this.setState({[e.target.name]: value.slice(0,-1)});
    }
    
  }

  handleRadio=async (e)=>{
    if(e.target.value==='non'){
      await this.setState({Role:"ROLE_ABONNE",abonneCheck:true,autCheck:false})
    }else{
      await this.setState({Role:"ROLE_USER",abonneCheck:false,autCheck:true})
    }
  }

  handleOpen=()=>{
    this.setState({open:!this.state.open})
  }

  handleSubmit = async (event) => {
    event.preventDefault();
   /*  const token = window.$name;
      'Authorization': 'Bearer '+token */
    const form = event.currentTarget;
    if (form.checkValidity() === false || this.state.password!==this.state.confirmPassword || this.state.userCheck===true) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({validated:true,passwordCheck:true});
    }else{
      try {
        let data={}
        if(this.state.Role==='ROLE_ABONNE'){ 
          data = { email: this.state.email,
            roles: [ this.state.Role],
            plainPassword: this.state.password,
            nom:this.state.nom,
            prenom:this.state.prenom,
            organisation:this.state.organisation}
        }else{
          data = { email: this.state.email,
            roles: [ this.state.Role],
            plainPassword: this.state.password,
            nom:this.state.nom,
            prenom:this.state.prenom,
            organisation:this.state.organisation,
            type:this.state.type}
        }
        fetch('https://mpublics.herokuapp.com/api/users', {
          method: 'POST',
          headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
              
          },
          body: JSON.stringify(data)
        }).then(async response => {
          const data = await response.json();
          if (!response.ok) {
              const error = (data && data.message) || response.status;
              return Promise.reject(error);
          }
          this.setState({open:true})
      })
      .catch(error => {
        this.setState({failedAuth:true})
          this.setState({ errorMessage: error.toString() });
          console.error('There was an error!', error);
      });
      } catch (e) {
        console.log(e);
      }

  }
   
  }

  handleConfirm=(e)=>{
    this.setState({confirmPassword:e.target.value})
  }

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  render() {
    return (
      <>
      <Navb/>
        <div className="connection_body">
          <center>
            <div className="height_space_connection_page"></div>
            <div className="connection_bande">
              <div className="titre_connection_div">
                <h3 className="titre_connection_txt">INSCRIPTION POUR ABONNÉS OU AUTORITÉS CONTRACTANTES</h3>
              </div>
             
              <div className="height_space_connection_page2"></div>
              <div className="form_inscription_div">
               <Form noValidate validated={this.state.validated} className="inscription-form" onSubmit={this.handleSubmit}>
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridNom">
                      <Form.Label>Nom</Form.Label>
                      <Form.Control type="text" value={this.state.nom} required name="nom" minLength="2" onChange={this.handleNom} />
                        <Form.Control.Feedback type="invalid">
                        Renseignez votre nom
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPrenom">
                      <Form.Label>Prénom</Form.Label>
                      <Form.Control type="text" required value={this.state.prenom} name="prenom" onChange={this.handleNom} />
                        <Form.Control.Feedback type="invalid">
                        Renseignez votre prénom
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Form.Row>
                  <Form.Group controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={this.state.email} required name="email" onChange={this.handleEmail}/>
                    <Form.Control.Feedback type="invalid">
                      Renseignez votre email
                    </Form.Control.Feedback>
                    {this.state.userCheck?<div className="invalid-feedback" style={{display:"block"}}>Cet utilisateur existe déjà</div>:<></>}
                  </Form.Group> 
                  <Form.Row>
                    <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label>Mot de passe</Form.Label>
                      <OutlinedInput
                        name="password"
                        required
                        className="password"
                        id="filled-adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleInput}
                        endAdornment={
                          <InputAdornment position="end">
                            {/* <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                              edge="end"
                            >
                              {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton> */}
                          </InputAdornment>
                        }
                      />
{/*                       <PasswordStrengthBar password={this.state.password} minLength="8" shortScoreWord='trop court'  />
 */}                     {this.state.passwordCheck&&this.state.password==='' ?<div className="invalid-feedback" style={{display:"block"}}>Renseignez votre mot de passe</div>:<></>}
                    </Form.Group>
                    <Form.Group as={Col} controlId="formGridPassword2">
                      <Form.Label>Confirmer mot de passe</Form.Label>
                      <OutlinedInput
                        name="confirmPassword"
                        required
                        className="password"
                        id="filled-adornment-password"
                        type='password'
                        value={this.state.confirmPassword}
                        onChange={this.handleInput}
                      />
                        {this.state.passwordCheck&&this.state.password!==this.state.confirmPassword ?<div className="invalid-feedback" style={{display:"block"}}>Les mots de passe ne correspondent pas</div>:
                        this.state.passwordCheck&&this.state.confirmPassword===''?<div className="invalid-feedback" style={{display:"block"}}>Ce champs est requis</div>:
                        <></>}
                    </Form.Group>
                  </Form.Row>
                  <Form.Group controlId="formGridEntite">
                    <Form.Label>Entreprise / Organisation</Form.Label>
                    <Form.Control type="text" value={this.state.organisation} name="organisation" required minLength="5" onChange={this.handleInput} />
                    <Form.Control.Feedback type="invalid">
                      {this.state.organisation.length<5&&this.state.organisation.length>0?"Trop court":'Renseignez votre entité'}
                    </Form.Control.Feedback>
                  </Form.Group>
                  <Form.Row>
                    <Form.Group className="check" as={Col}>
                      <Form.Label>
                        Voulez-vous soumettre des offres
                      </Form.Label> 
                    </Form.Group>
                    <Form.Group as={Col}>
                        <Form.Check
                          required
                          className="radiobox"
                          type="radio"
                          label="Oui"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios1"
                          value="oui"
                          onChange={this.handleRadio}
                        />
                        <Form.Check
                          required
                          className="radiobox"
                          type="radio"
                          label="Non"
                          name="formHorizontalRadios"
                          id="formHorizontalRadios2"
                          value='non'
                          onChange={this.handleRadio}
                        /> 
                        <Form.Control.Feedback type="invalid">
                          Renseignez votre choix
                        </Form.Control.Feedback>
                      </Form.Group>
                  </Form.Row>
                  {this.state.abonneCheck?
                  <Form.Group>
                  <Form.Label>Recevoir des alertes selon le type de marché</Form.Label>
                    {this.state.isLoading }
                    <Autocomplete
                    className='marches'
                      multiple
                      id="tags-outlined"
                      options={this.state.marches}
                      getOptionLabel={(option) => option.libelle}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Types de marché"
                        />
                      )}
                      onChange={(event, newValue) => {
                        console.log(newValue)
                      }}
                    />
                  </Form.Group>:<></>}
                  {this.state.autCheck?
                  <Form.Group>
                  <Form.Label>Quel est le type d'autorité de votre entité</Form.Label>
                    {this.state.isLoading }
                    <Autocomplete
                      className='marches'
                      id="tags-outlined"
                      options={this.state.typeAut}
                      getOptionLabel={(option) => option.libelle}
                      filterSelectedOptions
                      renderInput={(params) => (
                        <TextField
                          {...params}
                          variant="outlined"
                          label="Types d'autorité"
                        />
                      )}
                      onChange={(event, newValue) => {
                        try{
                          this.handleType(newValue.id)
                        }catch(error)
                        {console.log(error)} 
                      }}
                    />
                    {this.state.passwordCheck&&this.state.type===null ?<div className="invalid-feedback" style={{display:"block"}}>Sélectionner le type de votre organisation</div>:<></>}
                  </Form.Group>:<></>}
                  
                  <Form.Row>
                    <Form.Group as={Col} id="formGridCheckbox">
                        <Form.Check type="checkbox" label="J'accepte les conditions d'utilisations" required />
                    </Form.Group>
                    <Form.Group as={Col}>
                      <div className="forgetpassword_div">
                        <h6 className="forgetpassword_div_txt"><a href="connection">Se connecter ?</a></h6>
                      </div>
                    </Form.Group>
                  </Form.Row>
                   
                  <Button  type="submit" className="btn_seconnecter inscrire" onClick={this.handleUserCheck}>
                    S'INSCRIRE
                  </Button>
                </Form>
              </div>
            </div> 
            <Dialog open={this.state.open} onClose={this.handleOpen}>
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                {this.state.prenom+', merci de votre inscription'}
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                 {this.state.Role==="ROLE_ABONNE"?"Vous pourrez désormais mettre en favoris des appels d\'offres et recevoir des alertes  ":
                 "Veuillez confirmer avec le lien sur votre mail pour pouvoir continuer!  "}
                  <i className="fas fa-smile-wink fa-1x"></i>
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button autoFocus onClick={this.handleOpen} href={this.state.Role==="ROLE_ABONNE"?'/connection':''} color="primary">
                  OK
                </Button>
              </DialogActions>
            </Dialog>    
          </center>
        </div>
      </>
    );
  }
}