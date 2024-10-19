"use client";
import { motion } from "framer-motion";
import React, { useRef, useEffect, Suspense, useState } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { useGLTF, OrbitControls, Environment } from "@react-three/drei";
import * as THREE from "three";
import PulsatingButton from "@/components/ui/pulsating-button";

interface PirateSceneProps {
  onButtonClick: () => void;
}

const PirateModel = () => {
  const { scene } = useGLTF("/pirate_model.glb");
  const { camera } = useThree();
  const modelRef = useRef<THREE.Group>(null);

  useEffect(() => {
    if (modelRef.current) {
      const box = new THREE.Box3().setFromObject(modelRef.current);
      const center = box.getCenter(new THREE.Vector3());
      const size = box.getSize(new THREE.Vector3());
      const maxSize = Math.max(size.x, size.y, size.z);

      const zoomFactor = 0.55;
      const fitHeightDistance =
        (maxSize /
          (2 *
            Math.tan(
              (Math.PI * (camera as THREE.PerspectiveCamera).fov) / 360,
            ))) *
        zoomFactor;
      const fitWidthDistance =
        fitHeightDistance / (camera as THREE.PerspectiveCamera).aspect;
      const distance = Math.max(fitHeightDistance, fitWidthDistance);

      camera.position.set(center.x, center.y, center.z + distance);
      camera.lookAt(center);
      camera.updateProjectionMatrix();
    }
  }, [camera]);

  return <primitive ref={modelRef} object={scene} />;
};

const CameraTracker: React.FC<{ onProgress: (progress: number) => void }> = ({
  onProgress,
}) => {
  const { camera } = useThree();

  useFrame(() => {
    const progress = camera.position.length() / 14; // Assuming max distance is 14
    onProgress(progress);
  });

  return null;
};

const PirateScene: React.FC<PirateSceneProps> = ({ onButtonClick }) => {
  const [maxZoomDistance, setMaxZoomDistance] = useState(7);
  const [showButton, setShowButton] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handlePirateModelClick = () => {
    setMaxZoomDistance(14);
  };

  const handleCameraProgress = (progress: number) => {
    if (progress >= 0.2 && !showButton) {
      setShowButton(true);
    }
  };

  return (
    <div className="fixed inset-0">
      <Canvas className="w-full h-full" camera={{ fov: 75 }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 10]} />
        <Suspense fallback={null}>
          <PirateModel />
          <Environment preset="sunset" />
        </Suspense>
        <OrbitControls
          enablePan={true}
          minDistance={2}
          maxDistance={maxZoomDistance}
        />
        <mesh onClick={handlePirateModelClick} visible={false}>
          <boxGeometry args={[100, 100, 100]} />
          <meshBasicMaterial transparent opacity={0} />
        </mesh>
        <CameraTracker onProgress={handleCameraProgress} />
      </Canvas>
      {showButton && (
        <div className="absolute inset-x-0 bottom-[20%] flex justify-center">
          <PulsatingButton
            onClick={onButtonClick}
            className="font-mono text-lg px-6 py-3 bg-black border border-green-500 text-green-400 rounded-md shadow-lg
                       transition-all duration-200 ease-in-out
                       hover:bg-green-900 hover:text-white hover:border-white
                       focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
          >
            <span className="text-green-400">$</span>{" "}
            <span className="text-yellow-300">sudo</span>{" "}
            <span className="text-blue-300">join-pirate-crew</span>{" "}
            <span className="text-red-300">--yo-ho-ho</span>
          </PulsatingButton>
        </div>
      )}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 w-full px-4 sm:w-auto">
        <motion.div
          className="relative bg-black bg-opacity-50 text-white px-3 py-2 sm:px-4 sm:py-2 rounded-full font-mono text-xs sm:text-sm cursor-help text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.5 }}
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)} // Toggle tooltip on click for mobile
        >
          Scroll to explore this pirate&apos;s paradise!
          {showTooltip && (
            <motion.div
              className="absolute bottom-full transform -translate-x-1/2 mb-2 p-2 bg-white text-black rounded shadow-lg text-xs w-64 sm:w-96 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
            >
              P.S. - Couldn&apos;t find desert pirates, so tropical island it
              is!
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  );
};

export default PirateScene;
