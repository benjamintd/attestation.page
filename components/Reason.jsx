import React from "react";

export default function Reason({ onClick, stateValid }) {
  return (
    <div className="w-full mb-8">
      <button disabled={!stateValid} id="sport_animaux" onClick={onClick}>
        Je me déplace à 1 km de chez moi
      </button>
      <button disabled={!stateValid} id="travail" onClick={onClick}>
        Je vais travailler
      </button>
      <button disabled={!stateValid} id="enfants" onClick={onClick}>
        Je vais chercher les enfants à l'école
      </button>
      <button disabled={!stateValid} id="sante" onClick={onClick}>
        Je me soigne ou vais à la pharmacie
      </button>
      <button disabled={!stateValid} id="famille" onClick={onClick}>
        Je m'occupe de mes proches
      </button>
      <button disabled={!stateValid} id="handicap" onClick={onClick}>
        J'aide quelqu'un en situation de handicap
      </button>
      <button disabled={!stateValid} id="convocation" onClick={onClick}>
        J'ai une convocation administrative
      </button>
      <button disabled={!stateValid} id="missions" onClick={onClick}>
        J'ai une mission d'intérêt général
      </button>
    </div>
  );
}
