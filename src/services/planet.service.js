import { useState, useEffect } from "react";
import axios from 'axios';

import SunMap from "../assets/textures/Sun.jpg";
import CsillaMap from "../assets/textures//Csilla.png";
import ExotMap from "../assets/textures/Exotic.png";
import FeluciaMap from "../assets/textures/Felucia.png";
import NarShaddaaMap from "../assets/textures/NarShaddaa.png";
import TerranMap from "../assets/textures/Terran.png";
import VolvieMap from "../assets/textures/Volvie.png";

const API_URL = "https://monster-factory-api.onrender.com";

function convertPlanet(planet) {
  return {
    id: planet._id,
    name: planet.name,
    scale: planet.scale,
    img: getImageFromName(planet.name),
    speedRotation: planet.speedRotation,
    pos: planet.pos,
  }
}

function convertListPlanet(listPlanet) {
  let list = listPlanet.map((planet) => {
    return {
      id: planet._id,
      name: planet.name,
      scale: planet.scale,
      img: getImageFromName(planet.name),
      speedRotation: planet.speedRotation,
      pos: planet.pos,
    }
  })
  return list;
}

export function getImageFromName(namePlanet) {
  switch (namePlanet) {
    case "Sun": return SunMap;
    case "Csilla": return CsillaMap;
    case "Exot": return ExotMap;
    case "Felucia": return FeluciaMap;
    case "NarShaddaa": return NarShaddaaMap;
    case "Terran": return TerranMap;
    case "Volvie": return VolvieMap;
  }
}

export const ListPlanetService = () => {

  const [listPlanet, setListPlanet] = useState();

  useEffect(() => {
    if (!listPlanet) {
      axios.get(API_URL + '/api/planet')
        .then((res) => {
          setListPlanet(convertListPlanet(res.data));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return listPlanet;
}

export const ListMonstresPlanetService = (idPlanet) => {

  const [listMonstres, setListMonstres] = useState();

  useEffect(() => {
    if (!listMonstres) {
      axios.get(API_URL + '/api/planet/getMonsters/' + idPlanet)
        .then((res) => {
          setListMonstres(res.data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return listMonstres;
}

export const PlanetService = (idPlanet) => {

  const [planet, setPlanet] = useState();

  useEffect(() => {
    if (idPlanet) {
      axios.get(API_URL + '/api/planet/' + idPlanet)
        .then((res) => {
          setPlanet(convertPlanet(res.data));
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return planet;
}