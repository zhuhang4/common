import ThreePreload from "./ThreePreload";
import ThreeShader from "./ThreeShader.js";
import { Monitor } from "./lib/GLPerf.js"
// import * as THREE from './lib/three.min.js'
import * as dat from 'dat.gui';
export default class ThreeMain {

    constructor(cvs) {
        //镜头旋转
        this.ctha = 0;
        this.bool_render = true;
        this.assets3D = new ThreePreload();

        this.renderer = new THREE.WebGLRenderer({ canvas: cvs, antialias: true, alpha: true});
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.shadowMap.enabled = true;
        this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
        this.renderer.setClearColor(0xffff00,0.5);

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(33, window.innerWidth / window.innerHeight, 1, 13000);
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.position.z = 650;
        this.camera.position.set(-359, 226, 359);
        this.camera.rotation.set(-0.57, -0.68, -0.38);

        this.ambientLight = new THREE.DirectionalLight(0xffffff, .1);
        this.ambientLight.position.set(100, 100, 100)
        this.scene.add(this.ambientLight);

        this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
        this.controls.rotateSpeed = 0.5;
        this.controls.minDistance = 0;
        this.controls.maxDistance = 6000;

        this.gui = new dat.GUI();
        this.gui.domElement.parentElement.style.zIndex=9999;
        // console.log(document.getElementsByClassName('.dg.ac'));
        // document.getElementsByClassName('dg.ac')[0].style.zIndex=9999;
        console.log(Math.floor(-0.));
    }
    init() {

        this.addGLPer();


        this.addShader();
        // this.addStars();
        // this.addModel();
        // this.setupPostprocessing();
        // this.setupGUI();
        // this.addRenderTargetImage();
        // this.myProton=new MyProton(this.scene,this.camera,this.renderer);

        window.addEventListener('resize', this.onWindowResize.bind(this), false);
        this.onWindowResize();
        this.animate();
    }
    addGLPer() {
        this.glPerf = new Monitor(this.renderer.domElement)
    }
    addShader() {
        this.threeshader = new ThreeShader();
        this.scene.add(this.threeshader.mesh);

        // let folder = this.gui.addFolder('shadertest');        
        // folder.add(this.shaderTest.material.uniforms.speed,'value',0,10);
        // folder.open();

        // let folder2 = this.gui.addFolder('radical blur');        
        // folder2.add(this.shaderTest.material.uniforms.GlowRange,'value',0,100);
        // folder2.open();
    }
    addModel() {
        console.log(window.innerWidth, window.innerHeight);
        let loader = new THREE.GLTFLoader();
        loader.load(
            // resource URL
            // 'assets/box.gltf',
            'assets/grass.gltf',
            // 'assets/bugatii.gltf',
            // called when the resource is loaded
            (gltf) => {

                gltf.scene.scale.set(50, 50, 50);
                this.scene.add(gltf.scene);
                // gltf.scene.layers.set(1)
                // gltf.scene.castShadow=true;
                let len = gltf.scene.children.length
                console.log(gltf.scene)
                for (let i = 0; i < len; i++) {

                    if (gltf.scene.children[i].name == 'Cube104') {
                        console.log(gltf.scene.children[i])
                    }

                    if (gltf.scene.children[i].name.substr(0, 4) == 'Spot') {
                        let o3d = new THREE.Object3D();
                        o3d.position.set(gltf.scene.children[i].position.x, 0, gltf.scene.children[i].position.z)
                        gltf.scene.add(o3d);
                        let spotL = new THREE.SpotLight(0xffffff, 5);
                        spotL.position.set(gltf.scene.children[i].position.x, gltf.scene.children[i].position.y, gltf.scene.children[i].position.z);
                        spotL.scale.set(gltf.scene.children[i].scale.x, gltf.scene.children[i].scale.y, gltf.scene.children[i].scale.z);
                        spotL.target = o3d;
                        gltf.scene.add(spotL);
                        spotL.angle = 0.5;
                        spotL.penumbra = 1;
                        spotL.castShadow = true;
                        // spotL.layers.set(1);
                        // let spotHelper=new THREE.SpotLightHelper(spotL);
                        // spotHelper.scale.set(gltf.scene.children[i].scale.x, gltf.scene.children[i].scale.y, gltf.scene.children[i].scale.z)
                        // this.arrhelper.push(spotHelper);
                        // gltf.scene.add(spotHelper);
                    }
                    else {
                        gltf.scene.children[i].castShadow = true;
                    }
                }

                // gltf.animations; // Array<THREE.AnimationClip>
                // gltf.scene; // THREE.Scene
                // gltf.scenes; // Array<THREE.Scene>
                // gltf.cameras; // Array<THREE.Camera>
                // gltf.asset; // Object

            },
            // called while loading is progressing
            function (xhr) {

                console.log((xhr.loaded / xhr.total * 100) + '% loaded');

            },
            // called when loading has errors
            function (error) {
                console.log(error)
                console.log('An error happened');

            }
        );
        this.renderer.gammaOutput = true;
        this.renderer.gammaFactor = 2.2;

        //Create a plane that receives shadows (but does not cast them)
        var planeGeometry = new THREE.PlaneBufferGeometry(520, 520, 32, 32);
        var planeMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 1 })
        var plane = new THREE.Mesh(planeGeometry, planeMaterial);
        plane.receiveShadow = true;
        this.scene.add(plane);
        plane.position.set(100, 1, -100);
        plane.rotation.set(-Math.PI / 2, 0, 0);

        // this.ptLight.layers.set(1);
        // this.ptLight2.layers.set(1);
    }
    addStars() {
        let geometry = new THREE.Geometry();
        for (var i = 0; i < 10000; i++) {
            var vertex = new THREE.Vector3();
            vertex.x = THREE.Math.randFloatSpread(2000);
            vertex.y = THREE.Math.randFloatSpread(2000);
            vertex.z = THREE.Math.randFloatSpread(2000);
            geometry.vertices.push(vertex);
        }
        let particles = new THREE.Points(geometry, new THREE.PointsMaterial({
            color: 0x888888
        }));
        this.scene.add(particles);
    }
    onWindowResize(event) {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

    animate() {
        if (this.bool_render) {
            requestAnimationFrame(this.animate.bind(this));
            // animateEmitter();
            this.camera.lookAt(this.scene.position);
            this.renderer.render(this.scene, this.camera);
            if (this.glPerf) {
                this.glPerf.update()
            }

            if (this.myProton) {
                this.myProton.update();
            }
        }
    }

    animateEmitter() {
        tha += .0;
        if (line_emitter1) {
            line_emitter1.p.x = R * Math.cos(tha);
            line_emitter1.p.y = R * Math.sin(tha);
        }
        if (line_emitter2) {
            line_emitter2.p.x = R * Math.cos(tha + Math.PI / 2);
            line_emitter2.p.y = R * Math.sin(tha + Math.PI / 2);
        }

    }

    setupPostprocessing() {
        // THREE
    }


    cameraRot() {
        this.ctha += .02;
        this.camera.position.x = Math.sin(this.ctha) * 500;
        this.camera.position.z = Math.cos(this.ctha) * 500;
        this.camera.position.y = Math.sin(this.ctha) * 500;
    }
    setupGUI() {
        let folder,
            min,
            max,
            step,
            updateShaderLight = () => {
                const p = this.lightSource.position.clone(),
                    vector = p.project(this.camera),
                    x = (vector.x + 1) / 2,
                    y = (vector.y + 1) / 2;
                this.vlShaderUniforms.lightPosition.value.set(x, y);
            };

        updateShaderLight();

        // Bloom Controls
        // folder = this.gui.addFolder('Bloom');
        // folder.add(bloomPass, 'radius')
        //     .min(0)
        //     .max(10)
        //     .name('Radius');
        // folder.add(bloomPass, 'threshold')
        //     .min(0)
        //     .max(1)
        //     .name('Threshold');
        // folder.add(bloomPass, 'strength')
        //     .min(0)
        //     .max(10)
        //     .name('Strength');
        // folder.open();

        // Bad TV Controls
        // folder = gui.addFolder('TV');
        // folder.add(badTVPass.uniforms.distortion, 'value')
        //     .min(0)
        //     .max(10)
        //     .name('Distortion 1');
        // folder.add(badTVPass.uniforms.distortion2, 'value')
        //     .min(0)
        //     .max(10)
        //     .name('Distortion 2');
        // folder.add(badTVPass.uniforms.speed, 'value')
        //     .min(0)
        //     .max(1)
        //     .name('Speed');
        // folder.add(badTVPass.uniforms.rollSpeed, 'value')
        //     .min(0)
        //     .max(10)
        //     .name('Roll Speed');
        // folder.open();

        // // Light Controls
        folder = this.gui.addFolder('Light Position');
        folder.add(this.lightSource.position, 'x')
            .min(-50)
            .max(50)
            .onChange(updateShaderLight);
        folder.add(this.lightSource.position, 'y')
            .min(-50)
            .max(50)
            .onChange(updateShaderLight);
        folder.add(this.lightSource.position, 'z')
            .min(-50)
            .max(50)
            .onChange(updateShaderLight);
        folder.open();

        // // Volumetric Light Controls
        folder = this.gui.addFolder('Volumeteric Light Shader');
        folder.add(this.vlShaderUniforms.exposure, 'value')
            .min(0)
            .max(1)
            .name('Exposure');
        folder.add(this.vlShaderUniforms.decay, 'value')
            .min(0)
            .max(1)
            .name('Decay');
        folder.add(this.vlShaderUniforms.density, 'value')
            .min(0)
            .max(10)
            .name('Density');
        folder.add(this.vlShaderUniforms.weight, 'value')
            .min(0)
            .max(1)
            .name('Weight');
        folder.add(this.vlShaderUniforms.samples, 'value')
            .min(1)
            .max(100)
            .name('Samples');

        folder.open();
    }
}
