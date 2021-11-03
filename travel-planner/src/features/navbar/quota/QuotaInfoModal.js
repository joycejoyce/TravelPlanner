// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import MyModal from "../../../common/components/MyModal.js";
import { DailyQuotaLimit } from "./quotaHandler.js";

const useStyles = makeStyles((theme) => {
    return ({
        modalContent: {
            color: theme.palette.primary.main,
            fontSize: "18px",
            textAlign: "center"
        },
        desc: {
            width: "340px"
        },
        limitDesc: {
            marginTop: theme.spacing(1),
            marginBottom: theme.spacing(6)
        },
        limitNum: {
            fontSize: "20px",
            fontWeight: "bold"
        }
    });
});

function ModalContent({ quotaLimit }) {
    const classes = useStyles();

    return (
        <div className={classes.modalContent}>
            <div className={classes.desc}>
                Due to using Google Maps APIs is costly,<br/>the daily quota of using them is:
            </div>
            <div className={classes.limitDesc}>
                <span className={classes.limitNum}>{DailyQuotaLimit}</span> requests per IP
            </div>
        </div>
    );
}

export default function QuotaInfoModal({ isOpen, closeModal, quotaLimit }) {
    const getBtnSetting = () => {
        return ({
            leftBtn: {
                callback: null,
                text: "Close"
            }
        });
    };

    return (
        <MyModal
            isOpen={isOpen}
            content={<ModalContent quotaLimit={quotaLimit} />}
            btnSettings={getBtnSetting()}
            closeModal={closeModal}
            otherComponents={null}
            modalBodyStyles={null}
            modalContentStyles={null}
        />
    );
}