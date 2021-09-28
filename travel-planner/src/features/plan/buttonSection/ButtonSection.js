// MUI
import { makeStyles } from "@material-ui/core/styles";

// my component
import NextBtn from "./NextBtn";
import PrevBtn from "./PrevBtn.js";

const useStyles = makeStyles((theme) => {
    return ({
        btnSection: {
            width: "60%",
            alignSelf: "center",
            display: "flex",
            "& > *": {
                // minWidth: "128px",
                // maxWidth: "128px",
                padding: "8px 20px",
                fontSize: "16px"
            }
        }
    });
});

export default function ButtonSection({handleClickNext, handleClickPrev}) {
    const classes = useStyles();
    const styles = {
        justifyContent: handleClickPrev ? "space-between" : "space-around"
    };

    return (
        <div
            className={"btnSection " + classes.btnSection}
            style={styles}
        >
            {
                handleClickPrev ? <PrevBtn /> : <></>
            }
            <NextBtn handleClick={handleClickNext} />
        </div>
    );
}