import { useEffect, useRef } from "react";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import quran_kareem_model from "../assets/models/al_quran.glb";
import koofi_model from "../assets/models/koofi.glb";
import perfumes_model from "../assets/models/perfumes.glb";
import tasbeeh_model from "../assets/models/tasbeeh.glb";
import prayer_mat_model from "../assets/models/prayer_mat.glb";
import books_model from "../assets/models/books.glb";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader.js";
import koofi_texture from "../assets/textures/koofi-texture.jpg";
import studio_light from "../assets/lights/light1.hdr";
import { HDRLoader } from "three/examples/jsm/loaders/HDRLoader.js";

const ThreeDProductsHero = () => {
  const hero_ref = useRef(null);
  const model_ref = useRef(null);

  useEffect(() => {
    if (!hero_ref.current) return;

    const modelPaths = [
      quran_kareem_model, //1
      koofi_model, //1
      perfumes_model,
      tasbeeh_model, //1
      prayer_mat_model,
      books_model,
    ];
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c0c0c");

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    // Front Light
    const dirLight1 = new THREE.DirectionalLight(0xffffff, 2);
    dirLight1.position.set(5, 10, 7.5);
    scene.add(dirLight1);

    // Back Fill Light (Circle ke peechhe wale models ko light up karne ke liye)
    const dirLight2 = new THREE.DirectionalLight(0xffffff, 1.5);
    dirLight2.position.set(-5, 5, -7.5);
    scene.add(dirLight2);

    // 3. HDRI Loader Setup
    const hdriLoader = new HDRLoader();

    hdriLoader.load(studio_light, (texture) => {
      texture.mapping = THREE.EquirectangularReflectionMapping;
      scene.environment = texture;
      scene.background = new THREE.Color("#0d0d0d");
    });

    const camera = new THREE.PerspectiveCamera(
      90,
      hero_ref.current.clientWidth / hero_ref.current.clientHeight,
      0.1,
      100,
    );

    //quran kareem viewer
    // camera.position.set(0, 15, 7);
    // camera.lookAt(0, 3, 0);

    //tasbeeh viewer
    // camera.position.set(0, 10, 3);
    // camera.lookAt(0, 3, 0);

    //koofi viewer
    // camera.position.set(0, 2, 3);
    // camera.lookAt(0, 3, 0);

    //prayer mat viewer
    // camera.position.set(0, 15, 6);
    // camera.lookAt(2, 9, 2);

    // scene.add(camera);

    // const loader = new GLTFLoader();

    // //// quran loader

    // loader.load(quran_kareem_model, (gltf) => {
    //   const model = gltf.scene;
    //   model.position.y = 4;
    //   model.scale.set(5, 5, 5);
    //   model_ref.current = model;
    //   scene.add(model);
    // });

    // //// tasbeeh loader
    // loader.load(tasbeeh_model, (gltf) => {
    //   const model = gltf.scene;
    //   model.position.y = 6;
    //   model.scale.set(0.1, 0.1, 0.1);
    //   model_ref.current = model;
    //   scene.add(model);
    // });

    // ////koofi loader
    // const textureLoader = new THREE.TextureLoader();
    // const koofiTexture = textureLoader.load(koofi_texture, (tex) => {
    //   tex.needsUpdate = true;
    // });
    // koofiTexture.flipY = false;
    // koofiTexture.colorSpace = THREE.SRGBColorSpace;
    // loader.load(koofi_model, (gltf) => {
    //   const model = gltf.scene;
    //   model.traverse((child) => {
    //     if (child.isMesh) {
    //       child.material.color.set("#ffffff");
    //       if (child.material.metalness !== undefined)
    //         child.material.metalness = 0;
    //       if (child.material.roughness !== undefined)
    //         child.material.roughness = 111;
    //       child.material.side = THREE.DoubleSide;
    //       child.material.map = koofiTexture;
    //       child.material.needsUpdate = true;
    //     }
    //   });
    //   model.position.y = 4;
    //   model.scale.set(3, 3, 3);
    //   model_ref.current = model;
    //   scene.add(model);
    // });

    // //// prayermat loader
    // loader.load(prayer_mat_model, (gltf) => {
    //   const model = gltf.scene;
    //   const box = new THREE.Box3().setFromObject(model);
    //   const center = box.getCenter(new THREE.Vector3());
    //   model.position.x -= center.x;
    //   model.position.y -= center.y;
    //   model.position.z -= center.z;

    //   model.scale.set(4, 2, 4);
    //   model_ref.current = model;
    //   scene.add(model);
    // });

    // // perfume viewer
    // camera.position.set(0, 13, 4);
    // camera.lookAt(0, 0, 0);

    // // perfume loader
    // loader.load(perfumes_model, (gltf) => {
    //   const model = gltf.scene;
    //   model.scale.set(2, 2, 2);
    //   model_ref.current = model;
    //   scene.add(model);
    // });

    // /// books viewer
    // camera.position.set(0, 0, 5);
    // camera.lookAt(0, 0, 0);

    // // books loader
    // loader.load(books_model, (gltf) => {
    //   const model = gltf.scene;
    //   model.scale.set(2, 2, 2);
    //   model_ref.current = model;
    //   scene.add(model);
    // });

    const canvas = document.getElementById("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.2;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      hero_ref.current.clientWidth,
      hero_ref.current.clientHeight,
    );

    const handleResize = () => {
      if (!hero_ref.current) return;
      const width = hero_ref.current.clientWidth;
      const height = hero_ref.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // const clock = new THREE.Clock();

    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      // if (model_ref.current) {
      // model_ref.current.rotation.x = clock.getElapsedTime() * 2;
      // }

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  });

  return (
    <div className="w-full h-full relative overflow bg-dark flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col justify-center items-center text-center gap-4 p-6 sm:p-10 w-full">
        <h1 className="font-cinzel-bold uppercase text-beige text-3xl sm:text-5xl">
          Premium Quran Kareem
        </h1>
        <span className="text-beige/80 font-lato-light text-center capitalize text-lg sm:text-xl max-w-[500px]">
          A beautifully designed edition of the Holy Quran, perfect for daily
          recitation, reflection, and spiritual connection.
        </span>
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mehroon text-beige font-semibold shadow-mdhover:bg-brown/90 hover:scale-105 transition-all duration-300 font-cinzel-bold">
          Shop Now
          <span className="text-lg">→</span>
        </button>
      </div>
      <div className="w-full h-[600px]" ref={hero_ref}>
        <canvas id="canvas" className=""></canvas>
      </div>
    </div>
  );
};

export default ThreeDProductsHero;
// const orbitRadius = 6;
// const totalModels = 6;
// Promise.all(modelPaths.map((path) => loader.loadAsync(path)))
//   .then((loadedGltfs) => {
//     loadedGltfs.forEach((gltf, index) => {
//       const model = gltf.scene;

//       const box = new THREE.Box3().setFromObject(model);
//       const size = box.getSize(new THREE.Vector3());
//       const maxDimension = Math.max(size.x, size.y, size.z);

//       // Desired size in Three.js units (e.g. 2 units tall)
//       const targetSize = 2;
//       const autoScale = targetSize / maxDimension;

//       const angle = (index / totalModels) * (Math.PI * 2) + Math.PI / 6;
//       model.position.x = orbitRadius * Math.cos(angle);
//       model.position.z = orbitRadius * Math.sin(angle);
//       model.position.y = 0;

//       model.scale.set(autoScale, autoScale, autoScale);

//       scene.add(model);
//     });
//   })
//   .catch((error) => {
//     console.error("Error loading GLB models:", error);
//   });
