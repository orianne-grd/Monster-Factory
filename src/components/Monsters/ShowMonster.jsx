import React, { useEffect, useRef, useState } from "react";
import { BabyMonsterService, FeedMonsterService, GrowMonsterService } from "../../services/monster.service";
import axios from 'axios';

const ShowMonster = ({ listMonstres, monstre, type }) => {

    const [monster, setMonster] = useState(monstre)
    const [otherMonster, setOtherMonster] = useState()
    const [babyName, setBabyName] = useState()

    const [state, setState] = useState(false)
    const [baby, isBabyClicked] = useState(false)

    useEffect(() => {
        axios.get('https://monster-factory-api.onrender.com/api/monster/' + monster._id)
            .then((res) => {
                setMonster(res.data);
                setState(false);
            })
            .catch((err) => {
                console.log(err.message);
            });
    }, [state])

    function handleClickGrow() {
        setState(true);
        GrowMonsterService(monster._id);
    }

    function handleClickFeed() {
        setState(true);
        FeedMonsterService(monster._id);
    }

    function handleClickGetOtherMonster() {
        isBabyClicked(true);
        let filterMonstres = listMonstres.filter((m) => m._id != monster._id && m.sexe != monster.sexe && m.adulte && monster.adulte)//  )
        console.log(filterMonstres)
        if(filterMonstres.length > 0) {
            let otherM = listMonstres[getRandomInt(filterMonstres.length)];
            setOtherMonster(otherM)
            console.log(otherM)
        }
    }

    function handleClickReproduire() {
        console.log('test')
        if(monster._id && otherMonster && otherMonster._id && babyName) {
            axios.post('https://monster-factory-api.onrender.com/api/monster/baby/'+ monster._id + '/' + otherMonster._id + '/' + babyName,)
            .then((data) => {
              console.log(data)
              // alert(data.data.name + " ajout : " + data.statusText);
              // setOpen(false);
              // window.location.reload(false);
            })
            .catch((err) => {
              console.log(err.message);
            });
        } else {
            isBabyClicked(false);
        }
    }

    const handleChange = (event) => {
        const value = event.target.value;
        console.log(value)
        setBabyName(value);
    }

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const naissance = new Date(monster.naissance);
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };

    return (
        <div className="modal">
            <div className="header">{monster.name}</div>
            <div className="content">
                <div className="form-group">
                    <label className="name">Date de naissance :</label>
                    <label className="value"> {naissance.toLocaleDateString(undefined, options)} </label>
                </div>
                <div className="form-group">
                    <label className="name">Vie :</label>
                    <label className="value"> {monster.vie} </label>
                </div>
                <div className="form-group">
                    <label className="name">Faim :</label>
                    <label className="value"> {monster.faim} </label>
                </div>
                <div className="form-group">
                    <label className="name">Fatigue :</label>
                    <label className="value"> {monster.fatigue.toString()} </label>
                </div>
                <div className="form-group">
                    <label className="name">Adulte :</label>
                    <label className="value"> {monster.adulte.toString()} </label>
                </div>
                <div className="form-group">
                    <label className="name">Taille :</label>
                    <label className="value"> {monster.taille} </label>
                </div>
                <div className="form-group">
                    <label className="name">Couleur :</label>
                    <label className="value"> {monster.couleur} </label>
                </div>
                <div className="form-group">
                    <label className="name">Sexe :</label>
                    <label className="value"> {monster.sexe} </label>
                </div>
                <div className="form-group">
                    <label className="name">Poid :</label>
                    <label className="value"> {monster.poids} </label>
                </div>
                <div className="form-group">
                    <label className="name">Type :</label>
                    <label className="value"> {type.name} </label>
                </div>
                <div className="center">
                    {!monster.adulte && <button className="black-button mlr" onClick={handleClickGrow}>Grandir</button>}
                    <button className="black-button mlr" onClick={handleClickFeed}>Nourrir</button>
                    <button className="black-button mlr" onClick={handleClickGetOtherMonster}>Reproduire</button>
                    { baby && <>
                        <label className="name">Nom :</label>
                        <input className="value" type="text" name="nom" value={babyName || ""} onChange={handleChange}/>
                        <button className="black-button mlr" onClick={handleClickReproduire}>Valider</button>
                    </>}
                </div>
            </div>
        </div>
    );
}

export default ShowMonster;