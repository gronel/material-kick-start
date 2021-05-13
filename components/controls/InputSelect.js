import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { FormControl, InputLabel, Select, MenuItem } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 175,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function InputSelect(props) {
  const classes = useStyles();
  const { name, label, value, error = null, onChange, options } = props;

  return (
    <div>
      <FormControl
        variant="outlined"
        className={classes.formControl}
        {...(error && { error: true })}
      >
        <InputLabel>{label}</InputLabel>
        <Select label={label} name={name} value={value} onChange={onChange}>
          <MenuItem value="">None</MenuItem>

          {options.map((item) => (
            <MenuItem key={item.warehouse_code} value={item.warehouse_code}>
              {item.warehouse_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      ;
    </div>
  );
}
