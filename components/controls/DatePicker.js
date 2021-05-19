import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexWrap: "wrap",
  },
  textField: {
    marginLeft: theme.spacing(1),
    marginRight: theme.spacing(1),
    width: 200,
  },
}));
export default function DatePicker(props) {
  const classes = useStyles();
  const { name, label, value, error = null, onChange, ...other } = props;
  const convertToDefEventPara = (name, value) => ({
    target: {
      name,
      value,
    },
  });

  return (
    <div className={classes.container} noValidate>
      <TextField
        name={name}
        id="date"
        label={label}
        type="date"
        value={value}
        onChange={onChange}
        size="small"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        variant="outlined"
        {...other}
        {...(error && { error: true, helperText: error })}
      />
    </div>
  );
}
