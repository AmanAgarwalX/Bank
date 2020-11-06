import { Button, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { push } from "connected-react-router";
import { withSnackbar } from "notistack";
import React from "react";
import { connect } from "react-redux";
import { exportToJson, form, steps } from "./utils/helpers";

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
      reduxForm: state.app.form,
    }),
    (dispatch) => ({
      push: (to, state) => dispatch(push(to, state)),
    })
  )(({ reduxForm, push, enqueueSnackbar }) => {
    const classes = useStyles();
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
              exportToJson(reduxForm);
              enqueueSnackbar("Form Submitted Successfully", {
                variant: "success",
              });
            }}
          >
            Submit
          </Button>
        </div>
      </>
    );
  })
);
