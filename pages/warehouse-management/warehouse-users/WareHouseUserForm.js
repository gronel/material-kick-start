import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../components/useForm";
import api from "../../../Services/api";

const initialFValues = {
  id: 0,
  uuid: "",
  warehouse_id: "",
  user_id: "",
  user_name: "",
  warehouse_name: "",
  is_active: "",
  created_by: "",
  updated_by: "",
};

export default function wareHouseUserForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const [warehouseName, setwarehouseName] = useState([]);
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("warehouse_name" in fieldValues)
      temp.warehouse_name = fieldValues.warehouse_name
        ? ""
        : "This field is required.";
    if ("user_name" in fieldValues)
      temp.user_name = fieldValues.user_name ? "" : "This field is required.";
    if ("user_id" in fieldValues)
      temp.user_id = fieldValues.user_id ? "" : "This field is required.";
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
  const onHandlerShowID = () => {
    api.instance
      .get(
        "/wms/warehouse/warehouse-user-showid/" + initialFValues.warehouse_id
      )
      .then((resp) => {
        console.log(resp.data);
        setwarehouseName(resp.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
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
  useEffect(() => {
    onHandlerShowID();
    onSelectWarehouseName();
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item lg={12} sm={12} xs={12}>
          <Controls.Select
            name="warehouse_id"
            label="Warehouse Name"
            value={values.warehouse_id}
            onChange={handleInputChange}
            options={warehouseName}
            error={errors.area_id}
          />
          <Controls.Input
            name="warehouse_name"
            label="Warehouse Name"
            value={values.warehouse_name}
            onChange={handleInputChange}
            error={errors.warehouse_name}
          />
          <Controls.Input
            name="user_name"
            label="User Name"
            value={values.user_name}
            onChange={handleInputChange}
            error={errors.user_name}
          />
          <Controls.Checkbox
            name="is_active"
            label="Active"
            value={values.is_active == 0 ? false : true}
            onChange={handleInputChange}
          />
        </Grid>
      </Grid>
      <div>
        <Controls.Button type="submit" text="Submit" />
        <Controls.Button text="Reset" color="default" onClick={resetForm} />
      </div>
    </Form>
  );
}
