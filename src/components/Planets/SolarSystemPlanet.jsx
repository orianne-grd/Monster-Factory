import React, { useRef } from "react";

import { useFrame, useLoader } from "@react-three/fiber";
import { TextureLoader } from "three";
import { useNavigate } from "react-router-dom";


const SolarSystemPlanet = ({ planet }) => {
    let isSun = planet.pos === 0 ? true : false;
    let elapsedTime;

    const colorMap = useLoader(TextureLoader, planet.img);
    const globeRef = useRef();

    useFrame(({ clock }) => {
        if (!isSun) {
            elapsedTime = clock.getElapsedTime();
            globeRef.current.rotation.y = elapsedTime / planet.speedRotation;
            globeRef.current.children.forEach(element => element.rotation.y = elapsedTime / planet.speedRotation);
        }
    })

    const navigate = useNavigate();

    return (
        <>
            <group ref={globeRef} >
                <mesh position={[planet.pos, 0, planet.pos]} scale={planet.scale} onClick={() =>
                    navigate("/planet/" + planet.id)
                }>
                    <sphereGeometry args={[1, 32, 32]} />
                    {isSun ? (
                        <meshBasicMaterial map={colorMap} />
                    ) : (
                        <meshStandardMaterial map={colorMap} metalness={0.2} roughness={0.7} />)
                    }
                </mesh>
            </group>
            {!isSun &&
                <mesh rotation-x={Math.PI / 2}>
                    <torusGeometry args={[planet.pos * 1.4, 0.02, 8, 64]} />
                    <meshBasicMaterial color={'white'} />
                </mesh>
            }
        </>
    )
}

export default SolarSystemPlanet;