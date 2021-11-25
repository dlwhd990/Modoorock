import React from "react";
import { Helmet } from "react-helmet";

const HelmetComponent = ({ desc, title, url }) => {
  return (
    <Helmet>
      <meta name="description" content={desc} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={desc} />
      <meta property="og:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={desc} />

      <title>{title}</title>
    </Helmet>
  );
};

export default HelmetComponent;
