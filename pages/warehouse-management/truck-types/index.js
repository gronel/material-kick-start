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
import TruckerForm from "./TruckerForm";
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
  searchInput: {
    width: "75%",
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
  const [customer, setCustomer] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openDialog, setOpenDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [captionDialog, setCaptionDialog] = useState("");
  const headCells = [
    { id: "supplier_code", label: "Supplier Code" },
    { id: "supplier_name", label: "Supplier Name" },
    { id: "supplier_category", label: "Supplier Catergory" },
    // { id: "created_by", label: "Create by" },
    // { id: "created_at", label: "Create at" },
    // { id: "updated_by", label: "Update by" },
    // { id: "updated_at", label: "Update at",},
    { id: "status", label: "Status", disableSorting: true },
    { id: "actions", label: "Actions", disableSorting: true },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(customer, headCells, filterFn);

  const DelopenHandlerDialog = (item) => {
    setRecordForRemove(item);
    setCaptionDialog(item.supplier_code);
    setOpenDialog(true);
  };
  const removeItem = () => {
    api.instance
      .delete("/wms/supplier/supplier-destroy/" + recordForRemove.id)
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
              x.supplier_code.toLowerCase().includes(target.value) ||
              x.supplier_name.toLowerCase().includes(target.value) ||
              x.supplier_category.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const onSubmit = (values, resetForm) => {
    if (values.id == 0)
      api.instance
        .post("/wms/supplier/supplier-store", values)
        .then((resp) => {
          console.log(resp.data);
          refreshListData();
        })
        .catch((err) => {
          console.log(err);
        });
    else {
      api.instance
        .put("/wms/supplier/supplier-update/" + values.id, values)
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
      .get("/wms/supplier/supplier-list")

      .then((resp) => {
        setCustomer(resp.data);
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
        <Link color="inherit" href="/warehouse-management/">
          Warehouse Management
        </Link>
        <Typography color="textPrimary">Trucker Type</Typography>
      </Breadcrumbs>
      {/* <PageHeader
        title="New Employee"
        subTitle="Form design with validation"
        icon={<PeopleAltTwoTone fontSize="large" />}
      /> */}
      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Supplier"
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
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.supplier_code}</TableCell>
                <TableCell>{item.supplier_name}</TableCell>
                <TableCell>{item.supplier_category}</TableCell>
                {/* <TableCell>{item.created_by}</TableCell>
                <TableCell>{item.created_by}</TableCell>
                <TableCell>{item.updated_by}</TableCell>
                <TableCell>{item.created_by}</TableCell> */}
                <TableCell>
                  {item.status == 1 ? (
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
        title="Delete Supplier"
        description={
          "Are you sure do want to delete Supplier code " + captionDialog
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
        title="Supplier Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        <TruckerForm recordForEdit={recordForEdit} addOrEdit={onSubmit} />
      </Popup>
    </>
  );
}
