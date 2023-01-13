import { Html } from "@react-three/drei";
import React, { useRef, useState } from "react";
import Popup from 'reactjs-popup';
import AddMonster from "./AddMonster";

const Marker = ({ e, planet }) => {
    
  
  const markerRef = useRef();
  const [color, setColor] = useState(0xffffff);
  const onPointerOut = () => setColor(0xffffff);
  const onPointerOver = () => setColor(0x00FF00);

  const [open, setOpen] = useState(false);  
  const closeModal = () => setOpen(false);

  return (
    <>  
      <mesh ref={markerRef} position={[e.point.x, e.point.y, e.point.z]} scale={[1, 1, 1]} onClick={() => setOpen(o => !o)} onPointerOut={onPointerOut} onPointerOver={onPointerOver}>
        <sphereGeometry attach="geometry" args={[0.03, 8, 8]} />
        <meshStandardMaterial  attach="material" color={color}/>        
      </mesh>

      <Html>
        <Popup open={open} closeOnDocumentClick onClose={closeModal} position="right center">
          <AddMonster planet={planet} e={e} setOpen={setOpen}/>          
        </Popup>
      </Html>
    </>
  );
}

export default Marker;