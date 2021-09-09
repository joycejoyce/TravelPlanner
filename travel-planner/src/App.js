// my components
import Loading from "./components/page/Loading.js";
import InnerApp from "./InnerApp.js";
import { pageBackground, primary as primaryColor, secondary as secondaryColor } from "./colors.json";

// MUI
import { Paper } from '@material-ui/core';
import { makeStyles, createTheme, ThemeProvider } from '@material-ui/core/styles';

// others
import styled from "styled-components";

const useStyles = makeStyles((theme) => ({
  root: {
    position: "absolute",
    height: "100vh",
    width: "100vw"
  }
}));

const palette = {
  primary: {
    main: primaryColor
  },
  secondary: {
    main: secondaryColor
  }
};

const darkTheme = createTheme({
  palette: {
    type: 'dark',
    ...palette
  }
});

const lightTheme = createTheme({
  palette: {
    type: 'light',
    background: {
      paper: pageBackground
    },
    ...palette
  }
});

function App() {
  let isDarkMode = false;
  const theme = isDarkMode ? darkTheme : lightTheme;

  const classes = useStyles(theme);
  
  return (
    <ThemeProvider theme={theme}>
      <Paper className={"app " + classes.root}>
        <Loading />
        <InnerApp />
      </Paper>
    </ThemeProvider>
  );
}

export default App;
