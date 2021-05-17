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
  newButton: {
    position: "absolute",
    right: "10px",
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
  const [openDialog, setOpenDialog] = useState(false);
  const [locationItem, setlocationItem] = useState([]);
  const [warehouseName, setwarehouseName] = useState([]);
  const [showlocationtype, setlocationtype] = useState([]);
  const [showAbcCode, setAbcCode] = useState([]);
  const [areaActive, setAreaActive] = useState([]);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("warehouse_id" in fieldValues)
      temp.warehouse_id = fieldValues.warehouse_id
        ? ""
        : "This field is required.";
    if ("location_code" in fieldValues)
      temp.location_code = fieldValues.location_code
        ? ""
        : "This field is required.";
    if ("location_name" in fieldValues)
      temp.location_name = fieldValues.location_name
        ? ""
        : "This field is required.";

    if ("area_id" in fieldValues)
      temp.area_id = fieldValues.area_id ? "" : "This field is required.";
    if ("capacity" in fieldValues)
      temp.capacity = fieldValues.capacity ? "" : "This field is required.";
    if ("lock_type" in fieldValues)
      temp.lock_type = fieldValues.lock_type ? "" : "This field is required.";
    if ("pick_sequence" in fieldValues)
      temp.pick_sequence = fieldValues.pick_sequence
        ? ""
        : "This field is required.";
    if ("drive_sequence" in fieldValues)
      temp.drive_sequence = fieldValues.drive_sequence
        ? ""
        : "This field is required.";
    if ("abc_code" in fieldValues)
      temp.abc_code =
        fieldValues.abc_code.length != 0 ? "" : "This field is required.";
    if ("location_type" in fieldValues)
      temp.location_type =
        fieldValues.location_type.length != 0 ? "" : "This field is required.";

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
    // setOpenDialog(false);
    // resetForm();
  };
  const handlerDialog = () => {
    setOpenDialog(true);
  };
  const onCloseDialog = () => {
    setOpenDialog(false);
  };
  const getLocationId = () => {
    if (router.query.id == "add") {
    } else {
      api.instance
        .get("/wms/location/storage-location-id/" + router.query.id)
        .then((resp) => {
          console.log(resp.data);
          setlocationItem(resp.data);
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
        .post("/wms/location/storage-location-store", values)
        .then((resp) => {
          console.log(resp.data);
        })
        .catch((err) => {
          console.log(err);
        });
    else {
      api.instance
        .put("/wms/location/storage-location-update/" + values.id, values)
        .then((resp) => {
          console.log(resp.data);
          router.push("/warehouse-management/storage-location/", null, {
            shallow: true,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    getLocationId();
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
        <Link color="inherit" href="/warehouse-management/storage-location/">
          Storage Location
        </Link>
        <Typography color="textPrimary">
          {router.query.id == "add"
            ? "Add Storage Location"
            : "Update Storage Location"}
        </Typography>
      </Breadcrumbs>

      <Paper className={classes.pageContent}>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item lg={3} sm={6} xs={12}>
              <Controls.Select
                name="warehouse_id"
                label="Warehouse Name"
                value={values.warehouse_id}
                onChange={handleInputChange}
                options={warehouseName}
                error={errors.warehouse_id}
              />
              <Controls.Input
                label="Location Code"
                name="location_code"
                value={values.location_code}
                onChange={handleInputChange}
                error={errors.location_code}
              />
              <Controls.Input
                label="Location Name"
                name="location_name"
                value={values.location_name}
                onChange={handleInputChange}
                error={errors.location_name}
              />

              <Controls.Input
                label="Trace Code"
                name="trace_code"
                value={values.trace_code}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Controls.Select
                name="area_id"
                label="Area"
                value={values.area_id}
                onChange={handleInputChange}
                options={areaActive}
                error={errors.area_id}
              />
              <Controls.Input
                label="Capacity"
                name="capacity"
                value={values.capacity}
                onChange={handleInputChange}
                error={errors.capacity}
              />
              <Controls.Input
                label="Drive zone"
                name="drive_zone"
                value={values.drive_zone}
                onChange={handleInputChange}
                error={errors.drive_zone}
              />
              <Controls.Input
                label="Drive sequence"
                name="drive_sequence"
                value={values.drive_sequence}
                onChange={handleInputChange}
                error={errors.drive_sequence}
              />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Controls.Select
                name="location_type"
                label="Location Type"
                value={values.location_type}
                onChange={handleInputChange}
                options={showlocationtype}
                error={errors.location_type}
              />
              <Controls.Input
                label="Size code"
                name="size_code"
                value={values.size_code}
                onChange={handleInputChange}
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
              />
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Controls.Select
                name="abc_code"
                label="Abc Code"
                value={values.abc_code}
                onChange={handleInputChange}
                options={showAbcCode}
                error={errors.abc_code}
              />

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
              />
            </Grid>
            <Grid item lg={2} sm={3} xs>
              <Controls.Checkbox
                name="is_block_stock"
                label="blockstock"
                value={values.is_block_stock == "0" ? false : true}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item lg={2} sm={3} xs>
              <Controls.Checkbox
                name="is_fix_item"
                label="isfixitem"
                value={values.is_fix_item == 0 ? false : true}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item lg={2} sm={3} xs>
              <Controls.Checkbox
                name="is_locked"
                label="islocked"
                value={values.is_locked == 0 ? false : true}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item lg={2} sm={3} xs>
              <Controls.Checkbox
                name="is_overflow"
                label="isoverflow"
                value={values.is_overflow == 0 ? false : true}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item lg={2} sm={3} xs>
              <Controls.Checkbox
                name="is_virtual"
                label="isvirtual"
                value={values.is_virtual == 0 ? false : true}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item lg={2} sm={3} xs>
              <Controls.Checkbox
                name="is_active"
                label="isactive"
                value={values.is_active == 0 ? false : true}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
          <div>
            <Controls.Button type="submit" text="Submit" />
            <Controls.Button text="Reset" color="default" onClick={resetForm} />
          </div>

          {/* <PopDialog
            title="Promt message"
            description={
              router.query.id == "add"
                ? "Do you want to Add this Transation?"
                : "Do you want to Add this Update Transaction?"
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
          </PopDialog> */}
        </Form>
      </Paper>
    </>
  );
}
