import React, { Suspense } from 'react';
import { OrbitControls,  Stars, Html, Loader } from "@react-three/drei";
import SolarSystemPlanet from './SolarSystemPlanet';
import { ListPlanetService } from '../../services/planet.service';

const SolarSystem = (props) => {

  let planet = ListPlanetService();
  // let planetSession = window.sessionStorage.getItem('list_planet')
  // let planet = [];
  // if(planetSession && planetSession !== "undefined") {
  //   planet = JSON.parse(planetSession)
  // } else {
  //   planet = ListPlanetService();
  //   if(planet) window.sessionStorage.setItem('list_planet', JSON.stringify(planet))
  // }

  return (
    <>
      <ambientLight intensity={0.05} />
      <pointLight color="#fff6e4" position={[0, 0, 0]} intensity={1.3} />
      <Stars radius={300} depth={60} count={10000} factor={7} saturation={0} fade={true} />
      <OrbitControls enableZoom={true} enablePan={true} enableRotate={true} zoomSpeed={1} panSpeed={0.5} rotateSpeed={0.4} position={[0, 0, 0]} />
      {/*<MapControls enableDamping={true} dampingFactor={0.05} screenSpacePanning={false} minDistance={100} maxDistance={500} maxPolarAngle={1.25} /> */}
      <Suspense fallback={<Html><Loader/></Html>}>
        {planet?.map((globe, idx) => (
          <SolarSystemPlanet planet={globe} key={idx} />
        ))}
      </Suspense>
    </>
  )
}

export default SolarSystem;