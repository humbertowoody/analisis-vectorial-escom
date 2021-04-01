import React, { Component } from "react";
import * as THREE from "three";
import "./SegundoPrograma.css";
import OrbitControls from "three-orbitcontrols";

class SegundoPrograma extends Component {
  // Ejemplos para probar programa más fácilmente.
  private ejemplosPredefinidos = [
    {
      name: "Ejemplo 1",
      vecU: new THREE.Vector3(2, 0, 4),
      vecV: new THREE.Vector3(3, 8, 2),
      vecW: new THREE.Vector3(9, 1, 6),
    },
    {
      name: "Ejemplo 2",
      vecU: new THREE.Vector3(1, 3, -2),
      vecV: new THREE.Vector3(2, 1, 4),
      vecW: new THREE.Vector3(-3, 1, 6),
    },
    {
      name: "Ejemplo 3",
      vecU: new THREE.Vector3(1, 1, 0),
      vecV: new THREE.Vector3(-1, 4, 0),
      vecW: new THREE.Vector3(2, 2, 2),
    },
    {
      name: "Ejemplo 4",
      vecU: new THREE.Vector3(3, 1, 1),
      vecV: new THREE.Vector3(1, 4, 1),
      vecW: new THREE.Vector3(1, 1, 5),
    },
    {
      name: "Ejemplo 5",
      vecU: new THREE.Vector3(0, 0, 4),
      vecV: new THREE.Vector3(1, 3, 0),
      vecW: new THREE.Vector3(2, 0, 0),
    },
  ];

  // Initial state definition.
  state = {
    vecU: new THREE.Vector3(),
    vecV: new THREE.Vector3(),
    vecW: new THREE.Vector3(),
    vecWV: new THREE.Vector3(),
    vecUW: new THREE.Vector3(),
    vecUV: new THREE.Vector3(),
    vecUVW: new THREE.Vector3(),
    productoCruzUV: new THREE.Vector3(),
    productoCruzVW: new THREE.Vector3(),
    productoCruzUW: new THREE.Vector3(),
    name: "Gráfica",
    inputType: "range",
    minValue: -5,
    maxValue: 5,
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

  // Restablece el estado a sus valores por defecto.
  restablecer = (e: any) => {
    this.setState((state) => {
      return {
        vecU: new THREE.Vector3(),
        vecV: new THREE.Vector3(),
        vecW: new THREE.Vector3(),
        vecWV: new THREE.Vector3(),
        vecUW: new THREE.Vector3(),
        vecUV: new THREE.Vector3(),
        vecUVW: new THREE.Vector3(),
        productoCruzUV: new THREE.Vector3(),
        productoCruzVW: new THREE.Vector3(),
        productoCruzUW: new THREE.Vector3(),
        name: "Gráfica",
        inputType: "range",
        minValue: -5,
        maxValue: 5,
        area: 0,
        volumen: 0,
      };
    });
  };

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
      } else if (e.target.name[0] === "w") {
        nuevoEstado.vecW[e.target.name[1]] = Number(e.target.value);
      } else {
        nuevoEstado[e.target.name] = e.target.value;
      }

      // En estas llamadas asumimos que no vendrán de un ejemplo, por lo que
      // regresamos al valor de "Gráfica".
      nuevoEstado.name = "Gráfica";

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

  // Función para activar ejemplo.
  activarEjemplo = (e: any) => {
    const ejemploEncontrado = this.ejemplosPredefinidos.find(
      (ejemploActual) => ejemploActual.name === e.target.name
    );

    // Si encontramos el ejemplo buscado, colocamos el estado correspondiente.
    if (ejemploEncontrado) {
      this.setState((estadoAnterior) => {
        // Creamos el nuevo estado.
        const nuevoEstado: any = { ...estadoAnterior, ...ejemploEncontrado };

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
    } else {
      this.setState((estadoAnterior) => {
        return {
          ...estadoAnterior,
          name: "Gráfica",
        };
      });
    }
  };

  // Función principal de renderizado de página web.
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
        <p>Tipo de entrada:</p>
        <p>
          <div onChange={this.actualizarCampo}>
            <input
              checked={this.state.inputType === "range"}
              type="radio"
              name="inputType"
              id="inputType"
              value={"range"}
            />{" "}
            Slider
            <input
              checked={this.state.inputType === "number"}
              type="radio"
              name="inputType"
              id="inputType"
              value={"number"}
            />{" "}
            Numérico
          </div>
        </p>
        <p>Rango de valores para entradas:</p>
        <p>
          Mínimo:{" "}
          <input
            type="number"
            name="minValue"
            id="minValue"
            value={this.state.minValue}
            onChange={this.actualizarCampo}
          />
          , Máximo:{" "}
          <input
            type="number"
            name="maxValue"
            id="maxValue"
            value={this.state.maxValue}
            onChange={this.actualizarCampo}
          />
          ,<button onClick={this.restablecer}>Reestablecer</button>
        </p>
        <p>Valores para el programa:</p>
        <p>
          <code>u</code> = (x:
          <input
            type={this.state.inputType}
            min={this.state.minValue}
            max={this.state.maxValue}
            step={0.1}
            name="ux"
            id="ux"
            value={this.state.vecU.x}
            onChange={this.actualizarCampo}
          />
          , y:
          <input
            type={this.state.inputType}
            min={this.state.minValue}
            max={this.state.maxValue}
            step={0.1}
            name="uy"
            id="uy"
            value={this.state.vecU.y}
            onChange={this.actualizarCampo}
          />
          , z:
          <input
            type={this.state.inputType}
            min={this.state.minValue}
            max={this.state.maxValue}
            step={0.1}
            name="uz"
            id="uz"
            value={this.state.vecU.z}
            onChange={this.actualizarCampo}
          />
          ) = (<code>{this.state.vecU.x}</code>,<code>{this.state.vecU.y}</code>
          ,<code>{this.state.vecU.z}</code>)
        </p>
        <p>
          <code>v</code> = (x:
          <input
            type={this.state.inputType}
            min={this.state.minValue}
            max={this.state.maxValue}
            step={0.1}
            name="vx"
            id="vx"
            value={this.state.vecV.x}
            onChange={this.actualizarCampo}
          />
          , y:
          <input
            type={this.state.inputType}
            min={this.state.minValue}
            max={this.state.maxValue}
            step={0.1}
            name="vy"
            id="vy"
            value={this.state.vecV.y}
            onChange={this.actualizarCampo}
          />
          , z:
          <input
            type={this.state.inputType}
            min={this.state.minValue}
            max={this.state.maxValue}
            step={0.1}
            name="vz"
            id="vz"
            value={this.state.vecV.z}
            onChange={this.actualizarCampo}
          />
          ) = (<code>{this.state.vecV.x}</code>,<code>{this.state.vecV.y}</code>
          ,<code>{this.state.vecV.z}</code>)
        </p>
        <p>
          <code>w</code> = (x:
          <input
            type={this.state.inputType}
            min={this.state.minValue}
            max={this.state.maxValue}
            step={0.1}
            name="wx"
            id="wx"
            value={this.state.vecW.x}
            onChange={this.actualizarCampo}
          />
          , y:
          <input
            type={this.state.inputType}
            min={this.state.minValue}
            max={this.state.maxValue}
            step={0.1}
            name="wy"
            id="wy"
            value={this.state.vecW.y}
            onChange={this.actualizarCampo}
          />
          , z:
          <input
            type={this.state.inputType}
            min={this.state.minValue}
            max={this.state.maxValue}
            step={0.1}
            name="wz"
            id="wz"
            value={this.state.vecW.z}
            onChange={this.actualizarCampo}
          />
          ) = (<code>{this.state.vecW.x}</code>,<code>{this.state.vecW.y}</code>
          ,<code>{this.state.vecW.z}</code>)
        </p>
        <p>
          <strong>Ejemplos predefinidos</strong>
        </p>
        <p>
          <i>
            Puedes utilizar alguno de los ejemplos predefinidos a continuación:
          </i>
        </p>
        {this.ejemplosPredefinidos.map((ejemploPredefinido) => (
          <button onClick={this.activarEjemplo} name={ejemploPredefinido.name}>
            {ejemploPredefinido.name}
          </button>
        ))}
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
                  <strong>u+v</strong>: (<code>{this.state.vecUV.x}</code>,
                  <code>{this.state.vecUV.y}</code>,
                  <code>{this.state.vecUV.z}</code>)
                </li>
                <li>
                  <strong>w+v</strong>: (<code>{this.state.vecWV.x}</code>,
                  <code>{this.state.vecWV.y}</code>,
                  <code>{this.state.vecWV.z}</code>)
                </li>
                <li>
                  <strong>u+w</strong>: (<code>{this.state.vecUW.x}</code>,
                  <code>{this.state.vecUW.y}</code>,
                  <code>{this.state.vecUW.z}</code>)
                </li>
                <li>
                  <strong>u+v+w</strong>: (<code>{this.state.vecUVW.x}</code>,
                  <code>{this.state.vecUVW.y}</code>,
                  <code>{this.state.vecUVW.z}</code>)
                </li>
                <li>
                  <strong>u×v</strong>: (
                  <code>{this.state.productoCruzUV.x}</code>,
                  <code>{this.state.productoCruzUV.y}</code>,
                  <code>{this.state.productoCruzUV.z}</code>)
                </li>
                <li>
                  <strong>v×w</strong>: (
                  <code>{this.state.productoCruzVW.x}</code>,
                  <code>{this.state.productoCruzVW.y}</code>,
                  <code>{this.state.productoCruzVW.z}</code>)
                </li>
                <li>
                  <strong>u×w</strong>: (
                  <code>{this.state.productoCruzUW.x}</code>,
                  <code>{this.state.productoCruzUW.y}</code>,
                  <code>{this.state.productoCruzUW.z}</code>)
                </li>
              </ul>
            </li>
          </ul>
          <strong>{this.state.name}:</strong>
          <ul>
            <li>
              <strong>Eje x</strong>: eje rojo.
            </li>
            <li>
              <strong>Eje y</strong>: eje azul.
            </li>
            <li>
              <strong>Eje z</strong>: eje verde.
            </li>
            <li>
              <strong>u</strong>=(<code>{this.state.vecU.x}</code>,
              <code>{this.state.vecU.y}</code>,<code>{this.state.vecU.z}</code>
              ).
            </li>
            <li>
              <strong>v</strong>=(<code>{this.state.vecV.x}</code>,
              <code>{this.state.vecV.y}</code>,<code>{this.state.vecV.z}</code>
              ).
            </li>
            <li>
              <strong>w</strong>=(<code>{this.state.vecW.x}</code>,
              <code>{this.state.vecW.y}</code>,<code>{this.state.vecW.z}</code>
              ).
            </li>
          </ul>
        </p>
        <div id="grafica-programa-2">
          <i>
            (Modifica los valores de los vectores o selecciona un ejemplo para
            comenzar con el render)
          </i>
        </div>
      </div>
    );
  }
}

export default SegundoPrograma;
