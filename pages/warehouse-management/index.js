import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Link from "@material-ui/core/Link";
import Image from "next/image";
import FolderSharedIcon from "@material-ui/icons/FolderShared";
import LandscapeRoundedIcon from "@material-ui/icons/LandscapeRounded";
import HomeWorkRoundedIcon from "@material-ui/icons/HomeWorkRounded";
import LocalShippingRoundedIcon from "@material-ui/icons/LocalShippingRounded";
import SquareFootRoundedIcon from "@material-ui/icons/SquareFootRounded";
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
  fonticon: {
    fontSize: 50,
    color: theme.palette.text.primary,
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
                <FolderSharedIcon className={classes.fonticon} />
                Customer Master
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/warehouse-management/supplier-master/">
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
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/warehouse-management/trucker-master/">
              <Paper className={classes.paper}>
                <LocalShippingRoundedIcon className={classes.fonticon} />
                Trucker Master
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link
              color="inherit"
              href="/warehouse-management/unit-of-measures/"
            >
              <Paper className={classes.paper}>
                <SquareFootRoundedIcon className={classes.fonticon} />
                {" "}
                Unit of Measures
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link
              color="inherit"
              href="/warehouse-management/warehouse-location/"
            >
              <Paper className={classes.paper}>
                <HomeWorkRoundedIcon className={classes.fonticon} />
                Warehouse Location
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/warehouse-management/area/">
              <Paper className={classes.paper}>
                <LandscapeRoundedIcon className={classes.fonticon} />
                Area
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link
              color="inherit"
              href="/warehouse-management/storage-location/"
            >
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
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/warehouse-management/truck-types/">
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
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/warehouse-management/item-master/">
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
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/warehouse-management/warehouse-users/">
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
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
