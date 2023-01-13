import React, { useState } from "react";
import axios from 'axios';


const AddMonster = ({ planet, e, setOpen }) => {
    
    console.log("ici");

    const [inputs, setInputs] = useState({});

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setInputs(values => ({...values, [name]: value}))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
         
        console.log("e");
        console.log(e);
        let monster = {
            name: inputs.nom,
            sexe: inputs.sexe,
            couleur: inputs.couleur,
            taille: inputs.taille,
            poids: inputs.poids,
            type: inputs.type,
            planet: planet.id,
            user: window.sessionStorage.getItem('user_id') ? window.sessionStorage.getItem('user_id') : null,
            x: e.point.x,
            y: e.point.y,
            z: e.point.z
        };

        
        console.log("monster");
        console.log(monster);

        if (monster) {
            axios.post('https://monster-factory-api.onrender.com/api/monster', {
              name: monster.name,
              sexe: monster.sexe,
              couleur: monster.couleur,
              taille: monster.taille,
              poids: monster.poids,
              type: monster.type,
              planet: monster.planet,
              user: monster.user,
              x: monster.x,
              y: monster.y,
              z: monster.z,
            })
              .then((data) => {
                alert(data.data.name + " ajout : " + data.statusText);
                setOpen(false);
                window.location.reload(false);
              })
              .catch((err) => {
                console.log(err.message);
              });
          }
    }

    return (
        <div className="modal">
            <div className="header">Création de monstre</div>        
            <div className="content">
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label className="name">Nom :</label>
                        <input className="value" type="text" name="nom" value={inputs.nom || ""} required="true" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label className="name">Sexe :</label>
                        <div className="value"  onChange={handleChange}>
                            <input type="radio" name="sexe" value="M"/>Homme
                            <input type="radio" name="sexe" value="F"/>Femme
                        </div>;
                    </div>
                    <div className="form-group">
                        <label className="name">Couleur :</label>
                        <select className="value" name="couleur" value={inputs.couleur || ""} required="true" onChange={handleChange}>
                            <option></option>
                            <option value="white">white </option>
                            <option value="blue">blue</option>
                            <option value="red">red</option>
                            <option value="green">green</option>
                            <option value="yellow">yellow</option>
                            <option value="purple">purple</option>
                            <option value="pink">pink</option>
                            <option value="black">black</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label className="name">Taille :</label>
                        <input className="value" type="number" name="taille" value={inputs.taille || ""} required="true" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label className="name">Poids :</label>
                        <input className="value" type="number" name="poids" value={inputs.poids || ""} required="true" onChange={handleChange}/>
                    </div>
                    <div className="form-group">
                        <label className="name">Type :</label>                        
                        <select className="value" name="type" value={inputs.type || ""} required="true" onChange={handleChange} >
                            <option></option>
                            <option value="63c033be3b60853a79004a0c" label="Caelum"></option>
                            <option value="63c033c33b60853a79004a0e" label="Acervus"></option>
                            <option value="63c033cc3b60853a79004a10" label="Aqua"></option>
                            <option value="63c033d63b60853a79004a14" label="Gramen"></option>
                            <option value="63c033da3b60853a79004a16" label="Ignis"></option>
                            <option value="63c033df3b60853a79004a18" label="Lux"></option>
                            <option value="63c033e43b60853a79004a1a" label="Nix"></option>
                            <option value="63c033e93b60853a79004a1c" label="Petrus"></option>
                            <option value="63c033ef3b60853a79004a1e" label="Tenebris"></option>
                            <option value="63c033f63b60853a79004a20" label="Terra"></option>
                            <option value="63c033fa3b60853a79004a22" label="Ventus"></option>
                        </select>
                    </div>
                    
                    <input type="submit" value="Ajouter" />
                </form>
            </div>
        </div>
    );
}

export default AddMonster;