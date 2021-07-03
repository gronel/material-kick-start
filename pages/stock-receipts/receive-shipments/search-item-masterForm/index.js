import React, { useState, useEffect } from "react";
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
  Table,
} from "@material-ui/core";
import { Search } from "@material-ui/icons";
import useTable from "../../../../components/useTable";
import Controls from "../../../../components/controls/Controls";

const useStyles = makeStyles((theme) => ({
  paper: {
    padding: theme.spacing(2),
    textAlign: "center",
    color: theme.palette.text.secondary,
  },
}));
export default function searchItemMaster(props) {
  const classes = useStyles();
  const { addItemMaster } = props;
  const [listrecordData, setlistRecordData] = useState([]);
  const handleSubmit = (e) => {
    e.preventDefault();
    addItemMaster(values);
  };

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const headCells = [
    { id: "product_code", label: "Product Code" },
    { id: "description", label: "Description" },
    { id: "short_name", label: "Short Name" },
    { id: "type", label: "Type" },
    { id: "handling_unit", label: "Handling Unit" },
    { id: "abc_code", label: "ABC Code" },
    { id: "Unitcost", label: "Unitcost" },
    { id: "Safestocklevel", label: "Safestocklevel" },
    { id: "Shelfile", label: "Shelfile" },
    { id: "Salvagedays", label: "Salvagedays" },
    { id: "Unitqtyperbatch", label: "Unitqtyperbatch" },
    { id: "EachUom", label: "EachUom" },
    { id: "actions", label: "Actions", disableSorting: true },
  ];

  const { TblContainer, TblHead, TblPagination, recordsAfterPagingAndSorting } =
    useTable(listrecordData, headCells, filterFn);

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
  return (
    <>
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
    </>
  );
}
