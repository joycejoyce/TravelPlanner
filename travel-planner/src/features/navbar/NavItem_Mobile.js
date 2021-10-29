// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Popper, Fade, Paper, List, ListItem, ListItemIcon, ListItemText } from "@material-ui/core";
import {
    Menu as MenuIcon
} from "@material-ui/icons";

// my components
import { lightColors } from "../../common/styles/colors.json";
import { selectIdx, changeIdx } from "./navSlice.js";
import { NavItem } from "./Navbar.js";

// React
import { useState } from "react";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        root: {
        },
        btn: {
            color: lightColors.navbarBlue,
            cursor: "pointer",
            fontSize: "28px"
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

function Contents({ closePopper }) {
    const classes = useStyles();
    const history = useHistory();
    const dispatch = useDispatch();
    const selectedIdx = useSelector(selectIdx);

    return (
        <List component="nav">
            {
                Object.values(NavItem).map((item) => {
                    const { idx, label, url, icon } = item;
                    const handleClick = () => {
                        dispatch(changeIdx(idx));
                        history.push(url);
                        closePopper();
                    };
                    return (
                        <ListItem
                            button
                            selected={selectedIdx === idx}
                            onClick={handleClick}
                        >
                            <ListItemIcon>
                                {icon}
                            </ListItemIcon>
                            <ListItemText primary={label} />
                        </ListItem>
                    );
                })
            }
        </List>
    );
}

export default function NavItem_Mobile() {
    const classes = useStyles();

    const [anchorEl, setAnchorEl] = useState(null);
    const [open, setOpen] = useState(false);
    const [placement, setPlacement] = useState();

    const handleClick = (newPlacement) => (event) => {
        setAnchorEl(event.currentTarget);
        setOpen((prev) => placement !== newPlacement || !prev);
        setPlacement(newPlacement);
    };
    const closePopper = () => {
        setOpen(false);
    };

    return (
        <div className={["navItems", classes.root].join(" ")}>
            <Popper
                className={classes.popper}
                open={open}
                anchorEl={anchorEl}
                placement={placement}
                transition
            >
                {({ TransitionProps }) => (
                    <Fade {...TransitionProps} timeout={350}>
                        <Paper className={classes.paper}>
                            <Contents closePopper={closePopper} />
                        </Paper>
                    </Fade>
                )}
            </Popper>
            <MenuIcon
                className={["btn", classes.btn].join(" ")}
                onClick={handleClick("left-start")}
            />
        </div>
    );
}