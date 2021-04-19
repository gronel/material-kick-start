import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Image from "next/image";
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },

  gridmain: {
    marginTop: 10,
  },
  paper: {
    margin: 5,
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
    height: 150,
    width: 100,
    bottom: 0,
    left: 0,
  },

  control: {
    padding: theme.spacing(2),
  },
}));

export default function index() {
  const classes = useStyles();
  const [spacing, setSpacing] = React.useState(2);
  return (
    <div>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Typography color="textPrimary">System Administration</Typography>
      </Breadcrumbs>
      <Grid item xs={12} className={classes.gridmain}>
        <Grid container justify="center" spacing={spacing}>
          <Grid item>
            <Link color="inherit" href="/warehouse-management/customer/">
              <Paper className={classes.paper}>
                <Image
                  src="/images/icons8-customer-50.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                My Window Color Preference
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-full-tool-storage-box-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Create Date Reports Menu
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-customer-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Change User Password
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-tape-measure-50.png"
                alt="me"
                width="50"
                height="50"
              />
              User Profile
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-warehouse-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Change Warehouse
            </Paper>
          </Grid>
          
        </Grid>
      </Grid>
    </div>
  );
}
