import React from "react";
import "../../App.css";
import "./Connection.css";
import jwt from 'jwt-decode' // import dependency
import IconButton from '@material-ui/core/IconButton';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import Snackbar from '@material-ui/core/Snackbar';
import {Col, Form,Button} from 'react-bootstrap'
import {Role} from '../Functions/getRole'

export default class ConnexionDashbord extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      password: '',
      showPassword: false,
      checked:false,
      email:'',
      open: false,
      failedAuth:false,
      validated:false,
      passwordCheck:false,   
    };
     
  }

  handleEmail=(event)=>{
    this.setState({email:event.target.value});
  }

  handleClick = () => () => {
    this.setState({ open: this.state.email===''||this.state.password===''?true:false});
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  handleChecked = (event) => {
    this.setState({checked:event.target.checked});
  };

   handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
      this.setState({validated:true,passwordCheck:true});
    }
  
    if(this.state.open===true){}else{
    try {
      const data = {email: this.state.email, password: this.state.password};
      fetch('https://mpublics.herokuapp.com/api/login', {
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
        const token=jwt(data.token)
        const role= token.roles
        localStorage.setItem('token',data.token)
        localStorage.setItem('role',role)
        
        if(role==="ROLE_ABONNE"){
          this.props.history.push('/appels-doffres');
          window.location.reload(true);
        }else{
          this.props.history.push('/dashbord');
          window.location.reload(true);
        }
        
    })
    .catch(error => {
      this.setState({failedAuth:true})
        this.setState({ errorMessage: error.toString() });
        console.error('There was an error!', error);
    });
     
    } catch (e) {
      console.log(e);
    }
  }}

  handleChange = (prop) => (event) => {
   this.setState({ password: event.target.value });
  };

  handleClickShowPassword = () => {
    this.setState({showPassword: !this.state.showPassword });
  };

  handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  render() {
    return (
      <>
        <div className="connection_body">
          <center>
            <div className="height_space_connection_page"></div>
            <div className="connection_bande">
              <div className="titre_connection_div">
                <h3 className="titre_connection_txt">AUTHENTIFICATION ESPACE ABONNÉS, ADMINISTRATEURS OU AUTORITÉ CONTRACTANTES</h3>
              </div>
              <div className="titre_sinscrire_div">
                <p className="titre_sinscrire_txt">Si vous êtes ici pour la première fois, c'est le moment de <a className="txt_sinscrire" href="inscription">s'inscrire</a></p>
              </div>
              {this.state.failedAuth?<span className="MuiFormHelperText-root helpertext">Email ou mot de passe incorrect</span>:<></>}
              <div className="height_space_connection_page2"></div>
              <div className="form_div">
              <Form noValidate validated={this.state.validated} onSubmit={this.handleSubmit}>
                  <Form.Group  as={Col} controlId="formGridEmail">
                    <Form.Label>Email</Form.Label>
                    <Form.Control type="email" value={this.state.email} required name="email" onChange={this.handleEmail} />
                    <Form.Control.Feedback type="invalid">
                      Renseignez votre email
                    </Form.Control.Feedback>
                  </Form.Group> 
                  <Form.Row>
                  <Form.Group as={Col} controlId="formGridPassword">
                      <Form.Label className="label_mdp">Mot de passe</Form.Label>
                      <OutlinedInput
                        name="password"
                        required
                        className="email"
                        id="filled-adornment-password"
                        type={this.state.showPassword ? 'text' : 'password'}
                        value={this.state.password}
                        onChange={this.handleChange('password')}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={this.handleClickShowPassword}
                              onMouseDown={this.handleMouseDownPassword}
                              edge="end"
                            >
                              {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                            </IconButton>
                          </InputAdornment>
                        }
                      />
                    {this.state.passwordCheck&&this.state.password==='' ?<div className="invalid-feedback" style={{display:"block"}}>Renseignez votre mot de passe</div>:<></>}
                    </Form.Group> 
                    </Form.Row> 
                    <Form.Row>
                      <Form.Group as={Col} id="formGridCheckbox">
                        <Form.Check className="checkbox" type="checkbox" label="Rester connecté" />
                      </Form.Group>
                      <Form.Group as={Col}>
                        <div className="forgetpassword_div">
                          <h6 className="forgetpassword_div_txt">Mot de passe oublié ?</h6>
                        </div>
                      </Form.Group>
                    </Form.Row>
                    <Button type="submit" className="btn_seconnecter" onClick={this.handleClick()}>
                      SE CONNECTER
                    </Button>
                    <Snackbar
                      className="snackbar"
                      open={this.state.open}
                      onClose={this.handleClose}
                      message="Tous les champs doivent être rempli"
                      key={'bottom'+ 'center'}
                      />
                </Form>
               </div>     
            </div>
          </center>
        </div>
      </>
    );
  }
}