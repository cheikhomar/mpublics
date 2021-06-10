import React from "react";
import "./Footer.css";
import {FaYoutube, FaFacebookF, FaTwitter} from 'react-icons/fa';
import Media from "react-bootstrap/Media";
import { isConnected } from "./Functions/isConnected";
import { Link } from 'react-router-dom';


function Footer() {
  return (
<div className="main_footer">

    { isConnected ? <div className="footer_newsletter_div" style={{backgroundColor:"white"}}></div>:
    <div className="footer_newsletter_div">
       <div className="news_letter_text_div">
            <h1 className="newsletter_txt">Newsletter</h1>
       </div>
       <center>
         <div className="abonn_div">
            <p className="abonn_txt">Abonnez-vous à notre newsletter mensuelle pour vous tenir informé de l'actualité des marchés publics</p>
       </div>
      
       <center><div className="champ_abonn_div">
              <input className="champ_email" placeholder="Entrez votre adresse Email"></input>
              <button className="btn_sinscrire">S'inscrire</button>
       </div></center>
       
       </center>
    </div> }

    <div className="footer_menu_div">
         <div className="logo_div">
         <div className="space_footer"></div>
         <div className="logo_div_img">
               <div className="logo_footer">
               <Media>
        <img
          width={170}
          height={70}
          className="mr-3"
          src="https://www.gainde2000.com/wp-content/uploads/2017/11/logo_Gainde.png"
          alt=""
        />
          </Media>
               </div>
         </div>
         <div className="resaux_sociaux">
            <div className="twitter"><FaTwitter color="white"/></div>
            <div className="facebook"><FaFacebookF color="white"/></div>
            <div className="youtube"><FaYoutube color="white"/></div>
         </div>

         </div>
         <div className="outilsgestion_div">
           <div className="space_footer"></div>
           <div className="menu_footer_div_tiltle">
               <h2 className="menu_footer_text_tiltle">OUTILS DE GESTION</h2>
           </div>
           <div className="sous_mennu_footer_div">
                <p className="sous_menu_footer_txt">Comprendre les marchés publics</p>
           </div> 
           <a href="https://www.sec.gouv.sn/sites/default/files/loisetdecrets/D%C3%A9cret%20n%C2%B0%202007-545%20du%2025%20avril%202007%20portant%20Code%20des%20march%C3%A9s%20publics.pdf">
              <div className="sous_mennu_footer_div">
                <p className="sous_menu_footer_txt">Code des marchés 2007</p>
           </div></a>  
           <div className="sous_mennu_footer_div">
                <p className="sous_menu_footer_txt">Code des marchés 2009</p>
           </div>
           <div className="sous_mennu_footer_div">
                <p className="sous_menu_footer_txt">Dénonciations anonymes</p>
           </div>
           <div className="sous_mennu_footer_div">
                <p className="sous_menu_footer_txt">FAQ</p>
           </div>

         </div>
<div className="rapports_div">
<div className="space_footer"></div>
<div className="menu_footer_div_tiltle">
               <h2 className="menu_footer_text_tiltle">RAPPORTS</h2>
           </div>
           <div className="sous_mennu_footer_div">
                <p className="sous_menu_footer_txt">Rapports ARMP</p>
           </div>
           <div className="sous_mennu_footer_div">
                <p className="sous_menu_footer_txt">Rapport d'audit</p>
           </div>

</div>
<div className="liens_div">
<div className="space_footer"></div>
<div className="menu_footer_div_tiltle">
               <h2 className="menu_footer_text_tiltle">LIENS UTILES</h2>
           </div>
           <div className="sous_mennu_footer_div">
           <a href="http://www.finances.gouv.sn/"><p className="sous_menu_footer_txt">Ministère de l'économie et des finances</p></a> 
           </div>  

           <a href="https://www.afdb.org/fr">
              <div className="sous_mennu_footer_div">
                <p className="sous_menu_footer_txt">BAD</p>
           </div></a>


        <a href="https://www.banquemondiale.org/fr/home">   <div className="sous_mennu_footer_div">
                <p className="sous_menu_footer_txt">Banque mondiale</p>
           </div></a>

           <div className="sous_mennu_footer_div">
                <p className="sous_menu_footer_txt">Dénonciations anonymes</p>
           </div>
</div>
<div className="copyright">
  <p className="copyright_txt">© Portail des Marchés Publics du Sénégal | Copyright 2021</p>
</div>

<div className="drapeau">
   <div className="drapeau_vert"></div>
   <div className="drapeau_jaune"></div>
   <div className="drapeau_rouge"></div>
</div>
    </div>
</div>
  );
}

export default Footer;