// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Modal } from "@material-ui/core";

// my components
import { closeModal, selectIsOpen } from "./modalOpenSlice.js";
import ButtonSection from "../../buttonSection/ButtonSection.js";
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles((theme) => {
    return ({
        body: {

        }
    });
});

export default function CancelModal({ doCancel }) {
    // styles
    const classes = useStyles();

    // React
    const dispatch = useDispatch();
    const isOpen = useSelector(selectIsOpen);

    // ctrl
    const doCloseModal = () => {
        dispatch(closeModal);
    };
    const handleClickYes = () => {
        doCancel();
    };
    const handleClickNo = () => {
        dispatch(closeModal);
    };

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