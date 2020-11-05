import React from "react";
import ThemeProvider from "./theme";
import SnackProvider from "./snack";

export default ({ children }) => (
  <ThemeProvider>
    <SnackProvider>{children}</SnackProvider>
  </ThemeProvider>
);
