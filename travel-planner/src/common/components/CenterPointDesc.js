// MUI
import { makeStyles } from "@material-ui/core/styles";

// my components
import { secondary as secondaryFont } from "../styles/fonts.json";
import { MapIconUrl } from "./MapIcon.js";

const useStyles = makeStyles((theme) => {
    return ({
        centerPointDesc: {
            marginTop: theme.spacing(1),
            width: "380px",
            [theme.breakpoints.up('md')]: {
                width: "600px"
            },
            display: "flex",
            gap: theme.spacing(1),
            alignItems: "center",
            "& > .desc": {
                fontFamily: secondaryFont,
                letterSpacing: ".5px",
                fontWeight: "bold"
            },
            "& .address": {
                fontSize: "14px"
            }
        },
        img: {
            cursor: "pointer"
        }
    });
});

export default function CenterPointDesc({ data, handleClick }) {
    // styles
    const classes = useStyles();

    const { desc, position } = data;
    const { address } = position

    return (
        <div
            className={classes.centerPointDesc}            
        >
            <img
                className={classes.img}
                src={MapIconUrl.center}
                width="32px"
                onClick={handleClick}
            />
            <div className="desc">{desc}</div>
            <div className="address">{address}</div>
        </div>
    )
}