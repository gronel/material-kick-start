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
    cursor:"curor"
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
        <Typography color="textPrimary">Stock Management</Typography>
      </Breadcrumbs>
      <Grid item xs={12} className={classes.gridmain}>
        <Grid container justify="center" spacing={spacing}>
          <Grid item>
            <Link color="inherit" href="/stock-management/putaway/">
              <Paper className={classes.paper}>
                <Image
                  src="/images/icons8-customer-50.png"
                  alt="me"
                  width="50"
                  height="50"
                />{" "}
                Put-Away
              </Paper>
            </Link>
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-management/putaway-confirmation/">
               <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-full-tool-storage-box-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Putaway Confirmation
            </Paper>
            </Link>
           
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-management/putaway-cancellation/">
              <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-remove-delivery-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Putaway Cancellation
            </Paper>
            </Link>
            
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-management/stock-transfer/">
              <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-delivery-50-2.png"
                alt="me"
                width="50"
                height="50"
              />
              Stock Transfer
            </Paper>
            </Link>
            
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-management/stock-transfer-confirmation/">
              <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-warehouse-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Stock Transfer Confirmation
            </Paper>
            </Link>
            
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-management/stock-transfer-cancellation/">
                 <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-reuse-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Stock Transfer Cancellation
            </Paper>
            </Link>
         
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-management/case-pick-replenishment/">
               <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-delivery-truck-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Case Pick Replenishment
            </Paper>
            </Link>
           
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-management/piece-pick-replenishment/">
              <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-master-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Piece Pick Replenishment
            </Paper>
            </Link>
            
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-management/stock-replenishment-confirmation/">
                 <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-warehouse-50-2.png"
                alt="me"
                width="50"
                height="50"
              />
              Stock Replenishment Confirmation
            </Paper>
            </Link>
         
          </Grid>
          <Grid item>
            <Link color="inherit" href="/stock-management/stock-replenishment-cancellation/">
              <Paper className={classes.paper}>
              {" "}
              <Image
                src="/images/icons8-automative-storage-system-50.png"
                alt="me"
                width="50"
                height="50"
              />
              Stock Replenishment Cancellation
            </Paper>
            </Link>
            
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}
