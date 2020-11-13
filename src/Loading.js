import { CircularProgress } from "@material-ui/core";
import React from "react";

export default () => {
  return (
    <div style={{ height: "100vh", width: "100vh", position: "relative" }}>
      <CircularProgress
        style={{
          top: "48vh",
          left: "48vw",
          position: "fixed",
        }}
      />
    </div>
  );
};
