// MUI
import { Modal, Typography, TextField, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// others
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    confirmModal: {

    },
    modalBody: {
        width: "385px",
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
        color: theme.palette.text.primary
    },
    text: {
        width: "264px",
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
        width: "264px",
        height: "45px",
        marginTop: "10px",
        "& button": {
            fontSize: "16px"
        }
    }
}));

function Body() {
    const classes = useStyles();
    const maxTextNum = 100;
    const [text, setText] = useState("");
    const remainingTextNum = maxTextNum - text.length;

    const handleOnChange = (e) => {
        const { value } = e.target;
        setText(value.slice(0, Math.min(maxTextNum, value.length)));
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
                helperText={"remaining character num: " + remainingTextNum.toString()}
            />
            <div className={"btnSection " + classes.btnSection}>
                <Button
                    color="primary"
                    variant="outlined"
                >
                    Cancel
                </Button>
                <Button
                    color="primary"
                    variant="contained"
                >
                    Confirm
                </Button>
            </div>
        </div>
    );
}

export default function ConfirmModal({ open, setOpen }) {
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
            <Body />
        </Modal>
    );
}