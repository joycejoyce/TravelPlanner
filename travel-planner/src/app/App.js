// my components
import Loading from "../common/components/Logo.js";
import InnerApp from "./InnerApp.js";
import { lightColors, darkColors } from "../common/styles/colors.json";
import { primary as primaryFont, secondary as secondaryFont } from "../common/styles/fonts.json";
import Quota from "../features/navbar/quota/Quota.js";

// MUI
import { Paper } from "@material-ui/core";
import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";

// others
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    height: "100vh",
    width: "100vw",
    overflowY: "overlay"
  }
}));

const typography = {
  fontFamily: primaryFont,
  h3: {
    fontFamily: secondaryFont
  },
  h5: {
    letterSpacing: ".5px"
  },
  h6: {
    fontFamily: secondaryFont,
    fontSize: "16px",
    fontWeight: "bold"
  },
  body2: {
    // letterSpacing: "1px"
  },
  button: {
    fontFamily: secondaryFont,
    letterSpacing: "1px",
    textTransform: "none"
  }
}

const breakpoints = {
  values: {
    sm: 415,
    md: 768,
    lg: 1024
  }
}

const darkTheme = createTheme({
  palette: {
    type: "dark",
    primary: {
      main: darkColors.primary
    },
    secondary: {
      main: darkColors.secondary
    },
    text: {
      primary: darkColors.text
    }
  },
  typography,
  breakpoints
});

const lightTheme = createTheme({
  palette: {
    type: "light",
    background: {
      paper: lightColors.background
    },
    primary: {
      main: lightColors.primary
    },
    secondary: {
      main: lightColors.secondary
    },
    text: {
      primary: lightColors.text
    }
  },
  typography,
  breakpoints
});

function App() {
  let isDarkMode = false;
  const theme = isDarkMode ? darkTheme : lightTheme;

  const classes = useStyles(theme);

  return (
    <ThemeProvider theme={theme}>
      <Paper id="app" className={"app " + classes.root}>
        {/* <Loading /> */}
        {/* <Quota /> */}
        <InnerApp />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
