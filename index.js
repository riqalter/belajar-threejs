import * as THREE from "three";
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";
import { UnrealBloomPass } from "three/addons/postprocessing/UnrealBloomPass.js";
import { OutputPass } from "three/addons/postprocessing/OutputPass.js";


// setup threejs kek biasa

const scene = new THREE.Scene();
    scene.background = new THREE.Color( 'black' );

const camera = new THREE.PerspectiveCamera( 30, innerWidth/innerHeight );
    camera.position.set( 0, 0, 10 );
    camera.lookAt( scene.position );

const renderer = new THREE.WebGLRenderer( {antialias: true} );
    renderer.setSize( innerWidth, innerHeight );
    renderer.setAnimationLoop( animationLoop );
    document.body.appendChild( renderer.domElement );
			
const light = new THREE.DirectionalLight( 'white' );
    light.position.set( 0, 0, 1 );
    scene.add( light );


// ya gitu dah, liat dokumentasinya diwebnya threejs

const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass(
				new THREE.Vector2( innerWidth, innerHeight ),
				0.5, 0.5, 0.1
		);

const outputPass = new OutputPass( THREE.ReinhardToneMapping );

const composer = new EffectComposer( renderer );
		composer.addPass( renderScene );
		composer.addPass( bloomPass );
		composer.addPass( outputPass );

window.addEventListener( "resize", (event) => {
    camera.aspect = innerWidth/innerHeight;
    camera.updateProjectionMatrix( );
    renderer.setSize( innerWidth, innerHeight );
		composer.setSize( innerWidth, innerHeight );
});


const object = new THREE.Mesh(
			new THREE.BoxGeometry( ),
            new THREE.MeshNormalMaterial( )
    );	
		scene.add( object );


function animationLoop( t )
{
    object.rotation.set( Math.sin( t/700 ), Math.cos( t/800 ), 0 );
    composer.render( scene, camera );
}