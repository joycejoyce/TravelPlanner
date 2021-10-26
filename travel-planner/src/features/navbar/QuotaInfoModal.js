// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import MyModal from "../../common/components/MyModal.js";

const useStyles = makeStyles((theme) => {
    return ({
        modalContent: {

        }
    });
});

function ModalContent({ quotaLimit }) {
    const classes = useStyles();

    return (
        <div className={classes.modalContent}>

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