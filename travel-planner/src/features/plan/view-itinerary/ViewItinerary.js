// MUI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    contents: {
        // background: "green"
    }
}));

export default function ViewItinerary() {
    const classes = useStyles();
    const rootClassName = ["save-itinerary", classes.root].join(" ");

    return (
        <div className={rootClassName}>
            <div className={["contents", classes.contents].join(" ")}>
                <h1>ViewItinerary</h1>
            </div>
        </div>
    );
}