import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import Navb from './components/Nav';
import './App.css';
import Home from './components/pages/Home';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import Products from './components/pages/Products';
import ContactUs from './components/pages/ContactUs';
import SignUp from './components/pages/SignUp';
import Passation from './components/pages/Passation';
import Connection from './components/pages/Connection';
import AvisGeneraux from './components/pages/AvisGeneraux';
import Footer from './components/Footer';
import Offres from './components/pages/AppelsDoffres copy'
import Inscription from './components/pages/Inscription'
import ScrollButton from "./components/scrollToTop"
import Dashbord from './components/admin/dashbord';
import UsersList from './components/admin/UsersList';
import AjouterOffre from './components/admin/AjouterOffre';

function App() {
  return (
    <Router>
      {/* <Navb /> */}
      <Switch>
        <Route path='/appels-doffres' exact component={Offres} />
        <Route path='/' exact component={Home} />
        <Route path='/services' component={Services} />
        <Route path='/products' component={Products} />
        <Route path='/contact-us' component={ContactUs} />
        <Route path='/sign-up' component={SignUp} />
        <Route path='/passation' component={Passation} />
        <Route path='/avis-generaux' component={AvisGeneraux} />
        <Route path='/connection' component={Connection} />
        <Route path='/inscription' component={Inscription} />
        <Route path='/dashbord' component={Dashbord} />
        <Route path='/liste-utilisateurs' component={UsersList} />
        <Route path='/ajout-offres' component={AjouterOffre} />
      </Switch>
      <ScrollButton scrollStepInPx="50" delayInMs="16.66"/>
      
      {/* <Footer/> */}
    
      
    </Router>
  );
}

export default App;

