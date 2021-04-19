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
    height: 140,
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
        <Typography color="textPrimary">Warehouse Management</Typography>
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
                Customer Master
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-fast-moving-consumer-goods-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Supplier Master
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Image
                src="/images/icons8-van-50.png"
                alt="me"
                width="50"
                height="50"
              />{" "}
              Trucker Master
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              <Image
                src="/images/icons8-tape-measure-50.png"
                alt="me"
                width="50"
                height="50"
              />{" "}
              Unit of Measures
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
              Warehouse Location
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-automative-storage-system-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Storage Location
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-delivery-truck-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Truck Types
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-master-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Item Master
            </Paper>
          </Grid>
          <Grid item>
            <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-supplier-50-2.png"
                alt="me"
                width="50"
                height="50"
              />
              Warehouse Users
            </Paper>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
