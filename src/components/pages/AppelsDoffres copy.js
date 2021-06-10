import React from 'react'
import "./AppelsDoffres.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdAddAlert, MdFavorite } from "react-icons/md";
import { Offre } from "../offre";
import { API_BASE_URL } from './config'
import dateFormat from 'dateformat';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import jwt from 'jwt-decode';
import {isConnected} from '../Functions/isConnected';
import {Role} from '../Functions/getRole';
import Navb from '../Nav';
import Footer from '../Footer';
 
export default class Offres extends React.Component {
  
  constructor(props) {
    super(props);  
    this.state = {
    autorites:[],
    autc:[],
    copieDiretions:[],
    marches:[],
    offresEnCours: [],
    offresExpire:[],
    offres:[],
    offresFiltre:[],
    isLoading: null,
    datedebut:null,
    datefin:null,
    datelimit_debut:null,
    datelimit_fin:null,
    Recherche:'',
    statut:'',
    reloadClicked:false,
    adminClicked: false,
    typemarcheclicked: false,
    autoriteclicked: false,
    typeautoriteclicked: false,
    tousClicked: true,
    encoursClicked: false,
    expireClicked: false,
    initialStateEncours: true,
    dateDelai:new Date(),
    offresFav: [],
    btn_favoris_hovered: false,
    btn_alerte_hovered: false,
    }
  }

  handleRecherche=(e)=>{
    this.setState({Recherche: e.currentTarget.value});
  }

  mesFvoris = ()=>{
    this.setState({offres: this.state.offresFav});
    console.log("liste des offres favori");
    console.log(this.state.offresFav);
  }

  handleDatedebut= (e) =>{
    this.setState({datedebut:e})  
  }

  handleDatefin=( e) =>{
    this.setState({datefin:e})
  }

  handleDateLimiteDebut= (e) =>{
    this.setState({datelimit_debut:e})  
  }

  handleDateLimiteFin= e =>{
    this.setState({datelimit_fin:e})
  }

  getOffresDatePublication= async (e)=>{
    e.preventDefault();
    this.handlereloadClicked()
    const datedebut=dateFormat(this.state.datedebut,"yyyy-mm-dd")
    const datefin=dateFormat(this.state.datefin,"yyyy-mm-dd")

    if(this.state.statut===''){
      const offres=this.state.offresFiltre.filter(offre=>offre.publication>=datedebut&&offre.publication<=datefin)
      if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:this.state.offresFiltre})}
      
    }else{
      const offres=this.state.offresFiltre.filter(offre=>offre.publication>=datedebut&&offre.publication<=datefin && offre.statut===this.state.statut)  
      if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:this.state.offresFiltre.filter(offre=> offre.statut===this.state.statut)})}  
    }
  }

  getOffresDateLimite= async (e) =>{
    e.preventDefault();
    this.handlereloadClicked()
    const datedebut=dateFormat(this.state.datelimit_debut,"yyyy-mm-dd")
    const datefin=dateFormat(this.state.datelimit_fin,"yyyy-mm-dd")
    console.log(datedebut)
    console.log(datefin)
    if(this.state.statut===''){
      const offres=this.state.offres.filter(offre=>offre.limite>=datedebut&&offre.limite<=datefin)
      if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:this.state.offresFiltre})}
      
    }else{
      const offres=this.state.offres.filter(offre=>offre.limite>=datedebut&&offre.limite<=datefin && offre.statut===this.state.statut)  
      if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:this.state.offresFiltre.filter(offre=> offre.statut===this.state.statut)})}  
    }
  }
  
  handleClickTypeMarche=()=> {
    this.setState({ typemarcheclicked: !this.state.typemarcheclicked });
  }

  handlereloadClicked=()=> {
    this.setState({ reloadClicked: true });
  }

  handleClickAutorite=()=>{
    this.setState({ autoriteclicked: !this.state.autoriteclicked });
  }

  handleClickTypeAutorite=()=> {
    this.setState({ typeautoriteclicked: !this.state.typeautoriteclicked });
  }

  handleClickTous=()=> {
    //s'il est cliqué, on le met à [true] ..
    this.setState({ tousClicked: true });
    //et on met les autres boutons de filtres "En cours" et "Expire" à [false]
    this.setState({ encoursClicked: false });
    this.setState({ expireClicked: false });
    this.setState({ initialStateEncours: false });
  }

  handleClickExpire=()=> {
    //s'il est cliqué, on le met à [true] ..
    this.setState({ tousClicked: false });
    //et on met les autres boutons de filtres "Expire" et "Tous" à [false]
    this.setState({ encoursClicked: false });
    this.setState({ expireClicked: true });
    this.setState({ initialStateEncours: false });
   

  }
  handleClickEncours=() =>{
    this.setState({ tousClicked: false });
    this.setState({ encoursClicked: true });
    this.setState({ expireClicked: false });
    this.setState({ initialStateEncours: false });
  }

  handleClickAdminPublic= async (i) =>{
    /***  */
    this.handlereloadClicked()
    await this.setState(prevState => ({
      autorites: prevState.autorites.map((x) => (x.id === i ? {...x, adminClicked: !x.adminClicked} : x)),
      offresFiltre: prevState.offresFiltre.map((x) => (x.autorite.type_autorite.id === i? {...x, adminClicked: !x.adminClicked} : x)),
      autc: prevState.autc.map(autc=>(autc.type_autorite.id===i?{...autc, adminClicked: !autc.adminClicked} : autc))
    }));
    /**liste des offres selon les types d'autorités choisis et le statut*/
        const currentOffres=this.state.offres

    const offresTypeMarche = this.state.offresFiltre.filter(offre => offre.fournitureClicked === true);
    if(offresTypeMarche.length===0){
      if(this.state.statut===''){
        const offres=this.state.offresFiltre.filter(offre=>offre.adminClicked===true)
        if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:currentOffres})}
  
      }else{
        const offres=this.state.offresFiltre.filter(offre=>offre.adminClicked && offre.statut===this.state.statut)  
        if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:currentOffres})}  
      }
    }else{
      if(this.state.statut===''){
        const offres=this.state.offresFiltre.filter(offre=>offre.adminClicked===true && offre.fournitureClicked===true)
        if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:currentOffres})}
        
        
      }else{
        const offres=this.state.offresFiltre.filter(offre=>offre.adminClicked && offre.statut===this.state.statut && offre.fournitureClicked===true)  
        if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres: currentOffres/* this.state.offresFiltre.filter(offre=> offre.statut===this.state.statut) */})}  
      }

    }
  }

  handleClickFourniture = async (i) =>{   
    this.handlereloadClicked()   
    const currentOffres=this.state.offres
    await this.setState(prevState => ({
      offresFiltre: prevState.offresFiltre.map((x) => (x.marche.id === i? {...x, fournitureClicked: !x.fournitureClicked} : x)),
      marches: prevState.marches.map((x) => (x.id === i ? {...x, fournitureClicked: !x.fournitureClicked} : x)),
        
    })); 
    const offresTypeAutorite = this.state.offresFiltre.filter(offre => offre.adminClicked === true);
    if(offresTypeAutorite.length===0){
      if(this.state.statut===''){
        const offres=this.state.offresFiltre.filter(offre=>offre.fournitureClicked===true)
        if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:currentOffres})}
        
      }else{
        
        const offres=this.state.offresFiltre.filter(offre=>offre.fournitureClicked && offre.statut===this.state.statut)  
        if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:currentOffres})}  
      }
    }else{
      if(this.state.statut===''){
        const offres=this.state.offresFiltre.filter(offre=>offre.fournitureClicked===true && offre.adminClicked===true)
        if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:currentOffres})}
        
      }else{
        
        const offres=this.state.offresFiltre.filter(offre=>offre.fournitureClicked && offre.statut===this.state.statut && offre.adminClicked===true)  
        if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:currentOffres})}  
      }
    }
  }

  isFavoris = async () =>{
    if(isConnected===true){
      if(Role==='ROLE_ABONNE'){
        this.setState({ isLoading: true });
        const token= localStorage.getItem('token')
        const get=jwt(token)
        const username=get.username
        let abonne=null
        try {
          const response = await fetch(API_BASE_URL+"users?email="+username,
            {
              headers: {
                  Accept: 'Application/json',
            }});
          const data = await response.json();
          const id = data.map(user=>user.id)
        
          const response1 = await fetch(API_BASE_URL+"abonnes?user_id.id="+id[0],
          {
            headers: {
                Accept: 'Application/json',
          }});
          abonne = await response1.json();
        }
          catch (err) {
            this.setState({ isLoading: false });
            console.error(err);
          }
          const idAbonne= abonne.map(ab=>ab.id)
          const response2 = await fetch(API_BASE_URL+"favoris?abonne.id="+idAbonne,
            {
              headers: {
                  Accept: 'Application/json',
              }});
          const favoris = await response2.json();
          
          let favorisOffres= favoris.map(x=>x.offre.id)

          console.log(favorisOffres);

          
          this.setState(prevState => ({
            offres: this.state.offres.map((x) => favorisOffres.includes(x.id)?{...x,favoris:true}: x)         
          })); 
          this.setState({offresFav: this.state.offres.filter(x=>favorisOffres.includes(x.id))});
          console.log("liste des offres favori");
          console.log(this.state.offresFav);
          this.setState({ isLoading: false });
      }
    }
  }

  funcNull=()=>{
    return null
  }
  
  componentDidMount() {
    this.getOffres();
    this.getMarches();
    this.getAutorites();
    this.getAutoritesContractante();
    this.isFavoris();
  }

  getOffresFiltreAutorite= async (id) => {

    const currentOffres = this.state.offresFiltre.filter((offre=>offre.adminClicked===true))
    const autorite = id
    let autoriteId = autorite.map(x => { return x.id; });

    let offres = this.state.offresFiltre.filter(x => autoriteId.includes(x.autorite.id));

    if(this.state.statut===''){
      if(offres.length!==0){this.setState({offres:offres})}else{this.setState({offres:currentOffres})}
      
    }else{
      const offre=offres.filter(offre=>offre.statut===this.state.statut)  
      if(offres.length!==0){this.setState({offres:offre})}else{this.setState({offres:currentOffres.filter(offre=>offre.statut===this.state.statut)})}  
    }
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
        
        this.setState({ marches:data.map(x => ({...x,fournitureClicked:false}) )});
    } catch (err) {
        console.error(err);
    }  
    

  }

  getOffres=async()=>{
    try {
      this.setState({ isLoading: true });
    
      const res= await fetch(API_BASE_URL+"appel_offres",
        {
          headers: {
              Accept: 'Application/json',
          }});
      const data1 = await res.json();

      
    this.setState({ offres:data1.map(x => ({...x,fournitureClicked:false,adminClicked: false,delai:0,favoris:false})),  isLoading: isConnected && Role==="ROLE_ABONNE"? this.state.isLoading : false,statut:''});
    } catch (err) {
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
  }

  getOffresTous=async()=>{
    try {
      this.setState({ isLoading: true });
    
      const res= await fetch(API_BASE_URL+"appel_offres",
        {
          headers: {
              Accept: 'Application/json',
          }});
      const data1 = await res.json();

      
    this.setState({ offres:data1.map(x => ({...x,fournitureClicked:false,adminClicked: false,delai:0,favoris:false}) ), isLoading: false, statut:''});
    } catch (err) {
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
  }


  getAutorites= async () =>{
        
      try {
          this.setState({ isLoading: true });
          const response = await fetch(API_BASE_URL+"type_autorites",
            {
              headers: {
                  Accept: 'Application/json',
            }});
          const data = await response.json();
        
        this.setState({ autorites: data.map(x => ({...x, adminClicked: false}) )});
      } catch (err) {
          console.error(err);
      }
  }

  getAutoritesContractante= async () =>{
    try {
        this.setState({ isLoading: true });
        const response = await fetch(API_BASE_URL+"autorite_contractantes",
          {
            headers: {
                Accept: 'Application/json',
            }});
        const data = await response.json();
      
        this.setState({ autc: data.map(x => ({...x, adminClicked: false}) )});

    } catch (err) {
        console.error(err);
    }
  }
  

  Expire= async () =>{ 
    this.handlereloadClicked()
    /* await this.setState(prevState => ({
      autorites: prevState.autorites.map((x) => ( {...x, adminClicked: false})),
      marches: prevState.marches.map((x) => ({...x, fournitureClicked: false})),

    }));
    this.setState({offres:this.state.offresExpire,statut:"expire"}) */
    this.OffreByStatus("expire");
  }

  Recherche = async (e)=>{
    e.preventDefault()
    this.handlereloadClicked()
    this.setState(prevState => ({
      Recherche: prevState.Recherche
    }));
    const recherche=this.state.Recherche
    try {
      this.setState({ isLoading: true });
      const response = await fetch(API_BASE_URL+"appel_offres?libelle="+recherche,
        {
          headers: {
              Accept: 'Application/json',
          },
        });
      
      const data = await response.json();
      
      this.setState({ offres:data.map(x => ({...x,fournitureClicked:false,adminClicked: false,delai:0,}) ), isLoading: false,statut:''});
    } catch (err) {
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
  }

  enCours= async () =>{
    this.handlereloadClicked()
   /*  await this.setState(prevState => ({
      autorites: prevState.autorites.map((x) => ( {...x, adminClicked: false})),
      marches: prevState.marches.map((x) => ({...x, fournitureClicked: false})),

    }));    
    this.setState({offres:this.state.offresEnCours,statut:"en cours"}) */
    this.OffreByStatus("en cours");

  }

  refreshPage= async () =>{
    window.location.reload(false);
  }

  
  OffreByStatus(status) {
    const offresTypeMarche = this.state.offresFiltre.filter(offre => offre.fournitureClicked === true && offre.statut == status);
    const offresTypeAutorite = this.state.offresFiltre.filter(offre => offre.adminClicked === true && offre.statut == status);

    if (offresTypeMarche.length === 0 && offresTypeAutorite.length === 0) {
      this.setState({ offres: status==="expire"?this.state.offresExpire:this.state.offresEnCours, statut: status });
    } else {
      if (offresTypeAutorite.length === 0) {
        const res = this.state.offresFiltre.filter(x => offresTypeMarche.includes(x));
        this.setState({ offres: res, statut: status });
      } else {
        if (offresTypeMarche.length === 0) {
          const res = this.state.offresFiltre.filter(x => offresTypeAutorite.includes(x));
          this.setState({ offres: res, statut: status });
        }
        else {
          const res = this.state.offresFiltre.filter(x => offresTypeAutorite.includes(x) && offresTypeMarche.includes(x));
          this.setState({ offres: res, statut: status });
        }
      }
    }
  }

  render() {
    const inf = " <= ";
    const sup = " > ";
    var apof=0;
    var OTM=[];
    var OTML=[];
    const Tac=this.state.autc.filter(aut=>aut.adminClicked===true)
 
    return (
      <>
<Navb/>
        <div className="background_titre_page">
          <center><h1 className="titre_page">
          Avis d'appel à concurrence
          </h1></center>

          <center><h8 className="titre_page">
          Accueil {sup} appels d'offres
          </h8></center>

          <center><strong className="titre_page">
         ( {this.state.offres.length} ) résultats
          </strong></center>

        </div>
        <div className="height_space"></div>
        <center>
          {/* Le grand conteneur au centre */}
          <div className="conteneur_filtres_offres">
            {/* debut:  Le conteneur des filtres à gauche */}
            <div className="conteneur_filtres" style={{height: (this.state.typeautoriteclicked || this.state.typemarcheclicked) ? "1400px" : (!this.state.typeautoriteclicked && !this.state.typemarcheclicked) ? "950px" : "1300px"}}>
              <div className="bande_filtre">
              <div className="bande_filtre_txt">
                <h6 className="text_filtres">FILTRES</h6>
                </div>
              </div>
              <div className="bande_result">
                <h6 className="text_result">  {this.state.isLoading }
                {this.state.offres &&
                  this.state.offres.length >0 ?this.state.offres.length:"AUCUN" } RESULTATS</h6>
                  {this.state.reloadClicked?<button className="ok" onClick={this.refreshPage}>RÉINITIALISER</button>:''}
              </div>
              <div className="btn_alerte" onMouseEnter={() => this.setState({btn_alerte_hovered: true})} onMouseLeave={() => this.setState({btn_alerte_hovered: false})}>
                <div className="div_icon_alert">
                  <MdAddAlert
                    className="icon_alert"
                    size="1.5em"
                    style={{ color: this.state.btn_alerte_hovered ? "#1E88E5":"white" }}
                  />
                </div>
                <div className="div_txt_alert">
                  <h6 className="text_alerte">CRÉER UNE ALERTE</h6>
                </div>
              </div>

              <div className="height_space"></div>

              {/* Debut recherche par mot cles */}
              <div className="bande_recherche">
                <input className="champ_recherche"  type="text"  onChange={this.handleRecherche} value={this.state.Recherche} placeholder="Recherche par mots clés" />
                <input  type="submit" value="OK" onClick={this.Recherche} disabled={!this.state.Recherche} className="btn_ok" />
              </div>
              {/* Fin recherche par mot cles */}

              <div className="height_space"></div>

              {/* DEBUT filtre statut */}
              <div className="bande_status_big">
                <div className="height_space"></div>
                <h6 className="status_title">STATUT</h6>
                <div className="height_space1"></div>
                <div className="bande_status">
                  <div className="btn_status">
                    <button
                      className="btn_tous"
                      onClick={()=>{this.handleClickTous();isConnected===true && Role==="ROLE_ABONNE" ? this.isFavoris():this.funcNull();this.getOffresTous()}}
                      style={{
                        backgroundColor: this.state.tousClicked ||
                        this.state.initialStateEncours === true
                          ? "#1E88E5"
                          : "white",
                        color: this.state.tousClicked ? "white" : "black",
                      }}
                    >
                      Tous
                    </button>
                    <button
                      className="btn_encours"
                      onClick={()=>{this.handleClickEncours();this.isFavoris();this.enCours();}}
                      style={{
                        backgroundColor:
                          this.state.encoursClicked
                            ? "#1E88E5"
                            : "white",
                        color:
                          this.state.encoursClicked 
                            ? "white"
                            : "black",
                      }}
                    >
                      En cours
                    </button>
                    <button
                      className="btn_expire"
                      onClick={()=>{this.handleClickExpire();isConnected===true && Role==="ROLE_ABONNE" ? this.isFavoris():this.funcNull();this.Expire()}}
                      style={{
                        backgroundColor: this.state.expireClicked
                          ? "#1E88E5"
                          : "white",
                        color: this.state.expireClicked ? "white" : "black",
                      }}
                    >
                      Expirés
                    </button>
                  </div>
                </div>
              </div>

              {/* FIN filtre statut */}

              <div className="height_space"></div>

        {/* Debut filtre favoris si l'utilisateur est un abonné */}
              {isConnected===true && Role==="ROLE_ABONNE" ? 
              
              // <div className="btn_fav" onClick={this.mesFvoris}>
              // <div className="div_icon_alert">
              //     <MdFavorite
              //       className="icon_alert"
              //       size="1.5em"
              //       style={{ color: "white" }}
              //     />
              //   </div>
              //   <div className="div_txt_fav">
              //     <h6 className="text_fav">MES FAVORIS</h6>
              //   </div>
              // </div> 

              <div className="btn_alerte" onClick={this.mesFvoris} onMouseEnter={() => this.setState({btn_favoris_hovered: true})} onMouseLeave={() => this.setState({btn_favoris_hovered: false})}>
              <div className="div_icon_alert">
                <MdFavorite
                  className="icon_alert"
                  size="1.5em"
                  style={{ color: this.state.btn_favoris_hovered ? "#1E88E5":"white" }}
                />
              </div>
              <div className="div_txt_alert">
                <h6 className="text_alerte">APPELS D'OFFRES FAVORIS</h6>
              </div>
            </div>
              : null}

        {/* FIN filtre filtre favoris*/}

              <div className="height_space"></div>

              <div
                className="type_de_marche directions"
                
                style={{
                  backgroundColor:this.state.autoriteclicked? "#DFE3E3" : "#EEF0F0",
                }}
              >
              <div className="div_type_marche_txt">
                  <h6 className="title_typemarche direction_typemarche">DATE DE PUBLICATION</h6>
                </div>
              </div>
              <div className="date_publication">
                <div className=""><form onSubmit={ this.getOffresDatePublication }>
                  <div className="date">
                    <DatePicker
                        className="inputDate"
                        selected={ this.state.datedebut}
                        onChange={ this.handleDatedebut }
                        name="datedebut"
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        placeholderText="De"
                        
                    /></div><div className="date">
                    <DatePicker
                        className="inputDate"
                        selected={ this.state.datefin}
                        onChange={ this.handleDatefin }
                        name="datedebut"
                        dateFormat="dd/MM/yyyy"
                        maxDate={new Date()}
                        minDate={this.state.datedebut}
                        placeholderText="A"

                    />                   
                  </div>
                   <button className="btn_ok">OK</button>
                </form>
                </div>
              </div>
              
              <div className="height_space"></div>
              <div
                className="type_de_marche directions"
                
                style={{
                  backgroundColor:this.state.autoriteclicked? "#DFE3E3" : "#EEF0F0",
                }}
              >
                <div className="div_type_marche_txt">
                  <h6 className="title_typemarche direction_typemarche">DATE LIMITE DE DÉPÔT</h6>
                </div>
              </div>
              <div className="date_publication">
                <div className=""><form onSubmit={ this.getOffresDateLimite }>
                  <div className="date">
                    <DatePicker
                        className="inputDate"
                        selected={ this.state.datelimit_debut}
                        onChange={ this.handleDateLimiteDebut}
                        dateFormat="dd/MM/yyyy"
                        placeholderText="De"
                        
                        
                    /></div><div className="date">
                    <DatePicker
                        className="inputDate"
                        selected={ this.state.datelimit_fin}
                        onChange={ this.handleDateLimiteFin}
                        name="datedebut"
                        dateFormat="dd/MM/yyyy"
                        minDate={this.state.datelimit_debut}
                        placeholderText="A"

                    />                   
                  </div>
                   <button className="btn_ok">OK</button>
                </form>
                </div>
              </div>

              <div className="height_space"></div>


            {/* debut:  div filtre par type de marché */}


              <div
                className="type_de_marche"
                onClick={this.handleClickTypeMarche}
                style={{
                  backgroundColor: this.state.typemarcheclicked ? "#DFE3E3" : "#EEF0F0",
                }}
              >
                <div className="div_type_marche_txt">
                  <h6 className="title_typemarche">TYPE DE MARCHÉ</h6>
                </div>
                <div className="chevron">
                  {this.state.typemarcheclicked ? (
                    <FaChevronUp size="0.8em" className="icon_chev1" />
                  ) : (
                    <FaChevronDown className="icon_chev2" size="0.8em" />
                  )}
                </div>
              </div>
              {this.state.typemarcheclicked ? (
                <div className="type_de_marche_exp">
                {this.state.isLoading }
                {this.state.marches &&
                  this.state.marches.map(
                                    (marche,i) => 
                  <div className="checkbox_fourniture" onClick={()=>{this.handleClickFourniture(marche.id)}} style={{backgroundColor: marche.fournitureClicked?"#1E88E5":""}}>
                    <div className="div_fourniture">
                      <p className="forniture_txt" style={{color: marche.fournitureClicked?"white":"black"}}>{marche.libelle}</p>
                    </div>
                      { OTM = this.state.offres.filter((offre,i)=>this.state.statut===''?offre.marche.id===marche.id:offre.statut===this.state.statut && offre.marche.id===marche.id),
                        OTML=[]
                      }
                    <div className="div_fourniture_nbr">
                      <h5 className="forniture_nbr" style={{color: marche.fournitureClicked?"white":"#1E88E5"}}>{OTM.length}</h5>
                    </div>
                  </div>
                  )}

                </div>
              ) : (
                <></>
              )}

               {/* fin:  filtre par type de marché */}


              <div className="height_space"></div>

               
              {/* debut: filtre par type d'autorité */}
              <div
                className="type_de_marche"
                onClick={this.handleClickTypeAutorite}
                style={{
                  backgroundColor: this.state.typeautoriteclicked ? "#DFE3E3" : "#EEF0F0",
                }}
              >
                <div className="div_type_marche_txt">
                  <h6 className="title_typemarche">TYPE D'AUTORITÉ CONTRACTANTE</h6>
                </div>
                <div className="chevron">
                  {this.state.typeautoriteclicked ? (
                    <FaChevronUp size="0.8em" className="icon_chev1" />
                  ) : (
                    <FaChevronDown className="icon_chev2" size="0.8em" />
                  )}
                </div>
              </div>
              {this.state.typeautoriteclicked ? (
                <div className="type_de_marche_exp">
                  {this.state.isLoading }
                {this.state.autorites &&
                  this.state.autorites.map(
                    (autorite,i) => 
                  <div className="checkbox_fourniture" onClick={()=>{this.handleClickAdminPublic(autorite.id)/* ;this.handleClickAutorite(); */
                    }} style={{backgroundColor: autorite.adminClicked?"#1E88E5":"" }}>
                    <div className="div_fourniture">
                      <p className="forniture_txt" style={{color: autorite.adminClicked?"white":"black"}}>{autorite.libelle}</p>
                    </div>
                    
                    { apof=0,
                      autorite.autoriteContractantes.map( offre => {apof=apof+ offre.appelOffres.length }),
                      this.state.statut!==''?OTML=this.state.offres.filter(offre=>offre.statut===this.state.statut && offre.autorite.type_autorite.id===autorite.id):0,
                      /**to fix */
                      console.log('')
                    }

                    <div className="div_fourniture_nbr">
                      <h5 className="forniture_nbr" style={{color: autorite.adminClicked?"white":"#1E88E5"}}>{this.state.statut===''?apof:OTML.length}</h5>
                    </div> 
                  </div> )}
      
                </div>
              ) : (
                <></>
              )}

              {/* fin: filtre par type d'autorité */}

              <div className="height_space"></div>
              {this.state.typeautoriteclicked ? <div className="height_space"></div>: null}
              {this.state.typeautoriteclicked ? <div className="height_space"></div>: null}
              {this.state.typeautoriteclicked ? <div className="height_space"></div>: null}
              <div
                className="type_de_marche directions"
                
                style={{
                  backgroundColor:this.state.autoriteclicked? "#DFE3E3" : "#EEF0F0",
                }}
              >
                <div className="div_type_marche_txt div_direction_txt">
                  <h6 className="title_typemarche direction_typemarche">AUTORITÉ CONTRACTANTE</h6>
                </div>
              </div>
              { this.state.typeautoriteclicked? (
                <div className="direction_exp">
                  {this.state.isLoading }

                  <Autocomplete
                    className="toutes"
                    multiple
                    id="tags-outlined"
                    options={Tac}
                    getOptionLabel={(option) => option.libelle}
                    filterSelectedOptions
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="outlined"
                        label="Toutes"
                        placeholder="Rechercher"
                      />
                    )}
                    onChange={(event, newValue) => {
                      this.getOffresFiltreAutorite(newValue)
                    }}
                  />
                      
                </div>
              ) : (
                <></>
              )}

             
              <div className="height_space"></div>
              
              
             
            </div>

            {/* fin conteneur des filtres */}

            {/* Debut conteneur des offres */}
            

            <div className="conteneur_offres">
              <div className="tutorial">
                <div className="tuto_vert">
                  <div className="vert"></div>
                  <p className="delai_tuto">Délai{sup}3 jours</p>
                </div>
                <div className="tuto_jaune">
                  <div className="jaune"> </div>
                  <p className="delai_tuto">Délai{inf}3 jours</p>
                </div>
                <div className="tuto_rouge">
                  <div className="rouge"></div>
                  <p className="delai_tuto">Délai expiré</p>
                </div>
              </div>

              {this.state.isLoading ? <div className="offre_elmt_spin" style={{marginTop: 50}}> <div className="spin"></div> </div> : <Offre offres={this.state.offres} loading={this.state.isLoading} />}
            </div>
            <div style={{height: '200px'}}></div>
          </div>
        </center>
        <Footer/>
      </>
    );
  }
}
