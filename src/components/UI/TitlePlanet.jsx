import React from 'react';
import { PlanetService } from '../../services/planet.service';
import { useParams } from "react-router-dom";

export const TitlePlanet = () => {

  let { id } = useParams();
  let result = PlanetService(id);

  return(
    <>
    {result && <Title planet={result}/>}
    </>
  )
}

const Title = (props) => {
  return (
    <>
    { props.planet &&
      <h1 className="title-planet">{props.planet.name}</h1>
    }
    </>
  )
}