import React, { Component } from "react";
import "./AcercaDe.css";

class AcercaDe extends Component {
  render() {
    return (
      <div className="acerca-de">
        <h1>Acerca De</h1>
        <p>
          Este sitio contiene todas los programas y proyectos desarrollados para
          la materia de <strong>Análisis Vectorial</strong>
          en <strong>ESCOM</strong>, impartida por el{" "}
          <strong>Dr. Dárwin Gutiérrez Mejía</strong> durante el período Febrero
          a Junio de 2021. La intención principal es, además de desarrollar los
          programas que el profesor nos propone para complementar nuestra
          formación académica, generar una herramienta de fácil acceso para
          cualquiera al que le pueda ser de utilidad.
        </p>
        <hr></hr>
        <h2>
          <i>Stack</i> tecnológico
        </h2>
        <p>
          En esta sección se incluye información acerca del proyecto y de los
          distintos recursos que se utilizaron para su realización.
        </p>
        <ul>
          <li>React</li>
          <li>JSXGraph</li>
          <li>ThreeJS</li>
        </ul>
        <hr></hr>
        <h2>Alumno</h2>
        <ul>
          <li>
            <strong>Nombre</strong>: Humberto Alejandro Ortega Alcocer
          </li>
          <li>
            <strong>Boleta</strong>: 2016630495
          </li>
          <li>
            <strong>Semestre</strong>: Febrero - Junio, 2021
          </li>
        </ul>
        <h2>Código Fuente</h2>
        <p>
          Si detectas que existe algún error, no dudes en reportar el{" "}
          <i>issue</i> en GitHub.
        </p>
        <a href="https://github.com/humbertowoody/analisis-vectorial-escom">
          https://github.com/humbertowoody/analisis-vectorial-escom
        </a>
      </div>
    );
  }
}

export default AcercaDe;
