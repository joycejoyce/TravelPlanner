// MUI
import { Modal, Typography, TextField, Button, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

// my components
import { secondary as secondaryFont } from "../../../common/styles/fonts.json";
import { 
    setMapToReadOnly,
    setMapToModifiable,
    showInfoWindow,
    hideInfoWindow,
    changeInfoWindowPosition
} from "./mapHandler.js";
import { selectDesc, selectPosition, changeDesc } from "../criteriaSlice.js";
import { selectIsOpen, closeModal } from "./modalOpenSlice.js";

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
        transform: "translate(-50%, -50%)"
    },
    modalContent: {
        width: "298px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        position: "absolute",
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)"
    },
    desc: {
        fontSize: "18px",
        color: theme.palette.text.primary,
        textAlign: "center",
        width: "fit-content",
        maxWidth: "305px"
    },
    text: {
        width: "296px",
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
    },
    chooseAnother: {
        alignSelf: "flex-start",
        marginTop: theme.spacing(3),
        cursor: "pointer",
        fontSize: "14px"
    }
}));

// const Body = React.forwardRef((props, ref) => {
const Body = React.forwardRef((props) => {
    const dispatch = useDispatch();
    const { closeModal } = props;
    const classes = useStyles();
    const maxTextNum = 60;

    const desc = useSelector(selectDesc);
    const position = useSelector(selectPosition);

    const [text, setText] = useState(desc);

    const remainingTextNum = maxTextNum - text.length;
    let helperText = "remaining character number: " + remainingTextNum.toString();

    const handleOnChange = (e) => {
        const { value } = e.target;
        setText(value.slice(0, Math.min(maxTextNum, value.length)));
    }

    const doChangeDesc = (desc) => {
        dispatch(changeDesc(desc));
    };

    const handleOnClickConfirm = () => {
        doChangeDesc(text);

        const mapOperations = () => {
            setMapToReadOnly();

            const { latLng } = position;
            changeInfoWindowPosition(latLng);

            showInfoWindow();
        };
        mapOperations();

        closeModal();
    }

    const handleClickChooseAnother = () => {
        doChangeDesc("");
        
        const mapOperations = () => {
            setMapToModifiable();
            hideInfoWindow();
        };
        mapOperations();

        closeModal();
    }

    const { address } = useSelector(selectPosition);    

    return (
        <div className={"modalBody " + classes.modalBody}>
            <div className={"modalContent " + classes.modalContent}>
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
                <Link
                    className={"chooseAnother " + classes.chooseAnother}
                    onClick={handleClickChooseAnother}
                >
                    Choose another center point
                </Link>
            </div>
        </div>
    );
});

export default function ConfirmModal() {
    const classes = useStyles();
    const isOpen = useSelector(selectIsOpen);
    const dispatch = useDispatch();

    const handleClose = () => {
        dispatch(closeModal());
    }

    return (
        <Modal
            className={"confirmModal " + classes.confirmModal}
            open={isOpen}
            onClose={handleClose}
        >
            <Body closeModal={handleClose} />
        </Modal>
    );
}