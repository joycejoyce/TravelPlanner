// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return ({
        rightBtn: {
            // background: theme.palette.secondary.main,
            // color: theme.palette.primary.main
        }
    });
});

export default function NextBtn({ ctrl }) {
    const classes = useStyles();

    const { handleClick, text, icon } = ctrl;

    // return (
    //     <IconButton
    //         className={classes.nextBtn}
    //         // color="primary"
    //         onClick={handleClick}
    //         aria-label="next"
    //     >
    //         <NextIcon />
    //     </IconButton>
    // );

    return (
        <Button
            className={classes.rightBtn}
            color="primary"
            variant="contained"
            onClick={handleClick}
            endIcon={icon}
            // disabled={disabled}
        >
            {text}
        </Button>
    );
}