// MUI
import { Modal } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    confirmModal: {

    },
    body: {

    }
}));

function Body() {
    const classes = useStyles();

    return (
        <div className={"body " + classes.body}>

        </div>
    );
}

export default function ConfirmModal({open, handleClose}) {
    const classes = useStyles();

    return (
        <Modal
            className={"confirmModal " + classes.confirmModal}
            open={open}
            onClose={handleClose}
        >
            <Body />
        </Modal>
    );
}