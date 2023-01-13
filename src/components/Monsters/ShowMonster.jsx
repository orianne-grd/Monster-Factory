import React, { useEffect, useState } from "react";
import { FeedMonsterService, GrowMonsterService } from "../../services/monster.service";
import axios from 'axios';

const ShowMonster = ({ monstre, type }) => {

    const [monster, setMonster] = useState(monstre)
    const [state, setState] = useState(false)

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
                </div>
            </div>
        </div>
    );
}

export default ShowMonster;