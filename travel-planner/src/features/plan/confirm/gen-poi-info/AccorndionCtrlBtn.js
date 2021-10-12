// MUI
import { makeStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";
import { UnfoldMoreSharp as ExpandIcon, UnfoldLessSharp as CollapseIcon } from "@material-ui/icons";

// my components
import { primary as primaryFont } from "../../../../common/styles/fonts.json";
import { POIName } from "../../criteria/POIs";

const useStyles = makeStyles((theme) => {
    return ({
        ctrlBtn: {
            fontFamily: primaryFont,
            margin: "0 0 0 auto",
            display: "flex"
        }
    });
});

export default function AccorndionCtrlBtn({ ctrl }) {
    // styles
    const classes = useStyles();

    // React
    const { expanded, setExpanded } = ctrl;

    // Others
    const allPOINames = Object.keys(POIName);
    const checkIsAllExpanded = () => {
        const expandedNum = allPOINames.reduce((accu, poiName) => {
            if (expanded[poiName]) {
                accu ++;
            }
            return accu;
        }, 0);

        return expandedNum === allPOINames.length;
    };
    const isAllExpanded = checkIsAllExpanded(); // current status

    // New components
    const icon = isAllExpanded ? (<CollapseIcon />) : (<ExpandIcon />);
    const text = isAllExpanded ? "Collapse all" : "Expand all";

    // ctrl
    const setAllPOIsExpandedValue = (value) => {
        setExpanded(allPOINames.reduce((accu, poiName) => {
            accu[poiName] = value;
            return accu;
        }, {}));
    };
    const handleClick = () => {
        if (isAllExpanded) {
            setAllPOIsExpandedValue(false);
        }
        else {
            setAllPOIsExpandedValue(true);
        }
    };

    return (
        <Button
            className={classes.ctrlBtn}
            endIcon={icon}
            onClick={handleClick}
        >
            {text}
        </Button>
    )
}