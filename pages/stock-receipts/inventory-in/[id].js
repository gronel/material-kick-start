import React, { useState, useEffect } from "react";
import { classnames, DataGrid } from "@material-ui/data-grid";
import ItemMasterList from "./item-masterlist";
import {
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  makeStyles,
  Grid,
  DialogActions,
  Hidden,
  InputAdornment,
  IconButton,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@material-ui/core";

import useTable from "../../../components/useTable";
import { Search } from "@material-ui/icons";
import { useForm, Form } from "../../../components/useForm";
import Controls from "../../../components/controls/Controls";
import api from "../../../Services/api";
import { useRouter } from "next/router";
import PopDialog from "../../../components/PopDialog";
import Popup from "../../../components/Popup";
const initialFValues = {
  id: "",
  uuid: "",
  warehouse_id: "",
  contact_id: "",
  poheader_id: "",
  contact_name: "",
  supplierid: "",
  checksupplier: false,
  reference_no: "",
  receipt_date: "",
  document_no: "",
  document_date: "",
  order_no: "",
  order_date: "",
  shipment_no: "",
  shipment_date: "",
  receipt_type: "",
  receiving_area_code: "",
  remarks: "",
  status: "",
  record_source: "",
  trace_no: "",
  created_by: "",
  updated_by: "",
};

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
    },
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
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
}));

storageform.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const response = await api.instance
    .get("/wms/location/storage-location-id/" + query.id)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      console.log(err.data);
    });
  const dataList = await response;
  return { dataList: dataList };
};
export default function storageform({ dataList }) {
  const classes = useStyles();
  const router = useRouter();
  const [listrecordData, setlistRecordData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [openPopup, setOpenPopup] = useState(false);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const headCells = [
    { id: "supplier_code", label: "Code" },
    { id: "supplier_name", label: "Name" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(listrecordData, headCells, filterFn);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("warehouse_id" in fieldValues)
      temp.warehouse_id = fieldValues.warehouse_id
        ? ""
        : "This field is required.";
    if ("contact_id" in fieldValues)
      temp.contact_id = fieldValues.contact_id ? "" : "This field is required.";
    if ("poheader_id" in fieldValues)
      temp.poheader_id = fieldValues.poheader_id
        ? ""
        : "This field is required.";

    setErrors({
      ...temp,
    });

    if (fieldValues == values) return Object.values(temp).every((x) => x == "");
  };

  const { values, setValues, errors, setErrors, handleInputChange, resetForm } =
    useForm(initialFValues, true, validate);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      addOrEdit(values, resetForm);
    }
  };
  async function onSearchSupplier() {
    const data = await api.instance
      .get("/wms/supplier/supplier-search")
      .then((resp) => {
        setlistRecordData(resp.data);
        console.log(resp.data);
        setOpenPopup(true);
      })
      .catch((err) => {
        console.log(err.data);
      });
  }
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  function removeItem() {}
  const addOrEdit = (values, resetForm) => {};
  const handleSearch = (e) => {
    let target = e.target;
    setFilterFn({
      fn: (items) => {
        if (target.value == "") return items;
        else
          return items.filter(
            (x) =>
              x.supplier_code.toLowerCase().includes(target.value) ||
              x.supplier_name.toLowerCase().includes(target.value)
          );
      },
    });
  };
  useEffect(() => {}, []);
  return (
    <>
      <Breadcrumbs aria-label="breadcrumb">
        <Link color="inherit" href="/">
          Home
        </Link>
        <Link color="inherit" href="/stock-receipts/">
          Stock Receipts
        </Link>
        <Link color="inherit" href="/stock-receipts/inventory-in/">
          Inventory In
        </Link>
        <Typography color="textPrimary">
          {router.query.id == "add"
            ? "Add Inventory In"
            : "Update Inventory In"}
        </Typography>
      </Breadcrumbs>

      <Paper className={classes.pageContent}>
        <Form onSubmit={handleSubmit}>
          <Grid container  spacing={2}>
            <Grid item lg={6} sm={6} xs={12}>
              <Grid item lg={5} sm={12} xs={12}>
                <Controls.Input
                  label="Receipt No*"
                  name="receipt_no"
                  value={values.receipt_no}
                  onChange={handleInputChange}
                  error={errors.receipt_no}
                />
                <Controls.Input
                  label="Reference No*"
                  name="reference_no"
                  value={values.reference_no}
                  onChange={handleInputChange}
                  error={errors.reference_no}
                />
                <Controls.DatePicker
                  label="Receive Date *"
                  name="location_name"
                  value={values.location_name}
                  onChange={handleInputChange}
                  error={errors.location_name}
                />
                <Controls.Input
                  id="standard-adornment-weight"
                  label="Supplier"
                  name="order_no"
                  onChange={handleInputChange}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={onSearchSupplier}>
                          <Search />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>

              <Controls.Input
                label="Remarks"
                name="remarks"
                multiline
                rows={4}
                value={values.remarks}
                onChange={handleInputChange}
              />
            </Grid>

            <Grid item lg={4} sm={6} xs={12}>
              <Controls.Input
                label="Status *"
                name="trucker"
                value={values.status}
                onChange={handleInputChange}
                error={errors.status}
              />
              <Controls.Input
                label="Document No.*"
                name="document_no"
                value={values.document_no}
                onChange={handleInputChange}
                error={errors.document_no}
              />
              <Controls.DatePicker
                label="Document Date *"
                name="document_date"
                value={values.document_date}
                onChange={handleInputChange}
                error={errors.document_date}
              />
            </Grid>
          </Grid>
          <ItemMasterList onSearch={setOpenPopup}/>
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
          <Popup
            title="Search Supplier"
            openPopup={openPopup}
            setOpenPopup={setOpenPopup}
          >
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
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item) => (
                  <TableRow key={item.id}>
                    <TableCell>{item.supplier_name}</TableCell>
                    <TableCell>{item.supplier_code}</TableCell>

                    <TableCell>
                      <Controls.Checkbox
                        name="supplierid"
                        label=""
                        value={values.supplierid}
                        onChange={handleInputChange}
                      />
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </TblContainer>
            <TblPagination />

            <DialogActions>
              <Button onClick={removeItem} color="primary" autoFocus>
                Ok
              </Button>
            </DialogActions>
          </Popup>
          <PopDialog
            title="Promt message"
            description={
              router.query.id == "add"
                ? "Do you want to Add this Transation?"
                : "Do you want to Update this Transaction?"
            }
            openDialog={openDialog}
            setOpenDialog={setOpenDialog}
          >
            <DialogActions>
              <Controls.Button
                onClick={handleSubmit}
                color="primary"
                text="Save"
              />
              <Controls.Button
                text="Cancel"
                color="default"
                onClick={onCloseDialog}
              />
            </DialogActions>
          </PopDialog>
        </Form>
      </Paper>
    </>
  );
}
