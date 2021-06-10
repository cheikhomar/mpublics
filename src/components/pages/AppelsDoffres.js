import React from "react";
import "./AppelsDoffres.css";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { MdAddAlert } from "react-icons/md";
import { Offre } from "../offre";


export default class AppelsDoffres extends React.Component {

  constructor(props) {
    super(props);
  
    //Etatb de la liste des offres
    this.state = { offres: [
      {ref: 'F_EASN_002', description: 'FOURNITURES DE BUREAU ET CONSOMMABLES INFORMATIQUES', autoriteContractante: 'Centre Hospitalier Régional El Hadji Ahmadou Sakhir NDIEGUENE de Thiès', dateLimite: '23-02-2021', datePublication: '02-02-2021', dateOuverture: '23-02-2021', statut: 'expire', typeMarche: 'fourniture', lieuAcquisition: 'Thiés'},
      {ref: 'T_ARMP_029', description: "Travaux d'aménagements accès piétons et parking IRMAP et de construction d'une bâche à eau enterrée et dispostif de raccordement au réseau d'eau potable", autoriteContractante: 'Autorité de Régulation des Marchés Publics (ARMP)', dateLimite: '12-03-2021', datePublication: '23-02-2021', dateOuverture: '12-03-2021', statut: 'encours', typeMarche: 'travaux', lieuAcquisition: 'Dakar'},
      {ref: 'T_csalyp_012', description: 'Achèvement des travaux de construction du poste de santé de Saly Niakh/Saly Bambara', autoriteContractante: 'Commune de Saly Portudal', dateLimite: '24-03-2021', datePublication: '23-02-2021', dateOuverture: '24-03-2021', statut: 'encours', typeMarche: 'travaux', lieuAcquisition: 'Mbour Saly'},
      {ref: 'T_ARTP_032', description: 'Travaux de réhabilitation et de rénovation du Centre National de Contrôle des Fréquences de Yeumbeul', autoriteContractante: 'Autorité de Régulation des Télécommunications et des Postes(ARTP)', dateLimite: '25-02-2021', datePublication: '02-02-2021', dateOuverture: '25-02-2021', statut: 'expire', typeMarche: 'travaux', lieuAcquisition: 'Dakar'},
      {ref: 'S_SS_016', description: 'Prestations de services relatifs à la mise en œuvre des mesures de sûreté à l’Aéroport international Blaise DIAGNE (AIBD) et aux aéroports régionaux de ZIguinchor et du Cap Skirring (3lots)', autoriteContractante: 'Haute Autorité des Aéroports du Sénégal (HAAS)', dateLimite: '09-03-2021', datePublication: '06-02-2021', dateOuverture: '23-02-2021', statut: 'encours', typeMarche: 'prestation', lieuAcquisition: 'Ziguinchor'},
      {ref: 'F_EASN_024', description: 'FILMS POUR REPROGRAPHES', autoriteContractante: 'Centre Hospitalier Régional El Hadji Ahmadou Sakhir NDIEGUENE de Thiès', dateLimite: '23-02-2021', datePublication: '02-02-2021', dateOuverture: '23-02-2021', statut: 'expire', typeMarche: 'fourniture', lieuAcquisition: 'Thiés'},
    ]}

    //state des filtres par type de marché
    this.state = { fournitureClicked: false}
    this.state = { serviceClicked: false}
    this.state = { prestaionClicked: false}
    this.state = { travauxClicked: false}
    this.state = { delegationClicked: false}
        //state des filtres par type d'autorité
        this.state = { adminClicked: false}
        this.state = { agenceClicked: false}
        this.state = { institutionClicked: false}
        this.state = { collectiviteClicked: false}
        this.state = { departementClicked: false}
        //initialisation des states
    this.state = { typemarcheclicked: false };
    this.state = { typeautoriteclicked: false };
    this.state = { tousClicked: false };
    this.state = { encoursClicked: false };
    this.state = { expireClicked: false };
    this.state = { initialStateEncours: true };


    // les bind pour pouvoir utiliser le this putard en appelant les fonctions
    this.handleClickTypeMarche = this.handleClickTypeMarche.bind(this);
    this.handleClickTypeAutorite = this.handleClickTypeAutorite.bind(this);
    this.handleClickTous = this.handleClickTous.bind(this);
    this.handleClickEncours = this.handleClickEncours.bind(this);
    this.handleClickExpire = this.handleClickExpire.bind(this);


    //types de marché
    this.handleClickFourniture = this.handleClickFourniture.bind(this);
    this.handleClickService = this.handleClickService.bind(this);
    this.handleClickDelegation = this.handleClickDelegation.bind(this);
    this.handleClickTravaux = this.handleClickTravaux.bind(this);
    this.handleClickPrestation = this.handleClickPrestation.bind(this);

    //types d'autorité
    this.handleClickAdminPublic = this.handleClickAdminPublic.bind(this);
    this.handleClickAgenceEtat = this.handleClickAgenceEtat.bind(this);
    this.handleClickInstitutionEtat = this.handleClickInstitutionEtat.bind(this);
    this.handleClickCollectivite = this.handleClickCollectivite.bind(this);
    this.handleClickDepartement = this.handleClickDepartement.bind(this);

  }

  // fonction pour le collapsible type de marche
  // elle permet de savoir si le collapsible doit s'etendre ou pas
  handleClickTypeMarche() {
    this.setState({ typemarcheclicked: !this.state.typemarcheclicked });
  }

  handleClickTypeAutorite() {
    this.setState({ typeautoriteclicked: !this.state.typeautoriteclicked });
  }
  //fonction permettant de savoir si le bouton de filtre "Tous" est cliqué ou pas..
  handleClickTous() {
    //s'il est cliqué, on le met à [true] ..
    this.setState({ tousClicked: true });
    //et on met les autres boutons de filtres "En cours" et "Expire" à [false]
    this.setState({ encoursClicked: false });
    this.setState({ expireClicked: false });
    this.setState({ initialStateEncours: false });
  }

  //fonction permettant de savoir si le bouton de filtre "En cours" est cliqué ou pas..
  handleClickExpire() {
    //s'il est cliqué, on le met à [true] ..
    this.setState({ tousClicked: false });
    //et on met les autres boutons de filtres "Expire" et "Tous" à [false]
    this.setState({ encoursClicked: false });
    this.setState({ expireClicked: true });
    this.setState({ initialStateEncours: false });
  }

  //meme demarche pour le bouton "Expire"
  handleClickEncours() {
    this.setState({ tousClicked: false });
    this.setState({ encoursClicked: true });
    this.setState({ expireClicked: false });
    this.setState({ initialStateEncours: false });
  }


  handleClickAdminPublic() {
    this.setState({ adminClicked: !this.state.adminClicked });
  }

  handleClickAgenceEtat() {
    this.setState({ agenceClicked: !this.state.agenceClicked });
  }

  handleClickInstitutionEtat() {
    this.setState({ institutionClicked: !this.state.institutionClicked });
  }

  handleClickCollectivite() {
    this.setState({ collectiviteClicked: !this.state.collectiviteClicked });
  }

  handleClickDepartement() {
    this.setState({ departementClicked: !this.state.departementClicked });
  }


  handleClickFourniture() {
    this.setState({ fournitureClicked: !this.state.fournitureClicked });
  }

  handleClickService() {
    this.setState({ serviceClicked: !this.state.serviceClicked });
  }

  handleClickPrestation() {
    this.setState({ prestationClicked: !this.state.prestationClicked });
  }

  handleClickTravaux() {
    this.setState({ travauxClicked: !this.state.travauxClicked });
  }

  handleClickDelegation() {
    this.setState({ delegationClicked: !this.state.delegationClicked });
  }

    
  render() {
    const inf = " <= ";
    const sup = " > ";

    this.state.offres = [
      {ref: 'F_EASN_002', description: 'FOURNITURES DE BUREAU ET CONSOMMABLES INFORMATIQUES', autoriteContractante: 'Centre Hospitalier Régional El Hadji Ahmadou Sakhir NDIEGUENE de Thiès', dateLimite: '23-02-2021', datePublication: '02-02-2021', dateOuverture: '23-02-2021', statut: 'expire', typeMarche: 'fourniture', lieuAcquisition: 'Thiés'},
      {ref: 'T_ARMP_029', description: "Travaux d'aménagements accès piétons et parking IRMAP et de construction d'une bâche à eau enterrée et dispostif de raccordement au réseau d'eau potable", autoriteContractante: 'Autorité de Régulation des Marchés Publics (ARMP)', dateLimite: '12-03-2021', datePublication: '23-02-2021', dateOuverture: '12-03-2021', statut: 'encours', typeMarche: 'travaux', lieuAcquisition: 'Dakar'},
      {ref: 'T_csalyp_012', description: 'Achèvement des travaux de construction du poste de santé de Saly Niakh/Saly Bambara', autoriteContractante: 'Commune de Saly Portudal', dateLimite: '24-03-2021', datePublication: '23-02-2021', dateOuverture: '24-03-2021', statut: 'encours', typeMarche: 'travaux', lieuAcquisition: 'Mbour Saly'},
      {ref: 'T_ARTP_032', description: 'Travaux de réhabilitation et de rénovation du Centre National de Contrôle des Fréquences de Yeumbeul', autoriteContractante: 'Autorité de Régulation des Télécommunications et des Postes(ARTP)', dateLimite: '25-02-2021', datePublication: '02-02-2021', dateOuverture: '25-02-2021', statut: 'expire', typeMarche: 'travaux', lieuAcquisition: 'Dakar'},
      {ref: 'S_SS_016', description: 'Prestations de services relatifs à la mise en œuvre des mesures de sûreté à l’Aéroport international Blaise DIAGNE (AIBD) et aux aéroports régionaux de ZIguinchor et du Cap Skirring (3lots)', autoriteContractante: 'Haute Autorité des Aéroports du Sénégal (HAAS)', dateLimite: '09-03-2021', datePublication: '06-02-2021', dateOuverture: '23-02-2021', statut: 'encours', typeMarche: 'prestation', lieuAcquisition: 'Ziguinchor'},
      {ref: 'F_EASN_024', description: 'FILMS POUR REPROGRAPHES', autoriteContractante: 'Centre Hospitalier Régional El Hadji Ahmadou Sakhir NDIEGUENE de Thiès', dateLimite: '23-02-2021', datePublication: '02-02-2021', dateOuverture: '23-02-2021', statut: 'expire', typeMarche: 'fourniture', lieuAcquisition: 'Thiés'},
    ];

    if(this.state.expireClicked){
      this.state.offres = [
        {ref: 'F_EASN_002', description: 'FOURNITURES DE BUREAU ET CONSOMMABLES INFORMATIQUES', autoriteContractante: 'Centre Hospitalier Régional El Hadji Ahmadou Sakhir NDIEGUENE de Thiès', dateLimite: '23-02-2021', datePublication: '02-02-2021', dateOuverture: '23-02-2021', statut: 'expire', typeMarche: 'fourniture', lieuAcquisition: 'Thiés'},
        {ref: 'T_ARTP_032', description: 'Travaux de réhabilitation et de rénovation du Centre National de Contrôle des Fréquences de Yeumbeul', autoriteContractante: 'Autorité de Régulation des Télécommunications et des Postes(ARTP)', dateLimite: '25-02-2021', datePublication: '02-02-2021', dateOuverture: '25-02-2021', statut: 'expire', typeMarche: 'travaux', lieuAcquisition: 'Dakar'},
        {ref: 'F_EASN_024', description: 'FILMS POUR REPROGRAPHES', autoriteContractante: 'Centre Hospitalier Régional El Hadji Ahmadou Sakhir NDIEGUENE de Thiès', dateLimite: '23-02-2021', datePublication: '02-02-2021', dateOuverture: '23-02-2021', statut: 'expire', typeMarche: 'fourniture', lieuAcquisition: 'Thiés'},
      ];
    }

    if(this.state.encoursClicked){
      this.state.offres = [
        {ref: 'T_ARMP_029', description: "Travaux d'aménagements accès piétons et parking IRMAP et de construction d'une bâche à eau enterrée et dispostif de raccordement au réseau d'eau potable", autoriteContractante: 'Autorité de Régulation des Marchés Publics (ARMP)', dateLimite: '12-03-2021', datePublication: '23-02-2021', dateOuverture: '12-03-2021', statut: 'encours', typeMarche: 'travaux', lieuAcquisition: 'Dakar'},
        {ref: 'T_csalyp_012', description: 'Achèvement des travaux de construction du poste de santé de Saly Niakh/Saly Bambara', autoriteContractante: 'Commune de Saly Portudal', dateLimite: '24-03-2021', datePublication: '23-02-2021', dateOuverture: '24-03-2021', statut: 'encours', typeMarche: 'travaux', lieuAcquisition: 'Mbour Saly'},
        {ref: 'S_SS_016', description: 'Prestations de services relatifs à la mise en œuvre des mesures de sûreté à l’Aéroport international Blaise DIAGNE (AIBD) et aux aéroports régionaux de ZIguinchor et du Cap Skirring (3lots)', autoriteContractante: 'Haute Autorité des Aéroports du Sénégal (HAAS)', dateLimite: '09-03-2021', datePublication: '06-02-2021', dateOuverture: '23-02-2021', statut: 'encours', typeMarche: 'prestation', lieuAcquisition: 'Ziguinchor'},
      ];
    }

    return (
      <>

        <div className="background_titre_page">
          <center><h1 className="titre_page">
          Avis d'appel à concurrence
          </h1></center>
        </div>
        <div className="height_space"></div>
        <center>
          {/* Le grand conteneur au centre */}
          <div className="conteneur_filtres_offres">
            {/* debut:  La conteneur des filtres à gauche */}
            <div className="conteneur_filtres" style={{height: (this.state.typeautoriteclicked || this.state.typemarcheclicked) ? "1400px" : (!this.state.typeautoriteclicked && !this.state.typemarcheclicked) ? "950px" : "1300px"}}>
              <div className="bande_filtre">
                <h8 className="text_filtres">FILTRES</h8>
              </div>
              <div className="bande_result">
                <h8 className="text_result">15 RESULTATS</h8>
              </div>

              <div className="btn_alerte" onMouseOver="">
                <div className="div_icon_alert">
                  <MdAddAlert
                    className="icon_alert"
                    size="1.5em"
                    style={{ color: "white" }}
                  />
                </div>
                <div className="div_txt_alert">
                  <h8 className="text_alerte">CRÉER UNE ALERTE</h8>
                </div>
              </div>

              <div className="height_space"></div>
              <div className="bande_recherche">
                <input
                  type="text"
                  className="champ_recherche"
                  placeholder="Recherche par mots clés"
                />
                <div className="width_space"></div>
                <button className="btn_ok">OK</button>
              </div>
              <div className="height_space"></div>

              <div className="bande_status_big">
                <div className="height_space"></div>
                <h6 className="status_title">STATUS</h6>
                <div className="height_space1"></div>
                <div className="bande_status">
                  <div className="btn_status">
                    <button
                      className="btn_tous"
                      onClick={this.handleClickTous}
                      style={{
                        backgroundColor: this.state.tousClicked
                          ? "#2EAB82"
                          : "white",
                        color: this.state.tousClicked ? "white" : "black",
                      }}
                    >
                      Tous
                    </button>
                    <button
                      className="btn_encours"
                      onClick={this.handleClickEncours}
                      style={{
                        backgroundColor:
                          this.state.encoursClicked ||
                          this.state.initialStateEncours === true
                            ? "#2EAB82"
                            : "white",
                        color:
                          this.state.encoursClicked ||
                          this.state.initialStateEncours === true
                            ? "white"
                            : "black",
                      }}
                    >
                      En cours
                    </button>
                    <button
                      className="btn_expire"
                      onClick={this.handleClickExpire}
                      style={{
                        backgroundColor: this.state.expireClicked
                          ? "#2EAB82"
                          : "white",
                        color: this.state.expireClicked ? "white" : "black",
                      }}
                    >
                      Expirés
                    </button>
                  </div>
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
                  <div className="checkbox_fourniture" onClick={this.handleClickFourniture} style={{backgroundColor: this.state.fournitureClicked?"#2EAB82":""}}>
                    <div className="div_fourniture">
                      <p className="forniture_txt" style={{color: this.state.fournitureClicked?"white":"black"}}>Fournitures</p>
                    </div>
                    <div className="div_fourniture_nbr">
                      <h5 className="forniture_nbr" style={{color: this.state.fournitureClicked?"white":"#2EAB82"}}>2</h5>
                    </div>
                  </div>
                  <div className="checkbox_service" onClick={this.handleClickService} style={{backgroundColor: this.state.serviceClicked?"#2EAB82":""}}>
                    <div className="div_service">
                      <p className="service_txt" style={{color: this.state.serviceClicked?"white":"black"}}>Services</p>
                    </div>
                    <div className="div_service_nbr">
                      <h5 className="service_nbr" style={{color: this.state.serviceClicked?"white":"#2EAB82"}}>2</h5>
                    </div>
                  </div>
                  <div className="checkbox_travaux" onClick={this.handleClickTravaux} style={{backgroundColor: this.state.travauxClicked?"#2EAB82":""}}>
                    <div className="div_travaux">
                      <p className="travaux_txt" style={{color: this.state.travauxClicked?"white":"black"}}>Travaux</p>
                    </div>
                    <div className="div_travaux_nbr">
                      <h5 className="travaux_nbr" style={{color: this.state.travauxClicked?"white":"#2EAB82"}}>2</h5>
                    </div>
                  </div>
                  <div className="checkbox_prestation" onClick={this.handleClickPrestation} style={{backgroundColor: this.state.prestationClicked?"#2EAB82":""}}>
                    <div className="div_prestation">
                      <p className="prestation_txt" style={{color: this.state.prestationClicked?"white":"black"}}>
                        Prestations intellectuelles
                      </p>
                    </div>

                    <div className="div_prestation_nbr">
                      <h5 className="prestation_nbr" style={{color: this.state.prestationClicked?"white":"#2EAB82"}}>2</h5>
                    </div>
                  </div>

                  <div className="checkbox_delegation" onClick={this.handleClickDelegation} style={{backgroundColor: this.state.delegationClicked?"#2EAB82":""}}>
                    <div className="div_delegation">
                      <p className="delegation_txt" style={{color: this.state.delegationClicked?"white":"black"}}>
                        Délégation de services publics
                      </p>
                    </div>
                    <div className="div_delegation_nbr">
                      <h5 className="delegation_nbr" style={{color: this.state.delegationClicked?"white":"#2EAB82"}}>2</h5>
                    </div>
                  </div>
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
                  <div className="checkbox_fourniture" onClick={this.handleClickAdminPublic} style={{backgroundColor: this.state.adminClicked?"#2EAB82":""}}>
                    <div className="div_fourniture">
                      <p className="forniture_txt" style={{color: this.state.adminClicked?"white":"black"}}>ADMINISTRATION PUBLIQUE (MINISTÈRES)</p>
                    </div>
                    <div className="div_fourniture_nbr">
                      <h5 className="forniture_nbr" style={{color: this.state.adminClicked?"white":"#2EAB82"}}>2</h5>
                    </div>
                  </div>
                  <div className="checkbox_service" onClick={this.handleClickAgenceEtat} style={{backgroundColor: this.state.agenceClicked?"#2EAB82":""}}>
                    <div className="div_service">
                      <p className="service_txt" style={{color: this.state.agenceClicked?"white":"black"}}>SOCIÉTÉS, AGENCES, ET OFFICES DE L’ÉTAT</p>
                    </div>
                    <div className="div_service_nbr">
                      <h5 className="service_nbr" style={{color: this.state.agenceClicked?"white":"#2EAB82"}}>2</h5>
                    </div>
                  </div>
                  <div className="checkbox_travaux" onClick={this.handleClickInstitutionEtat} style={{backgroundColor: this.state.institutionClicked?"#2EAB82":""}}>
                    <div className="div_travaux">
                      <p className="travaux_txt" style={{color: this.state.institutionClicked?"white":"black"}}>INSTITUTIONS DE L’ÉTAT</p>
                    </div>
                    <div className="div_travaux_nbr">
                      <h5 className="travaux_nbr" style={{color: this.state.institutionClicked?"white":"#2EAB82"}}>2</h5>
                    </div>
                  </div>
                  <div className="checkbox_prestation" onClick={this.handleClickCollectivite} style={{backgroundColor: this.state.collectiviteClicked?"#2EAB82":""}}>
                    <div className="div_prestation">
                      <p className="prestation_txt" style={{color: this.state.collectiviteClicked?"white":"black"}}>
                      COLLECTIVITÉS LOCALES (COMMUNES)
                      </p>
                    </div>

                    <div className="div_prestation_nbr">
                      <h5 className="prestation_nbr" style={{color: this.state.collectiviteClicked?"white":"#2EAB82"}}>2</h5>
                    </div>
                  </div>

                  <div className="checkbox_delegation" onClick={this.handleClickDepartement} style={{backgroundColor: this.state.departementClicked?"#2EAB82":""}}>
                    <div className="div_delegation">
                      <p className="delegation_txt" style={{color: this.state.departementClicked?"white":"black"}}>
                      DÉPARTEMENTS (PRÉFECTURES)
                      </p>
                    </div>
                    <div className="div_delegation_nbr">
                      <h5 className="delegation_nbr" style={{color: this.state.departementClicked?"white":"#2EAB82"}}>2</h5>
                    </div>
                  </div>
                </div>
              ) : (
                <></>
              )}

              {/* fin: filtre par type d'autorité */}

              <div className="height_space"></div>
              <div className="date_publication">
                <div className="height_space"></div>
              </div>
              <div className="height_space"></div>

              <div className="date_publication">
                <div className="height_space"></div>
              </div>
              <div className="height_space"></div>
              <div className="date_publication">
                
              </div>
             
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

               {/*  <Offre offres={this.state.offres} /> */}
  
            </div>
            <div style={{height: '200px'}}></div>
          </div>
        </center>
      </>
    );
  }
}
