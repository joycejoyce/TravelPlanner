// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

// my components
import { err as errColor, lightGrey } from "../../common/styles/colors.json";
import { primary as primaryFont } from "../../common/styles/fonts.json";
import QuotaInfoModal from "./QuotaInfoModal.js";

// React
import { useState } from "react";

const initialColor = lightGrey;
const DailyQuotaLimit = 90;
const FieldName = "quota";
const QuotaFieldName = {
    curQuota: "curQuota",
    timeStamp: "timeStamp" 
};

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

    // ctrl
    const openModal = () => {
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
    };

    // data
    const quotaStr = localStorage.getItem(FieldName);
    let quota = JSON.parse(quotaStr);
    if (!quota ||
        quota[QuotaFieldName.curQuota] === undefined ||
        quota[QuotaFieldName.timeStamp] === undefined) {
        const obj = {
            [QuotaFieldName.curQuota]: 0,
            [QuotaFieldName.timeStamp]: new Date()
        }
        const str = JSON.stringify(obj);
        localStorage.setItem(FieldName, str);

        quota = obj;
    }
    const curQuota = quota[QuotaFieldName.curQuota];
    const curQuotaStyle = {
        color: curQuota > DailyQuotaLimit*0.9 ? errColor : "inherit"
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
                    {curQuota}
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