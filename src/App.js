import React, { Suspense, useState } from 'react';
import Intro from './components/UI/Intro';
import { GoogleOAuthProvider } from '@react-oauth/google';

import { Loader, Html } from "@react-three/drei";
import { Canvas } from '@react-three/fiber';
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import System from "./components/Planets/System";
import Planet from './components/Planets/Planet';
import Retour from './components/UI/Actions/Retour';
import AddMarker from './components/UI/Actions/AddMarker';
import { TitlePlanet } from './components/UI/TitlePlanet';


const App = () => {  

  const [enable, setEnable] = useState(false);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <>
        <GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}>
          <Intro />
          <Canvas camera={{ fov: 45, position: [-125, 45, 0] }}>
            <Suspense fallback={<Html><Loader /></Html>}>
              <System />
            </Suspense>
          </Canvas>
        </GoogleOAuthProvider>;
      </>,
    },
    {
      path: "/planet/:id",
      element: <>
        <Retour />
        <TitlePlanet />
        <Canvas camera={{ fov: 45, position: [-5, 0, 0] }}>
          <Suspense fallback={<Html><Loader /></Html>}>
            <Planet enable={enable} setEnable={setEnable} />
          </Suspense>
        </Canvas>
        { (window.sessionStorage.getItem('user_id') ? window.sessionStorage.getItem('user_id') : null ) != null &&
          <AddMarker enable={enable} setEnable={setEnable} />
        }     
        </>,
    },
  ]);

  return <RouterProvider router={router}/>;
};

export default App;
