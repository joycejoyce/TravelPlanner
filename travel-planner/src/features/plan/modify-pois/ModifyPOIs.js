// MUI
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    root: {
        
    },
    contents: {
        background: "yellow"
    }
}));

export default function ModifyPOIs() {
    const classes = useStyles();
    const rootClassName = ["modify-pois", classes.root].join(" ");

    return (
        <div className={rootClassName}>
            <div className={["contents", classes.contents].join(" ")}>
                <h1>ModifyPOIs</h1>
            </div>
        </div>
    );
}