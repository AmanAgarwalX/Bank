import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { push } from "connected-react-router";
import React, { useRef } from "react";
import { connect } from "react-redux";
import Form from "./components/Form";
import { ACTIONS } from "./utils/actions";
import { form, steps } from "./utils/helpers";

const useStyles = makeStyles((theme) => {});

export default connect(
  (state) => ({
    reduxForm: state.app.form,
  }),
  (dispatch) => ({
    setForm: (data) =>
      dispatch({
        type: ACTIONS.APP.FORM,
        data: data,
      }),

    push: (to, state) => dispatch(push(to, state)),
  })
)(({ reduxForm, setForm, push }) => {
  const classes = useStyles();
  const ref = useRef();
  const onNext = () => {
    let data = ref.current?.getFormData();
    if (data) {
      setForm(data);
      push("/page-3");
    }
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h3>{steps[1]}</h3>
      </div>
      <Form ref={ref} fields={form[1]} defaultValues={reduxForm} />

      <div
        style={{
          textAlign: "center",
        }}
      >
        <br />
        <br />
        <Button variant="contained" color="primary" onClick={onNext}>
          Next
        </Button>
      </div>
    </>
  );
});
