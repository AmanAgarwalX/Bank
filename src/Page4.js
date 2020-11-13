import { Button, Grid } from "@material-ui/core";
import Accordion from "@material-ui/core/Accordion";
import AccordionDetails from "@material-ui/core/AccordionDetails";
import AccordionSummary from "@material-ui/core/AccordionSummary";
import Typography from "@material-ui/core/Typography";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { makeStyles } from "@material-ui/styles";
import { push } from "connected-react-router";
import _ from "lodash";
import { withSnackbar } from "notistack";
import React from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { form } from "./utils/helpers";

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
      accounts: state.app.accounts,
    }),
    (dispatch) => ({
      push: (to, state) => dispatch(push(to, state)),
    })
  )(({ user, accounts, push, enqueueSnackbar }) => {
    if (_.isEmpty(user) || !user.id || _.isEmpty(accounts)) {
      return <Redirect to="/page-1" />;
    }
    const classes = useStyles();
    return (
      <>
        <Grid container direction="column" spacing={2}>
          <Grid item>
            <div style={{ padding: 20 }}>
              <div style={{ float: "left" }}>
                <h3>Personal Details</h3>
              </div>
            </div>
            <br />
            <Grid container justify="space-evenly">
              {Object.keys(form[0]).map((key) => (
                <Grid item xs={5} key={key} className={classes.grid}>
                  <br />
                  <QuestionAnswer
                    question={form[0][key].label}
                    answer={user[key]}
                  />
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item>
            <div style={{ padding: 20 }}>
              <div style={{ float: "left" }}>
                <h3>My Accounts</h3>
              </div>
            </div>
            <br />
            <div style={{ padding: 20 }}>
              {accounts.map((account) => (
                <Accordion key={account.id}>
                  <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography>Account {account.id}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Grid container justify="space-evenly">
                      {Object.keys(form[1]).map((key) => (
                        <Grid item xs={5} key={key} className={classes.grid}>
                          <br />
                          <QuestionAnswer
                            question={form[1][key].label}
                            answer={account[key]}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              ))}
            </div>
          </Grid>
        </Grid>
        <br />
        <br />

        <div style={{ textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              push("/page-2", {
                onNextCustom: user.id,
              });
              // exportToJson(reduxForm);
              // enqueueSnackbar("Form Submitted Successfully", {
              //   variant: "success",
              // });
            }}
          >
            Add New Account
          </Button>
        </div>
      </>
    );
  })
);
