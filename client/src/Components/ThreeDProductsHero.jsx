import { useEffect, useRef } from "react";

import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import quran_kareem_model from "../assets/models/al_quran.glb";
import koofi_model from "../assets/models/koofi.glb";
import perfumes_model from "../assets/models/perfumes.glb";
import tasbeeh_model from "../assets/models/tasbeeh.glb";
import prayer_mat_model from "../assets/models/prayer_mat.glb";
import books_model from "../assets/models/books.glb";

const ThreeDProductsHero = () => {
  const hero_ref = useRef(null);
  const model_ref = useRef(null);
  const mouse = useRef({ x: 0, y: 0 });
  useEffect(() => {
    if (!hero_ref.current) return;

    const modelPaths = [
      quran_kareem_model,
      koofi_model,
      perfumes_model,
      tasbeeh_model,
      prayer_mat_model,
      books_model,
    ];
    const scene = new THREE.Scene();
    scene.background = new THREE.Color("#0c0c0c");

    const camera = new THREE.PerspectiveCamera(
      90,
      hero_ref.current.clientWidth / hero_ref.current.clientHeight,
      0.1,
      100,
    );

    camera.position.set(0, 15, 7);
    camera.lookAt(0, 3, 0);

    scene.add(camera);

    const ambientLight = new THREE.AmbientLight("white", 2);
    scene.add(ambientLight);

    const loader = new GLTFLoader();

    let mouseAnimate = (event) => {
      mouse.current.x = event.clientX / window.innerWidth - 0.5;
      const normalizedY = 4 + (event.clientY / window.innerHeight) * 0.4;
      mouse.current.y = normalizedY;
      if (model_ref.current) {
        model_ref.current.lookAt(mouse.current.x, mouse.current.y, 1);
      }
    };

    window.addEventListener("mousemove", mouseAnimate);

    loader.load(quran_kareem_model, (gltf) => {
      const model = gltf.scene;
      model.position.y = 4;
      model.scale.set(5, 5, 5);
      model_ref.current = model;
      scene.add(model);
    });

    const canvas = document.getElementById("canvas");
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.0;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(
      hero_ref.current.clientWidth,
      hero_ref.current.clientHeight,
    );
    // renderer.render(scene, camera);

    const handleResize = () => {
      if (!hero_ref.current) return;
      const width = hero_ref.current.clientWidth;
      const height = hero_ref.current.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);

      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      window.removeEventListener("mousemove", mouseAnimate);
    };
  });

  return (
    <div className="w-full h-full relative overflow-hidden bg-dark flex flex-col justify-center items-center gap-2">
      <div className="flex flex-col justify-center items-center text-center gap-4 p-6 sm:p-10 w-full">
        <h1 className="font-cinzel-bold uppercase text-beige text-3xl sm:text-5xl">
          Premium Quran Kareem
        </h1>
        <span className="text-beige/80 font-lato-light text-center capitalize text-lg sm:text-2xl max-w-[500p]">
          A beautifully designed edition of the Holy Quran, perfect for daily
          recitation, reflection, and spiritual connection.
        </span>
        <button className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-mehroon text-beige font-semibold shadow-mdhover:bg-brown/90 hover:scale-105 transition-all duration-300 font-cinzel-bold">
          Shop Now
          <span className="text-lg">→</span>
        </button>
      </div>
      <div className="w-full h-[600px]" ref={hero_ref}>
        <canvas id="canvas" className="bg-red-100"></canvas>
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
