import { randomBytes } from 'crypto';
import JXGBoard from 'jsxgraph-react-js';
import React, { Component } from 'react';
import './PrimerPrograma.css';

/**
 * Las coordenadas iniciales para los vectores.
 */
export const CoordenadasIniciales: any = {
  A: [2, 2],
  B: [-2, 2],
  C: [-2, -2],
  D: [2, -2],
  R: [0, 0]
};

/**
 * El primer programa de la materia.
 */
class PrimerPrograma extends Component {

  // Definición del estado inicial.
  state = {
    a: 1,
    b: 1,
    c: 1,
    d: 1,
    A: [2, 2],
    B: [-2, 2],
    C: [-2, -2],
    D: [2, -2],
    R: [0, 0],
  }

  logica = (brd: any) => {
    // Extraemos las variables del estado.
    let { A, B, C, D, R } = this.state;

    // Suspendemos la actualización del chart.
    brd.suspendUpdate();

    // Graficamos las leyendas para cada vector.
    brd.create('point', A, { size: 0, name: 'A' });
    brd.create('point', B, { size: 0, name: 'B' });
    brd.create('point', C, { size: 0, name: 'C' });
    brd.create('point', D, { size: 0, name: 'D' });
    brd.create('point', R, { size: 0, name: 'R' });

    // Graficamos los vectores.
    brd.create('line', [[0, 0], A], {
      straightFirst: false,
      straightLast: false,
      lastArrow: true,
      strokeColor: 'blue',
      name: 'A'
    });
    brd.create('line', [[0, 0], B], {
      straightFirst: false,
      straightLast: false,
      lastArrow: true,
      strokeColor: 'blue'
    });
    brd.create('line', [[0, 0], C], {
      straightFirst: false,
      straightLast: false,
      lastArrow: true,
      strokeColor: 'blue'
    });
    brd.create('line', [[0, 0], D], {
      straightFirst: false,
      straightLast: false,
      lastArrow: true,
      strokeColor: 'blue'
    });

    brd.create('line', [[0, 0], R], {
      straightFirst: false,
      straightLast: false,
      lastArrow: true,
      strokeColor: 'red'
    });

    // Reanudamos la actualización del chart.
    brd.unsuspendUpdate();
  }

  actualizarCampo = (e: any) => {
    this.setState(state => {
      // Creamos el nuevo estado.
      const nuevoEstado: any = state;

      // Asignamos el valor que puso el usuario.
      nuevoEstado[e.target.name] = Number(e.target.value);

      // Calculamos el valor para el vector correspondiente.
      nuevoEstado[e.target.name.toUpperCase()] = [
        e.target.value * CoordenadasIniciales[e.target.name.toUpperCase()][0],
        e.target.value * CoordenadasIniciales[e.target.name.toUpperCase()][1]
      ];

      // Calculamos el nuevo valor para la resultante.
      nuevoEstado.R[0] = nuevoEstado.A[0] + nuevoEstado.B[0] + nuevoEstado.C[0] + nuevoEstado.D[0];
      nuevoEstado.R[1] = nuevoEstado.A[1] + nuevoEstado.B[1] + nuevoEstado.C[1] + nuevoEstado.D[1];


      // Actualizamos el estado.
      return ({
        ...nuevoEstado,
      })
    })
  }


  render() {
    // Hack para forzar a que se actualice la gráfica.
    let newGraph: string = randomBytes(21).toString();

    // El componente.
    return (
      <div className="primer-programa">
        <h1>Programa #1</h1>
        <p>
          Programa que recibe los parámetros <code>a</code>, <code>b</code>, <code>c</code> y
          <code>d</code> enteros los cuales son aplicados a los vectores iniciales <code>A({CoordenadasIniciales.A[0]},{CoordenadasIniciales.A[1]})</code>,
          <code>B({CoordenadasIniciales.B[0]},{CoordenadasIniciales.B[1]})</code>, <code>C({CoordenadasIniciales.C[0]},{CoordenadasIniciales.C[1]})</code> y <code>D({CoordenadasIniciales.D[0]},{CoordenadasIniciales.D[1]})</code>, correspondientemente,
          se calcula la resultante (<code>R</code>) de todos ellos y se grafica.
        </p>
        <p>
          <strong>Entradas:</strong>
          <ul>
            <li><strong>a</strong>: Un escalar entero.</li>
            <li><strong>b</strong>: Un escalar entero.</li>
            <li><strong>c</strong>: Un escalar entero.</li>
            <li><strong>d</strong>: Un escalar entero.</li>
          </ul>
        </p>
        <hr></hr>
        <p>Valores para el programa:</p>
        <p>
          <code>a</code> = <input type="number" name="a" id="a" value={this.state.a} step={1} onChange={this.actualizarCampo} /> = <code>a·A</code> = <code>{this.state.a}·({CoordenadasIniciales.A[0]},{CoordenadasIniciales.A[1]})</code> = <code>({this.state.A[0]},{this.state.A[1]})</code>
        </p>
        <p>
          <code>b</code> = <input type="number" name="b" id="b" value={this.state.b} step={1} onChange={this.actualizarCampo} /> = <code>b·B</code> = <code>{this.state.b}·({CoordenadasIniciales.B[0]},{CoordenadasIniciales.B[1]})</code> = <code>({this.state.B[0]},{this.state.B[1]})</code>
        </p>
        <p>
          <code>c</code> = <input type="number" name="c" id="c" value={this.state.c} step={1} onChange={this.actualizarCampo} /> = <code>c·C</code> = <code>{this.state.c}·({CoordenadasIniciales.C[0]},{CoordenadasIniciales.C[1]})</code> = <code>({this.state.C[0]},{this.state.C[1]})</code>
        </p>
        <p>
          <code>d</code> = <input type="number" name="d" id="d" value={this.state.d} step={1} onChange={this.actualizarCampo} /> = <code>d·D</code> = <code>{this.state.d}·({CoordenadasIniciales.D[0]},{CoordenadasIniciales.D[1]})</code> = <code>({this.state.D[0]},{this.state.D[1]})</code>
        </p>
        <p>
          Resultante = <code>R</code> = <code>aA + bB + cC + dD</code> = <code>({this.state.A[0]},{this.state.A[1]}) + ({this.state.B[0]},{this.state.B[1]}) + ({this.state.C[0]},{this.state.C[1]}) + ({this.state.D[0]},{this.state.D[1]})</code> = <code>({this.state.R[0]},{this.state.R[1]})</code>
        </p>
        <JXGBoard
          key={newGraph}
          className="grafica"
          logic={this.logica}
          boardAttributes={{
            axis: true,
            boundingbox: [-20, 20, 20, -20],
            showCopyright: false,
          }}
          style={{
            border: '1px solid black'
          }}
        />
      </div>
    );
  }
}

export default PrimerPrograma;
