// MUI
import { makeStyles } from "@material-ui/styles";

// my components
import { SectionItem } from "./Sections.js";

const useStyles = makeStyles((theme) => {
    return ({
        development: {

        }
    });
});

export default function Development() {
    // styles
    const classes = useStyles();
    return (
        <div id={SectionItem.development.ref} className={classes.development}>
            <div className={classes.subSection}>

            </div>
            <div className={classes.subSection}>
                
            </div>
            <div className={classes.subSection}>
                
            </div>
            <div className={classes.subSection}>
                
            </div>
        </div>
    );
}