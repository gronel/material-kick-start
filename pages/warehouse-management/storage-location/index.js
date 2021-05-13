import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

import {
  Typography,
  Breadcrumbs,
  Link,
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
import StorageForm from "./StorageForm";
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
    padding: theme.spacing(3),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 175,
  },
  searchInput: {
    width: "75%",
  },
  selectWarehouse: {
    width: "100%",
    float: "right",
  },
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));

export default function index() {
  const classes = useStyles();
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [recordForRemove, setRecordForRemove] = useState(null);
  const [listrecordData, setlistRecordData] = useState([]);
  const [listwarehouse, setlistWarehouse] = useState([]);
  const [isfilter, setfilter] = useState("");
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
    { id: "area_id", label: "Area ID" },
    { id: "trace_code", label: "Trace Code" },
    { id: "location_name", label: "Location Name" },
    { id: "location_type", label: "Location type" },
    { id: "is_active", label: "Active" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];
  const initialValues = {
    warehouse_code: "",
  };
  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(listrecordData, headCells, filterFn);

  const DelopenHandlerDialog = (item) => {
    setRecordForRemove(item);
    setCaptionDialog(item.warehouse_code);
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
  const onSubmit = (values, resetForm) => {
    if (values.id == 0)
      api.instance
        .post("/wms/location/storage-location-store", values)
        .then((resp) => {
          console.log(resp.data);
          refreshListData();
        })
        .catch((err) => {
          console.log(err);
        });
    else {
      api.instance
        .put("/wms/location/storage-location-update/" + values.id, values)
        .then((resp) => {
          console.log(resp.data);
          refreshListData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    resetForm();
    setRecordForEdit(null);
    setOpenPopup(false);
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const refreshListData = () => {
    api.instance
      .get("/wms/location/storage-location-list")

      .then((resp) => {
        setlistWarehouse(resp.data);
        console.log(resp.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  const onfilter = (warehousecode) => {
    debugger;
    setfilter(warehousecode);
    listwarehouse.filter((item) => {
      if (item.warehouse_code == warehousecode) {
        setlistRecordData(item.location);
        initialValues.warehouse_code = item.warehousecode;
      }
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
        <Link color="inherit" href="/warehouse-management/">
          Warehouse Management
        </Link>
        <Typography color="textPrimary">Storage Location</Typography>
      </Breadcrumbs>

      <Paper className={classes.pageContent}>
        <div className={classes.selectWarehouse}>
          <Controls.InputSelect
            name="warehouse_code"
            label="Warehouse Name"
            value={isfilter}
            onChange={(e) => onfilter(e.currentTarget.value)}
            options={listwarehouse}
          />
          {/* <FormControl variant="outlined" className={classes.formControl}>
            <InputLabel>Warehouse Name</InputLabel>
            <Select
              label="Warehouse Name"
              name={initialValues.warehouse_code}
              value={isfilter}
              onChange={(e) => onfilter(e.currentTarget.value)}
            >
              <MenuItem value="">None</MenuItem>

              {listwarehouse.map((row, key) => (
                <MenuItem key={key} value={row.warehouse_code}>
                  {row.warehouse_name}
                </MenuItem>
              ))}
            </Select>
          </FormControl> */}
        </div>
        <Toolbar>
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
          <Controls.Button
            text="Add New"
            variant="outlined"
            startIcon={<AddIcon />}
            className={classes.newButton}
            onClick={() => {
              setOpenPopup(true);
              setRecordForEdit(null);
            }}
          />
        </Toolbar>
        <TblContainer component={Paper}>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.location_code}</TableCell>
                <TableCell>{item.area_id}</TableCell>
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
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
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

      <Popup
        title="Storage Location Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <StorageForm recordForEdit={recordForEdit} addOrEdit={onSubmit} />
      </Popup>
    </>
  );
}
