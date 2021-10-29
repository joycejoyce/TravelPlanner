// MUI
import { makeStyles, createTheme, ThemeProvider } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// my components
import { lightColors } from "../../common/styles/colors.json";
import { secondary as secondaryFont } from "../../common/styles/fonts.json";
import { selectIdx, changeIdx } from "./navSlice.js";
import { NavItem } from "./Navbar.js";

// React
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        root: {
            display: "flex",
            gap: theme.spacing(1),
            width: "400px",
            justifyContent: "space-around"
        },
        btn: {
            color: lightColors.navbarBlue
        },
        paper: {
            background: "white",
            "& *": {
                color: lightColors.text
            }
        },
        popper: {
            zIndex: "100"
        }
    });
});

const theme = createTheme({
    palette: {
        primary: {
            main: lightColors.navbarBlue
        }
    },
    typography: {
        button: {
            fontFamily: secondaryFont,
            letterSpacing: "1px",
            textTransform: "none",
            fontSize: "16px"
        }
    }
});

export default function NavItem_Mobile() {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const selectedIdx = useSelector(selectIdx);

    return (
        <ThemeProvider theme={theme}>
            <div className={["navItems", classes.root].join(" ")}>
                {
                    Object.values(NavItem).map((item) => {
                        const { idx, label, url } = item;
                        const handleClick = () => {
                            dispatch(changeIdx(idx));
                            history.push(url);
                        };
                        const variant = (idx === selectedIdx) ? "outlined" : null;
                        return (
                            <Button
                                className={classes.btn}
                                color="primary"
                                variant={variant}
                                onClick={handleClick}
                            >
                                {label}
                            </Button>
                        );
                    })
                }
            </div>
        </ThemeProvider>
    );
}