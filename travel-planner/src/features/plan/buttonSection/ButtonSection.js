// MUI
import { makeStyles } from "@material-ui/core/styles";

// my component
import RightBtn from "./RightBtn";
import LeftBtn from "./LeftBtn.js";

const useStyles = makeStyles((theme) => {
    return ({
        btnSection: {
            width: "380px",
            alignSelf: "center",
            display: "flex",
            "& > *": {
                // minWidth: "128px",
                // maxWidth: "128px",
                padding: "6px 20px",
                fontSize: "16px"
            }
        }
    });
});

export default function ButtonSection({ rightCtrl, leftCtrl }) {
    const classes = useStyles();
    const styles = {
        justifyContent: leftCtrl ? "space-between" : "space-around"
    };

    return (
        <div
            className={"btnSection " + classes.btnSection}
            style={styles}
        >
            {
                leftCtrl ? <LeftBtn ctrl={leftCtrl}  /> : <></>
            }
            <RightBtn ctrl={rightCtrl} />
        </div>
    );
}