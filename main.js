import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/Addons.js';

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});
renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
camera.position.setZ(30);



const geometry = new THREE.TorusGeometry(10, 3, 16, 100);
const material = new THREE.MeshStandardMaterial({color: 0xFF6347});
const torus = new THREE.Mesh(geometry, material);

//scene.add(torus);

const pointLight = new THREE.PointLight( 0xffffff, 50 );
pointLight.position.set(10, 0, 0);
const ambienLight = new THREE.AmbientLight(0x404040, 20);
scene.add(pointLight, ambienLight);

//const lightHelper = new THREE.PointLightHelper(pointLight);
//const gridHelper = new THREE.GridHelper(200, 50);
//scene.add(lightHelper, gridHelper);

const controls = new OrbitControls(camera, renderer.domElement);

const spaceTexture = new THREE.TextureLoader().load('images/space.jpg');
scene.background = spaceTexture;


const starGeometry = new THREE.SphereGeometry(0.25, 24, 24);
const starMaterial = new THREE.MeshStandardMaterial({color: 0xffffff});

function addStar(){
    const star = new THREE.Mesh(starGeometry, starMaterial);
    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(200)); 
    star.position.set(x,y,z);
    scene.add(star);
}
Array(200).fill().forEach(addStar);


const karolisTexture = new THREE.TextureLoader().load('images/Karolis.jpg');

const karolis = new THREE.Mesh(
    new THREE.BoxGeometry(3,3,3),
    new THREE.MeshBasicMaterial({map: karolisTexture})
);

scene.add(karolis);

karolis.position.x = 3;
karolis.position.y = 0;
karolis.position.z = -2;


const moonTexture = new THREE.TextureLoader().load('images/moon.jpg')
const moonNormalTexture = new THREE.TextureLoader().load('images/normal.jpg')
const moon = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: moonTexture,
        normalMap: moonNormalTexture
    })
);
scene.add(moon);

moon.position.x = 15;
moon.position.y = 5;
moon.position.z = 11;
//moon.position.setX(-10);

const earthTexture = new THREE.TextureLoader().load('images/earth.jpg')
const earthNormalTexture = new THREE.TextureLoader().load('images/normal.jpg')
const earth = new THREE.Mesh(
    new THREE.SphereGeometry(3,32,32),
    new THREE.MeshStandardMaterial({
        map: earthTexture,
        normalMap: earthNormalTexture
    })
);
scene.add(earth);

earth.position.x = 10;
earth.position.y = 3;
earth.position.z = -3;


function moveCamera(){
    const t = document.body.getBoundingClientRect().top;
    moon.rotation.x += 0.05;
    moon.rotation.y += 0.075;
    moon.rotation.z += 0.05;

    earth.rotation.x += 0.01;
    earth.rotation.y += 0.005;
    earth.rotation.z += 0.005;

    karolis.rotation.y += 0.01
    karolis.rotation.z += 0.01

    camera.position.x = t * -0.01;
    camera.position.y = t * -0.002;
    camera.position.z = t * -0.002;
}
document.body.onscroll = moveCamera;


function animate(){
    requestAnimationFrame(animate);

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.005;

    controls.update();

    renderer.render(scene, camera);
}

animate();