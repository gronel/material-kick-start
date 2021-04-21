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
    width: 110,
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
            <Link
              color="inherit"
              href="/system-administration/my-window-color-preference/"
            >
              <Paper className={classes.paper}>
                <Image
                  src="/images/icons8-customer-50.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                <br />
                My Window Color Preference
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link
              color="inherit"
              href="/system-administration/create-date-reports-menu/"
            >
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/icons8-page-properties-report-50.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Create Date Reports Menu
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link
              color="inherit"
              href="/system-administration/change-user-password/"
            >
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/icons8-grand-master-key-50.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Change User Password
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/system-administration/user-profile/">
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/icons8-customer-50.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                User Profile
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link
              color="inherit"
              href="/system-administration/change-warehouse/"
            >
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/icons8-warehouse-50-3.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Change Warehouse
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
