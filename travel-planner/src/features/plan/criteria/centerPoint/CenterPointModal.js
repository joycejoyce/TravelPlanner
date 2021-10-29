// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Typography, TextField, Link } from "@material-ui/core";

// my components
import MyModal from "../../../../common/components/MyModal";
import { CriteriaName, selectAll, changeDesc } from "../criteriaSlice";
import {
    setMapToReadOnly,
    setMapToModifiable,
    showInfoWindow,
    hideInfoWindow,
    changeInfoWindowPosition
} from "./mapHandler.js";
import { closeModal, selectIsOpen } from "./centerPointModalSlice";

// my styles
import { secondary as secondaryFont } from "../../../../common/styles/fonts.json";

// React
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";

const useStyles = makeStyles((theme) => ({
    desc: {
        fontSize: "18px",
        color: theme.palette.text.primary,
        textAlign: "center",
        width: "330px"
    },
    address: {
        color: theme.palette.primary.main,
        fontSize: "16px",
        fontFamily: secondaryFont
    },
    text: {
        width: "330px",
        margin: theme.spacing(2),
        "& .MuiOutlinedInput-root": {
            padding: theme.spacing(1)
        },
        "& .MuiFormHelperText-root": {
            marginLeft: "0",
            fontSize: "14px"
        }
    },
    chooseAnother: {
        alignSelf: "flex-start",
        marginTop: theme.spacing(3),
        cursor: "pointer",
        fontSize: "14px"
    }
}));

function ModalContent({ criteria, text, maxTextNum, handleChange }) {
    // styles
    const classes = useStyles();

    // data
    const { position } = criteria[CriteriaName.centerPoint];
    const { address } = position;
    const remainingTextNum = maxTextNum - text.length;
    let helperText = "remaining character number: " + remainingTextNum.toString();

    return (
        <>
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
                onChange={handleChange}
                helperText={helperText}
                inputProps={{ "data-testid": "desc" }}
            />
        </>
    );
}

function getBtnSetting(doChangeDesc, criteria, text) {
    const handleOnClickConfirm = () => {
        doChangeDesc(text);

        const mapOperations = () => {
            setMapToReadOnly();

            const { latLng } = criteria[CriteriaName.centerPoint].position;
            changeInfoWindowPosition(latLng);

            showInfoWindow();
        };
        mapOperations();
    };

    return ({
        leftBtn: {
            callback: null,
            text: "Cancel"
        },
        rightBtn: {
            callback: handleOnClickConfirm,
            text: "Confirm",
            disabled: text.length === 0
        }
    });
}

function MyLink() {
    // styles
    const classes = useStyles();

    // ctrl
    const dispatch = useDispatch();
    const handleClickChooseAnother = () => {
        dispatch(changeDesc(""));

        const mapOperations = () => {
            setMapToModifiable();
            hideInfoWindow();
        };
        mapOperations();

        dispatch(closeModal());
    };

    return (
        <Link
            className={"chooseAnother " + classes.chooseAnother}
            onClick={handleClickChooseAnother}
        >
            Choose another center point
        </Link>
    );
}

export default function ConfirmModal() {
    // data
    const criteria = useSelector(selectAll);
    const { desc } = criteria[CriteriaName.centerPoint];
    const [ text, setText ] = useState(desc);
    const isOpen = useSelector(selectIsOpen);
    const maxTextNum = 60;

    // ctrl
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const { value } = e.target;
        setText(value.slice(0, Math.min(maxTextNum, value.length)));
    };
    const doChangeDesc = (desc) => {
        dispatch(changeDesc(desc));
    };
    const doCloseModal = () => {
        dispatch(closeModal());
    };

    return (
        <MyModal
            isOpen={isOpen}
            content={<ModalContent
                criteria={criteria}
                text={text}
                maxTextNum={maxTextNum}
                handleChange={handleChange}
            />}
            btnSettings={getBtnSetting(doChangeDesc, criteria, text)}
            closeModal={doCloseModal}
            otherComponents={<MyLink />}
        />
    );
}