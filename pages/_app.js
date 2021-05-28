import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import Head from "next/head";
import { ThemeProvider } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import theme from "../src/theme";
import MainNavbar from "../components/MainNavbar";
import AuthLayout from "../components/AuthLayout";
import { useRouter } from "next/router";
export default function MyApp(props) {
  const router = useRouter();
  const [islogin, setLogin] = useState(false);
  React.useEffect(() => {
    // Remove the server-side injected CSS.
    const jssStyles = document.querySelector("#jss-server-side");
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles);
    }
  }, []);

  function isLoggin() {
    const token = window.localStorage.getItem("token");
    if (token == null) {
      //setLogin(false);
      router.push("./login");
    } else {
      setLogin(true);
    }
  }
  useEffect(() => {
    isLoggin();
  }, []);
  return (
    <React.Fragment>
      <Head>
        <title>Ours Wms</title>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Head>
      <ThemeProvider theme={theme}>
        {islogin ? <MainNavbar {...props} /> : <AuthLayout {...props} />}
      </ThemeProvider>
    </React.Fragment>
  );
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.object.isRequired,
};
