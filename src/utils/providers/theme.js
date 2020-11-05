import React from "react";
import { ThemeProvider } from "styled-components";
import CssBaseline from "@material-ui/core/CssBaseline";
import { createMuiTheme, MuiThemeProvider } from "@material-ui/core/styles";
import DateFnsUtils from "@date-io/date-fns";
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import { SnackbarProvider } from "notistack";

const makeMuiTheme = (themeLight) =>
  createMuiTheme({
    props: {
      MuiButtonBase: {
        disableRipple: true, // No ripples
      },
    },
    palette: {
      type: themeLight ? "light" : "dark",
      primary: {
        main: "#ffc200",
      },
      secondary: {
        main: "#044368",
      },
    },
    shape: {
      // borderRadius: 7,
    },
    typography: {
      fontFamily: [
        "Poppins",
        "-apple-system",
        "BlinkMacSystemFont",
        '"Segoe UI"',
        "Roboto",
        '"Helvetica Neue"',
        "Arial",
        "sans-serif",
        '"Apple Color Emoji"',
        '"Segoe UI Emoji"',
        '"Segoe UI Symbol"',
      ].join(","),
    },
  });

const isInWebAppiOS = window.navigator.standalone === true;
// const isInWebAppChrome = window.matchMedia('(display-mode: standalone)').matches

// Detects if device is on iOS
const isIos = () => {
  const userAgent = window.navigator.userAgent.toLowerCase();
  if (/iphone|ipad|ipod/.test(userAgent)) {
    if (isInWebAppiOS) {
      return true;
    }
  }
  return false;
};

export default ({ children }) => (
  <SnackbarProvider maxSnack={3}>
    <MuiThemeProvider theme={makeMuiTheme(true)}>
      <CssBaseline />
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <ThemeProvider
          theme={{
            isIos: isIos(),
          }}
        >
          {children}
        </ThemeProvider>
      </MuiPickersUtilsProvider>
    </MuiThemeProvider>
  </SnackbarProvider>
);
