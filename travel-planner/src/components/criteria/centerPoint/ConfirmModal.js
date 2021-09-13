// MUI
import { Modal, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// my components
import { secondary as secondaryFont } from "../../../fonts.json";

// others
import React, { useState } from "react";
import { addInfoWindow } from "../../mapHandler/MapHandler_CenterPoint";

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
    const {ctrl, closeModal, mapCtrl} = props;
    const {desc, position} = ctrl;
    const {centerPointDesc, setCenterPointDesc} = desc;
    const {address} = position.centerPointPosition;
    const classes = useStyles();
    const maxTextNum = 100;
    const [text, setText] = useState(centerPointDesc);
    const remainingTextNum = maxTextNum - text.length;
    let helperText = "remaining character number: " + remainingTextNum.toString();

    const handleOnChange = (e) => {
        const { value } = e.target;
        setText(value.slice(0, Math.min(maxTextNum, value.length)));
    }

    const handleOnClickConfirm = () => {
        setCenterPointDesc(text);
        const {google, map, mapDivSelector} = mapCtrl;
        const latLngObj = ctrl.position.centerPointPosition.latLngObj;
        const info = {
            desc: text,
            address: ctrl.position.centerPointPosition.address
        }
        addInfoWindow(google, map, mapDivSelector, latLngObj, info);

        map.setOptions({
            // draggable: false,
            zoomControl: false,
            // scrollwheel: false,
            // disableDoubleClickZoom: true,
            gestureHandling: "none"
        });

        google.maps.event.clearListeners(map, "click");

        closeModal();
    }

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

export default function ConfirmModal({ open, setOpen, ctrl, mapCtrl }) {
    const classes = useStyles();

    const handleClose = () => {
        setOpen(false);
    }

    return (
        <Modal
            className={"confirmModal " + classes.confirmModal}
            open={open}
            onClose={handleClose}
        >
            <Body ctrl={ctrl} closeModal={handleClose} mapCtrl={mapCtrl} />
        </Modal>
    );
}