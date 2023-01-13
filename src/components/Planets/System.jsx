import React, { Suspense } from 'react';
import SolarSystem from './SolarSystem';
import { Html, Loader } from "@react-three/drei"

const System = () => {

  return (
    <>
      <Suspense fallback={<Html><Loader/></Html>}>
          <SolarSystem/>
      </Suspense>
    </>
  );
};

export default System;
