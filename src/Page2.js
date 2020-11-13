import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import { push } from "connected-react-router";
import _ from "lodash";
import { withSnackbar } from "notistack";
import React, { useRef } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import Form from "./components/Form";
import { ACTIONS } from "./utils/actions";
import { addAccount, form, steps } from "./utils/helpers";

const useStyles = makeStyles((theme) => {});

export default withSnackbar(
  connect(
    (state) => ({
      account: state.app.account,
      accounts: state.app.accounts,
      state: state.router.location.state,
    }),
    (dispatch) => ({
      setAccount: (data) =>
        dispatch({
          type: ACTIONS.APP.ACCOUNT,
          data: data,
        }),
      setAccounts: (data) =>
        dispatch({
          type: ACTIONS.APP.ACCOUNTS,
          data: data,
        }),

      push: (to, state) => dispatch(push(to, state)),
    })
  )(
    ({
      account,
      setAccount,
      push,
      state,
      setAccounts,
      accounts,
      enqueueSnackbar,
    }) => {
      const onNextCustom = state?.onNextCustom;
      if (!_.isEmpty(accounts) && !onNextCustom) {
        return <Redirect to="/page-4" />;
      }
      const classes = useStyles();
      const ref = useRef();
      const onNext = () => {
        let data = ref.current?.getFormData();
        if (data) {
          if (onNextCustom) {
            addAccount(onNextCustom, data)
              .then((res) => {
                setAccounts(res.data);
                enqueueSnackbar("Account created successfully", {
                  variant: "success",
                });
                push("/page-4");
              })
              .catch((e) => {
                enqueueSnackbar("Error in account creation", {
                  variant: "error",
                });
              });
            // onNextCustom(data);
          } else {
            setAccount(data);
            push("/page-3");
          }
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
          <Form ref={ref} fields={form[1]} defaultValues={account} />

          <div
            style={{
              textAlign: "center",
            }}
          >
            <br />
            <br />
            <Button variant="contained" color="primary" onClick={onNext}>
              {onNextCustom ? "Submit" : "Next"}
            </Button>
          </div>
        </>
      );
    }
  )
);
