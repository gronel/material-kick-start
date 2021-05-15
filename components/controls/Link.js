import React from "react";
import { Link as MiuLink } from "next/link";

export default function Link(props) {
  const { text, href, ...other } = props;

  return (
    <MiuLink href={href} {...other}>
      {text}
    </MiuLink>
  );
}
