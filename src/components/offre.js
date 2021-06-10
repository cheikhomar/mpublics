import React from 'react';
import { BsStar } from "react-icons/bs";
import dateFormat from 'dateformat';
import TablePagination from '@material-ui/core/TablePagination';
import { saveAs } from 'file-saver'
import { API_BASE_URL } from '../components/pages/config'
import jwt from 'jwt-decode' // import dependency
import {isConnected} from './Functions/isConnected'
import {Role} from './Functions/getRole';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
import 'jqwidgets-framework/jqwidgets/styles/jqx.base.css';
import 'jqwidgets-framework/jqwidgets/jqx-all';
// import icons

import {
  EmailShareButton,
  FacebookShareButton,
  HatenaShareButton,
  InstapaperShareButton,
  LineShareButton,
  LinkedinShareButton,
  LivejournalShareButton,
  MailruShareButton,
  OKShareButton,
  PinterestShareButton,
  PocketShareButton,
  RedditShareButton,
  TelegramShareButton,
  TumblrShareButton,
  TwitterShareButton,
  ViberShareButton,
  VKShareButton,
  WhatsappShareButton,
  WorkplaceShareButton,
  FacebookIcon,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon
} from "react-share";


export class Offre extends React.Component {

  constructor(props) {
    super(props);
    this.state={
      page:0,
      rowsPerPage:10,
      itemsPerPage:10,
      open:false,
      showSocialeButton: false,
    }
  }

  handleOpen=(i)=>{
    this.setState({open:!this.state.open})
  }
  handleShare=()=>{
    this.setState({showSocialeButton:!this.state.showSocialeButton})
  }

  handleChangePage = (event,newPage) => {
    this.setState({page:newPage});
  };

  handleChangeRowsPerPage = (event) => {
    this.setState({rowsPerPage:parseInt(event.target.value,10 )})
    this.setState({page:0});
  };


  getDownloadFile = async (id) => {
    console.log(id)
   await fetch(API_BASE_URL+"download/"+id,
    {
      headers: {
          Accept: 'Application/json',
      }})
    .then(response => response.blob()).then(blob => saveAs(blob, 'Details.pdf'))
    
  }

  favoris = async (i) =>{
    if(isConnected===true){
      const token= localStorage.getItem('token')
      const get=jwt(token)
      const username=get.username
      if(Role==='ROLE_ABONNE'){
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
          const abonne = await response1.json();
          const idAbonne = abonne.map(ab=>ab.id)

          const res = await fetch(API_BASE_URL+"favoris?abonne.id="+idAbonne+'&offre.id='+i,
          {
            headers: {
                Accept: 'Application/json',
                Authorization: 'Bearer '+token
          }});

          const fav = await res.json();
          console.log("favoris")
          console.log(fav)
          if(fav.length===0){
            var mesDonnees = new FormData();
            mesDonnees.append("offre", i);
            mesDonnees.append("abonne", idAbonne);
            await fetch(API_BASE_URL+"favoris/ajout", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Authorization': 'Bearer '+token,
            },
            body: mesDonnees
            }).then(async response => {
              const data = await response.json();
              
              if (!response.ok) {
                  const error = (data && data.message) || response.status;
                  return Promise.reject(error);
              }
              window.location.reload(false);
            })
          }else{
            await fetch(API_BASE_URL+"favoris/"+fav[0].id, {
              method: 'DELETE',
              headers: {
                  'Accept': 'application/json',
                  'Authorization': 'Bearer '+token,
              }});
            window.location.reload(false);
          }
      } catch (err) {
          this.setState({ isLoading: false });
          console.error(err);
      }
    }
    }else{
      this.setState({open:true})
    }
  }

  

  
  render() {
    const copie=this.props.offres.slice((this.state.page)*(this.state.rowsPerPage), ((this.state.page)*(this.state.rowsPerPage)+(this.state.rowsPerPage)))
    const offreCompo = (                          
      <>                                           
        {this.props.loading}
        {copie.map((offre,i) =>
          <div key={i}>
            <div className="offre_elmt" style={{marginBottom: 10}}>
              <div className="entete_offres">
                <div className="autorite_contractante">
                  <div className="autorite_contractante_div_title">
                    <h6 className="autorite_contractante_title">
                      AUTORITÉ CONTRACTANTE
                    </h6>
                  </div>
                  <div className="autorite_contractante_div_value">
                    <p className="autorite_contractante_variable">{offre.autorite.libelle}</p>
                  </div>
                </div>
                <div className="date_limite " style={{backgroundColor:offre.delai===0 ? "#E63009" : offre.delai<=3?"#E2B13C":"#2EAB82"}}>
                  <div className="autorite_contractante_div_title ">
                    <h6 className="autorite_contractante_title">
                      DATE LIMITE DE DÉPÔT
                    </h6>
                  </div>
                  <div className="autorite_contractante_div_value">
                    <p className="autorite_contractante_variable">{dateFormat(offre.limite,"dd-mm-yyyy")}</p>
                  </div>
                </div>
                <div className="delai_offre" style={{backgroundColor: offre.delai===0 ? "#AB270B" :offre.delai<=3?"#CCA341":'#26A279'}}>
                  <div className="autorite_contractante_div_title">
                    <h6 className="autorite_contractante_title">
                      DÉLAI
                    </h6>
                  </div>
                  <div className="autorite_contractante_div_value">
                    <p className="autorite_contractante_variable">{offre.delai===0?'Expiré':offre.delai===1?"1 jour" : offre.delai+" jours"}</p>
                  </div>
                </div>
              </div>
              <div className="description_offre">
                <h3 className="description_value">{offre.libelle}</h3>
              </div>
              <div className="date_ref_infos">
                <div className="date_publication_offre">
                  <h5 className="date_publi_txt">Date de publication</h5>
                </div>
                <div className="date_ouverture_offre">
                  <h5 className="date_publi_txt">Date d'ouverture</h5>
                </div>
                <div className="reference">
                  <h5 className="date_publi_txt">Ref</h5>
                </div>
              </div>
              <div className="date_ref_infos">
                <div className="date_publication_offre">
                  <p className="date_publi_txt_value">{dateFormat(offre.publication,"dd-mm-yyyy")}</p>
                </div>
                <div className="date_ouverture_offre">
                  <p className="date_publi_txt_value">{dateFormat(offre.ouverture,"dd-mm-yyyy")}</p>
                </div>
                <div className="reference">
                  <p className="date_publi_txt_value">{offre.ref}</p>
                </div>
              </div>
              <div className="height_space"></div>
              <div className="lieu_acquisition">
                <h5 className="lieu_acquisition_txt">Lieu d'acquisition du dossier</h5>
              </div>
              <div className="lieu_acquisition_value">
                <p className="date_publi_txt_value">{offre.lieu}</p>
              </div>
              <div className="favoris_download">
                <div className="favoris_div">
                  <div className={offre.favoris===true?'favoris btn_favoris':"btn_favoris"}>
                    <BsStar className="icon_start" style={{color: offre.favoris===true ? "white" :'black'}} size="1.5em" onClick={()=>{this.favoris(offre.id)}}/>
                  </div>
                </div>
                <div className="btn_download_share">
                  <div className="btn_download_div">
                    <button className="btn_download" onClick={()=>{this.getDownloadFile(offre.id)}}>
                      <i className="fas fa-download"></i>  TÉLÉCHARGER
                    </button>
                  </div>

                  <div className="btn_share_div">

                  <>

                  <FacebookShareButton windowWidth="1" url="https://orbusdigital.com/" quote={offre.libelle}>
                    <FacebookIcon size={40} iconFillColor="white" ></FacebookIcon>
                  </FacebookShareButton>


                  <TwitterShareButton url="https://orbusdigital.com/" quote={offre.libelle}>
                  <TwitterIcon size={40} iconFillColor="white" ></TwitterIcon>
                  </TwitterShareButton>

                  </>

                   {/* <button className="btn_download" onClick={this.handleShare}><i className="fas fa-share"></i>  PARTAGER</button>  */}

                  </div>
                </div>
              </div>
            </div>
            <div style={{height: '10px'}}></div>
          </div>)}
          <TablePagination
            className='pagination'
            component="div"
            count={this.props.offres.length}
            page={this.state.page}
            onChangePage={this.handleChangePage}
            rowsPerPage={this.state.rowsPerPage}
            rowsPerPageOptions={[5, 10, 25,50,100]}
            onChangeRowsPerPage={this.handleChangeRowsPerPage}
          />       
        </>       
      );
      return (
        <>
          {offreCompo}
          <Dialog open={this.state.open} onClose={this.handleOpen}>
              <DialogTitle style={{ cursor: 'move' }} id="draggable-dialog-title">
                Vous devez être connecté comme abonné pour ajouter des appels d'offres à votre liste de favoris!
              </DialogTitle>
              <DialogContent>
                <DialogContentText>
                 Voulez-vous vous connecter?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
              <Button autoFocus  href="connection" color="primary">
                  Oui
                </Button>
                <Button autoFocus onClick={this.handleOpen} color="primary">
                  Non
                </Button>
              </DialogActions>
            </Dialog>
        </>
    );
  }
}
