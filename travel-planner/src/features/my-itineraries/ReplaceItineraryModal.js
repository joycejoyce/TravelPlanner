// MUI
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";
import { Radio, RadioGroup, FormControlLabel } from "@material-ui/core";

// my components
import MyModal from "../../common/components/MyModal.js";
import { deleteBtnTheme } from "../../common/styles/styles.js";

// React
import { getAllItineraries, MaxItineraryNum } from "./dataHandler.js";
import ItineraryCard from "./ItineraryCard.js";

const useStyles = makeStyles((theme) => ({
    modalContent: {
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        gap: "14px"
    },
    limitDesc: {
        fontSize: "22px",
        color: theme.palette.primary.main
    },
    limitNum: {
        fontWeight: "bold"
    },
    info: {
        fontSize: "18px"
    },
    groupWrapper: {
        width: "350px",
        // outline: "1px solid red",
    },
    radioGroup: {
        margin: "0 auto",
        gap: "10px",
        alignItems: "center",
        width: "300px",
        // outline: "1px solid green",
    }
}));

function ModalContent({ ctrl }) {
    // styles
    const classes = useStyles();

    // React
    const { value, onChange } = ctrl;

    return (
        <div className={classes.modalContent}>
            <div className={classes.limitDesc}>The upper limit for itinerary number is <span className={classes.limitNum}>{MaxItineraryNum}</span></div>
            <div className={classes.info}>Please choose 1 itinerary to replace:</div>
            <div className={classes.groupWrapper}>
                <RadioGroup
                    className={classes.radioGroup}
                    aria-label="itineraries"
                    name="itineraries"
                    value={value}
                    onChange={onChange}
                >
                    {
                        Object.entries(getAllItineraries()).map(([itiName, itinerary]) => {
                            return (
                                <FormControlLabel
                                    className={classes.ctrlLabel}
                                    value={itiName}
                                    control={<Radio color="primary" size="small" />}
                                    label={<ItineraryCard itinerary={itinerary} disableClick={true} />}
                                />
                            );
                        })
                    }
                </RadioGroup>
            </div>
        </div>
    );
}

function Space() {
    return (
        <div style={{height: "32px"}}></div>
    )
}

export default function ReplaceItineraryModal({ ctrl, replaceItinerary, itiToReplaceCtrl }) {
    const { isOpen, closeModal } = ctrl;

    // ctrl
    const getBtnSetting = () => {
        return ({
            leftBtn: {
                callback: null,
                text: "Cancel"
            },
            rightBtn: {
                callback: replaceItinerary,
                text: "Replace",
                disabled: false
            }
        });
    };
    const getModalContentStyles = () => {
        return ({
            top: "16px",
            transform: "translateX(-50%)"
        });
    };
    const getModalBodyStyles = () => {
        return ({
            width: "380px",
            height: "90vh",
            overflowY: "auto",
            borderRadius: "3px"
        });
    };

    return (
        <ThemeProvider theme={deleteBtnTheme}>
            <MyModal
                isOpen={isOpen}
                content={<ModalContent ctrl={itiToReplaceCtrl} />}
                btnSettings={getBtnSetting()}
                closeModal={closeModal}
                otherComponents={<Space />}
                modalBodyStyles={getModalBodyStyles()}
                modalContentStyles={getModalContentStyles()}
            />
        </ThemeProvider>
    );
}