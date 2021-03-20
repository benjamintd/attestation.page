import React from "react";

import {
  Child,
  Convocation,
  Dog,
  Family,
  Handicap,
  Health,
  Mission,
  Package,
  People,
  Pray,
  Shop,
  Sport,
  Train,
  Truck,
  Work,
} from "./Icons";

export default function Reason({ onClick, stateValid }) {
  return (
    <div className="w-full mb-8">
      <hr />
      <div className="py-6 font-semibold">
        Pour les territoires soumis au confinement, de 6h à 19h
      </div>

      <button disabled={!stateValid} id="sport" onClick={onClick}>
        <Sport className="icon" />
        Je sors autour de chez moi (10 km)
      </button>

      <button disabled={!stateValid} id="achats" onClick={onClick}>
        <Shop className="icon" />
        Je vais faire des courses (30 km)
      </button>

      <button disabled={!stateValid} id="livraisons" onClick={onClick}>
        {/* todo check id */}
        <Truck className="icon" />
        Je fais des achats professionnels ou livraisons à domicile
      </button>

      <button disabled={!stateValid} id="demenagement" onClick={onClick}>
        {/* todo check id */}
        <Package className="icon" />
        Je déménage
      </button>

      <button disabled={!stateValid} id="demarche" onClick={onClick}>
        <Convocation className="icon" />
        J'ai des démarches administratives
      </button>

      <button disabled={!stateValid} id="culte" onClick={onClick}>
        {/* todo check id */}
        <Pray className="icon" />
        Je me rends dans un lieu de culte
      </button>

      <button disabled={!stateValid} id="rassemblement" onClick={onClick}>
        <People className="icon" />
        Je participe à des événements autorisés
      </button>

      <hr />
      <div className="py-6 font-semibold">Pour le couvre-feu, après 19h</div>
      <button disabled={!stateValid} id="travail" onClick={onClick}>
        <Work className="icon" />
        Je me rends au travail ou en reviens
      </button>
      <button disabled={!stateValid} id="sante" onClick={onClick}>
        <Health className="icon" />
        Je me soigne ou vais à la pharmacie
      </button>
      <button disabled={!stateValid} id="famille" onClick={onClick}>
        <Family className="icon" />
        Je m'occupe de mes proches ou d'enfants
      </button>
      <button disabled={!stateValid} id="handicap" onClick={onClick}>
        <Handicap className="icon" />
        J'aide quelqu'un en situation de handicap
      </button>
      <button disabled={!stateValid} id="convocation" onClick={onClick}>
        <Convocation className="icon" />
        J'ai une convocation administrative
      </button>
      <button disabled={!stateValid} id="missions" onClick={onClick}>
        <Mission className="icon" />
        J'ai une mission d'intérêt général
      </button>
      <button disabled={!stateValid} id="transit" onClick={onClick}>
        <Train className="icon" />
        Je transite pour un voyage
      </button>
      <button disabled={!stateValid} id="animaux" onClick={onClick}>
        <Dog className="icon" />
        Je promène un animal de compagnie
      </button>
    </div>
  );
}
