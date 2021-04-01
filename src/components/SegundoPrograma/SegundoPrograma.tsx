import React, { Component } from "react";
import * as THREE from "three";
import "./SegundoPrograma.css";
import OrbitControls from "three-orbitcontrols";

class SegundoPrograma extends Component {
  state = {
    vecU: new THREE.Vector3(1, 3, -2),
    vecV: new THREE.Vector3(2, 1, 4),
    vecW: new THREE.Vector3(-3, 1, 6),
    vecWV: new THREE.Vector3(),
    vecUW: new THREE.Vector3(),
    vecUV: new THREE.Vector3(),
    vecUVW: new THREE.Vector3(),
    productoCruzUV: new THREE.Vector3(),
    productoCruzVW: new THREE.Vector3(),
    productoCruzUW: new THREE.Vector3(),
    area: 0,
    volumen: 0,
  };

  // Cada que se actualiza el estado, por ejemplo con la modificación del valor
  // de algún input, se llama a esta función.
  componentDidUpdate() {
    // Sacar del estado los vectores.
    const { vecU, vecV, vecW, vecWV, vecUW, vecUV, vecUVW } = this.state;

    // Arreglo con los vértices de nuestra figura.
    const vertices = new Float32Array([
      // Triángulo origen -> u ; origen -> v
      0,
      0,
      0,
      vecU.x,
      vecU.z,
      vecU.y,
      vecV.x,
      vecV.z,
      vecV.y,

      // // Triángulo u -> v ; u -> u+v
      vecU.x,
      vecU.z,
      vecU.y,
      vecV.x,
      vecV.z,
      vecV.y,
      vecUV.x,
      vecUV.z,
      vecUV.y,

      // Triángulo origen -> u ; origen -> w
      0,
      0,
      0,
      vecU.x,
      vecU.z,
      vecU.y,
      vecW.x,
      vecW.z,
      vecW.y,

      // Triángulo u -> w ; u -> u+w
      vecU.x,
      vecU.z,
      vecU.y,
      vecW.x,
      vecW.z,
      vecW.y,
      vecUW.x,
      vecUW.z,
      vecUW.y,

      // Tiángulo origen -> v; origen -> w
      0,
      0,
      0,
      vecV.x,
      vecV.z,
      vecV.y,
      vecW.x,
      vecW.z,
      vecW.y,

      // Triángulo v -> w ; v -> w+v
      vecV.x,
      vecV.z,
      vecV.y,
      vecW.x,
      vecW.z,
      vecW.y,
      vecWV.x,
      vecWV.z,
      vecWV.y,

      // Triángulo w -> u+w ; w -> w+v
      vecW.x,
      vecW.z,
      vecW.y,
      vecUW.x,
      vecUW.z,
      vecUW.y,
      vecWV.x,
      vecWV.z,
      vecWV.y,

      // Triángulo u+w -> w+v ; u+w -> u+v+w
      vecUW.x,
      vecUW.z,
      vecUW.y,
      vecWV.x,
      vecWV.z,
      vecWV.y,
      vecUVW.x,
      vecUVW.z,
      vecUVW.y,

      // Triángulo u -> u+w ; u -> u+v
      vecU.x,
      vecU.z,
      vecU.y,
      vecUW.x,
      vecUW.z,
      vecUW.y,
      vecUV.x,
      vecUV.z,
      vecUV.y,

      // Triángulo u+w -> u+v+w ; u+w -> u+v
      vecUW.x,
      vecUW.z,
      vecUW.y,
      vecUV.x,
      vecUV.z,
      vecUV.y,
      vecUVW.x,
      vecUVW.z,
      vecUVW.y,

      // Triángulo v -> u+v ; v -> w+v
      vecV.x,
      vecV.z,
      vecV.y,
      vecWV.x,
      vecWV.z,
      vecWV.y,
      vecUV.x,
      vecUV.z,
      vecUV.y,

      // Triángulo w+v -> u+v ; w+v -> u+v+w
      vecWV.x,
      vecWV.z,
      vecWV.y,
      vecUV.x,
      vecUV.z,
      vecUV.y,
      vecUVW.x,
      vecUVW.z,
      vecUVW.y,
    ]);

    // Escena de ThreeJS
    var scene = new THREE.Scene();

    // Renderer.
    var renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth * 0.8, window.innerHeight * 0.8);
    const elemento = document.getElementById("grafica-programa-2");
    // Eliminamos la gráfica anterior si ya existe.
    if (elemento?.hasChildNodes()) {
      elemento.innerHTML = "";
    }
    elemento?.appendChild(renderer.domElement);

    // Cámara
    let camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.y = 5;
    camera.position.z = 15;

    // Controles de la cámara.
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.reset();

    // Dibujar los ejes.
    const ejes = new THREE.AxesHelper(20);
    scene.add(ejes);

    // Dibujar el grid.
    const grid = new THREE.GridHelper(40, 40);
    scene.add(grid);

    // Geometría
    let geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(vertices, 3));

    // Material para el Mesh.
    let material = new THREE.MeshBasicMaterial({
      color: 0xffffff,
      wireframe: true,
    });

    // Mesh
    let paralelepipedo = new THREE.Mesh(geometry, material);
    scene.add(paralelepipedo);

    // Animación
    const animate = () => {
      requestAnimationFrame(animate);
      renderer.render(scene, camera);
    };
    animate();
  }

  // Función que actualiza el estado con los valores en los campos.
  actualizarCampo = (e: any) => {
    this.setState((state) => {
      // Creamos el nuevo estado.
      const nuevoEstado: any = state;

      // Asignamos el valor que puso el usuario al vector correspondiente.
      if (e.target.name[0] === "u") {
        nuevoEstado.vecU[e.target.name[1]] = Number(e.target.value);
      } else if (e.target.name[0] === "v") {
        nuevoEstado.vecV[e.target.name[1]] = Number(e.target.value);
      } else {
        nuevoEstado.vecW[e.target.name[1]] = Number(e.target.value);
      }

      // Calculamos los vectores resultantes de los vértices del paralelepípedo.
      nuevoEstado.vecWV.addVectors(nuevoEstado.vecW, nuevoEstado.vecV);
      nuevoEstado.vecUW.addVectors(nuevoEstado.vecU, nuevoEstado.vecW);
      nuevoEstado.vecUV.addVectors(nuevoEstado.vecU, nuevoEstado.vecV);
      nuevoEstado.vecUVW.addVectors(nuevoEstado.vecU, nuevoEstado.vecV);
      nuevoEstado.vecUVW.add(nuevoEstado.vecW);

      // Calculamos los producto cruz pertinentes para cálculos.
      nuevoEstado.productoCruzUV.crossVectors(
        nuevoEstado.vecU,
        nuevoEstado.vecV
      );
      nuevoEstado.productoCruzVW.crossVectors(
        nuevoEstado.vecV,
        nuevoEstado.vecW
      );
      nuevoEstado.productoCruzUW.crossVectors(
        nuevoEstado.vecU,
        nuevoEstado.vecW
      );

      // Calculamos el área.
      nuevoEstado.area =
        2 * Math.abs(nuevoEstado.productoCruzUV.length()) +
        2 * Math.abs(nuevoEstado.productoCruzVW.length()) +
        2 * Math.abs(nuevoEstado.productoCruzUW.length());

      // Calculamos el volumen.
      nuevoEstado.volumen = Math.abs(
        nuevoEstado.vecW.dot(nuevoEstado.productoCruzUV)
      );

      // Actualizamos el estado.
      return {
        ...nuevoEstado,
      };
    });
  };

  render() {
    return (
      <div className="segundo-programa">
        <h1>Programa #2</h1>
        <p>
          Programa que recibe tres vectores en el espacio R^3 (tres dimensiones)
          con los cuales se genera un paralelepípedo del cual se calcula su área
          y su volúmen.
        </p>
        <p>
          <strong>Entradas:</strong>
          <ul>
            <li>
              <strong>u</strong>: vector de tres dimensiones.
            </li>
            <li>
              <strong>v</strong>: vector de tres dimensiones.
            </li>
            <li>
              <strong>w</strong>: vector de tres dimensiones.
            </li>
          </ul>
        </p>
        <hr />
        <p>Valores para el programa:</p>
        <p>
          <code>u</code> = (
          <input
            type="number"
            name="ux"
            id="ux"
            value={this.state.vecU.x}
            onChange={this.actualizarCampo}
          />
          ,{" "}
          <input
            type="number"
            name="uy"
            id="uy"
            value={this.state.vecU.y}
            onChange={this.actualizarCampo}
          />
          ,{" "}
          <input
            type="number"
            name="uz"
            id="uz"
            value={this.state.vecU.z}
            onChange={this.actualizarCampo}
          />
          )
        </p>
        <p>
          <code>v</code> = (
          <input
            type="number"
            name="vx"
            id="vx"
            value={this.state.vecV.x}
            onChange={this.actualizarCampo}
          />
          ,{" "}
          <input
            type="number"
            name="vy"
            id="vy"
            value={this.state.vecV.y}
            onChange={this.actualizarCampo}
          />
          ,{" "}
          <input
            type="number"
            name="vz"
            id="vz"
            value={this.state.vecV.z}
            onChange={this.actualizarCampo}
          />
          )
        </p>
        <p>
          <code>w</code> = (
          <input
            type="number"
            name="wx"
            id="wx"
            value={this.state.vecW.x}
            onChange={this.actualizarCampo}
          />
          ,{" "}
          <input
            type="number"
            name="wy"
            id="wy"
            value={this.state.vecW.y}
            onChange={this.actualizarCampo}
          />
          ,{" "}
          <input
            type="number"
            name="wz"
            id="wz"
            value={this.state.vecW.z}
            onChange={this.actualizarCampo}
          />
          )
        </p>
        <hr></hr>
        <p>
          <strong>Salidas:</strong>
          <ul>
            <li>
              <strong>Área:</strong> <code>{this.state.area}</code> unidades
              cuadradas.
            </li>
            <li>
              <strong>Volumen:</strong> <code>{this.state.volumen}</code>{" "}
              unidades cúbicas.
            </li>
            <li>
              <strong>Vectores complementarios</strong>:
              <ul>
                <li>
                  <code>u+v</code>: ({this.state.vecUV.x},{this.state.vecUV.y},
                  {this.state.vecUV.z})
                </li>
                <li>
                  <code>w+v</code>: ({this.state.vecWV.x},{this.state.vecWV.y},
                  {this.state.vecWV.z})
                </li>
                <li>
                  <code>u+w</code>: ({this.state.vecUW.x},{this.state.vecUW.y},
                  {this.state.vecUW.z})
                </li>
                <li>
                  <code>u+v+w</code>: ({this.state.vecUVW.x},
                  {this.state.vecUVW.y},{this.state.vecUVW.z})
                </li>
                <li>
                  <code>u×v</code>: ({this.state.productoCruzUV.x},
                  {this.state.productoCruzUV.y},{this.state.productoCruzUV.z})
                </li>
                <li>
                  <code>v×w</code>: ({this.state.productoCruzVW.x},
                  {this.state.productoCruzVW.y},{this.state.productoCruzVW.z})
                </li>
                <li>
                  <code>u×w</code>: ({this.state.productoCruzUW.x},
                  {this.state.productoCruzUW.y},{this.state.productoCruzUW.z})
                </li>
              </ul>
            </li>
          </ul>
          <strong>Gráfica:</strong>
          <ul>
            <li>
              <strong>X</strong>: eje rojo.
            </li>
            <li>
              <strong>Y</strong>: eje azul.
            </li>
            <li>
              <strong>Z</strong>: eje verde.
            </li>
          </ul>
        </p>
        <div id="grafica-programa-2">
          <i>
            (Modifica los valores de los vectores para comenzar con el render)
          </i>
        </div>
      </div>
    );
  }
}

export default SegundoPrograma;
