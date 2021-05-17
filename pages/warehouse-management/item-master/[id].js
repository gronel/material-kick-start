import React, { useState, useEffect } from "react";
import { DataGrid } from "@material-ui/data-grid";

import {
  Typography,
  Breadcrumbs,
  Link,
  Paper,
  makeStyles,
  Grid,
  DialogActions,
  Hidden,
  FormControlLabel,
} from "@material-ui/core";
import { useForm, Form } from "../../../components/useForm";
import Controls from "../../../components/controls/Controls";
import api from "../../../Services/api";
import { useRouter } from "next/router";
import PopDialog from "../../../components/PopDialog";
const initialFValues = {
  id: "",
  uuid: "",
  warehouse_id: "",
  area_id: "",
  location_code: "",
  trace_code: "",
  location_name: "",
  location_type: "",
  size_code: "",
  abc_code: "",
  check_digit: "",
  capacity: "",
  drive_zone: "",
  drive_sequence: "",
  pick_zone: "",
  pick_sequence: "",
  is_locked: 0,
  lock_type: "",
  is_fix_item: 0,
  fix_item_code: "",
  is_overflow: 0,
  is_virtual: 0,
  is_block_stock: "0",
  is_active: 0,
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
  GridCaption: {
    padding: theme.spacing(1),
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
  newButton: {
    position: "absolute",
    right: "10px",
  },
}));
storageform.getInitialProps = async (ctx) => {
  const { query } = ctx;
  const response = await api.instance
    .get("/wms/itemmaster/item-master-id/" + query.id)
    .then((resp) => {
      console.log(resp.data);
    })
    .catch((err) => {
      console.log(err.data);
    });
  const dataList = await response;
  return { dataList: dataList };
};
export default function storageform() {
  const classes = useStyles();
  const router = useRouter();
  const { id } = router.query;
  const [openDialog, setOpenDialog] = useState(false);
  const [locationItem, setlocationItem] = useState([]);
  const [warehouseName, setwarehouseName] = useState([]);
  const [showlocationtype, setlocationtype] = useState([]);
  const [showAbcCode, setAbcCode] = useState([]);
  const [areaActive, setAreaActive] = useState([]);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("customer_code" in fieldValues)
      temp.customer_code = fieldValues.customer_code
        ? ""
        : "This field is required.";
    if ("customer_name" in fieldValues)
      temp.customer_name = fieldValues.customer_name
        ? ""
        : "This field is required.";
    if ("freshness_requirement" in fieldValues)
      temp.freshness_requirement = fieldValues.freshness_requirement
        ? ""
        : "This field is required.";

    if ("freshness_unit" in fieldValues)
      temp.freshness_unit = fieldValues.freshness_unit
        ? ""
        : "This field is required.";
    if ("customer_category" in fieldValues)
      temp.customer_category = fieldValues.customer_category
        ? ""
        : "This field is required.";
    if ("location_type" in fieldValues)
      temp.location_type =
        fieldValues.location_type.length != 0 ? "" : "This field is required.";

    if ("abc_code" in fieldValues)
      temp.abc_code =
        fieldValues.abc_code.length != 0 ? "" : "This field is required.";
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
  const handlerDialog = () => {
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  const gitItemMasterList = () => {
    if (router.query.id == "add") {
    } else {
      api.instance
        .get("/wms/itemmaster/item-master-id/" + router.query.id)
        .then((resp) => {
          console.log(resp.data);
          setValues(resp.data[0]);
        })
        .catch((err) => {
          console.log(err.data);
        });
    }
  };

  const onSelectWarehouseName = () => {
    api.instance
      .get("/wms/warehouse/warehouse-list-active")
      .then((resp) => {
        console.log(resp.data);
        setwarehouseName(resp.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  const onSelectLocationType = () => {
    api.instance
      .get("/wms/dropdown/dropdown-list/receipttype")
      .then((resp) => {
        console.log(resp.data);
        setlocationtype(resp.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  const onSelectAbcCode = () => {
    api.instance
      .get("/wms/dropdown/dropdown-list/abccode")
      .then((resp) => {
        console.log(resp.data);
        setAbcCode(resp.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  const onSelectAreaActive = () => {
    api.instance
      .get("/wms/area/area-list-active")
      .then((resp) => {
        console.log(resp.data);
        setAreaActive(resp.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  const addOrEdit = (values, resetForm) => {
    if (values.id == 0)
      api.instance
        .post("/wms/itemmaster/item-master-store", values)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    else {
      api.instance
        .put("/wms/itemmaster/item-master-update/" + values.id, values)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const getStepContent = (stepIndex) => {
    switch (stepIndex) {
      case 0:
        return (
          <div>
            <Grid container spacing={2}>
              <Grid item lg={3} sm={6} xs={12}>
                <Controls.Input
                  label="Item Code"
                  name="location_code"
                  value={values.location_code}
                  onChange={handleInputChange}
                  error={errors.location_code}
                />
                <Controls.Input
                  label="Refresh Code"
                  name="location_name"
                  value={values.location_name}
                  onChange={handleInputChange}
                  error={errors.location_name}
                />

                <Controls.Input
                  label="Description"
                  name="trace_code"
                  value={values.trace_code}
                  onChange={handleInputChange}
                  error={errors.trace_code}
                />
                <Controls.Input
                  label="Shortdesc"
                  name="shortdesc"
                  value={values.shortdesc}
                  onChange={handleInputChange}
                  error={errors.shortdesc}
                />
                <Controls.Select
                  name="abc_code"
                  label="Abc Code"
                  value={values.abc_code}
                  onChange={handleInputChange}
                  options={showAbcCode}
                />
                <Controls.Input
                  label="Unit Cost"
                  name="capacity"
                  value={values.capacity}
                  onChange={handleInputChange}
                  error={errors.capacity}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <Controls.Input
                  label="Salvage days"
                  name="drive_zone"
                  value={values.drive_zone}
                  onChange={handleInputChange}
                  error={errors.drive_zone}
                />
                <Controls.Input
                  label="Safestocklevel"
                  name="drive_sequence"
                  value={values.drive_sequence}
                  onChange={handleInputChange}
                  error={errors.drive_sequence}
                />
                <Controls.Input
                  label="Shelf life unit"
                  name="size_code"
                  value={values.size_code}
                  onChange={handleInputChange}
                  error={errors.size_code}
                />
                <Controls.Input
                  label="Batch find Strategy"
                  name="size_code"
                  value={values.size_code}
                  onChange={handleInputChange}
                  error={errors.size_code}
                />
                <Controls.Input
                  label="lotformatdate"
                  name="size_code"
                  value={values.size_code}
                  onChange={handleInputChange}
                  error={errors.size_code}
                />
              </Grid>

              <Grid item lg={3} sm={6} xs={12}>
                <Controls.Select
                  name="location_type"
                  label="Location Type"
                  value={values.location_type}
                  onChange={handleInputChange}
                  options={showlocationtype}
                />

                <Controls.Input
                  label="Check digit"
                  name="check_digit"
                  value={values.check_digit}
                  onChange={handleInputChange}
                  error={errors.check_digit}
                />
                <Controls.Input
                  label="Pick zone"
                  name="pick_zone"
                  value={values.pick_zone}
                  onChange={handleInputChange}
                  error={errors.pick_zone}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <Controls.Input
                  label="Pick sequence"
                  name="pick_sequence"
                  value={values.pick_sequence}
                  onChange={handleInputChange}
                  error={errors.pick_sequence}
                />
                <Controls.Input
                  label="Lock type"
                  name="lock_type"
                  value={values.lock_type}
                  onChange={handleInputChange}
                  error={errors.lock_type}
                />
                <Controls.Input
                  label="Fix item code"
                  name="fix_item_code"
                  value={values.fix_item_code}
                  onChange={handleInputChange}
                  error={errors.fix_item_code}
                />
              </Grid>
            </Grid>
          </div>
        );
      case 1:
        return (
          <div>
            <Grid container spacing={2}>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>Inventory Units</div>
                <Controls.Input
                  label="handlingunit"
                  name="handlingunit"
                  value={values.handlingunit}
                  onChange={handleInputChange}
                  error={errors.handlingunit}
                />
                <div className={classes.GridCaption}>
                  Each Conversion based on Handling Unit.
                </div>
                <Controls.Input
                  label="eachuom"
                  name="eachuom"
                  value={values.eachuom}
                  onChange={handleInputChange}
                  error={errors.eachuom}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>Unit Quantity</div>
                <Controls.Input
                  label="Fix item code"
                  name="fix_item_code"
                  value={values.fix_item_code}
                  onChange={handleInputChange}
                  error={errors.fix_item_code}
                />
                <Controls.Input
                  label="Fix item code"
                  name="fix_item_code"
                  value={values.fix_item_code}
                  onChange={handleInputChange}
                  error={errors.fix_item_code}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>Packaging Barcodes</div>
                <Controls.Input
                  label="handlingunitbarcode"
                  name="handlingunitbarcode"
                  value={values.handlingunitbarcode}
                  onChange={handleInputChange}
                  error={errors.handlingunitbarcode}
                />
                <Controls.Input
                  label="eachbarcode"
                  name="eachbarcode"
                  value={values.eachbarcode}
                  onChange={handleInputChange}
                  error={errors.eachbarcode}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>Measurement Volumes</div>
                <Controls.Input
                  label="unitvolume"
                  name="unitvolume"
                  value={values.unitvolume}
                  onChange={handleInputChange}
                  error={errors.unitvolume}
                />
                <Controls.Input
                  label="unitweight"
                  name="unitweight"
                  value={values.unitweight}
                  onChange={handleInputChange}
                  error={errors.unitweight}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>
                  Pickface Replenishment level
                </div>
                <Controls.Input
                  label="minreplenishmentlvl"
                  name="minreplenishmentlvl"
                  value={values.minreplenishmentlvl}
                  onChange={handleInputChange}
                  error={errors.minreplenishmentlvl}
                />
                <Controls.Input
                  label="maxreplenishmentqty"
                  name="maxreplenishmentqty"
                  value={values.maxreplenishmentqty}
                  onChange={handleInputChange}
                  error={errors.maxreplenishmentqty}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>Picking Location</div>
                <Controls.Input
                  label="Fix item code"
                  name="fix_item_code"
                  value={values.fix_item_code}
                  onChange={handleInputChange}
                  error={errors.fix_item_code}
                />
                <Controls.Input
                  label="Fix item code"
                  name="fix_item_code"
                  value={values.fix_item_code}
                  onChange={handleInputChange}
                  error={errors.fix_item_code}
                />
              </Grid>
            </Grid>
          </div>
        );
      case 2:
        return (
          <div>
            <Grid container spacing={2}>
              <Grid item lg={3} sm={6} xs={12}>
                <Controls.Input
                  label="Item Code"
                  name="location_code"
                  value={values.location_code}
                  onChange={handleInputChange}
                  error={errors.location_code}
                />
                <Controls.Input
                  label="Refresh Code"
                  name="location_name"
                  value={values.location_name}
                  onChange={handleInputChange}
                  error={errors.location_name}
                />

                <Controls.Input
                  label="Description"
                  name="trace_code"
                  value={values.trace_code}
                  onChange={handleInputChange}
                  error={errors.trace_code}
                />
                <Controls.Input
                  label="Shortdesc"
                  name="shortdesc"
                  value={values.shortdesc}
                  onChange={handleInputChange}
                  error={errors.shortdesc}
                />
                <Controls.Select
                  name="abc_code"
                  label="Abc Code"
                  value={values.abc_code}
                  onChange={handleInputChange}
                  options={showAbcCode}
                />
                <Controls.Input
                  label="Unit Cost"
                  name="capacity"
                  value={values.capacity}
                  onChange={handleInputChange}
                  error={errors.capacity}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <Controls.Input
                  label="Salvage days"
                  name="drive_zone"
                  value={values.drive_zone}
                  onChange={handleInputChange}
                  error={errors.drive_zone}
                />
                <Controls.Input
                  label="Safestocklevel"
                  name="drive_sequence"
                  value={values.drive_sequence}
                  onChange={handleInputChange}
                  error={errors.drive_sequence}
                />
                <Controls.Input
                  label="Shelf life unit"
                  name="size_code"
                  value={values.size_code}
                  onChange={handleInputChange}
                  error={errors.size_code}
                />
                <Controls.Input
                  label="Batch find Strategy"
                  name="size_code"
                  value={values.size_code}
                  onChange={handleInputChange}
                  error={errors.size_code}
                />
                <Controls.Input
                  label="lotformatdate"
                  name="size_code"
                  value={values.size_code}
                  onChange={handleInputChange}
                  error={errors.size_code}
                />
              </Grid>

              <Grid item lg={3} sm={6} xs={12}>
                <Controls.Select
                  name="location_type"
                  label="Location Type"
                  value={values.location_type}
                  onChange={handleInputChange}
                  options={showlocationtype}
                />

                <Controls.Input
                  label="Check digit"
                  name="check_digit"
                  value={values.check_digit}
                  onChange={handleInputChange}
                  error={errors.check_digit}
                />
                <Controls.Input
                  label="Pick zone"
                  name="pick_zone"
                  value={values.pick_zone}
                  onChange={handleInputChange}
                  error={errors.pick_zone}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <Controls.Input
                  label="Pick sequence"
                  name="pick_sequence"
                  value={values.pick_sequence}
                  onChange={handleInputChange}
                  error={errors.pick_sequence}
                />
                <Controls.Input
                  label="Lock type"
                  name="lock_type"
                  value={values.lock_type}
                  onChange={handleInputChange}
                  error={errors.lock_type}
                />
                <Controls.Input
                  label="Fix item code"
                  name="fix_item_code"
                  value={values.fix_item_code}
                  onChange={handleInputChange}
                  error={errors.fix_item_code}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>Inventory Units</div>
                <Controls.Input
                  label="handlingunit"
                  name="handlingunit"
                  value={values.handlingunit}
                  onChange={handleInputChange}
                  error={errors.handlingunit}
                />
                <div className={classes.GridCaption}>
                  Each Conversion based on Handling Unit.
                </div>
                <Controls.Input
                  label="eachuom"
                  name="eachuom"
                  value={values.eachuom}
                  onChange={handleInputChange}
                  error={errors.eachuom}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>Unit Quantity</div>
                <Controls.Input
                  label="Fix item code"
                  name="fix_item_code"
                  value={values.fix_item_code}
                  onChange={handleInputChange}
                  error={errors.fix_item_code}
                />
                <Controls.Input
                  label="Fix item code"
                  name="fix_item_code"
                  value={values.fix_item_code}
                  onChange={handleInputChange}
                  error={errors.fix_item_code}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>Packaging Barcodes</div>
                <Controls.Input
                  label="handlingunitbarcode"
                  name="handlingunitbarcode"
                  value={values.handlingunitbarcode}
                  onChange={handleInputChange}
                  error={errors.handlingunitbarcode}
                />
                <Controls.Input
                  label="eachbarcode"
                  name="eachbarcode"
                  value={values.eachbarcode}
                  onChange={handleInputChange}
                  error={errors.eachbarcode}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>Measurement Volumes</div>
                <Controls.Input
                  label="unitvolume"
                  name="unitvolume"
                  value={values.unitvolume}
                  onChange={handleInputChange}
                  error={errors.unitvolume}
                />
                <Controls.Input
                  label="unitweight"
                  name="unitweight"
                  value={values.unitweight}
                  onChange={handleInputChange}
                  error={errors.unitweight}
                />
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>
                  Pickface Replenishment level
                </div>
                <Controls.Input
                  label="minreplenishmentlvl"
                  name="minreplenishmentlvl"
                  value={values.minreplenishmentlvl}
                  onChange={handleInputChange}
                  error={errors.minreplenishmentlvl}
                />
                <Controls.Input
                  label="maxreplenishmentqty"
                  name="maxreplenishmentqty"
                  value={values.maxreplenishmentqty}
                  onChange={handleInputChange}
                  error={errors.maxreplenishmentqty}
                />
              </Grid>
              <Grid item lg={3} sm={6} xs={12}>
                <div className={classes.GridCaption}>Picking Location</div>
                <Controls.Input
                  label="Fix item code"
                  name="fix_item_code"
                  value={values.fix_item_code}
                  onChange={handleInputChange}
                  error={errors.fix_item_code}
                />
                <Controls.Input
                  label="Fix item code"
                  name="fix_item_code"
                  value={values.fix_item_code}
                  onChange={handleInputChange}
                  error={errors.fix_item_code}
                />
              </Grid>
            </Grid>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>
        );
      default:
        return "Transaction Successfully Save..";
    }
  };
  useEffect(() => {
    gitItemMasterList();
    onSelectWarehouseName();
    onSelectAreaActive();
    onSelectLocationType();
    onSelectAbcCode();
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
        <Link color="inherit" href="/warehouse-management/item-master/">
          Item Master
        </Link>
        <Typography color="textPrimary">
          {id == "add" ? "Add Item Master" : "Update Item Master"}
        </Typography>
      </Breadcrumbs>

      <Paper className={classes.pageContent}>
        <Form onSubmit={handleSubmit}>
          <Controls.Stepper stepContent={getStepContent} />
        </Form>
      </Paper>
    </>
  );
}
