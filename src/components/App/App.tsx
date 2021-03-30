import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import AcercaDe from '../AcercaDe/AcercaDe';
import Footer from '../Footer/Footer';
import Navbar from '../Navbar/Navbar';
import Presentacion from '../Presentacion/Presentacion';
import PrimerPrograma from '../PrimerPrograma/PrimerPrograma';
import SegundoPrograma from '../SegundoPrograma/SegundoPrograma';
import './App.css';

function App() {
  return (
    <div className="app">
      <div className="container">
        <BrowserRouter>
          {/* <Navbar /> */}
          <Route path='/:page' component={Navbar} />
          <Route exact path="/" component={Navbar} />
          <Route exact path="/" component={Presentacion} />
          <Route exact path="/primer-programa" component={PrimerPrograma} />
          <Route exact path="/segundo-programa" component={SegundoPrograma} />
          <Route exact path="/acerca-de" component={AcercaDe} />
        </BrowserRouter>
      </div>
      <Footer />
    </div>
  );
}

export default App;
