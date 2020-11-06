import React from "react";
import { persistor } from "./../../utils/configureStore";
import { PersistGate } from "redux-persist/es/integration/react";
import { CircularProgress } from "@material-ui/core";

export default ({ children }) => (
  <PersistGate
    loading={
      <CircularProgress
        style={{
          position: "absolute",
          top: "48vh",
          left: "48vw"
        }}
      />
    }
    persistor={persistor}
  >
    {children}
  </PersistGate>
);
