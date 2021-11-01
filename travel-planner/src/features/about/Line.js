// MUI
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
    return ({
        line: {
            width: "42px",
            border: ".5px solid lightGrey",
            margin: "32px auto"
        }
    });
});

export default function Line() {
    // styles
    const classes = useStyles();

    return (
        <div className={classes.line}></div>
    )
}