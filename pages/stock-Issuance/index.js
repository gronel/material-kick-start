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
        <Typography color="textPrimary">Stock Issuance</Typography>
      </Breadcrumbs>
      <Grid item xs={12} className={classes.gridmain}>
        <Grid container justify="center" spacing={spacing}>
          <Grid item>
            <Link color="inherit" href="/stock-Issuance/inventory-out/">
              <Paper className={classes.paper}>
                <Image
                  src="/images/trolley_50px.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Inventory OUT
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-Issuance/issuance-request/">
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/print_address_label_50px.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Issuance Request
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-Issuance/allocated-stocks/">
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/open_box_50px.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Allocated Stocks
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-Issuance/cancel-issuance/">
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/icons8-remove-delivery-50.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Cancel Issuance
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link
              color="inherit"
              href="/stock-Issuance/Issuance-pick-confirmation/"
            >
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/icons8-warehouse-50.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Issuance Pick Confirmation
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-Issuance/cancel-issuance-pick/">
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/icons8-remove-delivery-50.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Cancel Issuance Pick
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link
              color="inherit"
              href="/stock-Issuance/issuance-shipout-confirmation/"
            >
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/boat_leaving_port_50px.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Issuance Ship-out Confirmation
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-Issuance/dispatch-plan/">
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/magazine_50px.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Dispatch Plan
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link
              color="inherit"
              href="/stock-Issuance/dishpatch-confirmation/"
            >
              <Paper className={classes.paper}>
                {" "}
                <Image
                  src="/images/icons8-in-transit-50.png"
                  alt="me"
                  width="50"
                  height="50"
                />
                Dispatch Confirmation
              </Paper>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
