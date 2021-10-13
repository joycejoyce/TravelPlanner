// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => {
    return ({
        btnSection: {
            display: "flex",
            width: "380px",
            justifyContent: "space-between"
        },
        btn: {
            height: "40px",
            width: "100px",
            fontSize: "16px"
        }
    });
});

export default function ButtonSection() {
    const classes = useStyles();

    const handleClickSave = () => {

    };

    const handleClickCancel = () => {

    };

    return (
        <div className={classes.btnSection}>
            <Button
                className={classes.btn}
                onClick={handleClickCancel}
                variant="outlined"
                color="primary"
            >
                Cancel
            </Button>
            <Button
                className={classes.btn}
                onClick={handleClickSave}
                variant="contained"
                color="primary"
            >
                Save
            </Button>
        </div>
    );
}