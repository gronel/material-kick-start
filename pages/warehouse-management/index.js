import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));

export default function index() {

    const classes = useStyles();

    return (
        <div>
             <Breadcrumbs aria-label="breadcrumb">
      <Link color="inherit" href="/" >
       Home
      </Link>
      <Typography color="textPrimary">Warehouse Management</Typography>
    </Breadcrumbs>

            <Grid item xs={3}>
            <Link color="inherit" href="/warehouse-management/customer/" >
            <Paper className={classes.paper}>Customer Master</Paper>
      </Link>
         
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>Supplier Master</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        <Grid item xs={3}>
          <Paper className={classes.paper}>xs=3</Paper>
        </Grid>
        </div>
    )
}
