// MUI
import { Modal, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// others
import React, { useState } from "react";

const useStyles = makeStyles((theme) => ({
    confirmModal: {

    },
    modalBody: {
        width: "400px",
        height: "295px",
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
        color: theme.palette.text.primary
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
    }
}));

function Body(props) {
    const {ctrl, closeModal} = props;
    const {centerPointDesc, setCenterPointDesc} = ctrl;
    const classes = useStyles();
    const maxTextNum = 100;
    const [text, setText] = useState(centerPointDesc);
    const remainingTextNum = maxTextNum - text.length;
    let helperText = "remaining character num: " + remainingTextNum.toString();

    const handleOnChange = (e) => {
        const { value } = e.target;
        setText(value.slice(0, Math.min(maxTextNum, value.length)));
    }

    const handleOnClickConfirm = () => {
        setCenterPointDesc(text);
        closeModal();
    }

    return (
        <div className={"modalBody " + classes.modalBody}>
            <Typography
                variant="body1"
                className={classes.desc}
            >
                Write a short description for this point:
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
}

export default function ConfirmModal({ open, setOpen, ctrl }) {
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
            <Body ctrl={ctrl} closeModal={handleClose} />
        </Modal>
    );
}