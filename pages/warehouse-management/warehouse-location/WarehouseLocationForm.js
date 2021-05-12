import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../components/useForm";

const initialFValues = {
  id: "",
  uuid: "",
  warehouse_code: "",
  warehouse_name: "",
  is_active: 0,
  created_by: "",
  updated_by: "",
};

export default function WarehouseLocationForm(props) {

  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("warehouse_code" in fieldValues)
      temp.warehouse_code = fieldValues.warehouse_code
        ? ""
        : "This field is required.";
    if ("warehouse_name" in fieldValues)
      temp.warehouse_name = fieldValues.warehouse_name
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

  useEffect(() => {
    if (recordForEdit != null)
      setValues({
        ...recordForEdit,
      });
  }, [recordForEdit]);

  return (
    <Form onSubmit={handleSubmit}>
      <Grid container>
        <Grid item xs={12}>
          <Controls.Input
            name="warehouse_code"
            label="Warehouse Code"
            value={values.warehouse_code}
            onChange={handleInputChange}
            error={errors.warehouse_code}
          />
          <Controls.Input
            name="warehouse_name"
            label="Warehouse Name"
            value={values.warehouse_name}
            onChange={handleInputChange}
            error={errors.warehouse_name}
          />
          <Controls.Checkbox
            name="is_active"
            label="Status"
            value={values.is_active == "0" ? false : true}
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
