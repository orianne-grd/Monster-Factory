import React from "react";


function AddMarker ( {enable, setEnable} ) {

  return (
    <>  
      {
        enable &&
        <button className="black-button add" onClick={() => setEnable(false)}>Annuler</button>
      } {
        !enable &&
        <button className="black-button add" onClick={() => setEnable(true)}>Ajouter monstre</button>
      }
    </>
  )
}

export default AddMarker;