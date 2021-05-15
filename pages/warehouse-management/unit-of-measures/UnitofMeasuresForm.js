import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../components/useForm";

const initialFValues = {
  id: "",
  uuid: "",
  uom_code: "",
  description: "",
  created_by: "",
  updated_by: "",
};

export default function TruckerForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("uom_code" in fieldValues)
      temp.uom_code = fieldValues.uom_code ? "" : "This field is required.";
    if ("description" in fieldValues)
      temp.description = fieldValues.description
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
        <Grid item lg={12} sm={12} xs={12}>
          <Controls.Input
            name="uom_code"
            label="UOM Code"
            value={values.uom_code}
            onChange={handleInputChange}
            error={errors.uom_code}
          />
          <Controls.Input
            name="description"
            label="Description"
            value={values.description}
            onChange={handleInputChange}
            error={errors.description}
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
