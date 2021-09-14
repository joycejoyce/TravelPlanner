// MUI
import { Modal, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// my components
import { secondary as secondaryFont } from "../../../common/styles/fonts.json";
import { addInfoWindow } from "./mapHandler.js";
import { selectDesc, selectPosition, changeDesc } from "./centerPointSlice.js";
import { store } from "../../../app/store.js";

// React
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => ({
    confirmModal: {

    },
    modalBody: {
        width: "400px",
        height: "350px",
        minHeight: "fit-content",
        background: theme.palette.background.paper,
        borderRadius: "3px",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    },
    desc: {
        fontSize: "18px",
        color: theme.palette.text.primary,
        textAlign: "center",
        width: "fit-content",
        maxWidth: "305px"
    },
    text: {
        width: "297px",
        margin: theme.spacing(2),
        "& .MuiOutlinedInput-root": {
            padding: theme.spacing(1)
        },
        "& .MuiFormHelperText-root": {
            marginLeft: "0",
            fontSize: "14px"
        }
    },
    btnSection: {
        display: "flex",
        justifyContent: "space-between",
        width: "297px",
        height: "40px",
        marginTop: "10px",
        "& button": {
            width: "100px",
            fontSize: "16px"
        }
    },
    address: {
        color: theme.palette.primary.main,
        fontSize: "16px",
        fontFamily: secondaryFont
    }
}));

const Body = React.forwardRef((props, ref) => {
    console.log("store state (ConfirmModal)", store.getState());

    const dispatch = useDispatch();
    const {closeModal, mapCtrl} = props;
    const classes = useStyles();
    const maxTextNum = 100;

    const desc = useSelector(selectDesc);
    const position = useSelector(selectPosition);

    const [text, setText] = useState(desc);

    const remainingTextNum = maxTextNum - text.length;
    let helperText = "remaining character number: " + remainingTextNum.toString();

    const handleOnChange = (e) => {
        const { value } = e.target;
        setText(value.slice(0, Math.min(maxTextNum, value.length)));
    }

    const handleOnClickConfirm = () => {
        const {google, map, mapDivSelector} = mapCtrl;
        dispatch(changeDesc(text));

        const { latLng } = position;
        addInfoWindow(google, map, mapDivSelector, latLng);

        map.setOptions({
            zoomControl: false,
            gestureHandling: "none"
        });

        google.maps.event.clearListeners(map, "click");

        closeModal();
    }

    const { address } = useSelector(selectPosition);    

    return (
        <div className={"modalBody " + classes.modalBody}>
            <Typography
                variant="body1"
                className={classes.desc}
            >
                Write a short description for this point:
                <div className={classes.address}>{address}</div>
            </Typography>
            <TextField
                className={classes.text}
                multiline
                placeholder={"max character number: " + maxTextNum.toString()}
                minRows={4}
                variant="outlined"
                value={text}
                onChange={handleOnChange}
                helperText={helperText}
                inputProps={{ "data-testid": "desc" }}
            />
            <div className={"btnSection " + classes.btnSection}>
                <Button
                    color="primary"
                    variant="outlined"
                    onClick={closeModal}
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                    onClick={handleOnClickConfirm}
                    disabled={text.length === 0}
                >
                    Confirm
                </Button>
            </div>
        </div>
    );
});

export default function ConfirmModal({ open, setOpen, mapCtrl }) {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    }

    console.log("store state (ConfirmModal)", store.getState());

    return (
        <Modal
            className={"confirmModal " + classes.confirmModal}
            open={open}
            onClose={handleClose}
        >
            <Body closeModal={handleClose} mapCtrl={mapCtrl} />
        </Modal>
    );
}