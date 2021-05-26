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

export default function DatePickers(props) {
  const classes = useStyles();
  const { name, label, value, error = null, onChange, ...other } = props;
  return (
    <div className={classes.container}>
      <TextField
        name={name}
        variant="outlined"
        id="date"
        size="small"
        label={label}
        type="date"
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        {...other}
        {...(error && { error: true, helperText: error })}
      />
    </div>
  );
}
