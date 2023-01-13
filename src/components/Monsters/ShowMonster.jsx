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
                <div class="form-group">
                    <label class="name">Date de naissance :</label>
                    <label class="value"> {naissance.toLocaleDateString(undefined, options)} </label>
                </div>
                <div class="form-group">
                    <label class="name">Vie :</label>
                    <label class="value"> {monster.vie} </label>
                </div>
                <div class="form-group">
                    <label class="name">Faim :</label>
                    <label class="value"> {monster.faim} </label>
                </div>
                <div class="form-group">
                    <label class="name">Fatigue :</label>
                    <label class="value"> {monster.fatigue.toString()} </label>
                </div>
                <div class="form-group">
                    <label class="name">Adulte :</label>
                    <label class="value"> {monster.adulte.toString()} </label>
                </div>
                <div class="form-group">
                    <label class="name">Taille :</label>
                    <label class="value"> {monster.taille} </label>
                </div>
                <div class="form-group">
                    <label class="name">Couleur :</label>
                    <label class="value"> {monster.couleur} </label>
                </div>
                <div class="form-group">
                    <label class="name">Sexe :</label>
                    <label class="value"> {monster.sexe} </label>
                </div>
                <div class="form-group">
                    <label class="name">Poid :</label>
                    <label class="value"> {monster.poids} </label>
                </div>
                <div class="form-group">
                    <label class="name">Type :</label>
                    <label class="value"> {type.name} </label>
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