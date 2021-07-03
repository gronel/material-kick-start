import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
export default function AuthLayout(props) {
  const { Component, pageProps } = props;
  return (
    <>
      <CssBaseline />
      <Component {...pageProps} />
    </>
  );
}
