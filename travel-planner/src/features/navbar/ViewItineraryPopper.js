// MUI
import { makeStyles } from "@material-ui/core/styles";
import { IconButton, Popper, Fade, Paper, Typography } from "@material-ui/core";
import { Menu as MenuIcon } from "@material-ui/icons";

// my components
import { lightColors } from "../../common/styles/colors.json";

// React
import { useState } from "react";

const useStyles = makeStyles((theme) => {
    return ({
        root: {

        },
        btn: {
            color: lightColors.navbarBlue,
            cursor: "pointer"
        },
        popper: {

        }
    });
});

export default function ViewItineraryPopper() {
    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();
    const classes = useStyles();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };

    return (
        <div className={["drawer", classes.root].join(" ")}>
            <Popper
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper>
                            <Typography
                                className={classes.typography}
                            >
                                The content of the Popper.
                            </Typography>
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <MenuIcon
                className={["btn", classes.btn].join(" ")}
                onClick={handleClick("left-start")}
            />
            {/* <IconButton
                className={["btn", classes.btn].join(" ")}
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleClick("left-start")}
            >
                <MenuIcon />
            </IconButton> */}

        </div>
    );
}