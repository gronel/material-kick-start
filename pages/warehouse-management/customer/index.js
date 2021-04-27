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
} from "@material-ui/core";

import Popup from "../../../components/Popup";
import PageHeader from "../../../components/PageHeader";
import {PeopleOutlineTwoToneIcon} from "@material-ui/icons";
import CustomerForm from "./CustomerForm";
import EditOutlinedIcon from "@material-ui/icons/EditOutlined";
import CloseIcon from "@material-ui/icons/Close";
import Controls from "../../../components/controls/Controls";
import useTable from "../../../components/useTable";
import { Search } from "@material-ui/icons";
import AddIcon from "@material-ui/icons/Add";
import axios from "axios";
const useStyles = makeStyles((theme) => ({
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

  const [customer, setCustomer] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [openPopup, setOpenPopup] = useState(false);

  const headCells = [
    { id: "customer_code", label: "Customer Code" },
    { id: "customer_name", label: "Customer Name" },
    { id: "freshness_requirement", label: "Freshness requirement" },
    { id: "freshness_unit", label: "Freshness Unit" },
    { id: "customer_category", label: "Category" },
    { id: "status", label: "Status" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
  } = useTable(customer, headCells, filterFn);

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
  const openInPopup = () => {
    setOpenPopup(true);
  };
  const refreshListData = () => {
    axios
      .get("http://codesafe.org/api/wms/customer/customer-list")
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
        <CustomerForm />
      </Popup>
    </>
  );
}
