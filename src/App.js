import { makeStyles } from "@material-ui/styles";
import { withSnackbar } from "notistack";
import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Page1 from "./Page1";
import Page2 from "./Page2";
import Page3 from "./Page3";

const useStyles = makeStyles((theme) => ({
  mainGrid: {
    minHeight: "100vh",
    maxWidth: "100vw",
    padding: 100,
    backgroundColor: theme.palette.primary.main,
  },
  container: { backgroundColor: "white", padding: 20 },
}));

export default withSnackbar((props) => {
  const classes = useStyles();

  return (
    <div className={classes.mainGrid}>
      <div className={classes.container}>
        <Switch>
          <Route path="/page-1">
            <Page1 />
          </Route>
          <Route path="/page-2">
            <Page2 />
          </Route>
          <Route path="/page-3">
            <Page3 />
          </Route>
          <Redirect to="/page-1" />
        </Switch>
      </div>
    </div>
  );
});
