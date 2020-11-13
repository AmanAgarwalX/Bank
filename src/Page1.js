import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { push } from "connected-react-router";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "./components/Form";
import { ACTIONS } from "./utils/actions";
import { form, steps } from "./utils/helpers";

const useStyles = makeStyles((theme) => {});

export default connect(
  (state) => ({
    user: state.app.user,
  }),
  (dispatch) => ({
    setUser: (data) =>
      dispatch({
        type: ACTIONS.APP.USER,
        data: data,
      }),

    push: (to, state) => dispatch(push(to, state)),
  })
)(({ user, setUser, push }) => {
  if (user.id) {
    return <Redirect to="/page-2" />;
  }
  const classes = useStyles();
  const ref = useRef();
  const onNext = () => {
    let data = ref.current?.getFormData();
    if (data) {
      setUser(data);
      push("/page-2");
    }
  };

  return (
    <>
      <div
        style={{
          textAlign: "center",
        }}
      >
        <h3>{steps[0]}</h3>
      </div>
      <Form ref={ref} fields={form[0]} defaultValues={user} />

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
