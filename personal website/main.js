import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// smooth edge effect with antialias true 
const renderer = new THREE.WebGLRenderer({antialias: true})
renderer.outputColorSpace = THREE.SRGBColorSpace;

renderer.setSize(document.getElementById('model3d').clientWidth, document.getElementById('model3d').clientHeight);
// renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0x222222);  // default color on screen with no model 
renderer.setPixelRatio(window.devicePixelRatio);  // renders across different devices 

// add shadows
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;

document.getElementById('model3d').appendChild(renderer.domElement);  // add renderer to html doc 

// set up scene 
const scene = new THREE.Scene()

// set up camera, asepct ratio, near/far plane, position 
const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.set(5, 5, 10);
camera.lookAt(0, 0, 0);  // camera looks at origin of scene 

// orbiting controls 
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.minDistance = 5;
controls.maxDistance = 20;
controls.minPolarAngle = 0;
controls.maxPolarAngle = Math.PI;
controls.autoRotate = true;
controls.autoRotateSpeed = -1.15;
controls.target = new THREE.Vector3(0, 0, 0);
controls.update();

// add geometry to render scene properly 
// const groundGeometry = new THREE.PlaneGeometry(20, 20, 32, 32);
// groundGeometry.rotateX(-Math.PI / 2);  // makes scene sit flat on ground 
// const groundMaterial = new THREE.MeshStandardMaterial({
    // color: 0x222222,
    // side: THREE.DoubleSide  
// });  // render both sides of plane 
// const groundMesh = new THREE.Mesh(groundGeometry, groundMaterial);
// groundMesh.castShadow = false;
// groundMesh.receiveShadow = true;
// scene.add(groundMesh);

// add light to see model 
const spotLight = new THREE.SpotLight(0xffffff, 900, 100, 0.2, 1);
spotLight.position.set(0, -30, 0);
spotLight.castShadow = true;
spotLight.shadow.bias = -0.001;
scene.add(spotLight)

const bottomdirectionalLight = new THREE.DirectionalLight(0xffffff, 5);  // white light 
bottomdirectionalLight.position.set(0, 30, 0).normalize();  // position 
// directionalLight.lookAt(0, 1, 0);  // makes light look at cat
bottomdirectionalLight.castShadow = true;  // shadow casting
scene.add(bottomdirectionalLight);

const leftdirectionalLight = new THREE.DirectionalLight(0xffffff, 1.2); 
leftdirectionalLight.position.set(-30, 0, 0).normalize();
leftdirectionalLight.castShadow = true;
scene.add(leftdirectionalLight);

const rightdirectionalLight = new THREE.DirectionalLight(0xffffff, 1.2); 
rightdirectionalLight.position.set(30, 0, 0).normalize();
leftdirectionalLight.castShadow = true;
scene.add(rightdirectionalLight);

const frontdirectionalLight = new THREE.DirectionalLight(0xfffffff, 1.5);
frontdirectionalLight.position.set(0, 0, 30).normalize();
frontdirectionalLight.castShadow = true;
scene.add(frontdirectionalLight);

const backdirectionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
backdirectionalLight.position.set(0, 0, -30).normalize();
backdirectionalLight.castShadow = true;
scene.add(backdirectionalLight);

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);  // soft white light
scene.add(ambientLight);

// create gltf loader 
const loader = new GLTFLoader().setPath('minecraft-jellie-cat/source/'); 
loader.load('scene.gltf', (gltf) => {
    console.log('Loading model'); 
    const mesh = gltf.scene;


    mesh.traverse((child) => {
        if (child.isMesh) {
            child.castShadow = true;
            child.receiveShadow = true;
        }
    });
    mesh.position.set(0, -1.5, -1);
    mesh.scale.set(5, 5, 5);
    scene.add(mesh);
// },  undefined, function(error) {
    // console.error("An error occurred during model loading", error); 
});  // check file path 

// render scene 

// document.getElementById('progress-container').style.display = 'none';
// }, (xhr) => {
  // console.log(`loading ${xhr.loaded / xhr.total * 100}%`);
// }, (error) => {
  // console.error(error);
// });

window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();
  renderer.setSize(window.innerWidth, window.innerHeight);
});

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera); 
}

animate();