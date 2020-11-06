import React from "react";
import ThemeProvider from "./theme";
import ReduxProvider from "./redux";
import RouterProvider from "./router";
import PersistGateProvider from "./persistGate";
import SnackProvider from "./snack";

export default ({ children }) => (
  <ReduxProvider>
    <PersistGateProvider>
      <RouterProvider>
        <ThemeProvider>
          <SnackProvider>{children}</SnackProvider>
        </ThemeProvider>
      </RouterProvider>
    </PersistGateProvider>
  </ReduxProvider>
);
