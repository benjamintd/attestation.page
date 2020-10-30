import Head from "next/head";
import React from "react";

const Meta = () => {
  const description =
    "Générez des attestations en une seconde, sans avoir à retaper vos infos à chaque fois.";
  const title = "Attestation en un clic";
  const ogImage = "https://attestation.page/og-image.png";
  return (
    <Head>
      <title>{title}</title>
      <meta content={description} name="description" />
      <link href="/favicon-32x32.png" rel="shortcut icon" />
      <meta content={title} property="og:title" />
      <meta content={description} property="og:description" />
      <meta content={ogImage} property="og:image" />
      <meta content="https://attestation.page" property="og:url" />
      <meta content={title} name="twitter:title" />
      <meta content={description} name="twitter:description" />
      <meta content={ogImage} name="twitter:image" />
      <meta content="summary_large_image" name="twitter:card"></meta>
      <meta content="#f7fafc" name="theme-color"></meta>
      <link href="/apple-touch-icon.png" rel="apple-touch-icon"></link>
      <link href="/manifest.webmanifest" rel="manifest"></link>
      <meta
        content="covid19, covid-19, attestation, déclaration, déplacement, officielle, gouvernement"
        name="keywords"
      />
    </Head>
  );
};

export default Meta;
