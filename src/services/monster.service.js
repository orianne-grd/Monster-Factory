import { useState, useEffect } from "react";
import axios from 'axios';

const API_URL = "https://monster-factory-api.onrender.com";

export const ListMonsterService = () => {

  const [listMonster, setListMonster] = useState([]);

  useEffect(() => {
    axios.get(API_URL + '/api/monster')
      .then((data) => {
        setListMonster(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return listMonster;
}

export const MonsterService = (idMonster) => {

  const [monster, setMonster] = useState([]);

  useEffect(() => {
    if (idMonster) {
      axios.get(API_URL + '/api/monster/' + idMonster)
        .then((data) => {
          setMonster(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return monster;
}

export const MonsterDeleteService = (idMonster) => {

  const [monster, setMonster] = useState([]);

  useEffect(() => {
    if (idMonster) {
      axios.delete(API_URL + '/api/monster/' + idMonster)
        .then((data) => {
          setMonster(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return monster;
}

export const MonsterUpdateService = (monster) => {

  const [monsterUpdate, setMonster] = useState([]);

  useEffect(() => {
    if (monster) {
      axios.put(API_URL + '/api/monster/' + monster._id, {
        name: monster.name,
        vie: monster.vie,
        faim: monster.faim,
        fatigue: monster.fatigue,
        taille: monster.taille,
        poids: monster.poids,
        adulte: monster.adulte
      })
        .then((data) => {
          setMonster(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return monsterUpdate;
}

export const MonsterPlanetService = (idPlanet) => {

  const [monster, setMonster] = useState([]);

  useEffect(() => {
    axios.get(API_URL + '/api/monster/getPlanet/' + idPlanet)
      .then((data) => {
        setMonster(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return monster;
}

export const MonsterUserService = (idUser) => {

  const [monster, setMonster] = useState([]);

  useEffect(() => {
    axios.get(API_URL + '/api/monster/getUser/' + idUser)
      .then((data) => {
        setMonster(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return monster;
}

export const MonsterTypeService = (idMonster) => {

  const [type, setType] = useState([]);

  useEffect(() => {
    axios.get(API_URL + '/api/monster/getType/' + idMonster)
      .then((res) => {
        setType(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return type;
}

export const AddMonsterService = (monster) => {
  const [addMonster, setAddMonster] = useState([]);

  useEffect(() => {
    if (monster) {
      axios.post(API_URL + '/api/monster', {
        name: monster.name,
        sexe: monster.sexe,
        couleur: monster.couleur,
        taille: monster.taille,
        poids: monster.poids,
        type: monster.type,
        planet: monster.planet,
        user: monster.user,
        x: monster.position.x,
        y: monster.position.y,
        z: monster.position.z,
      })
        .then((data) => {
          setAddMonster(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }

  }, []);

  return addMonster;
}

export const BabyMonsterService = (idMonster1, idMonster2, name) => {

  const [baby, setBaby] = useState([]);

  useEffect(() => {
    if (idMonster1 && idMonster2 && name) {
      axios.post(API_URL + '/api/monster/baby/' + idMonster1 + '/' + idMonster2 + '/' + name)
        .then((data) => {
          setBaby(data);
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  }, []);

  return baby;
}

export const GrowMonsterService = (idMonster) => {
  axios.put(API_URL + '/api/monster/growMonster/' + idMonster)
    .then()
    .catch((err) => {
      console.log(err.message);
    });
}

export const FeedMonsterService = (idMonster) => {
  axios.put(API_URL + '/api/monster/feedMonster/' + idMonster)
    .then()
    .catch((err) => {
      console.log(err.message);
    });
}

export const ListMonsterUserService = (idUser) => {

  const [listMonster, setListMonster] = useState([]);

  useEffect(() => {
    axios.get(API_URL + '/api/user/getMonsters/' + idUser)
      .then((data) => {
        setListMonster(data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return listMonster;
}