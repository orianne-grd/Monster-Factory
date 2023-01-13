import React, { useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { Html } from "@react-three/drei";
import Popup from 'reactjs-popup';
import ShowMonster from "./ShowMonster";
import { MonsterTypeService } from "../../services/monster.service";

const Monster = ({ monstre }) => {

  let type = MonsterTypeService(monstre._id); 
  console.log("le type : "); 
  console.log(type); 
      
  const meshRef = useRef();
  const [color, setColor] = useState(0xff0000);
  const onPointerOut = () => setColor(0xff0000);
  const onPointerOver = () => setColor(0x00FF00);

  const [open, setOpen] = useState(false);  
  const closeModal = () => setOpen(false);

  function afficheMonstre(e) {
    console.log("je clique sur le marker")
  }
    

  return (
    <>  
      <mesh ref={meshRef} position={[monstre.x, monstre.y, monstre.z]} scale={[1, 1, 1]} onClick={() => setOpen(o => !o)} onPointerOut={onPointerOut} onPointerOver={onPointerOver}>
        <sphereGeometry attach="geometry" args={[0.03, 8, 8]} />
        <meshStandardMaterial  attach="material" color={color}/>        
      </mesh>

      <Html>
        <Popup open={open} closeOnDocumentClick onClose={closeModal} position="right center">
          <ShowMonster monstre={monstre} type={type}/>
        </Popup>
      </Html>
    </>
  );
}

export default Monster;