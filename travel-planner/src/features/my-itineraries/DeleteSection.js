// MUI
import { Button } from "@material-ui/core";
import { ThemeProvider, makeStyles } from "@material-ui/core/styles";

// my components
import { lightColors } from "../../common/styles/colors.json";
import { secondary as secondaryFont } from "../../common/styles/fonts.json";
import MyModal from "../../common/components/MyModal.js";
import { deleteBtnTheme } from "../../common/styles/styles";

// React
import { useState } from "react";
import { CriteriaName } from "../plan/criteria/criteriaSlice";
import { getDate, getRadius } from "./dataHandler";
import { ItineraryInfoFieldName } from "../plan/confirm/itinerary-info/itineraryInfoSlice";

const useStyles = makeStyles((theme) => ({
    btn: {
        width: "100px",
        fontSize: "16px",
        letterSpacing: "1px",
        margin: "45px 0"
    },
    modalContent: {
        letterSpacing: ".3px"
    },
    question: {
        width: "255px",
        textAlign: "center",
        fontSize: "22px",
        margin: "0 auto"
    },
    itiInfo: {
        boxSizing: "border-box",
        width: "350px",
        padding: "16px 32px",
        background: lightColors.accDetailsBK,
        maxHeight: "200px",
        overflowY: "auto",
        borderRadius: "3px",
        margin: "18px 0"
    },
    itineraryName: {
        margin: "0 auto 8px auto",
        fontSize: "18px",
        fontFamily: secondaryFont,
        textAlign: "center"
    },
    criterion: {
        display: "grid",
        width: "290px",
        gridTemplateColumns: "1.3fr 5fr"
    },
    label: {
        fontWeight: "bold",
        color: theme.palette.primary.main
    }
}));

function ModalContent({ itinerary }) {
    // styles
    const classes = useStyles();

    // data
    const { itineraryInfo, criteria } = itinerary;
    const centerPoint = criteria[CriteriaName.centerPoint];

    const displayData = {
        center: {
            label: "Center",
            value: centerPoint.position.address
        },
        date: {
            label: "Date",
            value: getDate(criteria)
        },
        radius: {
            label: "Radius",
            value: getRadius(criteria) + " km"
        }
    };

    return (
        <div className={classes.modalContent}>
            <div className={classes.question}>
                Are you sure you want to delete this itinerary?
            </div>
            <div className={classes.itiInfo}>
                <div className={classes.itineraryName}>{itineraryInfo[ItineraryInfoFieldName.name]}</div>
                <div className={classes.criteria}>
                    {
                        Object.values(displayData).map((data) => {
                            const { label, value } = data;
                            return (
                                <div className={classes.criterion}>
                                    <div className={classes.label}>{label}</div>
                                    <div className={classes.value}>{value}</div>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default function DeleteSection({ deleteItinerary, itinerary }) {
    // styles
    const classes = useStyles();

    // React
    const [isOpen, setIsOpen] = useState(false);

    // ctrl
    const openModal = () => {
        setIsOpen(true);
    };
    const closeModal = () => {
        setIsOpen(false);
    };
    const getBtnSetting = () => {
        return ({
            leftBtn: {
                callback: null,
                text: "No"
            },
            rightBtn: {
                callback: deleteItinerary,
                text: "Yes",
                disabled: false
            }
        });
    };
    const getModalBodyStyles = () => {
        return ({
            width: "380px",
            minHeight: "380px",
            height: "fit-content",
            boxSizing: "border-box",
            padding: "16px 8px"
        });
    };

    return (
        <ThemeProvider theme={deleteBtnTheme}>
            <Button
                className={classes.btn}
                variant="contained"
                color="primary"
                onClick={openModal}
            >
                Delete
            </Button>
            <MyModal
                isOpen={isOpen}
                content={<ModalContent itinerary={itinerary} />}
                btnSettings={getBtnSetting()}
                closeModal={closeModal}
                otherComponents={null}
                modalBodyStyles={getModalBodyStyles()}
                modalContentStyles={null}
            />
        </ThemeProvider>
    );
}