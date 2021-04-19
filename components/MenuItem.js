import React from "react";
import Link from "next/link";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import FolderIcon from "@material-ui/icons/Folder";
const MenuItem = (props) => {
  return (
    <Link href={props.link} passHref>
      <ListItem button component="a">
        <>
          <ListItemIcon>
            <FolderIcon />
          </ListItemIcon>
          <ListItemText primary={props.label} />
        </>
      </ListItem>
    </Link>
  );
};

export default MenuItem;
