import {
  FormControl,
  FormHelperText,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@material-ui/core";
import { KeyboardDatePicker } from "@material-ui/pickers";
import { makeStyles } from "@material-ui/styles";
import _ from "lodash";
import moment from "moment";
import React, { forwardRef, useImperativeHandle, useState } from "react";
import { validateEmail } from "../utils/helpers";
import Autocomplete from "./Autocomplete";

const checkValues = (fields, data) => {
  let errors = {};
  Object.keys(fields).forEach((key) => {
    if (fields[key].required && (data[key] === "" || data[key] === undefined)) {
      return (errors[key] = fields[key].label + " cannot be blank");
    }
    if (fields[key].type === "email" && !validateEmail(data[key])) {
      return (errors[key] = "Invalid Email");
    }
  });
  return errors;
};

const useStyles = makeStyles((theme) => {});

export default forwardRef(
  ({ isMultiline = new Set([]), fields = {}, defaultValues = {} }, ref) => {
    const classes = useStyles();
    const [data, setData] = useState(defaultValues);
    const [errors, setErrors] = useState({});
    useImperativeHandle(
      ref,
      () => ({
        getFormData: () => {
          setErrors({});
          let errors = checkValues(fields, data);
          if (!_.isEmpty(errors)) {
            setErrors(errors);
            return null;
          } else {
            return data;
          }
        },
      }),
      [data]
    );
    const getFormComponent = (key, field) => {
      switch (field.type) {
        case "email":
        case "string":
          return (
            <Grid item xs={12} key={key}>
              <TextField
                error={Boolean(errors[key])}
                helperText={errors[key]}
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

        case "autocomplete":
          return (
            <Grid item xs={12} key={key}>
              <FormControl fullWidth error={Boolean(errors[key])}>
                <Autocomplete
                  label={_.startCase(field.label || key)}
                  value={data[key]}
                  onSelect={(d) => {
                    setData({ ...data, [key]: d });
                  }}
                />
                {errors[key] && <FormHelperText>{errors[key]}</FormHelperText>}
              </FormControl>
            </Grid>
          );

        case "date":
          return (
            <Grid item xs={12} key={key}>
              <KeyboardDatePicker
                disableToolbar
                error={Boolean(errors[key])}
                helperText={errors[key]}
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
              <FormControl
                variant="outlined"
                required={field.required}
                fullWidth
                error={Boolean(errors[key])}
              >
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
                {errors[key] && <FormHelperText>{errors[key]}</FormHelperText>}
              </FormControl>
            </Grid>
          );
      }
    };
    return (
      <>
        <Grid container direction="column" spacing={2}>
          {Object.keys(fields).map((key) => getFormComponent(key, fields[key]))}
        </Grid>
      </>
    );
  }
);
