import React, { Component } from 'react';
import * as THREE from 'three';
import ReactDOM from 'react-dom';
import './SegundoPrograma.css';

class SegundoPrograma extends Component {

    state = {
        ux: 0, uy: 0, uz: 0,
        vx: 0, vy: 0, vz: 0,
        wx: 0, wy: 0, wz: 0,
        area: 0,
        volumen: 0
    }

    // Constructor de la clase
    constructor(props: any) {
        super(props);
    }

    componentDidUpdate() {
        // componentDidMount() {
        // Sacar del estado los vectores.
        const vecU = new THREE.Vector3(this.state.ux, this.state.uy, this.state.uz);
        const vecV = new THREE.Vector3(this.state.vx, this.state.vy, this.state.vz);
        const vecW = new THREE.Vector3(this.state.wx, this.state.wy, this.state.wz);

        // Calculamos los vectores resultantes de los vértices del paralelepípedo.
        const vecWV = new THREE.Vector3();
        vecWV.addVectors(vecW, vecV);
        const vecUW = new THREE.Vector3();
        vecUW.addVectors(vecU, vecW);
        const vecUV = new THREE.Vector3();
        vecUV.addVectors(vecU, vecV);
        const vecUVW = new THREE.Vector3();
        vecUVW.addVectors(vecU, vecV);
        vecUVW.add(vecW);

        const vertices = new Float32Array([
            0, 0, 0,
            vecU.x, vecU.y, vecU.z,
            vecV.x, vecV.y, vecV.z,

            vecU.x, vecU.y, vecU.z,
            vecV.x, vecV.y, vecV.z,
            vecUV.x, vecUV.y, vecUV.z,

            0, 0, 0,
            vecU.x, vecU.y, vecU.z,
            vecW.x, vecW.y, vecW.z,

            vecU.x, vecU.y, vecU.z,
            vecW.x, vecW.y, vecW.z,
            vecUW.x, vecUW.y, vecUW.z,

            0, 0, 0,
            vecV.x, vecV.y, vecV.z,
            vecW.x, vecW.y, vecW.z,

            vecV.x, vecV.y, vecV.z,
            vecW.x, vecW.y, vecW.z,
            vecWV.x, vecWV.y, vecWV.z,

            vecW.x, vecW.y, vecW.z,
            vecUW.x, vecUW.y, vecUW.z,
            vecUV.x, vecUV.y, vecUV.z,

            vecUW.x, vecUW.y, vecUW.z,
            vecUV.x, vecUV.y, vecUV.z,
            vecUVW.x, vecUVW.y, vecUVW.z,

            vecU.x, vecU.y, vecU.z,
            vecUW.x, vecUW.y, vecUW.z,
            vecUV.x, vecUV.y, vecUV.z,

            vecUW.x, vecUW.y, vecUW.z,
            vecUV.x, vecUV.y, vecUV.z,
            vecUVW.x, vecUVW.y, vecUVW.z,

            vecV.x, vecV.y, vecV.z,
            vecWV.x, vecWV.y, vecWV.z,
            vecUV.x, vecUV.y, vecUV.z,

            vecWV.x, vecWV.y, vecWV.z,
            vecUV.x, vecUV.y, vecUV.z,
            vecUVW.x, vecUVW.y, vecUVW.z,
        ]);

        console.table(vertices);

        // Inicialización de threejs.
        var scene = new THREE.Scene();
        var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        var renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        // document.body.appendChild(renderer.domElement);
        const elemento = document.getElementById('grafica-programa-2');
        if (elemento?.hasChildNodes()) {
            elemento.innerHTML = '';
        }
        elemento?.appendChild(renderer.domElement);

        // var geometry = new THREE.BoxGeometry(1, 1, 1);
        let geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.BufferAttribute(vertices, 3));
        var material = new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true });
        var cube = new THREE.Mesh(geometry, material);
        scene.add(cube);
        camera.position.z = 15;
        var animate = function () {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };
        animate();
        // === THREE.JS EXAMPLE CODE END ===
    }

    actualizarCampo = (e: any) => {
        this.setState(state => {
            // Creamos el nuevo estado.
            const nuevoEstado: any = state;

            // Asignamos el valor que puso el usuario.
            nuevoEstado[e.target.name] = Number(e.target.value);

            // Usamos vectores de three.js
            const vecU = new THREE.Vector3(nuevoEstado.ux, nuevoEstado.uy, nuevoEstado.uz);
            const vecV = new THREE.Vector3(nuevoEstado.vx, nuevoEstado.vy, nuevoEstado.vz);
            const vecW = new THREE.Vector3(nuevoEstado.wx, nuevoEstado.wy, nuevoEstado.wz);

            // Calculamos los producto cruz pertinentes para cálculos.
            const productoCruzUV = new THREE.Vector3();
            productoCruzUV.crossVectors(vecU, vecV);
            const productoCruzVW = new THREE.Vector3();
            productoCruzVW.crossVectors(vecV, vecW);
            const productoCruzUW = new THREE.Vector3();
            productoCruzUW.crossVectors(vecU, vecW);

            // Calculamos el área.
            nuevoEstado.area = (2 * Math.abs(productoCruzUV.length())) + (2 * Math.abs(productoCruzVW.length())) + (2 * Math.abs(productoCruzUW.length()));

            // Calculamos el volumen.
            nuevoEstado.volumen = Math.abs(vecW.dot(productoCruzUV));

            // Actualizamos el estado.
            return ({
                ...nuevoEstado,
            })
        })
    }


    render() {

        return (
            <div className="segundo-programa">
                <h1>Programa #2</h1>
                <p>
                    Programa que recibe tres vectores en el espacio R^3 (tres dimensiones) con los cuales se
                    genera un paralelepípedo del cual se calcula su área y su volúmen.
                </p>
                <p>
                    <strong>Entradas:</strong>
                    <ul>
                        <li><strong>u</strong>: vector de tres dimensiones.</li>
                        <li><strong>v</strong>: vector de tres dimensiones.</li>
                        <li><strong>w</strong>: vector de tres dimensiones.</li>
                    </ul>
                </p>
                <hr />
                <p>
                    Valores para el programa:
                </p>
                <p>
                    <code>u</code> = (<input type="number" name="ux" id="ux" value={this.state.ux} onChange={this.actualizarCampo} />, <input type="number" name="uy" id="uy" value={this.state.uy} onChange={this.actualizarCampo} />, <input type="number" name="uz" id="uz" value={this.state.uz} onChange={this.actualizarCampo} />)
                </p>
                <p>
                    <code>v</code> = (<input type="number" name="vx" id="vx" value={this.state.vx} onChange={this.actualizarCampo} />, <input type="number" name="vy" id="vy" value={this.state.vy} onChange={this.actualizarCampo} />, <input type="number" name="vz" id="vz" value={this.state.vz} onChange={this.actualizarCampo} />)
                </p>
                <p>
                    <code>w</code> = (<input type="number" name="wx" id="wx" value={this.state.wx} onChange={this.actualizarCampo} />, <input type="number" name="wy" id="wy" value={this.state.wy} onChange={this.actualizarCampo} />, <input type="number" name="wz" id="wz" value={this.state.wz} onChange={this.actualizarCampo} />)
                </p>
                <hr></hr>
                <p>
                    <strong>Salidas:</strong>
                    <ul>
                        <li><strong>Área:</strong> <code>{this.state.area}</code> unidades cuadradas.</li>
                        <li><strong>Volumen:</strong> <code>{this.state.volumen}</code> unidades cúbicas.</li>
                    </ul>
                    <strong>Gráfica:</strong>
                </p>
                <div id="grafica-programa-2" />
            </div>
        )
    }
}

export default SegundoPrograma;