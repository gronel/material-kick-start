import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";
import Link from "next/link";
import {
  Typography,
  Breadcrumbs,
  Paper,
  makeStyles,
  TableBody,
  TableRow,
  TableCell,
  Toolbar,
  InputAdornment,
  Button,
  TextField,
  Grid,
  Checkbox,
  ListItemText,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@material-ui/core";

import Popup from "../../../components/Popup";
import PageHeader from "../../../components/PageHeader";
import InsertEmoticonOutlined from "@material-ui/icons";
import PeopleAltTwoTone from "@material-ui/icons/PeopleAltTwoTone";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Controls from "../../../components/controls/Controls";
import useTable from "../../../components/useTable";
import { Search } from "@material-ui/icons";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import RadioButtonUncheckedRoundedIcon from "@material-ui/icons/RadioButtonUncheckedRounded";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import api from "../../../Services/api";
import PopDialog from "../../../components/PopDialog";
import DeleteIcon from "@material-ui/icons/Delete";
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
  pageContent: {
    margin: theme.spacing(5),
    padding: theme.spacing(2),
  },
  searchInput: {
    width: "50%",
    height: 40,
  },

  newButton: {
    position: "absolute",
    right: "35px",
  },
}));

export default function index() {
  const classes = useStyles();

  const [recordForEdit, setRecordForEdit] = useState(null);
  const [recordForRemove, setRecordForRemove] = useState(null);
  const [listrecordData, setlistRecordData] = useState([]);
  const [locationList, setLocationList] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [captionDialog, setCaptionDialog] = useState("");
  const headCells = [
    { id: "location_code", label: "Location Code" },
    { id: "warehouse_name", label: "Warehouse" },
    { id: "area_name", label: "Area" },
    { id: "trace_code", label: "Trace Code" },
    { id: "location_name", label: "Location Name" },
    { id: "location_type", label: "Location type" },
    { id: "is_active", label: "Active" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];

  const initialValues = {
    warehouse_id: 1,
  };
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(locationList, headCells, filterFn);

  const DelopenHandlerDialog = (item) => {
    setRecordForRemove(item);
    setCaptionDialog(item.location_code);
    setOpenDialog(true);
  };
  const removeItem = () => {
    api.instance
      .delete("/wms/location/storage-location-destroy/" + recordForRemove.id)
      .then((resp) => {
        console.log(resp.data);
        refreshListData();
      })
      .catch((err) => {
        console.log(err);
      });
    setOpenDialog(false);
  };
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.location_code.toLowerCase().includes(target.value) ||
              x.trace_code.toLowerCase().includes(target.value) ||
              x.location_name.toLowerCase().includes(target.value) ||
              x.location_type.toLowerCase().includes(target.value)
          );
      },
    });
  };

  const refreshListData = () => {
    api.instance
      .get("/wms/location/storage-location-list")

      .then((resp) => {
        setLocationList(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  useEffect(() => {
    refreshListData();
  }, []);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href="/stock-receipts/">
          Stock Receipts
        </Link>
        <Typography color="textPrimary">Inventory In</Typography>
      </Breadcrumbs>
      <div>
        <Toolbar>
          <Link
            href="/stock-receipts/inventory-in/[id]"
            as="/stock-receipts/inventory-in/add"
          >
            <Controls.Button
              text="Add New"
              startIcon={<AddIcon />}
              className={classes.newButton}
            />
          </Link>
        </Toolbar>
      </div>

      <Paper className={classes.pageContent}>
        <Controls.Input
          label="Search"
          className={classes.searchInput}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          onChange={handleSearch}
        />
        <TblContainer component={Paper}>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.location_code}</TableCell>
                <TableCell>{item.warehouse_name}</TableCell>
                <TableCell>{item.area_name}</TableCell>
                <TableCell>{item.trace_code}</TableCell>
                <TableCell>{item.location_name}</TableCell>
                <TableCell>{item.location_type}</TableCell>
                <TableCell>
                  {item.is_active == 1 ? (
                    <CheckCircleIcon />
                  ) : (
                    <RadioButtonUncheckedRoundedIcon />
                  )}
                </TableCell>
                <TableCell>
                  <Link
                    href={"/stock-receipts/inventory-in/" + item.uuid}
                    key={item.id}
                  >
                    <Controls.ActionButton color="primary">
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                  </Link>

                  <Controls.ActionButton
                    color="secondary"
                    onClick={() => {
                      DelopenHandlerDialog(item);
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>
      <PopDialog
        title="Delete Storege Location"
        description={
          "Are you sure do want to delete Storage code " + captionDialog
        }
        openDialog={openDialog}
        setOpenDialog={setOpenDialog}
      >
        <DialogActions>
          <Button onClick={removeItem} color="primary" autoFocus>
            Agree
          </Button>
        </DialogActions>
      </PopDialog>
    </>
  );
}
