// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { closeModal, selectIsOpen } from "./cancelModalSlice.js";
import MyModal from "../../../../common/components/MyModal.js";

// React
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        cancelModal: {
            "& > .modalContent": {
                gap: "20px"
            }
        },
        question: {
            fontSize: "22px",
            textAlign: "center"
        }
    });
});

function ModalContent() {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.question}>
            Are you sure you want to cancel this plan?
        </div>
    )
}

function getBtnSetting(doCancel) {
    return ({
        leftBtn: {
            callback: null,
            text: "No"
        },
        rightBtn: {
            callback: doCancel,
            text: "Yes",
            disabled: false
        }
    });
}

function getModalBodyStyles() {
    return ({
        width: "380px",
        height: "225px"
    });
}

function getModalContentStyles() {
    return ({
        gap: "20px"
    });
}

export default function CancelModal({ doCancel }) {
    // styles
    const classes = useStyles();

    // data
    const isOpen = useSelector(selectIsOpen);

    // ctrl
    const dispatch = useDispatch();
    const doCloseModal = () => {
        dispatch(closeModal());
    };

    return (
        <MyModal
            isOpen={isOpen}
            content={<ModalContent />}
            btnSettings={getBtnSetting(doCancel)}
            closeModal={doCloseModal}
            otherComponents={null}
            modalBodyStyles={getModalBodyStyles()}
            modalContentStyles={getModalContentStyles()}
        />
    );

    // return (
    //     <Modal
    //         open={isOpen}
    //         onClose={doCloseModal}
    //     >
    //         <div className={classes.body}>
    //             <div className={classes.question}>Are you sure you want to
    //                 cancel this plan?</div>
    //             <ButtonSection
    //                 rightCtrl={{
    //                     handleClick: handleClickYes,
    //                     text: "Yes",
    //                     icon: null
    //                 }}
    //                 leftCtrl={{
    //                     handleClick: handleClickNo,
    //                     text: "No",
    //                     icon: null
    //                 }}
    //             />
    //         </div>
    //     </Modal>
    // );
}