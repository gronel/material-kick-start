import React from 'react'
import { Button, makeStyles } from '@material-ui/core';
import IconButton from "@material-ui/core/IconButton";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 0,
    margin: theme.spacing(0.5),
  },
  secondary: {
    backgroundColor: theme.palette.secondary.light,
    "& .MuiButton-label": {
      color: theme.palette.secondary.main,
    },
  },
  primary: {
    backgroundColor: theme.palette.primary.main,
    "& .MuiButton-label": {
      color: theme.palette.primary.contrastText,
    },
  },
}));

export default function ActionButton(props) {

    const { color, children, onClick } = props;
    const classes = useStyles();

    return (
      <IconButton
        // className={`${classes.root} ${classes[color]}`}
        color={color}
        onClick={onClick}
      >
        {children}
      </IconButton>
    );
}
