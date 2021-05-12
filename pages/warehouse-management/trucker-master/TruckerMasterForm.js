import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../components/useForm";

const initialFValues = {
  id: "",
  uuid: "",
  trucker_code: "",
  trucker_name: "",
  status: "0",
  trucker_category: "",
  created_by: "",
  updated_by: "",
};

export default function TruckerForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("trucker_code" in fieldValues)
      temp.trucker_code = fieldValues.trucker_code
        ? ""
        : "This field is required.";
    if ("trucker_name" in fieldValues)
      temp.trucker_name = fieldValues.trucker_name
        ? ""
        : "This field is required.";
    if ("trucker_category" in fieldValues)
      temp.trucker_category = fieldValues.trucker_category
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
        <Grid item xs={6}>
          <Controls.Input
            name="trucker_code"
            label="Trucker Code"
            value={values.trucker_code}
            onChange={handleInputChange}
            error={errors.trucker_code}
          />
          <Controls.Input
            name="trucker_name"
            label="Trucker Name"
            value={values.trucker_name}
            onChange={handleInputChange}
            error={errors.trucker_name}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Trucker Category"
            name="trucker_category"
            value={values.trucker_category}
            onChange={handleInputChange}
            error={errors.trucker_category}
          />

          <Controls.Checkbox
            name="status"
            label="Status"
            value={values.status == "0" ? false : true}
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
