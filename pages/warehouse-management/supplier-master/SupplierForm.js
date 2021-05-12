import React, { useState, useEffect } from "react";
import { Grid } from "@material-ui/core";
import Controls from "../../../components/controls/Controls";
import { useForm, Form } from "../../../components/useForm";

const initialFValues = {
  id: "",
  supplier_code: "",
  supplier_name: "",
  status: "0",
  supplier_category: "",
  created_by: "",
  updated_by: "",
};

export default function SupplierForm(props) {
  const { addOrEdit, recordForEdit } = props;
  const validate = (fieldValues = values) => {
    let temp = { ...errors };
    if ("supplier_code" in fieldValues)
      temp.supplier_code = fieldValues.supplier_code
        ? ""
        : "This field is required.";
    if ("supplier_name" in fieldValues)
      temp.supplier_name = fieldValues.supplier_name
        ? ""
        : "This field is required.";
    if ("supplier_category" in fieldValues)
      temp.supplier_category = fieldValues.supplier_category
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
            name="supplier_code"
            label="Supplier Code"
            value={values.supplier_code}
            onChange={handleInputChange}
            error={errors.supplier_code}
          />
          <Controls.Input
            name="supplier_name"
            label="Supplier Name"
            value={values.supplier_name}
            onChange={handleInputChange}
            error={errors.supplier_name}
          />
        </Grid>
        <Grid item xs={6}>
          <Controls.Input
            label="Supplier Category"
            name="supplier_category"
            value={values.supplier_category}
            onChange={handleInputChange}
            error={errors.supplier_category}
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
