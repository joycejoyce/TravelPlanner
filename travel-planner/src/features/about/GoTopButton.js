// MUI
import { makeStyles } from "@material-ui/styles";
import { IconButton } from "@material-ui/core";
import { ArrowUpward as UpIcon } from '@material-ui/icons';

// my components
import { lightColors, lightGrey } from "../../common/styles/colors.json";

const useStyles = makeStyles((theme) => {
    return ({
        goTopBtn: {
            position: "fixed",
            bottom: theme.spacing(5),
            right: theme.spacing(5),
            zIndex: "200",
            background: lightColors.navbarBlue,
            color: theme.palette.background.paper,
            "&:hover": {
                background: lightColors.navbarLightBlue
            }
        }
    });
});

export default function GoTopButton() {
    // styles
    const classes = useStyles();

    // ctrl
    const handleClick = () => {
        document.getElementById("app").scrollTo(0,0);
    };

    return (
        <IconButton
            className={classes.goTopBtn}
            onClick={handleClick}
        >
            <UpIcon />
        </IconButton>
    );
}