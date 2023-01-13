import React, { useState, useEffect } from "react";
import { GoogleLogin } from '@react-oauth/google';
import axios from 'axios';
import { ListMonsterUserService } from "../../services/monster.service";

const UserLogged = (props) => {
  let user = props.user;

  let numberMonsterUser = 0;
  let listMonsterUser = ListMonsterUserService(user._id);
  if (listMonsterUser) {

    numberMonsterUser = listMonsterUser.data?.length;
  }
  return (
    <>
      {user &&
        <div>
          <p> {user.name} </p>
          <p>Monstres : {numberMonsterUser}</p>
        </div>
      }
    </>
  )
}

const Intro = () => {

  const [hidden, setHidden] = useState(false);

  let googleToken = window.sessionStorage.getItem('google_token') ? window.sessionStorage.getItem('google_token') : ''
  const [token, setToken] = useState(googleToken);

  const [user, setUser] = useState();

  useEffect(() => {
    axios.post('https://monster-factory-api.onrender.com/api/user/login', {
      token: googleToken
    })
      .then((res) => {
        setUser(res.data.user);
        setHidden(true)
        setToken(res.data.token)
        window.sessionStorage.setItem('user_id', res.data.user._id)
      })
      .catch((err) => {
        setToken('')
        console.log(err.message);
      });
  }, [googleToken]);

  function handleClick() {
    setHidden(true);
  }

  function handleConnect(cred) {
    setHidden(true);
    setToken(cred.credential)
    window.sessionStorage.setItem('google_token', cred.credential);
  }

  return (
    <>
      {
        !hidden &&
        <div className="top-section">
          <div className="text-section">
            <h1> MUNDUS </h1>
            <h3> Dans une galaxie lointaine, très lointaine, il existe un groupe de planètes connues sous le nom de "Mundus", envahies par des créatures monstrueuses. Ces bêtes, connues sous le nom "d'horreurs planétaires", ont rendu presque impossible la survie de toute forme de vie intelligente à leur surface. </h3>
            <p> Les quelques civilisations spatiales qui ont rencontré ces planètes les ont jugées trop dangereuses pour les explorer ou les coloniser, mais pour un groupe restreint de chercheurs et d'aventuriers, l'attrait de l'étude de ces créatures terrifiantes est trop grand pour résister, et ils risquent leur vie pour atterrir sur ces mondes mortels et découvrir les secrets de leurs habitants monstrueux. </p>
            <h4> Êtes-vous prêt à commencer votre exploration ?  </h4>
            <button className="black-button mb" onClick={handleClick}>Explorer Mundus !</button>
            {!token &&
              <div className="center">
                <GoogleLogin
                  onSuccess={credentialResponse => {
                    handleConnect(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
                />
              </div>}
          </div>
        </div>
      }

      {
        (hidden && user) &&
        <div className="main-section">
          <UserLogged user={user} />
        </div>
      }
    </>
  )
}



export default Intro;


