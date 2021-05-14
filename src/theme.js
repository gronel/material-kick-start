import { createMuiTheme } from "@material-ui/core/styles";
import { red } from "@material-ui/core/colors";

// Create a theme instance.
const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#5664D2",
    },
    secondary: {
      main: "#ff3d00",
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#F4F6F8",
    },
  },
});

export default theme;
