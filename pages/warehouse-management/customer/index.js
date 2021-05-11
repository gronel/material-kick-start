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
} from "@material-ui/core";

import Popup from "../../../components/Popup";
import PageHeader from "../../../components/PageHeader";
import { PeopleOutlineTwoToneIcon } from "@material-ui/icons";
import CustomerForm from "./CustomerForm";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Controls from "../../../components/controls/Controls";
import useTable from "../../../components/useTable";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
import api from "../../../Services/api";

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
  const [customer, setCustomer] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);
  const [edit, isEdit] = useState(false);
  const [checked, setchecked] = useState(false);
  const headCells = [
    { id: "customer_code", label: "Customer Code" },
    { id: "customer_name", label: "Customer Name" },
    { id: "freshness_requirement", label: "Freshness requirement" },
    { id: "freshness_unit", label: "Freshness Unit" },
    { id: "customer_category", label: "Category" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];
  const [form, setForm] = useState({
    id: "",
    customer_code: "",
    customer_name: "",
    status: "",
    freshness_requirement: "",
    freshness_unit: "",
    customer_category: "",
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(customer, headCells, filterFn);
  const toggle = () => {
    setchecked(!checked);
    setForm({
      ...form,
      status: checked ? 0 : 1,
    });
  };
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter((x) =>
            x.firstName.toLowerCase().includes(target.value)
          );
      },
    });
  };
  const addOrEdit = () => {
    if (edit == false)
      api.instance
        .post("/wms/customer/customer-store", form)
        .then((resp) => {
          console.log(resp.data);
          refreshListData();
          setForm({});
        })
        .catch((err) => {
          console.log(err);
        });
    else if (edit == true) {
      api.instance
        .put("/wms/customer/customer-update/" + form.id)
        .then((resp) => {
          console.log(resp.data);
          refreshListData();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    // resetForm();
    // setRecordForEdit(null);
    setOpenPopup(false);
    refreshListData();
  };

  const openInPopup = (item) => {
    setRecordForEdit(item);
    setOpenPopup(true);
  };
  const refreshListData = () => {
    api.instance
      .get("/wms/customer/customer-list")

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
        <Typography color="textPrimary">Customer List</Typography>
      </Breadcrumbs>

      <Paper className={classes.pageContent}>
        <Toolbar>
          <Controls.Input
            label="Search Customers"
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
            onClick={openInPopup}
          />
        </Toolbar>
        <TblContainer>
          <TblHead />
          <TableBody>
            {recordsAfterPagingAndSorting().map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.customer_code}</TableCell>
                <TableCell>{item.customer_name}</TableCell>
                <TableCell>{item.freshness_requirement}</TableCell>
                <TableCell>{item.freshness_unit}</TableCell>
                <TableCell>{item.customer_category}</TableCell>
                <TableCell>{item.status}</TableCell>

                <TableCell>
                  <Controls.ActionButton
                    color="primary"
                    onClick={() => {
                      openInPopup(item);
                    }}
                  >
                    <EditOutlinedIcon fontSize="small" />
                  </Controls.ActionButton>
                  <Controls.ActionButton color="secondary">
                    <CloseIcon fontSize="small" />
                  </Controls.ActionButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TblContainer>
        <TblPagination />
      </Paper>

      <Popup
        title="Customer Form"
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
      >
        {/* <CustomerForm recordForEdit={recordForEdit} addOrEdit={addOrEdit} /> */}

        <Grid container>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Customer Code"
              name={form.customer_code}
              value={form.customer_code}
              onChange={(e) => {
                setForm({
                  ...form,
                  customer_code: e.target.value,
                });
              }}
              size="small"
            />

            <TextField
              variant="outlined"
              label="Customer Name"
              name={form.customer_name}
              value={form.customer_name}
              onChange={(e) => {
                setForm({
                  ...form,
                  customer_name: e.target.value,
                });
              }}
              size="small"
            />
            <TextField
              variant="outlined"
              label="freshness Requirement"
              name={form.freshness_requirement}
              value={form.freshness_requirement}
              onChange={(e) => {
                setForm({
                  ...form,
                  freshness_requirement: e.target.value,
                });
              }}
              size="small"
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Freshness Unit"
              name={form.freshness_unit}
              value={form.freshness_unit}
              onChange={(e) => {
                setForm({
                  ...form,
                  freshness_unit: e.target.value,
                });
              }}
              size="small"
            />
            <TextField
              variant="outlined"
              label="Customer Category"
              name={form.customer_category}
              value={form.customer_category}
              onChange={(e) => {
                setForm({
                  ...form,
                  customer_category: e.target.value,
                });
              }}
              size="small"
            />
            <Checkbox
              checked={checked}
              onChange={toggle}
              name="Status"
              value={checked ? 1 : 0}
              color="primary"
              label="Status"
            />
          </Grid>
        </Grid>
        <div>
          <Button onClick={addOrEdit} variant="contained" color="primary">
            Submit
          </Button>
        </div>
      </Popup>
    </>
  );
}
