import { useEffect } from "react";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
const ThreeDProductsHero = () => {
  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      30,
      window.innerWidth / window.innerHeight,
      0.1,
      100,
    );

    camera.position.set(0, 3, 12);

    const d = ["red", "white", "red", "white", "blue", "purple"];
    scene.add(camera);

    const orbitRadius = 6;
    const totalOuterSpheres = 5;

    for (let index = 0; index < 6; index++) {
      const meshGeometry = new THREE.SphereGeometry(1, 32, 32);
      const meshMaterial = new THREE.MeshBasicMaterial({ color: d[index] });
      const cube = new THREE.Mesh(meshGeometry, meshMaterial);

      const angle = (index / 4) * (Math.PI * 2);

      cube.position.x = orbitRadius * Math.cos(angle);
      cube.position.z = orbitRadius * Math.sin(angle);

      cube.position.y = 1.5;

      const group = new THREE.Group();
      group.add(cube);
      scene.add(group);
    }
    const canvas = document.getElementById("canvas");

    const renderer = new THREE.WebGLRenderer({ canvas });
    // renderer.render(scene, camera);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      renderer.setSize(window.innerWidth, window.innerHeight);
      camera.updateProjectionMatrix();
    };

    window.addEventListener("resize", handleResize);

    const controls = new OrbitControls(camera, canvas);
    controls.target.set(0, 0, 0);
    controls.enableDamping = true; // Enables smooth deceleration/inertia
    controls.dampingFactor = 0.05;
    // controls.target.set(0, 1.5, 0);
    controls.enableZoom = false;
    let animationFrameId;
    function animate() {
      animationFrameId = requestAnimationFrame(animate);
      controls.update();
      renderer.render(scene, camera);
    }

    animate();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
    };
  }, []);

  return (
    <div className="w-full h-full overflow-hidden">
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default ThreeDProductsHero;
