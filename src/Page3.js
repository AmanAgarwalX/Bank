import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import Axios from "axios";
import { push } from "connected-react-router";
import _ from "lodash";
import { withSnackbar } from "notistack";
import React, { useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Loading from "./Loading";
import { ACTIONS } from "./utils/actions";
import { addAccount, form, steps } from "./utils/helpers";

const useStyles = makeStyles((theme) => ({
  icon: {
    height: 15,
    width: 15,
  },
  mainHeading: {
    font: "normal normal 500 25px/30px Poppins",
    letterSpacing: "0.9px",
    color: "#62657B",
  },
  subHeading: {
    font: "normal normal 500 22px/25px Poppins",
    letterSpacing: "0.72px",
    color: "#707070",
  },
  answer: {
    font: "normal normal normal 17px/22px Poppins",
    letterSpacing: "0.66px",
    color: "#707070",
  },
  grid: {
    borderBottom: "1px solid rgb(0,0,0,.12)",
    paddingBottom: 20,
  },
  mainGrid: {
    minHeight: "100vh",
    maxWidth: "100vw",
    padding: 100,
    backgroundColor: theme.palette.primary.main,
  },
  container: { backgroundColor: "white", padding: 20 },
}));

const QuestionAnswer = ({ question, answer }) => {
  const classes = useStyles();
  return (
    <div>
      <div className={classes.subHeading}>{question}</div>
      <br />
      <div className={classes.answer}>{answer}</div>
    </div>
  );
};

export default withSnackbar(
  connect(
    (state) => ({
      user: state.app.user,
      account: state.app.account,
      accounts: state.app.accounts,
    }),
    (dispatch) => ({
      setUser: (data) =>
        dispatch({
          type: ACTIONS.APP.USER,
          data: data,
        }),
      setAccounts: (data) =>
        dispatch({
          type: ACTIONS.APP.ACCOUNTS,
          data: data,
        }),
      setAccount: (data) =>
        dispatch({
          type: ACTIONS.APP.ACCOUNT,
          data: data,
        }),
      push: (to, state) => dispatch(push(to, state)),
    })
  )(
    ({
      user,
      account,
      push,
      setUser,
      setAccounts,
      setAccount,
      enqueueSnackbar,
      accounts,
    }) => {
      if (!_.isEmpty(accounts) && user.id) {
        return <Redirect to="/page-4" />;
      }
      const [loading, setLoading] = useState(false);
      const reduxForm = { ...user, ...account };
      const classes = useStyles();
      if (loading) {
        return <Loading />;
      }
      return (
        <>
          <Grid container direction="column" spacing={2}>
            {[0, 1].map((s) => (
              <Grid item key={s}>
                <div style={{ padding: 20 }}>
                  <div style={{ float: "left" }}>
                    <h3>{steps[s]}</h3>
                  </div>
                  <div style={{ float: "right" }}>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => push("/page-" + (s + 1))}
                    >
                      Edit
                    </Button>
                  </div>
                </div>
                <br />
                <Grid container justify="space-evenly">
                  {Object.keys(form[s]).map((key) => (
                    <Grid item xs={5} key={key} className={classes.grid}>
                      <br />
                      <QuestionAnswer
                        question={form[s][key].label}
                        answer={reduxForm[key]}
                      />
                    </Grid>
                  ))}
                </Grid>
              </Grid>
            ))}
          </Grid>
          <br />
          <br />
          <div style={{ textAlign: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                setLoading(true);
                Axios.post(
                  "https://frozen-cove-32481.herokuapp.com/user",
                  user,
                  {
                    headers: {
                      "Content-Type": "application/json",
                    },
                  }
                )
                  .then((res) => {
                    setUser(res.data);
                    addAccount(res.data.id, account).then((res) => {
                      setAccount({});
                      setAccounts(res.data);
                      enqueueSnackbar(
                        "User and accounts created successfully",
                        {
                          variant: "success",
                        }
                      );
                      push("/page-4");
                    });
                  })
                  .catch((e) => {
                    console.log(e);
                    enqueueSnackbar("Error in user creation", {
                      variant: "error",
                    });
                  })
                  .finally(() => {
                    setLoading(false);
                  });
              }}
            >
              Submit
            </Button>
          </div>
        </>
      );
    }
  )
);
