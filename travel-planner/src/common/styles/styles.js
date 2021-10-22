// MUI
import { createTheme } from "@material-ui/core/styles";

// my components
import { err as errColor, lightColors } from "../styles/colors.json";
import { secondary as secondaryFont } from "../styles/fonts.json";

export function getStyles_mapContainer(theme) {
    return ({
        "& > *:not(.MuiButtonBase-root)": {
            width: "85vw",
            [theme.breakpoints.up('md')]: {
                width: "70vw"
            },
            minWidth: "380px",
            maxWidth: "900px"
        },
    });
}

export function getStyles_map(theme) {
    return ({
        height: "450px",
        [theme.breakpoints.up('md')]: {
            height: "515px"
        }
    });
}

export function getStyles_routingPage() {
    return ({
        position: "absolute",
        width: "100vw",
        top: "22vh",
        "& > *": { // Sub pages
            // animationPart cannot set translateX or it'll effect animation
            // therefore, to center the content, wrap up the contents in ".contents" and center it
            position: "relative",
            width: "100vw",
            "& > .contents": {
                position: "absolute",
                width: "fit-content",
                left: "50%",
                transform: "translateX(-50%)"
            }
        }
    })
}

export const deleteBtnTheme = createTheme({
    palette: {
        primary: {
            main: errColor
        },
        text: {
            primary: lightColors.text
        },
    },
    typography: {
        button: {
            textTransform: "none",
            fontFamily: secondaryFont,
        }
    }
});