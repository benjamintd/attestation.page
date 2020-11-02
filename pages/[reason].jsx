import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

import Meta from "../components/Meta";
import useLocalStorage from "../lib/use-local-storage";
import { openPdf, validateState } from "../lib/util";
import emptyState from "./index";

const ReasonPage = () => {
  const router = useRouter();
  const reasons = [
    "sport_animaux",
    "travail",
    "achats",
    "enfants",
    "sante",
    "famille",
    "handicap",
    "convocation",
    "missions",
  ];

  const [state, _] = useLocalStorage("attestation-derogatoire", emptyState);

  useEffect(() => {
    if (validateState(state) && reasons.indexOf(router.query.reason) > -1) {
      openPdf(state, router.query.reason);
    } else {
      router.replace("/", "/");
    }
  }, [state, router.query.reason]);

  return (
    <>
      <Meta />
      <Head>
        <meta content="noindex" name="robots" />
        <meta content="noindex" name="googlebot" />
      </Head>
      <div className="p-4 md:p-6 lg:p-12 max-w-2xl mx-auto">
        <div className="h-8 w-8 mb-6">
          <Image
            alt="logo"
            className="h-full w-full"
            height={180}
            src="/apple-touch-icon.png"
            width={180}
          />
        </div>
      </div>
    </>
  );
};

export default ReasonPage;
