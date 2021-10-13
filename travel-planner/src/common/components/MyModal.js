// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button, Modal } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return ({
        modalBody: {
            width: "400px",
            height: "350px",
            minHeight: "fit-content",
            background: theme.palette.background.paper,
            borderRadius: "3px",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        },
        modalContent: {
            width: "298px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)"
        },
        btnSection: {
            display: "flex",
            justifyContent: "space-between",
            width: "297px",
            height: "40px",
            marginTop: "10px",
            "& button": {
                width: "100px",
                fontSize: "16px"
            }
        }
    });
});

export default function MyModal({ isOpen, content, btnSettings, closeModal, otherComponents }) {
    // styles
    const classes = useStyles();

    // data
    const { leftBtn, rightBtn } = btnSettings;

    // ctrl
    const handleClick = (cb) => {
        if (cb) {
            cb();
        }
        closeModal();
    };

    return (
        <Modal
            className={"confirmModal " + classes.confirmModal}
            open={isOpen}
            onClose={closeModal}
        >
            <div className={"modalBody " + classes.modalBody}>
                <div className={"modalContent " + classes.modalContent}>
                    {content}
                    <div className={"btnSection " + classes.btnSection}>
                        <Button
                            color="primary"
                            variant="outlined"
                            onClick={() => handleClick(leftBtn.callback)}
                        >
                            {leftBtn.text}
                        </Button>
                        <Button
                            color="primary"
                            variant="contained"
                            onClick={() => handleClick(rightBtn.callback)}
                            disabled={rightBtn.disabled}
                        >
                            {rightBtn.text}
                        </Button>
                    </div>
                    {otherComponents}
                </div>
            </div>
        </Modal>
    );
}