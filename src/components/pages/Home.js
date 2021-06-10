import React from 'react';
import '../../App.css';
import './Home.css';
import { Link } from 'react-router-dom';
import { ReactComponent as Alerte } from '../../images/image_alerte.svg';
import actualite from '../../images/actualite.jpg'
import peche from '../../images/pirogues-de-peche-senegal.jpg'
import { BsStar } from "react-icons/bs";
import { API_BASE_URL } from './config'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Navb from '../Nav';
import Footer from '../Footer';
import Divider from '@material-ui/core/Divider';


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


export default class Home extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      offresEnCours: [],
      offresExpire:[],
      offres:[],
      offresFiltre:[],
      isLoading: null,
      dateDelai: new Date(),
      windowWidth: window.innerWidth,
    }
  }



// How long you want the animation to take, in ms
 animationDuration = 2000;
// Calculate how long each ‘frame’ should last if we want to update the animation 60 times per second
 frameDuration = 1000 / 60;
// Use that to calculate how many frames we need to complete the animation
 totalFrames = Math.round( this.animationDuration / this.frameDuration );
// An ease-out function that slows the count as it progresses
 easeOutQuad = t => t * ( 2 - t );

// The animation function, which takes an Element
  animateCountUp = el => {
	let frame = 0;
	const countTo = parseInt( el.innerHTML, 10 );
	// Start the animation running 60 times per second
	const counter = setInterval( () => {
		frame++;
		// Calculate our progress as a value between 0 and 1
		// Pass that value to our easing function to get our
		// progress on a curve
		const progress = this.easeOutQuad( frame / this.totalFrames );
		// Use the progress value to calculate the current count
		const currentCount = Math.round( countTo * progress );

		// If the current count has changed, update the element
		if ( parseInt( el.innerHTML, 10 ) !== currentCount ) {
			el.innerHTML = currentCount;
		}

		// If we’ve reached our last frame, stop the animation
		if ( frame === this.totalFrames ) {
			clearInterval( counter );
		}
	}, this.frameDuration );
};

// Run the animation on all elements with a class of ‘countup’
 runAnimations = () => {
	const countupEls = document.querySelectorAll( '.val' );
	countupEls.forEach( this.animateCountUp );
};
















  componentDidMount() {
    window.addEventListener("resize", this.handleResize);
    this.getOffres();
  }
  
   // eslint-disable-next-line react/no-typos
   componentWillUnMount() {
    window.addEventListener("resize", this.handleResize);
   } 

    handleResize = (e) => {
    this.setState({ windowWidth: window.innerWidth });
   };

  getOffres = async () =>{
    try {
      this.setState({ isLoading: true });
    
      const res= await fetch(API_BASE_URL+"appel_offres",
        {
          headers: {
              Accept: 'Application/json',
          }});
      const data1 = await res.json();

      
      this.setState({ offres:data1.map(x => ({...x,delai:0,}) ), isLoading: false});
      this.runAnimations();
    }catch (err) {
          this.setState({ isLoading: false });
          console.error(err);
    }  
    const enCours=this.state.offres.filter(offre=>this.state.dateDelai.getTime()<new Date(offre.limite).getTime())
    const expire=this.state.offres.filter(offre=>this.state.dateDelai.getTime()>=new Date(offre.limite).getTime())

    this.setState({offresEnCours:enCours.map(offre=> ({...offre,statut:'en cours'}))})
    this.setState(prevState => ({
      offresEnCours: prevState.offresEnCours.map((offre) =>({...offre, delai:Math.abs((this.state.dateDelai - new Date(offre.limite))/(1000*60*60*24))} ))
    }))
    this.setState(prevState => ({
      offresEnCours: prevState.offresEnCours.map((offre) =>({...offre, delai:(Math.round(offre.delai * 1 ) / 1)+1}))
    }))
    
    this.setState({offresExpire:expire.map(offre=> ({...offre,statut:'expire'}))})
    this.setState({offres:this.state.offresEnCours.concat(this.state.offresExpire)})
    this.setState({offresFiltre:this.state.offres})
    console.log(this.state.offres)

  }

  render() {  

    //var date1 = new Date(offre.limite.slice(0, 10));
    var date2 = new Date();


    // To calculate the no. of days between two dates
      const home=(
      <>
      
      <div className='background'>
      <center><h1 className="titre_page" style={{color:"#1E88E5"}}>
          PORTAIL DES MARCHÉS PUBLICS DU SÉNÉGAL
          </h1></center>

          <center><h4 className="titre_page" style={{color:"black"}}>
          La plateforme commune d'échange entre les acheteurs et les fournissuers
          </h4></center>

      </div>

      <div className='chiffres'>


       <div className="passation">

        <p className="titre_number"><span className="val">0</span> PLANS DE PASSATION</p>

       </div>

       <div className="avisg">

       <p className="titre_number"><span className="val">0</span> AVIS GÉNÉRAUX</p>

        </div>


        <Link to='/appels-doffres'><div className="concurrence">

        <p className="titre_number"><span className="val">{this.state.offres.length}</span> AVIS D'APPEL À CONCURRENCE</p>

        </div></Link>


        <div className="pv">

        <p className="titre_number"><span className="val">0</span> PV D'ATTRIBUTION PROVISOIRE</p>

        </div>

      </div>

      <center><div className="dernieres_offres" style={{height: this.state.windowWidth<=900 ? 1950:this.state.windowWidth<=1350?1300 : 650}}>
      <div className="dernieres_offres_div"></div>
       <CRow>
       {this.state.loading}
      {this.state.offres.slice(0,3).map((offre,i) =>
           <CCol xs={this.state.windowWidth<=900?"12":this.state.windowWidth<=1350 ? "6":"4"}>
         <div className="single_card_offre" style={{width: this.state.windowWidth<=900 ? this.state.windowWidth:400}}>
           <div className="card_title_div">
             <div className="card_title_ref">
               <div className="ref_title_txt_div">
               <h7 className="ref_title_txt">Référence</h7>
               </div>
               <div className="ref_title_txt_value_div"><p className="ref_title_txt_value">a{offre.ref}</p></div>
             </div>
             <div className="card_title_delai">
                <div className="delai_bande" style={{backgroundColor: (new Date(offre.limite.slice(0, 10)).getTime() - date2.getTime())/(1000 * 3600 * 24) <= 0 ? "#E63009" : Math.trunc((new Date(offre.limite.slice(0, 10)).getTime() - date2.getTime())/(1000 * 3600 * 24)) <= 3 ? "#E2B13C" :"#2EAB82"}}>
                  {(new Date(offre.limite.slice(0, 10)).getTime() - date2.getTime())/(1000 * 3600 * 24) > 0? <p className="delai_offre_accueil_txt">Délai <br></br>{Math.trunc((new Date(offre.limite.slice(0, 10)).getTime() - date2.getTime())/(1000 * 3600 * 24))} jours</p> :<p className="delai_offre_accueil_txt">Délai <br></br>expiré</p>}
                </div>
             </div>
           </div>

           <div className="card_details_div">
                <div className="object_title">
                    <h9 className="object_title_txt">Objet</h9>
                </div>
                <div className="object_details">
                 <p className="object_txt_details">{offre.libelle}</p>
                </div>
                <div className="object_title">
                    <h9 className="object_title_txt">Autorité contractante</h9>
                </div>
                <div className="autorite_details">
                 <p className="autorite_txt_details">{offre.autorite.libelle}</p>
                </div>
                
                <div className="btn_consulter_favoris">
                
                  <div className="btn_consulter_div">
                  <Link to="/appels-doffres"><button className="btn_consulter">VOIR PLUS</button></Link>
                  </div>
                  
                  {/* <div className="btn_favoris_accueil_div">
                    <div className="btn_favoris_accueil">
                    <BsStar className="icon_start" size="1.5em"/>
                    </div>
                  </div> */}
                </div>
           </div>
       </div>
       </CCol>

      )}

       </CRow>

      {/* <div className="flex_offres">
       {this.state.loading}
      {this.state.offres.slice(0,3).map((offre,i) =>
        <div className="liste_dernires_offres">
         <div className="single_card_offre">
           <div className="card_title_div">
             <div className="card_title_ref">
               <div className="ref_title_txt_div">
               <h6 className="ref_title_txt">Ref</h6>
               </div>
               <div className="ref_title_txt_value_div"><p className="ref_title_txt_value">{offre.ref}</p></div>
             </div>
             <div className="card_title_delai">
                <div className="delai_bande">
                  <p className="delai_offre_accueil_txt">Délai <br></br>{offre.delai+' jours'}</p>
                </div>
             </div>
           </div>
           <div className="card_details_div">
              <div className="object_title">
                  <h6 className="object_title_txt">Objet</h6>
              </div>
              <div className="object_details">
                <p className="object_txt_details">{offre.libelle}</p>
              </div>
              <div className="object_title">
                  <p className="object_title_txt">Autorité contractante</p>
              </div>
              <div className="autorite_details">
                <p className="autorite_txt_details">{offre.autorite.libelle}</p>
              </div>
              <div className="btn_consulter_favoris">
                <div className="btn_consulter_div">
                  <button className="btn_consulter">CONSULTER</button>
                </div>
                <div className="btn_favoris_accueil_div">
                  <div className="btn_favoris_accueil">
                  <BsStar className="icon_start" size="1rem"/>
                  </div>
                </div>
              </div>
           </div>
              
         </div>
       </div>
        )}
      </div> */}
      </div>
      </center>



      
      {/* <div className="alertes">
        <div className="sous-alerte">
          <Alerte className="alerte_image" />
          <div className="creer_alerte">
            <h4 className="alerte_titre">ALERTES</h4>
            <p>Créer vos alertes gratuitement pour recevoir les appels à concurrence publics qui vous intéressent.</p>
            <div className="alerte_button">
              <button className="button_alerte"> CREER UNE ALERTE</button>
            </div>
          </div>  

        </div>
      </div> */}





      {/* <div className="actualite">
        <div className="sous_actualite">
        <div className="dernieres_offres_div">
          <div className="dernieres_offres_txt_div">
            <h2 className="dernieres_offres_txt_value">Dernières actualités</h2>
          </div>
          <Link to='/appels-doffres'><div className="dernieres_offres_btn_div">
              <button className="btn_actualite">Voir toutes les actualités</button>
          </div></Link>
          </div>
          <div className="liste_dernires_actualite">
            <div className="single_card_actualite"> 
              <Card className="">
                <CardActionArea>
                <div className="actualite_image"><img src={actualite} alt="actualite" className="actu_img"/></div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h4">
                      Refonte totale du portail web des marchés publics
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h5">
                      <i className="fas fa-calendar-alt">  29 Mars 2021</i>
                    </Typography>
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button className="consulter" >
                    CONSULTER
                  </Button>
                  
                </CardActions>
              </Card>
            </div>
            <div className="single_card_actualite"> 
              <Card className="">
                <CardActionArea>
                <div className="actualite_image"><img src={peche} alt="actualite" className="actu_img2"/></div>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="h4">
                      La pêche traditionelle, quel impact sur l'économie?
                    </Typography>
                    <Typography gutterBottom variant="h6" component="h5">
                      <i className="fas fa-calendar-alt">  15 Mars 2021</i>
                    </Typography>
                   
                  </CardContent>
                </CardActionArea>
                <CardActions>
                  <Button className="consulter" >
                    CONSULTER
                  </Button>
                  
                </CardActions>
              </Card>
            </div>
          </div>
        </div>
      </div> */}

      {/* <div className="alertes">
        <div className="sous-alerte">
          <Alerte className="alerte_image" />
          <div className="creer_alerte">
            <h4 className="alerte_titre">Numéro vert</h4>
            <p>Avec le numéro vert vous avez la possibilité d'appeler gratuitement depuis un post fixe en cas de problème.</p>
          </div>  
        </div>
      </div> */}
      
      {/* <div className="gestion">
        <div className="sous-gestion">
          <div className="gestion_titre_div">
            <h2 className="gestion_titre">Outils de gestion</h2>
          </div>
          <div className="">
            <div className="outils_gestion outils_gestion1 ">
              <div className="outil_gestion">
              <Card className="gestion_card">
                <CardActions className="cardaction">
                  <div className="outil_icon"><i className="fas fa-paste fa-3x icons"></i> </div>
                  <div className="outil"><h5>COMPRENDRE LES MARCHES PUBLICS</h5></div>
                </CardActions>
              </Card>
              </div>
              
              <div className="outil_gestion">
              <Card className="gestion_card">
                <CardActions className="cardaction">
                  <i className="fas fa-tasks fa-3x icons" ></i> <br></br>
                  <div className="outil"><h5>LISTE DES DAO TYPES</h5></div>
                </CardActions>
              </Card>
              </div>
              <div className="outil_gestion">
              <Card className="gestion_card">
                <CardActions className="cardaction">
                  <i className="fas fa-money-bill fa-3x icons"></i> <br></br>
                  <div className="outil"><h5>RÉFÉRENTIEL DES PRIX</h5></div>
                </CardActions>
              </Card>
              </div>
            </div>
            <div className="outils_gestion">
              <div className="outil_gestion">
              <Card className="gestion_card">
                <CardActions className="cardaction">
                  <div className="outil_icon"><i className="fas fa-chart-bar fa-3x icons"></i> </div>
                  <div className="outil"><h5>STATISQUE</h5></div>
                </CardActions>
              </Card>
              </div>
              <div className="outil_gestion">
              <Card className="gestion_card">
                <CardActions className="cardaction">
                  <i className="fas fa-user-secret fa-3x icons" ></i> <br></br>
                  <div className="outil"><h5>DÉNONCIATIONS ANONYMES</h5></div>
                </CardActions>
              </Card >
              </div>
              <div className="outil_gestion">
              <Card className="gestion_card">
                <CardActions className="cardaction">
                  <i className="fas fa-balance-scale fa-3x icons"></i> <br></br>
                  <div className="outil"><h5>CONTENTIEUX</h5></div>
                </CardActions>
              </Card>
              </div>
            </div>
          </div>
          
          
            

        </div>
      </div> */}
         
    </>
    )
    return (
      <>
      <Navb/>
      <Divider/>
        {home}
        <Footer/>
      </>
    )   
  }
}
