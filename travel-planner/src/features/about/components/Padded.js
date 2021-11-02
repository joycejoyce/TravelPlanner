// MUI
import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => {
    return ({
        padded: {
            paddingLeft: theme.spacing(2)
        }
    });
});

export default function({ component }) {
    const classes = useStyles();
    return (
        <div className={classes.padded}>
            {component}
        </div>
    )
}