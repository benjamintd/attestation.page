import Image from "next/image";
import React, { useEffect, useState } from "react";

import Form from "../components/Form";
import Meta from "../components/Meta";
import Reason from "../components/Reason";
import { generatePdf } from "../lib/pdf-util";
import useLocalStorage from "../lib/use-local-storage";
import { addSlash, downloadBlob, validateState } from "../lib/util";

export default function Home() {
  const [state, setState] = useLocalStorage("attestation-derogatoire", {
    lastname: "",
    firstname: "",
    birthday: "",
    lieunaissance: "",
    address: "",
    zipcode: "",
    town: "",
  });

  const [initialStateValid, setInitialStateValid] = useState(false);
  useEffect(() => {
    if (validateState(state)) {
      setInitialStateValid(true);
    }

    const datesortie = new Date().toLocaleDateString("fr-FR");
    const heuresortie = new Date().toLocaleTimeString("fr-FR", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setState({ ...state, heuresortie, datesortie });
  }, []);

  const [stateValid, setStateValid] = useState(false);
  console.log(stateValid);
  useEffect(() => {
    if (validateState(state)) {
      setStateValid(true);
    }
  }, [state]);

  const onChange = (event) => {
    const input = event.target;

    let value = input.value;
    if (input.id === "birthday") {
      const key = event.keyCode || event.charCode;
      if (key !== 8 && key !== 46) {
        value = addSlash(value);
      }
    }

    setState({ ...state, [input.id]: input.value });
  };

  const onClick = async (event) => {
    console.log(event);
    const reason = event.target.id;
    const pdfBlob = await generatePdf(state, reason, "/certificate.pdf");
    downloadBlob(pdfBlob, `attestation-${new Date().toLocaleString()}.pdf`);
  };

  return (
    <>
      <Meta />
      <div className="p-12 max-w-2xl mx-auto">
        <div className="h-8 w-8 mb-6">
          <Image
            className="h-full w-full"
            height={180}
            src="/apple-touch-icon.png"
            width={180}
          />
        </div>
        <div className="prose mb-12">
          <h1>Attestation de déplacement dérogatoire</h1>
          <p>
            Remplissez le formulaire une fois, il sera sauvegardé sur votre
            navigateur. Choisissez un motif pour télécharger une attestation à
            l'heure et date actuelle.
          </p>
          <p>
            Ce service n'est pas officiel mais délivre des attestations
            conformes.
          </p>
        </div>

        {initialStateValid && (
          <Reason stateValid={stateValid} onClick={onClick} />
        )}

        <Form state={state} onChange={onChange} />

        {!initialStateValid && (
          <Reason stateValid={stateValid} onClick={onClick} />
        )}
      </div>
    </>
  );
}
