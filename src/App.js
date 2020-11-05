import { makeStyles } from "@material-ui/styles";
import React, { useState } from "react";
import {
  Grid,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  Button,
} from "@material-ui/core";
import _ from "lodash";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { withSnackbar } from "notistack";
import moment from "moment";
import { isMultiline, form, exportToJson } from "./Form";

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

const steps = ["Personal Details", "Account Details"];

export default withSnackbar((props) => {
  const classes = useStyles();
  const [data, setData] = useState({});
  const [step, setStep] = useState(0);

  const getFormComponent = (key, field) => {
    switch (field.type) {
      case "email":
      case "string":
        return (
          <Grid item xs={12} key={key}>
            <TextField
              type={field.type}
              value={data[key] || ""}
              onChange={(e) => setData({ ...data, [key]: e.target.value })}
              label={_.startCase(field.label || key)}
              variant="outlined"
              required={field.required}
              fullWidth
              multiline={isMultiline.has(key) || false}
              rows={isMultiline.has(key) ? 2 : 1}
              id={key}
              name={key}
              autoComplete={key}
            />
          </Grid>
        );
      case "date":
        return (
          <Grid item xs={12} key={key}>
            <KeyboardDatePicker
              disableToolbar
              fullWidth
              value={data[key] || null}
              onChange={(e) =>
                setData({ ...data, [key]: moment(e).format("YYYY-MM-DD") })
              }
              label={_.startCase(field.label || key)}
              inputVariant="outlined"
              format="yyyy-MM-dd"
              margin="normal"
              id={key}
              KeyboardButtonProps={{
                "aria-label": "change date",
              }}
            />
          </Grid>
        );

      case "choice":
        return (
          <Grid item xs={12} key={key}>
            <FormControl variant="outlined" required={field.required} fullWidth>
              <InputLabel>{_.startCase(field.label || key)}</InputLabel>
              <Select
                label={_.startCase(field.label || key)}
                value={data[key] || ""}
                onChange={(e) => setData({ ...data, [key]: e.target.value })}
              >
                {field.choices.map((c) => (
                  <MenuItem value={c.value} key={c.value}>
                    {c.display_name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        );
    }
  };

  return (
    <div className={classes.mainGrid}>
      <div className={classes.container}>
        <Stepper activeStep={step}>
          {steps.map((s) => (
            <Step key={s}>
              <StepLabel>{s}</StepLabel>
            </Step>
          ))}
          <Step>
            <StepLabel>Summary</StepLabel>
          </Step>
        </Stepper>
        <>
          {step < 2 && (
            <div style={{ padding: 20 }}>
              <Grid container direction="column" spacing={2}>
                {Object.keys(form[step]).map((key) =>
                  getFormComponent(key, form[step][key])
                )}
              </Grid>
              <br />
              <br />
              <div style={{ textAlign: "center" }}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={() => setStep(step + 1)}
                >
                  Next
                </Button>
              </div>
            </div>
          )}
          {step === 2 && (
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
                          onClick={() => setStep(s)}
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
                            answer={data[key]}
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
                    exportToJson(data);
                    props.enqueueSnackbar("Form Submitted Successfully", {
                      variant: "success",
                    });
                  }}
                >
                  Submit
                </Button>
              </div>
            </>
          )}
        </>
      </div>
    </div>
  );
});
