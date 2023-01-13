import React, { useRef, useState } from 'react';
import { useParams } from "react-router-dom";

import { useLoader } from "@react-three/fiber";
import * as THREE from "three";

import { OrbitControls, Stars } from "@react-three/drei";
import { TextureLoader } from "three";

 import { PlanetService, ListMonstresPlanetService } from '../../services/planet.service';
 import Marker from '../Monsters/Marker';
 import Monster from '../Monsters/Monster';


const Planet = ({enable, setEnable}) => {

  let { id } = useParams();
  let result = PlanetService(id);  
  let monstres = ListMonstresPlanetService(id); 

  return (
    <>
      {(result) &&      
        <ShowPlanet planet={result} enable={enable} setEnable={setEnable}>
          
        </ShowPlanet>          
      }   
      {monstres?.map((monstre, idx) => (
            <Monster monstre={monstre} key={idx} />
          ))}    
    </>
  )
};

const ShowPlanet = (props) => {
  
  const globeRef = useRef();

  const colorMap = useLoader(TextureLoader, props.planet.img);

  const [markers, addMarkers] = useState([]);

  function setPoints(e) {
    if (props.enable) {    
      var gr = globeRef.current;
      var mesh = new THREE.Mesh();
      
      mesh.position.x = e.point.x;
      mesh.position.y = e.point.y;
      mesh.position.z = e.point.z;
      const geometry = new THREE.SphereGeometry(0.03, 8, 8);
      const material = new THREE.MeshStandardMaterial({ color: 0xff0000 });
      const sphere = new THREE.Mesh(geometry, material);
      mesh.add(sphere);
      mesh.parent = gr;

      const meshTest = <div> {mesh}</div> ;
      // document.getElementById('root').append(mesh.raycast);

      addMarkers( markers => [...markers, <Marker e={e} planet={props.planet} />]);
      props.setEnable(false);
    }
  }

  return (
    <>
      {(colorMap) &&
        <>
          <ambientLight intensity={0.15} />
          <pointLight color="#fff6e4" position={[-20, 0, 0]} intensity={1.5} autoRotate={true} />
          <Stars radius={300} depth={60} count={20000} factor={7} saturation={0} fade={true} />
          <mesh ref={globeRef} onClick={(e) => setPoints(e)}>
            <sphereGeometry args={[1, 64, 32]} />
            <meshStandardMaterial map={colorMap} metalness={0.2} roughness={0.7} />
            {/* <meshPhongMaterial map={colorMap} /> */}
            <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={1} panSpeed={0.5} rotateSpeed={0.4} autoRotate={false} />
          </mesh>
          {markers.map( e =>
          <> {e} </>
          )} 
          
        </>
      }
    </>
  );
}

export default Planet;
