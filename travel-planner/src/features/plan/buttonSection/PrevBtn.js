// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { ArrowBackOutlined as PrevIcon } from '@material-ui/icons';
import { IconButton } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
    return ({
        prevBtn: {
            // borderWidth: "1px",
            // borderStyle: "solid",
            // borderColor: theme.palette.primary.main,
            // color: theme.palette.primary.main
        }
    });
});

export default function PrevBtn({ handleClick }) {
    const classes = useStyles();

    // return (
    //     <IconButton
    //         className={classes.prevBtn}
    //         // color="primary"
    //         onClick={handleClick}
    //         aria-label="prev"
    //     >
    //         <PrevIcon />
    //     </IconButton>
    // );

    return (
        <Button
            className={classes.prevBtn}
            color="primary"
            variant="outlined"
            onClick={handleClick}
            startIcon={<PrevIcon />}
            // disabled={disabled}
        >
            Back
        </Button>
    );
}