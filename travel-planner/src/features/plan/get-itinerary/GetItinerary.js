// MUI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    contents: {
        // background: "green"
    }
}));

export default function GetItinerary() {
    const classes = useStyles();
    const rootClassName = ["get-itinerary", classes.root].join(" ");

    return (
        <div className={rootClassName}>
            <div className={["contents", classes.contents].join(" ")}>
                <h1>GetItinerary</h1>
            </div>
        </div>
    );
}