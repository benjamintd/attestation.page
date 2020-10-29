import React from "react";

export default function Form({ state, onChange }) {
  const {
    lastname,
    firstname,
    birthday,
    lieunaissance,
    address,
    zipcode,
    town,
    datesortie,
    heuresortie,
  } = state;

  return (
    <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 w-full">
      <label htmlFor="firstname">Prénom</label>
      <input
        autoFocus
        required
        aria-invalid="false"
        autoComplete="given-name"
        className="form-control"
        id="firstname"
        name="firstname"
        placeholder="Jean"
        type="text"
        value={firstname}
        onChange={onChange}
      />

      <label htmlFor="lastname">Nom</label>
      <input
        autoFocus
        required
        aria-invalid="false"
        autoComplete="family-name"
        className="form-control"
        id="lastname"
        name="lastname"
        placeholder="Dupont"
        type="text"
        value={lastname}
        onChange={onChange}
      />

      <label htmlFor="birthday">Date de naissance (au format jj/mm/aaaa)</label>

      <input
        required
        aria-invalid="false"
        autoComplete="bday"
        className="form-control"
        id="birthday"
        inputMode="numeric"
        maxLength="10"
        name="birthday"
        pattern="^([0][1-9]|[1-2][0-9]|30|31)\/([0][1-9]|10|11|12)\/(19[0-9][0-9]|20[0-1][0-9]|2020)"
        placeholder="01/01/1970"
        type="text"
        value={birthday}
        onChange={onChange}
      />

      <label htmlFor="lieunaissance">Lieu de naissance</label>
      <input
        required
        aria-invalid="false"
        autoComplete="off"
        className="form-control"
        id="lieunaissance"
        name="lieunaissance"
        placeholder="Lyon"
        type="text"
        value={lieunaissance}
        onChange={onChange}
      />

      <label htmlFor="address">Adresse</label>
      <input
        required
        aria-invalid="false"
        autoComplete="address-line1"
        className="form-control"
        id="address"
        name="address"
        placeholder="999 avenue de france"
        type="text"
        value={address}
        onChange={onChange}
      />

      <label htmlFor="town">Ville</label>

      <input
        required
        aria-invalid="false"
        autoComplete="address-level2"
        className="form-control"
        id="town"
        name="town"
        placeholder="Paris"
        type="text"
        value={town}
        onChange={onChange}
      />

      <label htmlFor="zipcode">Code Postal</label>
      <input
        required
        aria-invalid="false"
        autoComplete="postal-code"
        className="form-control"
        id="zipcode"
        inputMode="numeric"
        max="99999"
        maxLength="5"
        min="00000"
        minLength="4"
        name="zipcode"
        pattern="[0-9]{5}"
        placeholder="75001"
        type="text"
        value={zipcode}
        onChange={onChange}
      />

      <label htmlFor="datesortie">Date de sortie</label>
      <input
        disabled
        required
        aria-invalid="false"
        className="form-control"
        id="datesortie"
        name="datesortie"
        value={datesortie}
      />

      <label htmlFor="heuresortie">Date de sortie</label>
      <input
        disabled
        required
        aria-invalid="false"
        className="form-control"
        id="heuresortie"
        name="heuresortie"
        value={heuresortie}
      />
    </form>
  );
}
