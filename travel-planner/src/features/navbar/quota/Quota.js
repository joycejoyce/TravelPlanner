// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// my components
import { err as errColor, lightGrey } from "../../../common/styles/colors.json";
import { primary as primaryFont } from "../../../common/styles/fonts.json";
import QuotaInfoModal from "./QuotaInfoModal.js";
import { checkIsExceedThreshold, DailyQuotaLimit } from "./quotaHandler.js";

// React
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectQuota } from "./quotaSlice";

const initialColor = lightGrey;

const useStyles = makeStyles((theme) => {
    return ({
        quota: {
            
        },
        btn: {
            position: "absolute",
            left: "300px",
            top: "-20px",
            width: "80px",
            border: ".5px solid black",
            borderColor: lightGrey,
            borderRadius: "14px",
            height: "28px",
            "& .MuiButton-label": {
                display: "flex",
                alignItems: "center",
                gap: theme.spacing(.5),
                color: initialColor,
                fontSize: "12px",
                fontFamily: primaryFont
            }
        },
        curQuota: {
            fontSize: "14px",
            fontWeight: "bold"
        }
    });
});

export default function Quota() {
    const classes = useStyles();

    // React
    const [isModalOpen, setIsModalOpen] = useState(false);
    const quota = useSelector(selectQuota);

    // ctrl
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // data
    const isExceedThreshold = checkIsExceedThreshold();
    const curQuotaStyle = {
        color: isExceedThreshold ? errColor : "inherit"
    };

    return (
        <div
            className={classes.quota}
        >
            <Button
                className={classes.btn}
                onClick={openModal}
            >
                <div
                    className={classes.curQuota}
                    style={curQuotaStyle}
                >
                    {quota}
                </div>
                <div>/</div>
                <div>{DailyQuotaLimit}</div>
            </Button>
            <QuotaInfoModal
                isOpen={isModalOpen}
                closeModal={closeModal}
                quotaLimit={DailyQuotaLimit}
            />
        </div>
    )
}