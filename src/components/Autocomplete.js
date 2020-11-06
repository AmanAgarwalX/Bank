import { CircularProgress, TextField } from "@material-ui/core";
import Autocomplete from "@material-ui/lab/Autocomplete";
import Axios from "axios";
import React, { useState } from "react";

const url = "https://api.first.org/data/v1/countries";

export default ({ onSelect = () => {}, label, value }) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState(null);
  const [search, setSearch] = useState("");
  const loading = options === null;
  React.useEffect(() => {
    setOptions(null);
    Axios.get(url, {
      params: {
        limit: 5,
        q: search,
      },
    }).then((res) => {
      setOptions(
        Object.keys(res.data.data).map((key) => res.data.data[key].country)
      );
    });
  }, [search]);
  return (
    <Autocomplete
      open={open}
      onOpen={() => {
        setOpen(true);
      }}
      onClose={() => {
        setOpen(false);
      }}
      value={value || undefined}
      getOptionSelected={(option, value) => option === value}
      getOptionLabel={(option) => option}
      options={options || []}
      loading={loading}
      onChange={(e, val) => {
        onSelect(val);
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          fullWidth
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          label={label}
          variant="outlined"
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {loading ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
    />
  );
};
