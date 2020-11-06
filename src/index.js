import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Providers from "./utils/providers";
import { Box, CircularProgress } from "@material-ui/core";
import { Route } from "react-router-dom";

ReactDOM.render(
  <Providers>
    <Suspense
      fallback={
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          minHeight="100vh"
        >
          <CircularProgress color="secondary" />
        </Box>
      }
    >
      <Route path="/" component={App} />
    </Suspense>
  </Providers>,
  document.getElementById("root")
);
