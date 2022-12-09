import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import fragment from "./shaders/fragment.glsl?raw";
import vertex from "./shaders/vertex.glsl?raw";
import fragment02 from "./shaders/fragment02.glsl?raw";
import vertex02 from "./shaders/vertex02.glsl?raw";

import { DotScreenShader } from "./CustomShader";
import { EffectComposer } from "three/examples/jsm/postprocessing/EffectComposer.js";
import { RenderPass } from "three/examples/jsm/postprocessing/RenderPass.js";
import { ShaderPass } from "three/examples/jsm/postprocessing/ShaderPass.js";

class App {
  /**
   * レンダー
   */
  static get RENDERER_SETTING() {
    return {
      clearColor: 0x111111,
      width: window.innerWidth,
      height: window.innerHeight,
    };
  }

  /**
   * マテリアル
   */
  static get MATERIAL_SETTING() {
    return {
      color: 0xffffff,
    };
  }
  /**
   * カメラ
   */
  static get CAMERA_PARAM() {
    return {
      fovy: 60,
      aspect: window.innerWidth / window.innerHeight,
      near: 0.1,
      far: 20000.0,
      x: 0.0,
      y: 0.0,
      z: 0.5,
      lookAt: new THREE.Vector3(0.0, 0.0, 0.0),
    };
  }

  /**
   * @constructor
   */
  constructor() {
    this.renderer;
    this.scene;
    this.camera;
    this.geometory;
    this.material;
    this.mesh;
    this.array = [];
    this.group;
    this.controls;
    this.composer;

    this.ambientLight;
    this.directionalLight;

    this.loader;
    this.texture;

    this.raycaster;

    this.width = window.innerWidth;
    this.height = window.innerHeight;

    this.render = this.render.bind(this);
  }

  _setRenderer() {
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    this.renderer.setClearColor(0xdad4cc, 1);
    this.renderer.setSize(App.RENDERER_SETTING.width, App.RENDERER_SETTING.height);
    // this.composer.setSize(App.RENDERER_SETTING.width, App.RENDERER_SETTING.height);
    const canvas = document.querySelector("#webgl");
    canvas.appendChild(this.renderer.domElement);
  }

  _setScene() {
    this.scene = new THREE.Scene();
  }

  _setCamera() {
    this.camera = new THREE.PerspectiveCamera(App.CAMERA_PARAM.fovy, App.CAMERA_PARAM.aspect, App.CAMERA_PARAM.near, App.CAMERA_PARAM.far);
    this.camera.position.set(App.CAMERA_PARAM.x, App.CAMERA_PARAM.y, App.CAMERA_PARAM.z);
    this.camera.lookAt(App.CAMERA_PARAM.lookAt);
    this.camera.updateProjectionMatrix();
    this.controls = new OrbitControls(this.camera, document.body);
  }

  _setMesh() {
    this.loader = new THREE.TextureLoader();
    this.texture = this.loader.load("../public/img.jpg");
    this.geometry = new THREE.PlaneGeometry(3, 2, 100, 100);

    this.material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
        uTexture: { value: this.texture },
        uImageAspect: { value: 1920 / 1280 }, // 画像のアスペクト
        uPlaneAspect: { value: 800 / 500 }, // プレーンのアスペクト
      },
      side: THREE.DoubleSide,
      vertexShader: vertex,
      fragmentShader: fragment,
    });
    this.mesh = new THREE.Mesh(this.geometry, this.material);
    // this.mesh.rotation.z = 0.2;
    this.scene.add(this.mesh);
  }

  _setBox() {
    // this.Boxgeometry = new THREE.CircleGeometry(0.2, 520);
    this.Boxgeometry = new THREE.SphereGeometry(0.2, 200, 200, 200);
    this.Boxmaterial = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0.0 },
      },
      side: THREE.DoubleSide,
      vertexShader: vertex02,
      fragmentShader: fragment02,
      // wireframe: true,
    });
    this.Boxmesh = new THREE.Mesh(this.Boxgeometry, this.Boxmaterial);
    this.Boxmesh.position.z = 0.01;
    this.scene.add(this.Boxmesh);
  }

  initPost() {
    this.composer = new EffectComposer(this.renderer);
    this.composer.addPass(new RenderPass(this.scene, this.camera));
    const effect1 = new ShaderPass(DotScreenShader);
    effect1.uniforms["scale"].value = 4;
    this.composer.addPass(effect1);
  }

  init() {
    this._setRenderer();
    this._setScene();
    this._setCamera();
    // this._setMesh();
    this._setBox();
    this.initPost();
  }

  render() {
    requestAnimationFrame(this.render);
    this.controls.update();
    // this.mesh.material.uniforms.uTime.value += 0.005;
    this.Boxmaterial.uniforms.uTime.value += 0.002;
    this.Boxmesh.rotation.x += 0.001;
    this.Boxmesh.rotation.y += 0.001;

    // this.renderer.render(this.scene, this.camera);
    this.composer.render(this.scene, this.camera);
  }

  onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }
}

window.addEventListener("DOMContentLoaded", () => {
  const app = new App();
  app.init();
  app.render();
  window.addEventListener("resize", () => {
    app.onResize();
  });
});

export {};
