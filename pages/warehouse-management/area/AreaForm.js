import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../components/useForm";

const initialFValues = {
  id: "",
  uuid: "",
  area_code: "",
  area_name: "",
  area_label: "",
  is_active: 0,
  created_by: "",
  updated_by: "",
};

export default function AreaForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("area_code" in fieldValues)
      temp.area_code = fieldValues.area_code ? "" : "This field is required.";
    if ("area_name" in fieldValues)
      temp.area_name = fieldValues.area_name ? "" : "This field is required.";
    if ("area_label" in fieldValues)
      temp.area_label = fieldValues.area_label ? "" : "This field is required.";

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
            name="area_code"
            label="Area Code"
            value={values.area_code}
            onChange={handleInputChange}
            error={errors.area_code}
          />
          
          <Controls.Input
            name="area_name"
            label="Area Name"
            value={values.area_name}
            onChange={handleInputChange}
            error={errors.area_name}
          />
          <Controls.Input
            name="area_label"
            label="Area Label"
            value={values.area_label}
            onChange={handleInputChange}
            error={errors.area_label}
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
