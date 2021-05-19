import React from "react";
import {
  FormControl,
  InputLabel,
  Select as MuiSelect,
  MenuItem,
  FormHelperText,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(1),
  },
}));
export default function Select(props) {
  const classes = useStyles();
  const { name, label, value, error = null, onChange, options } = props;

  return (
    <FormControl
      variant="outlined"
      {...(error && { error: true })}
      className={classes.formControl}
    >
      <InputLabel>{label}</InputLabel>
      <MuiSelect
        label={label}
        name={name}
        value={value}
        onChange={onChange}
        size="small"
      >
        <MenuItem value="">
          <em>None</em>
        </MenuItem>
        {options.map((item) => (
          <MenuItem key={item.subid} value={item.subid}>
            {item.title}
          </MenuItem>
        ))}
      </MuiSelect>
      {error && <FormHelperText>{error}</FormHelperText>}
    </FormControl>
  );
}
