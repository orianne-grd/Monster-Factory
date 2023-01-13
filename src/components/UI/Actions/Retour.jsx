import React, { useState, useContext } from "react";

import { useParams, useNavigate } from "react-router-dom";

const Action = () => {

  const navigate = useNavigate();

  return (
    <>  
      {
        <button className="black-button retour" onClick={() => navigate("/")}>Retour</button>
      }
    </>
  )
}

export default Action;