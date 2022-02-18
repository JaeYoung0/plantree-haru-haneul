import { Suspense, useRef } from "react";
import * as S from "./Earth.style";
import { Canvas, MeshProps, useFrame, useLoader } from "@react-three/fiber";

import EarthLightsMap from "./assets/textures/10k_earthlights.jpg";
import EarthCloudsMap from "./assets/textures/earthcloudmap.jpg";
import EarthSpecularMap from "./assets/textures/earthspec1k.jpg";
import * as THREE from "three";
import { Euler, TextureLoader } from "three";

import { OrbitControls, Stars } from "@react-three/drei";

/**
 * 공간 - Scene
 * 피사체 : 부피, 질감 - Mesh : Geometry, Material
 * 카메라 - Camera
 * 빛 - Light
 */
function EarthGlobe() {
  const [lightsMap, cloudsMap, specularMap] = useLoader(TextureLoader, [
    EarthLightsMap.src,
    EarthCloudsMap.src,
    EarthSpecularMap.src,
  ]);
  console.log(lightsMap);

  const earthRef = useRef<MeshProps>();
  const cloudsRef = useRef<MeshProps>();

  useFrame(({ clock }) => {
    const elapsedTime = clock.getElapsedTime();
    earthRef.current?.setRotationFromEuler?.(new Euler(0, elapsedTime / 6));
    cloudsRef.current?.setRotationFromEuler?.(new Euler(0, elapsedTime / 6));
  });

  return (
    <>
      <ambientLight intensity={0.5} />
      <Stars radius={300} depth={100} count={5000} saturation={50} factor={5} />
      <mesh ref={cloudsRef}>
        <sphereGeometry args={[1.005, 32, 32]} />
        <meshPhongMaterial
          map={cloudsMap}
          opacity={0.4}
          depthWrite
          transparent
          side={THREE.DoubleSide}
        />
      </mesh>
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 32, 32]} />
        {/* meshPhongMaterial: 반사 하이라이트가 있는 광택있는 표면 재질을 표현, 빛이 없으면 그냥 검은색으로 보임 */}
        <meshPhongMaterial specularMap={specularMap} />

        {/* A standard physically based material, using Metallic-Roughness workflow. */}
        <meshStandardMaterial
          map={lightsMap}
          normalMap={cloudsMap}
          // metalness={0.3}
          // roughness={0.5}
        />

        {/* Orbit controls allow the camera to orbit around a target.
         */}
        <OrbitControls
          enableZoom
          enablePan
          enableRotate
          zoomSpeed={0.6}
          panSpeed={0.6}
          rotateSpeed={1}
        />
      </mesh>
    </>
  );
}

function Earth() {
  return (
    <S.CanvasContainer>
      <Canvas>
        <Suspense fallback={null}>
          <EarthGlobe />
        </Suspense>
      </Canvas>
    </S.CanvasContainer>
  );
}

export default Earth;
