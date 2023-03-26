
<template>
  <div id="planet">
  </div>
</template>

<script>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import waterTexture from '@/assets/blue.jpg';
import earthTexture from '@/assets/green.png';
import mountainTexture from '@/assets/brown.png';
import snowTexture from '@/assets/ice.jpg';
import PlanetGeometry from "@/class/PlanetGeometry";
import space from '@/assets/space.jpg';

let container;
let camera;
let webGLRenderer;
let scene;
let planet;
export default {
  name: 'PlanetView',
  methods: {
    init: function () {
      container = document.querySelector( '#planet' );
      this.setScene();
      this.setCamera();
      this.setPlanetGeometry();
      this.createLights();
      this.setWebGLRenderer();
    },
    setScene: function () {
      scene = new THREE.Scene();
      // set image background space.jpg
      const loader = new THREE.TextureLoader();
      const texture = loader.load(space);
      scene.background = texture;

    },
    setCamera: function () {
      // sets the camera position and perspective
      camera = new THREE.PerspectiveCamera( 35, container.clientWidth / container.clientHeight, 0.1, 100 );
      camera.position.set( 0, 0, 15 );
    },
    setPlanetGeometry: function () {
      // creates the planet geometry and adds it to the scene
      const planetGeometry = new PlanetGeometry(2, 32, 32, [
        waterTexture, waterTexture, waterTexture, waterTexture, waterTexture, waterTexture,
        earthTexture, earthTexture, earthTexture, earthTexture,
        mountainTexture,
        snowTexture
      ]);

      const planetMesh = new THREE.Mesh(planetGeometry, planetGeometry.material);
      scene.add(planetMesh);
      planet = planetMesh;
    },

    createLights: function () {
      // creates the lights and adds them to the scene
      const hemisphereLight = new THREE.HemisphereLight(
          0xfceda9, // sky color
          0x1f1d1d, // ground color
          2, // intensity
      );
      const directionalLight = new THREE.DirectionalLight( "#FFFFFF", 5 );
      directionalLight.position.set( 10, 10, 10 );
      scene.add( hemisphereLight, directionalLight );
    },
    update: function () {
      planet.rotation.y += 0.005;
    },
    render: function () {
      webGLRenderer.render( scene, camera );
    },
    setWebGLRenderer: function () {
      webGLRenderer = new THREE.WebGLRenderer({antialias: true});
      webGLRenderer.setSize( container.clientWidth, container.clientHeight );
      webGLRenderer.setPixelRatio( window.devicePixelRatio );
      webGLRenderer.gammaFactor = 2;
      webGLRenderer.gammaOutput = true;
      webGLRenderer.physicallyCorrectLights = true;
      container.appendChild( webGLRenderer.domElement );
      webGLRenderer.setAnimationLoop(() => {
        this.update();
        this.render();
      });
    },
    onWindowResize: function () {
      camera.aspect = container.clientWidth / container.clientHeight;
      camera.updateProjectionMatrix();
      webGLRenderer.setSize( container.clientWidth, container.clientHeight );
    }
  },
  mounted: function () {
    this.init();
    window.addEventListener( 'resize', this.onWindowResize );
    new OrbitControls(camera, webGLRenderer.domElement);
  }
}
</script>

<style>
#planet {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>

