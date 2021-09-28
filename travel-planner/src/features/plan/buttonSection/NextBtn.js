// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { ArrowForwardOutlined as NextIcon } from "@material-ui/icons";
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return ({
        nextBtn: {
            // background: theme.palette.secondary.main,
            // color: theme.palette.primary.main
        }
    });
});

export default function NextBtn({ handleClick }) {
    const classes = useStyles();

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
            className={classes.nextBtn}
            color="primary"
            variant="contained"
            onClick={handleClick}
            endIcon={<NextIcon />}
            // disabled={disabled}
        >
            Next
        </Button>
    );
}